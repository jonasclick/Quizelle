import { auth } from '../services/firebaseInit';
import { signOut } from 'firebase/auth';
import { useGameSession } from '../hooks/useGameSession';

export default function MainPage() {
  const {
    question,
    score,
    selectedIndex,
    isCorrect,
    answerQuestion,
    isFinished,
  } = useGameSession();

  return (
    <div>
      <h2>Hi, there.</h2>

      {/* Logout Button */}
      <button onClick={() => signOut(auth)}>Logout</button>
      {/* Score */}
      <p>Score: {score}</p>

      {/* Render Question Logic */}
      {isFinished ? (
        <p>🎉 You've answered all questions! Final score: {score}</p>
      ) : question ? (
        <div style={{ marginTop: '2rem' }}>
          {/* Question */}
          <h3>{question.questionText}</h3>
          {/* Answer Buttons */}
          <ul>
            {question.answers.map((answer, idx) => (
              <li key={idx}>
                <button
                  onClick={() => answerQuestion(idx)}
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
