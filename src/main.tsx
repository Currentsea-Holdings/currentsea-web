import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from '@/context/AuthContext';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  );
}
