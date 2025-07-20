import { useEffect, useState } from 'react';
import { fetchRandomUnansweredQuestion } from '../services/questionService';
import {
  trackAnsweredQuestions,
  fetchUserInfo,
  pushUserScore,
} from '../services/userService';
import type { Question } from '../model/question';

export function useGameSession() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    score: number;
    rank: number;
  } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false); // if no questions left

  useEffect(() => {
    fetchInfo();
    fetchNextQuestion();
  }, []);

  async function fetchInfo() {
    const i = await fetchUserInfo();
    setUserInfo(i);
  }

  // Load random question to present to the user
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
      // update score locally
      setUserInfo((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          score: prev.score + 1,
        };
      });
      pushUserScore(1); // update score in DB
    }

    // Delay before displaying the next question
    setTimeout(fetchNextQuestion, 1500);
  }

  return {
    question,
    userInfo,
    selectedIndex,
    isCorrect,
    answerQuestion,
    isFinished,
  };
}
