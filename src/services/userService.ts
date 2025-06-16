import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseInit';

// Increment user score (after correct answer to a question)
export async function incrementUserScore(by: number) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Cannot update score, user is not logged in.');

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
