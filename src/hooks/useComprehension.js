// src/hooks/useComprehension.js
import { useState, useCallback } from 'react';
import { analyzeText } from '@/lib/services/comprehensionService';
import { generateQuiz } from '@/lib/services/quizService';

export function useComprehension(originalContent) {
    const [evaluation, setEvaluation] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});

    // 이해도 평가
    const evaluateComprehension = (text) => {
        const plainContent = stripHtml(currentContent);
        return analyzeText(text, plainContent);
    };

    // 퀴즈 생성 및 평가
    const initializeQuiz = useCallback(() => {
        const questions = generateQuiz(originalContent);
        setQuiz(questions);
    }, [originalContent]);

    // 퀴즈 답변 제출
    const submitQuizAnswer = useCallback((questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));

        // 퀴즈 결과 평가
        if (quiz) {
            const question = quiz.find(q => q.id === questionId);
            const result = question.evaluator(answer, originalContent);
            return result;
        }
    }, [quiz, originalContent]);

    return {
        evaluation,
        quiz,
        answers,
        evaluateComprehension,
        initializeQuiz,
        submitQuizAnswer
    };
}
