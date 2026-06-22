import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode disabled temporarily while diagnosing WebGL context loss with a heavy GLB.
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
