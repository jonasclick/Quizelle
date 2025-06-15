import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './services/firebase';
import type { Question } from './model/question.ts';
import './App.css';

function App() {
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const docs = querySnapshot.docs.map((doc) => doc.data() as Question);
      if (docs.length > 0) {
        setQuestion(docs[0]); // Get the first question
      }
    };

    fetchQuestion();
  }, []);

  return (
    <div>
      <h3>{question ? question.questionText : 'Loading...'}</h3>
      <ul>
        {question?.answers.map((answer, index) => (
          <li key={index}>
            <button>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
