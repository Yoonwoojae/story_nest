// src/components/learn/modes/components/QuizSection.js
import { useState, useEffect } from 'react';

function QuizSection({ quiz = [], answers: initialAnswers = {}, onSubmit }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState({});
    // 답변 상태를 내부에서 관리
    const [localAnswers, setLocalAnswers] = useState(() => {
        // 모든 문제에 대한 초기 답변 상태 설정
        const initialState = {};
        quiz.forEach(question => {
            if (question.type === 'multiSelect') {
                initialState[question.id] = initialAnswers[question.id] || [];
            } else {
                initialState[question.id] = initialAnswers[question.id] || null;
            }
        });
        return initialState;
    });

    // quiz 데이터가 변경될 때마다 답변 초기화
    useEffect(() => {
        if (quiz && quiz.length > 0) {
            const initialState = {};
            quiz.forEach(question => {
                if (question.type === 'multiSelect') {
                    initialState[question.id] = initialAnswers[question.id] || [];
                } else {
                    initialState[question.id] = initialAnswers[question.id] || null;
                }
            });
            setLocalAnswers(initialState);
        }
    }, [quiz, initialAnswers]);

    // 데이터 로딩 체크
    if (!quiz || quiz.length === 0) {
        return (
            <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-500 text-center">퀴즈를 불러오는 중입니다...</p>
            </div>
        );
    }

    const currentQuestion = quiz[currentQuestionIndex];
    if (!currentQuestion || !currentQuestion.options) {
        return (
            <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-500 text-center">퀴즈 데이터를 불러올 수 없습니다.</p>
            </div>
        );
    }

    // 외부 answers가 변경되면 localAnswers 업데이트
    useEffect(() => {
        setLocalAnswers(prev => ({
            ...prev,
            ...initialAnswers
        }));
    }, [initialAnswers]);

    const handleMultiSelect = (option) => {
        const currentAnswers = localAnswers[currentQuestion.id];
        const newAnswers = currentAnswers.includes(option)
            ? currentAnswers.filter(a => a !== option)
            : [...currentAnswers, option];

        // 내부 상태 업데이트
        setLocalAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: newAnswers
        }));

        // 부모 컴포넌트에 변경 알림
        onSubmit(currentQuestion.id, newAnswers);
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            {/* 퀴즈 진행률 */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
            Question {currentQuestionIndex + 1} of {quiz.length}
                </span>
                <span>{Math.round((currentQuestionIndex / quiz.length) * 100)}%</span>
            </div>

            {/* 현재 문제 */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                    {currentQuestion.template}
                </h3>

                {/* 문제 유형별 UI */}
                {currentQuestion.type === 'multiSelect' ? (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600 mb-4">
                            해당되는 항목을 모두 선택하세요.
                        </p>
                        {currentQuestion.options.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                                    (localAnswers[currentQuestion.id] || []).includes(option)
                                        ? 'bg-indigo-50 ring-2 ring-indigo-500'
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={(localAnswers[currentQuestion.id] || []).includes(option)}
                                    onChange={() => handleMultiSelect(option)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="ml-3">{option}</span>
                            </label>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-4 rounded-lg cursor-pointer ${
                                    localAnswers[currentQuestion.id] === option
                                        ? 'bg-indigo-50 ring-2 ring-indigo-500'
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    checked={localAnswers[currentQuestion.id] === option}
                                    onChange={() => {
                                        setLocalAnswers((prev) => ({
                                            ...prev,
                                            [currentQuestion.id]: option,
                                        }));
                                        onSubmit(currentQuestion.id, option);
                                    }}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-3">{option}</span>
                            </label>
                        ))}
                    </div>
                )}

                {/* 결과 표시 */}
                {results[currentQuestion.id] && (
                    <div className="mt-4 bg-white p-4 rounded-lg border space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">점수</span>
                            <span
                                className={`text-sm font-medium ${
                                    results[currentQuestion.id].score >= 80
                                        ? 'text-green-600'
                                        : results[currentQuestion.id].score >= 60
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                }`}
                            >
                                {results[currentQuestion.id].score}점
                            </span>
                        </div>
                        {results[currentQuestion.id].feedback && (
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">피드백:</span>
                                <p className="mt-1">{results[currentQuestion.id].feedback}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 네비게이션 */}
            <div className="flex justify-between pt-4">
                <button
                    onClick={() =>
                        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400"
                >
            이전 문제
                </button>
                <button
                    onClick={() =>
                        setCurrentQuestionIndex((prev) =>
                            Math.min(quiz.length - 1, prev + 1),
                        )
                    }
                    disabled={currentQuestionIndex === quiz.length - 1}
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
                >
            다음 문제
                </button>
            </div>
        </div>
    );
}

export default QuizSection;
