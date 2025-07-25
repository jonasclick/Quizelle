import styles from './LeaderboardPage.module.css';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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

      <div className='flex justify-end px-4 mt-6'>
        <ul className='menu menu-horizontal bg-base-200 rounded-box'>
          <li>
            <Link to='/' title='Zurück zum Quiz'>
              <ChevronRight className='w-5 h-5' />
            </Link>
          </li>
        </ul>
      </div>
      <p className='flex justify-center text-3xl font-semibold'>Leaderboard</p>
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
