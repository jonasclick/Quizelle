import { useEffect, useState } from 'react';
import { fetchRandomUnansweredQuestion } from '../services/questionService';
import {
  trackAnsweredQuestions,
  fetchUserScore,
  fetchUsername,
  pushUserScore,
} from '../services/userService';
import type { Question } from '../model/question';

export function useGameSession() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false); // if no questions left

  useEffect(() => {
    fetchScore();
    fetchName();
    fetchNextQuestion();
  }, []);

  async function fetchScore() {
    const s = await fetchUserScore();
    setScore(s);
  }

  async function fetchName() {
    const n = await fetchUsername();
    setUsername(n);
  }

  async function fetchNextQuestion() {
    const q = await fetchRandomUnansweredQuestion();
    if (!q) {
      setIsFinished(true);
      return;
    }
    setQuestion(q);
    setSelectedIndex(null);
    setIsCorrect(null);
  }

  // Handle answering a question
  async function answerQuestion(idx: number) {
    if (!question) return;

    // Determine wheter answer is correct
    const correct = question.correctIndex === idx;
    setSelectedIndex(idx);
    setIsCorrect(correct);

    // Track answered question id in user in DB.
    try {
      if (question.id) {
        await trackAnsweredQuestions(question.id, correct);
      } else {
        console.warn('Cannot track answer: question.id is undefined');
      }
    } catch (error) {
      console.error(
        'Failed to track answered question in DB:',
        (error as Error).message
      );
    }

    // Update score
    if (correct) {
      setScore((prev) => prev + 1); // update score locally
      pushUserScore(1); // update score in DB
    }

    // Delay before displaying the next question
    setTimeout(fetchNextQuestion, 1500);
  }

  return {
    question,
    score,
    username,
    selectedIndex,
    isCorrect,
    answerQuestion,
    isFinished,
  };
}
