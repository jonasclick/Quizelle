import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../services/firebaseInit';
import {
  createUserDocument,
  isUsernameAvailable,
} from '../../services/userService';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  // Login existing user (using Auth)
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/');
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  };

  // Registration: Create new user in Auth and in DB
  const register = async () => {
    try {
      // 1. Check if username is available
      const available = await isUsernameAvailable(username);
      if (!available) {
        alert('Username already taken. Please choose another one.');
        return;
      }

      // 2. Create new user in Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const uid = userCred.user.uid;

      // 3. Create new user in DB
      await createUserDocument(uid, registerEmail, username);

      alert('Account created!');
    } catch (error: any) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <Header />
      {/* Login or register */}
      <div className={styles.loginArea}>
        {/* Login */}
        <input
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder='Email'
          className={styles.entryField}
        />
        <input
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder='Passwort'
          type='password'
          className={styles.entryField}
        />

        <button onClick={login} className={styles.loginButton}>
          Einloggen
        </button>

        {/* Register */}
        <input
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          placeholder='Email'
          className={styles.entryField}
        />
        <input
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          placeholder='Passwort'
          type='password'
          className={styles.entryField}
        />

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Wähle einen Benutzernamen'
          className={styles.entryField}
        />

        <button onClick={register} className={styles.registerButton}>
          Registrieren
        </button>
      </div>
    </div>
  );
}
