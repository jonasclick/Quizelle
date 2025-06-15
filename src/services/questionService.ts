import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { Question } from '../model/question';

export async function fetchFirstQuestion(): Promise<Question | null> {
  const snapshot = await getDocs(collection(db, 'questions'));
  const docs = snapshot.docs.map((doc) => doc.data() as Question);
  return docs.length > 0 ? docs[0] : null;
}
