import styles from './LeaderboardPage.module.css';
import { Link } from 'react-router-dom';
import leaderboarIcon from '../../assets/leaderboardIcon.png';
import { useEffect, useState } from 'react';
import { fetchLeaderboardUsers } from '../../services/userService';
import Header from '../../components/Header/Header.tsx';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<{ username: string; score: number }[]>([]);

  useEffect(() => {
    fetchLeaderboardUsers().then(setUsers);
  }, []);

  return (
    <div>
      {/* Header */}
      <Header />
      {/* Navigation */}
      <div className={styles.navigation}>
        <Link
          to='/'
          className={styles.navigationButton}
          title='Zurück zum Quiz'
        >
          <img
            src={leaderboarIcon}
            alt='Leaderbord'
            className={styles.navigationButtonIcon}
          />
          <div>
            <h5>Zurück</h5>
            <h4>zum Quiz</h4>
          </div>
        </Link>
      </div>
      <h2>Leaderboard</h2>
      <ul className={styles.leaderboardList}>
        {users.map((user, index) => (
          <li
            key={user.username}
            className={`${styles.leaderboardItem} ${
              index === 0 ? styles.topRank : ''
            }`}
          >
            <h4 className={styles.rank}>{index + 1}</h4>
            <h4 className={styles.name}>{user.username}</h4>
            <h4 className={styles.score}>{user.score} Punkte</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}
