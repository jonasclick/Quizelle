import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseInit';

function getCurrentUid(): string {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User is not logged in.');
  return uid;
}

// Increment user score (after correct answer to a question)
export async function incrementUserScore(by: number) {
  const uid = getCurrentUid();

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

// Save answered question id to user in db to track answered questions
export async function trackAnsweredQuestions(questionId: string) {
  const uid = getCurrentUid();

  const answerRef = doc(db, 'users', uid, 'answers', questionId);
  await setDoc(answerRef, {
    correct: true,
    timestamp: Date.now(),
  });
}
