import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseInit';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import { Mail, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  // Login existing user (using Auth)
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, Email, Password);
      navigate('/');
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <Header />

      <div className='flex flex-col items-center'>
        <div className='card w-80'>
          {/* Welcome Message */}
          <p className='font-semibold mt-40 mb-6'>
            Willkommen zurück bei Quizelle
          </p>

          {/* Login */}
          {/* E-Mail Field */}
          <div className='mb-4'>
            <label className='input validator'>
              <Mail className='w-4.5 h-4.5 opacity-50' />
              <input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='E-Mail'
                required
              />
            </label>
            <div className='validator-hint hidden'>
              Gebe eine gültige E-Mailadresse ein.
            </div>
          </div>

          {/* Password Field */}
          <div className='mb-4'>
            <label className='input validator'>
              <KeyRound className='w-4.5 h-4.5 opacity-50' />
              <input
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                required
                placeholder='Passwort'
                minLength={8}
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                title='Passwort'
              />
            </label>
            <p className='validator-hint hidden'>
              Muss mind. 8 Zeichen enthalten, darunter:
              <br />
              - mind. eine Zahl <br />
              - mind. einen Kleinbuchstaben <br />- mind. einen Großbuchstaben
            </p>
          </div>

          {/* Login Button */}
          <button onClick={login} className='btn btn-active btn-primary'>
            Login
          </button>
          <p className='text-sm font-light mt-3'>
            Noch kein Account?{' '}
            <Link to='/register' className='link link-primary'>
              Registrieren
            </Link>
          </p>
          <div className='mb-80'></div>
        </div>
      </div>
    </div>
  );
}
