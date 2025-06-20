import { auth } from '../services/firebaseInit';
import { signOut } from 'firebase/auth';
import { useGameSession } from '../hooks/useGameSession';
import styles from '../components/MainPage.module.css';
import logo from '../assets/logoPost.png';
import leaderboarIcon from '../assets/leaderboardIcon.png';
import accountIcon from '../assets/accountIcon.png';

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
      {/* Navigation */}
      <div className={styles.navigation}>
        <button className={styles.navigationButton}>
          <img
            src={leaderboarIcon}
            alt='Leaderbord'
            className={styles.navigationButtonIcon}
          />
          <div>
            <h5>Leaderboard</h5>
            <h4>Rang 14</h4>
          </div>
        </button>
        <button className={styles.navigationButton}>
          <img
            src={accountIcon}
            alt='Leaderbord'
            className={styles.navigationButtonIcon}
          />
          <div>
            <h5>Username</h5>
            <h4>{score} Punkte</h4>
          </div>
        </button>
      </div>
      {/* Logout Button */}
      <button onClick={() => signOut(auth)}>Logout</button>

      {/* Render Quiz */}
      {isFinished ? (
        <h3>
          🎉 Du hast alle Fragen beantwortet und {score} Punkte erzielt. 🎉
        </h3>
      ) : question ? (
        <div>
          {/* Question */}
          <h4>{question.questionText}</h4>
          {/* Answer Buttons */}
          <div className={styles.answerButtonsRow}>
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
