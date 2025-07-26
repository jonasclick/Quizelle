import styles from './LeaderboardPage.module.css';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchLeaderboardUsers } from '../../services/userService';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<{ username: string; score: number }[]>([]);

  useEffect(() => {
    fetchLeaderboardUsers().then(setUsers);
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className='flex-grow'>
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
        <p className='flex justify-center text-3xl font-semibold'>
          Leaderboard
        </p>
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
              <h4 className={styles.score}>
                {user.score} {user.score === 1 ? 'Punkt' : 'Punkte'}
              </h4>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
