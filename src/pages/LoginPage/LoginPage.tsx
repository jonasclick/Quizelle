import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseInit';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import { Mail, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [Email, setLoginEmail] = useState('');
  const [Password, setLoginPassword] = useState('');
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
                onChange={(e) => setLoginEmail(e.target.value)}
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
                onChange={(e) => setLoginPassword(e.target.value)}
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
