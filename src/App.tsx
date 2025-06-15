import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage.tsx';
import MainPage from './pages/MainPage.tsx';

import './App.css';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return <MainPage />;
}

export default App;
