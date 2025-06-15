import { useEffect, useState } from 'react';
import { fetchFirstQuestion } from '../services/questionService';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import type { Question } from '../model/question';

export default function MainPage() {
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const load = async () => {
      const q = await fetchFirstQuestion();
      setQuestion(q);
    };
    load();
  }, []);

  return (
    <div>
      <h2>Hi, there.</h2>
      <button onClick={() => signOut(auth)}>Logout</button>

      {question ? (
        <div style={{ marginTop: '2rem' }}>
          <h3>{question.questionText}</h3>
          <ul>
            {question.answers.map((answer, idx) => (
              <li key={idx}>
                <button>{answer}</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}
