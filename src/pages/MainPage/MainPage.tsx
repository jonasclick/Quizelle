import { auth } from '../../services/firebaseInit';
import { signOut } from 'firebase/auth';
import { useGameSession } from '../../hooks/useGameSession';
import { Link } from 'react-router-dom';
import { Trophy, LogOut, UserRound } from 'lucide-react';
import Header from '../../components/Header/Header.tsx';

export default function MainPage() {
  const {
    question,
    userInfo,
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
      <div className='flex justify-end px-4 mt-6'>
        <ul className='menu menu-horizontal bg-base-200 rounded-box'>
          <li>
            <Link to='/leaderboard' title='Rangliste anzeigen'>
              <Trophy className='w-5 h-5' />
              {userInfo?.score} {userInfo?.score === 1 ? 'Punkt' : 'Punkte'}
            </Link>
          </li>
          <li>
            <Link to='/leaderboard' title='Account Einstellungen'>
              <UserRound className='w-5 h-5' />
              <h5>{userInfo?.username}</h5>
            </Link>
          </li>
          <li>
            <a onClick={() => signOut(auth)} title='Abmelden'>
              <LogOut className='w-5 h-5' />
            </a>
          </li>
        </ul>
      </div>

      {/* Quiz */}
      {isFinished ? (
        <h3>
          🎉 Du hast alle Fragen beantwortet und {userInfo?.score} Punkte
          erzielt. 🎉
        </h3>
      ) : question ? (
        <div>
          {/* Question */}
          <div className='flex justify-center mt-20'>
            <div className='card bg-base-300 shadow-2xl'>
              <div className='card-body'>
                {/* Question Text */}
                <p className='text-lg font-semibold text-center mb-6'>
                  {question.questionText}
                </p>
                {/* Answer Buttons */}
                <div className='card-actions flex gap-4 items-center justify-center'>
                  {question.answers.map((answer, idx) => (
                    <button
                      key={idx}
                      className='btn btn-primary'
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
            </div>
          </div>
        </div>
      ) : (
        <p className='flex justify-center'>Loading question...</p>
      )}
    </div>
  );
}
