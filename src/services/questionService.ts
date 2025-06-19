import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './firebaseInit';
import type { Question } from '../model/question';

// Fetch a random question from the db, that the user hasn't answered yet.
export async function fetchRandomUnansweredQuestion(): Promise<Question | null> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  // Step 1: Get answered question IDs
  const answersSnapshot = await getDocs(
    collection(db, 'users', uid, 'answers')
  );
  const answeredIds = new Set(answersSnapshot.docs.map((doc) => doc.id));

  // Step 2: Get all questions
  const questionsSnapshot = await getDocs(collection(db, 'questions'));
  const unanswered = questionsSnapshot.docs
    .filter((doc) => !answeredIds.has(doc.id))
    .map((doc) => ({ id: doc.id, ...doc.data() } as Question));

  // Step 3: Pick random
  if (unanswered.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * unanswered.length);
  return unanswered[randomIndex];
}
