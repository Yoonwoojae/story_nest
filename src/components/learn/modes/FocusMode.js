// src/components/learn/modes/FocusMode.js
import { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    HelpCircle,
    BookOpen,
    Brain,
    MessageSquare
} from 'lucide-react';
import { useComprehension } from '@/hooks/useComprehension';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function FocusMode({
    content,
    fontSize,
    isCompleted,
    onComplete,
    onProgressUpdate,
    bookId
}) {
    // 단락별로 분리
    const paragraphs = content
        .split('</p>')
        .filter(p => p.trim())
        .map(p => p + '</p>');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [comprehension, setComprehension] = useState({});
    const [showSummary, setShowSummary] = useState(false);
    const contentRef = useRef(null);
    const [comprehensionResults, setComprehensionResults] = useState({});
    const [showCheck, setShowCheck] = useState(false);
    const currentContent = paragraphs[currentIndex];

    // 진행 상태 저장
    const [savedProgress] = useLocalStorage(`focus-progress-${bookId}`, {
        currentIndex: 0,
        comprehension: {},
        lastRead: new Date().toISOString()
    });

    // 이전에 읽던 위치로 복원
    useEffect(() => {
        if (savedProgress.currentIndex > 0) {
            setCurrentIndex(savedProgress.currentIndex);
            setComprehension(savedProgress.comprehension);
        }
    }, []);

    // 진행률 업데이트
    useEffect(() => {
        const progress = (currentIndex / paragraphs.length) * 100;
        onProgressUpdate?.(progress);
    }, [currentIndex, paragraphs.length]);

    const handleNext = () => {
        if (currentIndex < paragraphs.length - 1) {
            setCurrentIndex(prev => prev + 1);
            contentRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setShowSummary(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            contentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (showSummary) {
        return (
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">학습 요약</h2>
                <div className="space-y-4">
                    {Object.entries(comprehension).map(([index, note]) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-2">단락 {Number(index) + 1}</div>
                            <div className="text-gray-700">{note}</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setShowSummary(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                        다시 읽기
                    </button>
                    <button
                        onClick={() => onComplete(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        학습 완료
                    </button>
                </div>
            </div>
        );
    }

    // 이해도 상태에 따른 UI 컴포넌트
    const ComprehensionStatus = ({ status }) => {
        switch (status) {
        case 'good':
            return (
                <div className="flex items-center text-green-600">
                    <CheckCircle className="mr-2" size={16} />
                    <span>잘 이해하셨네요!</span>
                </div>
            );
        case 'needs_improvement':
            return (
                <div className="flex items-center text-yellow-600">
                    <AlertCircle className="mr-2" size={16} />
                    <span>조금 더 자세히 설명해보세요.</span>
                </div>
            );
        case 'insufficient':
            return (
                <div className="flex items-center text-red-600">
                    <HelpCircle className="mr-2" size={16} />
                    <span>핵심 내용을 포함해 더 작성해주세요.</span>
                </div>
            );
        default:
            return null;
        }
    };

    // 이해도 평가 훅 사용
    const {
        evaluation,
        quiz,
        answers,
        evaluateComprehension,
        initializeQuiz,
        submitQuizAnswer
    } = useComprehension(currentContent);

    const [mode, setMode] = useState('read'); // 'read', 'comprehension', 'quiz'

    // 단락 변경시 퀴즈 초기화
    useEffect(() => {
        if (mode === 'quiz') {
            initializeQuiz();
        }
    }, [currentIndex, mode]);

    return (
        <div ref={contentRef} className="space-y-8">
            {/* 모드 선택 탭 */}
            <div className="flex space-x-2 border-b">
                <button
                    onClick={() => setMode('read')}
                    className={`flex items-center space-x-2 px-4 py-2 ${
                        mode === 'read'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-600'
                    }`}
                >
                    <BookOpen size={18} />
                    <span>읽기</span>
                </button>
                <button
                    onClick={() => setMode('comprehension')}
                    className={`flex items-center space-x-2 px-4 py-2 ${
                        mode === 'comprehension'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-600'
                    }`}
                >
                    <Brain size={18} />
                    <span>이해도 체크</span>
                </button>
                <button
                    onClick={() => setMode('quiz')}
                    className={`flex items-center space-x-2 px-4 py-2 ${
                        mode === 'quiz'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-600'
                    }`}
                >
                    <MessageSquare size={18} />
                    <span>퀴즈</span>
                </button>
            </div>

            {/* 본문 영역 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div
                    style={{ fontSize: `${fontSize}pt` }}
                    className="prose max-w-none text-gray-900"
                    dangerouslySetInnerHTML={{ __html: currentContent }}
                />
            </div>

            {/* 모드별 콘텐츠 */}
            {mode === 'comprehension' && (
                <ComprehensionSection
                    evaluation={evaluation}
                    onSubmit={evaluateComprehension}
                    comprehension={comprehension}
                    setComprehension={setComprehension}
                    currentIndex={currentIndex}
                />
            )}

            {mode === 'quiz' && quiz && (
                <QuizSection
                    quiz={quiz}
                    answers={answers}
                    onSubmit={submitQuizAnswer}
                />
            )}

            {/* 네비게이션 */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        currentIndex === 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <ChevronLeft size={20} />
                    <span>이전</span>
                </button>

                <div className="text-sm text-gray-500">
                    {currentIndex + 1} / {paragraphs.length} 단락
                </div>

                <button
                    onClick={handleNext}
                    disabled={mode === 'comprehension' && !comprehension[currentIndex]?.trim()}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        comprehension[currentIndex]?.trim()
                            ? 'text-indigo-600 hover:text-indigo-800'
                            : 'text-gray-400 cursor-not-allowed'
                    }`}
                >
                    <span>다음</span>
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* 진행률 */}
            <div className="pt-4 pb-8 border-t">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>학습 진행률</span>
                    <span>{Math.round((currentIndex / paragraphs.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${(currentIndex / paragraphs.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

// 이해도 체크 섹션 컴포넌트
function ComprehensionSection({
    evaluation,
    onSubmit,
    comprehension,
    setComprehension,
    currentIndex
}) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">이해도 체크</h3>

            <div className="space-y-4">
                <textarea
                    value={comprehension[currentIndex] || ''}
                    onChange={(e) => {
                        const text = e.target.value;
                        setComprehension(prev => ({
                            ...prev,
                            [currentIndex]: text
                        }));
                        onSubmit(text);
                    }}
                    placeholder="이 단락의 내용을 자신의 말로 설명해보세요..."
                    className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
                />

                {evaluation && (
                    <div className="bg-white p-4 rounded-lg border space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">평가 결과</span>
                            <span className="text-sm font-medium text-indigo-600">
                                {evaluation.score}점
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">키워드 매칭:</span> {evaluation.keywordScore}점
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">문장 구조:</span> {evaluation.structureScore}점
                            </div>
                        </div>

                        {evaluation.missingKeywords.length > 0 && (
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">누락된 키워드:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {evaluation.missingKeywords.map((keyword, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {evaluation.suggestions.length > 0 && (
                            <div className="mt-3 space-y-2">
                                <span className="text-sm font-medium text-gray-700">개선 제안</span>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {evaluation.suggestions.map((suggestion, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// QuizSection 컴포넌트 계속
function QuizSection({ quiz, answers, onSubmit }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState({});

    const currentQuestion = quiz[currentQuestionIndex];

    const handleSubmit = (answer) => {
        const result = onSubmit(currentQuestion.id, answer);
        setResults(prev => ({
            ...prev,
            [currentQuestion.id]: result
        }));
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            {/* 퀴즈 진행률 */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Question {currentQuestionIndex + 1} of {quiz.length}</span>
                <span>{Math.round((currentQuestionIndex / quiz.length) * 100)}%</span>
            </div>

            {/* 현재 문제 */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                    {currentQuestion.template}
                </h3>

                {/* 문제 유형별 UI */}
                {currentQuestion.type === 'text' ? (
                    // 주관식 답변
                    <div className="space-y-4">
                        <textarea
                            value={answers[currentQuestion.id] || ''}
                            onChange={(e) => handleSubmit(e.target.value)}
                            placeholder="답변을 입력하세요..."
                            className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {results[currentQuestion.id] && (
                            <FeedbackCard result={results[currentQuestion.id]} />
                        )}
                    </div>
                ) : (
                    // 객관식 답변
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                                    answers[currentQuestion.id] === option
                                        ? 'bg-indigo-50 ring-2 ring-indigo-500'
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type={currentQuestion.type === 'multiSelect' ? 'checkbox' : 'radio'}
                                    name={`question-${currentQuestion.id}`}
                                    checked={
                                        currentQuestion.type === 'multiSelect'
                                            ? answers[currentQuestion.id]?.includes(option)
                                            : answers[currentQuestion.id] === option
                                    }
                                    onChange={() => handleSubmit(option)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-3">{option}</span>
                            </label>
                        ))}
                        {results[currentQuestion.id] && (
                            <FeedbackCard result={results[currentQuestion.id]} />
                        )}
                    </div>
                )}
            </div>

            {/* 네비게이션 */}
            <div className="flex justify-between pt-4">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400"
                >
                    이전 문제
                </button>
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.length - 1, prev + 1))}
                    disabled={currentQuestionIndex === quiz.length - 1}
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
                >
                    다음 문제
                </button>
            </div>
        </div>
    );
}

// 피드백 카드 컴포넌트
function FeedbackCard({ result }) {
    const { score, feedback } = result;

    return (
        <div className="bg-white p-4 rounded-lg border space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                    점수
                </span>
                <span className={`text-sm font-medium ${
                    score >= 80 ? 'text-green-600' :
                        score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                }`}>
                    {score}점
                </span>
            </div>
            {feedback && (
                <div className="text-sm text-gray-600">
                    <span className="font-medium">피드백:</span>
                    <p className="mt-1">{feedback}</p>
                </div>
            )}
        </div>
    );
}
