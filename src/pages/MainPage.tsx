import { auth } from '../services/firebaseInit';
import { signOut } from 'firebase/auth';
import { useGameSession } from '../hooks/useGameSession';
import styles from '../components/MainPage.module.css';
import logo from '../assets/logoPost.png';

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
      {/* Header */}
      <div className={styles.header}>
        <img src={logo} alt='Logo' style={{ height: '88px' }} />
        <h3>PostGuessr</h3>
      </div>
      {/* Logout Button */}
      <button onClick={() => signOut(auth)}>Logout</button>
      {/* Score */}
      <p>Score: {score}</p>

      {/* Render Quiz */}
      {isFinished ? (
        <p>🎉 You've answered all questions! Final score: {score}</p>
      ) : question ? (
        <div>
          {/* Question */}
          <h4>{question.questionText}</h4>
          {/* Answer Buttons */}
          <div className={styles.answerRow}>
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                className={styles.answerButton}
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
            ))}
          </div>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}
