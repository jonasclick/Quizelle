import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../services/firebaseInit';
import { createUserDocument } from '../services/userService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Login existing user (using Auth)
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  };

  // Registration: Create new user in Auth and in DB
  const register = async () => {
    try {
      // in Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCred.user.uid;

      // in DB
      await createUserDocument(uid, email, username);

      alert('Account created!');
    } catch (error: any) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        type='password'
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Choose a Username.'
      />
      <button onClick={login}>Log In</button>
      <button onClick={register}>Register</button>
    </div>
  );
}
