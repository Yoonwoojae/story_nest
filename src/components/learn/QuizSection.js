// src/components/learn/QuizSection.js
import { useState, useEffect } from 'react';

export default function QuizSection({ questions, onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
        if (!timeLeft) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // API 호출하여 답안 제출 및 채점
            const response = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
            });

            if (response.ok) {
                const result = await response.json();
                setScore(result.score);
                setShowResult(true);
                if (result.score >= 70) { // 70점 이상이면 완료 처리
                    onComplete();
                }
            }
        } catch (error) {
            console.error('Failed to submit quiz:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!questions?.length) {
        return null;
    }

    if (showResult) {
        return (
            <div className="bg-white rounded-lg p-6 space-y-6">
                <h3 className="text-xl font-semibold text-center">퀴즈 결과</h3>
                <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-indigo-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">{score}점</span>
                    </div>
                </div>
                <div className="text-center">
                    {score >= 70 ? (
                        <p className="text-green-600">축하합니다! 학습 목표를 달성했습니다.</p>
                    ) : (
                        <p className="text-red-600">아쉽네요. 다시 한번 도전해보세요.</p>
                    )}
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => {
                            setShowResult(false);
                            setAnswers({});
                            setCurrentQuestionIndex(0);
                        }}
                        className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
                    >
                        다시 풀기
                    </button>
                    {score < 70 && (
                        <button
                            onClick={onComplete}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            다음으로 넘어가기
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="bg-white rounded-lg p-6 space-y-6">
            {/* 퀴즈 헤더 */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                    학습 확인 문제 ({currentQuestionIndex + 1}/{questions.length})
                </h3>
                {timeLeft && (
                    <div className="text-sm font-medium">
                        남은 시간
                        <span className={`ml-2 ${
                            timeLeft < 30 ? 'text-red-600' : 'text-gray-700'
                        }`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                )}
            </div>

            {/* 진행 상태 바 */}
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
            </div>

            {/* 현재 문제 */}
            <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-lg font-medium text-gray-900 mb-4">
                        {currentQuestion.text}
                    </p>
                    {currentQuestion.image && (
                        <img
                            src={currentQuestion.image}
                            alt="Question illustration"
                            className="mb-4 rounded-lg max-w-full h-auto"
                        />
                    )}
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                                    answers[currentQuestion.id] === option
                                        ? 'bg-indigo-50 ring-2 ring-indigo-600'
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    value={option}
                                    checked={answers[currentQuestion.id] === option}
                                    onChange={() => handleAnswer(currentQuestion.id, option)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="ml-3 text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 힌트 섹션 */}
                {currentQuestion.hint && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-2 text-sm text-yellow-700">
                                힌트: {currentQuestion.hint}
                            </p>
                        </div>
                    </div>
                )}

                {/* 네비게이션 버튼 */}
                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className={`px-4 py-2 rounded-lg text-sm ${
                            currentQuestionIndex === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        이전 문제
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || Object.keys(answers).length !== questions.length}
                            className={`px-6 py-2 rounded-lg text-sm ${
                                isSubmitting || Object.keys(answers).length !== questions.length
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            {isSubmitting ? '제출 중...' : '퀴즈 제출하기'}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={!answers[currentQuestion.id]}
                            className={`px-4 py-2 rounded-lg text-sm ${
                                answers[currentQuestion.id]
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            다음 문제
                        </button>
                    )}
                </div>
            </div>

            {/* 진행 상황 표시 */}
            <div className="flex justify-center space-x-2 pt-4">
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                            index === currentQuestionIndex
                                ? 'bg-indigo-600'
                                : answers[questions[index].id]
                                    ? 'bg-green-500'
                                    : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
