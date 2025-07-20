import { auth } from '../../services/firebaseInit';
import { signOut } from 'firebase/auth';
import { useGameSession } from '../../hooks/useGameSession';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import leaderboarIcon from '../../assets/leaderboardIcon.png';
import accountIcon from '../../assets/accountIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import Header from '../../components/Header/Header.tsx';

export default function MainPage() {
  const {
    question,
    userInfo,
    // score,
    // username,
    selectedIndex,
    isCorrect,
    answerQuestion,
    isFinished,
  } = useGameSession();

  return (
    <div>
      {/* Header */}
      <Header />
      {/* Navigation */}
      <div className={styles.navigation}>
        <Link
          to='/leaderboard'
          className={styles.navigationButton}
          title='Rangliste anzeigen'
        >
          <img
            src={leaderboarIcon}
            alt='Leaderbord'
            className={styles.navigationButtonIcon}
          />
          <div>
            <h5>Leaderboard</h5>
            <h4>Rang {userInfo?.rank}</h4>
          </div>
        </Link>
        <button className={styles.navigationButton} title='Dein Punktestand'>
          <img
            src={accountIcon}
            alt='Account'
            className={styles.navigationButtonIcon}
          />
          <div>
            <h5>{userInfo?.username}</h5>
            <h4>
              {userInfo?.score} {userInfo?.score === 1 ? 'Punkt' : 'Punkte'}
            </h4>
          </div>
        </button>
      </div>

      {/* Render Quiz */}
      {isFinished ? (
        <h3>
          🎉 Du hast alle Fragen beantwortet und {userInfo?.score} Punkte
          erzielt. 🎉
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

      {/* Logout Button */}
      <img
        src={logoutIcon}
        alt='Logout'
        className={styles.logoutButton}
        onClick={() => signOut(auth)}
        title='Abmelden'
      />
    </div>
  );
}
