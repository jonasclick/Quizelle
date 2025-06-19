import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseInit';

function getUserId(): string {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User is not logged in.');
  return uid;
}

// Add new user to DB (right after AuthAccount creation)
export async function createUserDocument(
  uid: string,
  email: string,
  username: string
) {
  await setDoc(doc(db, 'users', uid), {
    email,
    username,
    score: 0,
  });
}

// Fetch user score from db
export async function fetchUserScore() {
  const uid = getUserId();

  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  const userData = snap.data();
  if (userData?.score == undefined) {
    console.error('Cannot find user score in db data.');
    return 0;
  }
  return userData.score;
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

export async function trackAnsweredQuestions(questionId: string) {
  const uid = getUserId();

  const answerRef = doc(db, 'users', uid, 'answers', questionId);
  await setDoc(answerRef, {
    correct: true,
    timestamp: Date.now(),
  });
}
