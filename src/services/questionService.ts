import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseInit';
import type { Question } from '../model/question';

// Fetch a question from the db
// TODO: Random qusetion and evaluate if user has answered already
export async function fetchFirstQuestion(): Promise<Question | null> {
  const snapshot = await getDocs(collection(db, 'questions'));
  const docs = snapshot.docs.map((doc) => doc.data() as Question);
  return docs.length > 0 ? docs[0] : null;
}
