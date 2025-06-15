import { useEffect } from 'react';
import { fetchFirstQuestion } from '../services/questionService';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function MainPage() {
  useEffect(() => {
    const load = async () => {
      const q = await fetchFirstQuestion();
      console.log(q);
    };
    load();
  }, []);

  return (
    <div>
      <h2>Hi, there.</h2>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}
