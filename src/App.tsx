import { useAuth } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';

import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path='/' element={user ? <MainPage /> : <LoginPage />} />
      <Route
        path='/leaderboard'
        element={user ? <LeaderboardPage /> : <LoginPage />}
      />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
