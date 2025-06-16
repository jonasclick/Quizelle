import { useEffect, useState } from 'react';
import { auth } from '../services/firebaseInit';
import { signOut } from 'firebase/auth';
import type { Question } from '../model/question';
import { fetchFirstQuestion } from '../services/questionService';
import { incrementUserScore } from '../services/userService';

export default function MainPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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
      {/* Logout Button */}
      <button onClick={() => signOut(auth)}>Logout</button>
      {question ? (
        <div style={{ marginTop: '2rem' }}>
          {/* Question */}
          <h3>{question.questionText}</h3>
          {/* Answer Buttons */}
          <ul>
            {question.answers.map((answer, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setSelectedIndex(idx);
                    if (question.correctIndex === idx) {
                      setIsCorrect(true);
                      incrementUserScore(1); // TODO: based on difficulty later
                    } else {
                      setIsCorrect(false);
                    }
                  }}
                  disabled={selectedIndex !== null} // disable after answering
                  // TODO: Move styles out?
                  style={{
                    backgroundColor:
                      selectedIndex === idx
                        ? isCorrect
                          ? 'lightgreen'
                          : 'salmon'
                        : undefined,
                  }}
                >
                  {answer}
                </button>
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
