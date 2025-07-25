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
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import { Mail, KeyRound, UserRound } from 'lucide-react';

export default function RegisterPage() {
  const [Email, setRegisterEmail] = useState('');
  const [Password, setRegisterPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  // Login an existing user (using Auth)
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, Email, Password);
      navigate('/');
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  };

  // Registration: Create new user in Auth and in DB and log in automatically
  const register = async () => {
    try {
      // 1. Check if username is available
      const available = await isUsernameAvailable(username);
      if (!available) {
        alert(
          'Dieser Nutzername ist bereits vergeben. Bitte wähle einen anderen.'
        );
        return;
      }

      // 2. Create new user in Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      const uid = userCred.user.uid;

      // 3. Create new user in DB
      await createUserDocument(uid, Email, username);

      //   alert('Account erstellt.');

      // 4. Login the user
      login();
    } catch (error: any) {
      alert('Fehler bei der Registrierung: ' + error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Register Card */}
      <div className='flex flex-col items-center'>
        <div className='card w-80'>
          {/* Welcome Message */}
          <p className='font-semibold mt-40'>Willkommen bei Quizelle</p>
          <p className='text-sm font-light mt-1 mb-8'>
            Erstelle deinen Account
          </p>

          {/* === Register Section === */}
          {/* E-Mail Field */}
          <div className='mb-4'>
            <label className='input validator'>
              <Mail className='w-4.5 h-4.5 opacity-50' />
              <input
                value={Email}
                onChange={(e) => setRegisterEmail(e.target.value)}
                type='email'
                placeholder='E-Mail'
                required
              />
            </label>
            <div className='validator-hint hidden'>
              Enter valid email address
            </div>
          </div>

          {/* Password Field */}
          <div className='mb-4'>
            <label className='input validator'>
              <KeyRound className='w-4.5 h-4.5 opacity-50' />
              <input
                value={Password}
                onChange={(e) => setRegisterPassword(e.target.value)}
                type='password'
                required
                placeholder='Password'
                minLength={8}
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
              />
            </label>
            <p className='validator-hint hidden'>
              Must be more than 8 characters, including
              <br />
              - at least one number <br />
              - at least one lowercase letter <br />- at least one uppercase
              letter
            </p>
          </div>

          <label className='input validator'>
            <UserRound className='w-4.5 h-4.5 opacity-50' />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              required
              placeholder='Wähle einen Nutzernamen'
              pattern='[A-Za-z][A-Za-z0-9\-]*'
              minLength={3}
              maxLength={30}
              title='Only letters, numbers or dash'
            />
          </label>
          <p className='validator-hint'>
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>

          {/* Login Button */}
          <button onClick={register} className='btn btn-active btn-primary'>
            Registrieren
          </button>
          <p className='text-sm font-light mt-3'>
            Du hast bereits einen Account?{' '}
            <Link to='/' className='link link-primary'>
              Zurück zum Login
            </Link>
          </p>
          <div className='mb-80'></div>
        </div>
      </div>
    </div>
  );
}
