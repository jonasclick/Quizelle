import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  limit,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from './firebaseInit';

function getUserId(): string {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User is not logged in.');
  return uid;
}

// Check if username is available
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const ref = doc(db, 'usernames', username);
  const snapshot = await getDoc(ref);
  return !snapshot.exists();
}

// Account Creation (Signup)
// DB: Reserve username in "usernames" and create user doc in "users"
export async function createUserInDatabase(uid: string, username: string) {
  // Reserve username in "usernames"
  await setDoc(doc(db, 'usernames', username), { taken: true });

  // Create user doc in "users"
  await setDoc(doc(db, 'users', uid), {
    username,
    score: 0,
  });
}

// Fetch user info: username, score, rank from DB
export async function fetchUserInfo() {
  const uid = getUserId();

  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('score', 'desc'));

  const snapshot = await getDocs(q);
  let rank = 0;

  for (const doc of snapshot.docs) {
    rank++;
    if (doc.id === uid) {
      const data = doc.data();
      return {
        username: data.username,
        score: data.score,
        rank,
      };
    }
  }

  throw new Error('User not found in leaderboard');
}

// Increment user score (after correct answer to a question)
export async function pushUserScore(by: number) {
  const uid = getUserId();

  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    await updateDoc(userRef, {
      score: (userSnap.data().score || 0) + by,
    });
  } else {
    await setDoc(userRef, { score: by });
  }
}

// Save answered question in DB
export async function trackAnsweredQuestions(
  questionId: string,
  isCorrect: boolean
) {
  const uid = getUserId();

  const answerRef = doc(db, 'users', uid, 'answers', questionId);
  await setDoc(answerRef, {
    correct: isCorrect,
    timestamp: Date.now(),
  });
}

// Fetch leaderboarddata from the DB
export async function fetchLeaderboardUsers(limitCount: number = 10) {
  const q = query(
    collection(db, 'users'),
    orderBy('score', 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as { id: string; username: string; score: number }[];
}
