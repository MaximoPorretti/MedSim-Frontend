import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Loader } from '@react-three/drei';
import * as THREE from 'three';
import { AlertCircle, User, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { Patient } from '../models/simulation';

const MEDSIM_MODEL_PATH = '/models/medsim_demo.glb';
const TALKING_ANIMATION_NAME = 'mixamo.com.001';

// Punto de enfoque (rostro / torso del paciente) en el espacio centrado.
const LOOK_TARGET: [number, number, number] = [0.1, -0.48, -0.14];
// Cámara en POV del médico, sentado detrás del escritorio frente al paciente.
const CAMERA_POSITION: [number, number, number] = [0.1, -0.18, 1.75];
const CAMERA_FOV = 48;

interface PatientViewProps {
  patient: Patient;
  isCompact?: boolean;
}

class SceneErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white p-6 text-center">
          <div className="max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Error de Simulación</h3>
            <p className="text-slate-400 mb-6">Hubo un problema al cargar los recursos 3D. Asegúrate de que los archivos del modelo estén presentes.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-full transition-all font-bold shadow-lg shadow-cyan-900/40"
            >
              Recargar Simulador
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Carga el modelo del paciente y lo centra en el origen (igual que el encuadre
 * original que enmarca correctamente a la persona). Informa la altura del piso
 * para que la sala se construya en el mismo sistema de coordenadas.
 */
function Patient3D({ onFloor }: { onFloor: (y: number) => void }) {
  const { scene, animations } = useGLTF(MEDSIM_MODEL_PATH);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const placement = useMemo(() => {
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    // Solo conservamos a la paciente (Ch31_*), la silla donde se sienta y el
    // cascarón del consultorio (paredes / piso / techo). Todo el resto del
    // mobiliario y los objetos decorativos se ocultan.
    const KEEP_PREFIXES = ['Ch31_', 'Student_Chair', 'Medical_Office'];
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.frustumCulled = true;
      const keep = KEEP_PREFIXES.some((prefix) => mesh.name.startsWith(prefix));
      mesh.visible = keep;
    });

    // Centrado en todos los ejes (encuadre conocido que funciona).
    const offset: [number, number, number] = [-center.x, -center.y, -center.z];
    // Piso = base del modelo en el espacio centrado.
    const floorY = box.min.y - center.y;
    return { offset, floorY };
  }, [scene]);

  useEffect(() => {
    onFloor(placement.floorY);
  }, [placement.floorY, onFloor]);

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(scene);
    mixerRef.current = mixer;

    const talkingClip =
      THREE.AnimationClip.findByName(animations, TALKING_ANIMATION_NAME) ??
      animations.find((animation) => animation.name.includes('001')) ??
      animations[1] ??
      animations[0];

    if (talkingClip) {
      const action = mixer.clipAction(talkingClip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.reset();
      action.play();
    }

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
      mixerRef.current = null;
    };
  }, [scene, animations]);

  useFrame((_state, delta) => {
    const clampedDelta = Math.min(delta, 1 / 30);
    mixerRef.current?.update(clampedDelta);
  });

  return (
    <group position={placement.offset}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Consultorio médico: piso, paredes y un escritorio en primer plano.
 * Construido en el mismo espacio centrado que el paciente, usando `floorY`.
 */
function ConsultingRoom({ floorY }: { floorY: number }) {
  // Escritorio en primer plano (entre la cámara y el paciente).
  const deskTopY = floorY + 0.9;
  const deskTopThickness = 0.07;
  const deskWidth = 3.2;
  const deskDepth = 0.85;
  const deskZ = 0.55;

  const wallColor = '#e9eef2';
  const wallColorAccent = '#dde6ea';
  const floorColor = '#c5ccd2';
  const deskWood = '#a87b54';
  const deskWoodDark = '#7d5a3b';

  return (
    <group>
      {/* Piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, -1]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color={floorColor} roughness={0.95} />
      </mesh>

      {/* Pared trasera */}
      <mesh position={[0, floorY + 2.4, -3.4]}>
        <planeGeometry args={[16, 6]} />
        <meshStandardMaterial color={wallColor} roughness={1} />
      </mesh>

      {/* Pared izquierda */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-4.2, floorY + 2.4, -1]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color={wallColorAccent} roughness={1} />
      </mesh>

      {/* Pared derecha */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[4.2, floorY + 2.4, -1]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color={wallColorAccent} roughness={1} />
      </mesh>

      {/* Escritorio en primer plano (POV detrás del escritorio) */}
      <group position={[0, 0, deskZ]}>
        {/* Tablero */}
        <mesh position={[0, deskTopY, 0]}>
          <boxGeometry args={[deskWidth, deskTopThickness, deskDepth]} />
          <meshStandardMaterial color={deskWood} roughness={0.55} metalness={0.05} />
        </mesh>
        {/* Panel frontal (mirando a la cámara) */}
        <mesh position={[0, (floorY + deskTopY) / 2, deskDepth * 0.42]}>
          <boxGeometry args={[deskWidth, deskTopY - floorY, deskDepth * 0.08]} />
          <meshStandardMaterial color={deskWoodDark} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ isCompact }: { isCompact?: boolean }) {
  const [floorY, setFloorY] = React.useState(-1.4);

  return (
    <>
      <PerspectiveCamera makeDefault position={CAMERA_POSITION} fov={isCompact ? CAMERA_FOV + 6 : CAMERA_FOV} />

      <color attach="background" args={['#e3e9ed']} />

      <ambientLight intensity={1.3} />
      <hemisphereLight args={['#ffffff', '#b9c2c9', 0.9]} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} />
      <directionalLight position={[-4, 4, 2]} intensity={0.5} />

      <Patient3D onFloor={setFloorY} />
      <ConsultingRoom floorY={floorY} />

      <OrbitControls
        target={LOOK_TARGET}
        enableRotate
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
    </>
  );
}

export const PatientView: React.FC<PatientViewProps> = ({ patient, isCompact }) => {
  return (
    <div className="relative w-full h-full bg-[#e3e9ed] overflow-hidden">
      <SceneErrorBoundary>
        <Suspense fallback={
          <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin mb-6" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Preparando Entorno Médico...</p>
            </div>
          </div>
        }>
          <Canvas
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false,
            }}
          >
            <Scene isCompact={isCompact} />
          </Canvas>
          <Loader />
        </Suspense>
      </SceneErrorBoundary>

      {/* Premium UI Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-white p-4 rounded-3xl flex items-center gap-4 pointer-events-auto shadow-xl shadow-slate-200/50">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center">
              <User className="text-[#00c4cc] w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5">Simulación Activa</p>
              <h2 className="text-[#003d4c] text-lg font-black tracking-tight">{patient.name}</h2>
            </div>
          </div>
        </motion.div>

        {/* Botón de Micrófono flotante - Diseño Premium */}
        <div className="flex justify-end p-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full bg-[#003d4c] text-white flex items-center justify-center shadow-2xl shadow-cyan-900/40 border-4 border-white/20 backdrop-blur-sm group pointer-events-auto transition-all"
          >
            <Mic className="w-9 h-9 group-hover:text-cyan-400 transition-colors" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
