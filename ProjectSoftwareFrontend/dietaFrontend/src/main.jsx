import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css';
import AppRouter from './routes/AppRouter.jsx';
import { AuthProvider } from './shared/context/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

