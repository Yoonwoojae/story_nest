// src/components/learn/modes/FocusMode.js
import { useState, useEffect, useRef } from 'react';
import { BookOpen, BrainCircuit, MessageCircle } from 'lucide-react';
import QuizSection from '../QuizSection';

const generateQuizData = (content) => {
    return [
        {
            id: 'q1',
            type: 'text',
            template: '이 도서관의 특별한 프로그램은 무엇인가요?',
            options: [
                '매주 토요일 오후 책 읽어주기 시간',
                '매일 아침 독서 토론',
                '매달 영화 상영회',
                '주말 독서 클럽'
            ],
            correctAnswer: '매주 토요일 오후 책 읽어주기 시간'
        },
        {
            id: 'q2',
            type: 'multiSelect',
            template: '도서관에서 할 수 있는 활동을 모두 고르세요.',
            options: [
                '독서 감상문 쓰기',
                '그림 그리기',
                '퀴즈 풀기',
                '수영하기',
                '음악 감상하기',
                '축구하기'
            ],
            correctAnswers: ['독서 감상문 쓰기', '그림 그리기', '퀴즈 풀기']
        },
        {
            id: 'q3',
            type: 'text',
            template: '이 도서관은 몇 층으로 되어 있나요?',
            options: [
                '1층',
                '2층',
                '3층',
                '4층'
            ],
            correctAnswer: '2층'
        },
        {
            id: 'q4',
            type: 'multiSelect',
            template: '1층에서 볼 수 있는 것들을 모두 고르세요.',
            options: [
                '알록달록한 그림책',
                '재미있는 동화책',
                '전문 서적',
                '연구 자료',
                '신문',
                '잡지'
            ],
            correctAnswers: ['알록달록한 그림책', '재미있는 동화책']
        }
    ];
};

export default function FocusMode({ content, fontSize, onComplete, onProgressUpdate }) {
    // 모든 state 선언 최상단에 배치
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mode, setMode] = useState('read');
    const [comprehension, setComprehension] = useState({});
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({});
    const contentRef = useRef(null);

    // 단락과 이미지를 함께 그룹화하는 함수
    const groupContentSections = (content) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const elements = Array.from(tempDiv.children); // HTMLCollection을 배열로 변환
        const sections = [];
        let i = 0;

        while (i < elements.length) {
            let currentSection = [];
            const element = elements[i];

            // 현재 요소 추가
            currentSection.push(element.outerHTML);

            // p 태그이고 다음 요소가 이미지 컨테이너인 경우
            if (element.tagName === 'P' &&
                i + 1 < elements.length &&
                elements[i + 1].classList.contains('image-container')) {
                // 이미지 컨테이너도 현재 섹션에 추가
                currentSection.push(elements[i + 1].outerHTML);
                // 다음 요소는 이미 처리했으므로 인덱스 하나 더 증가
                i++;
            }

            sections.push(currentSection.join(''));
            i++;
        }

        return sections;
    };

    const paragraphs = groupContentSections(content);

    // 퀴즈 데이터 생성
    useEffect(() => {
        const quizData = generateQuizData(content);
        setQuizQuestions(quizData);
    }, [content]);

    const handleNext = () => {
        if (currentIndex < paragraphs.length - 1) {
            setCurrentIndex(prev => prev + 1);
            // 페이지 상단으로 부드럽게 스크롤
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            // 이전 버튼도 동일하게 적용
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const handleQuizSubmit = (questionId, answer) => {
        setQuizAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    // 각 모드별 컨텐츠 렌더링
    const renderContent = () => {
        switch(mode) {
        case 'quiz':
            return (
                <QuizSection
                    quiz={quizQuestions}
                    answers={quizAnswers}
                    onSubmit={handleQuizSubmit}
                />
            );
        case 'comprehension':
            return (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">이해도 체크</h3>
                    <div className="space-y-2">
                        <textarea
                            value={comprehension[currentIndex] || ''}
                            onChange={(e) => {
                                setComprehension(prev => ({
                                    ...prev,
                                    [currentIndex]: e.target.value
                                }));
                            }}
                            placeholder="이 단락의 내용을 자신의 말로 설명해보세요..."
                            className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            );
        default:
            return (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div
                        ref={contentRef}
                        style={{ fontSize: `${fontSize}pt` }}
                        className="prose max-w-none text-gray-900"
                        dangerouslySetInnerHTML={{ __html: paragraphs[currentIndex] }}
                    />
                </div>
            );
        }
    };

    return (
        <div className="space-y-8">
            {/* 모드 선택 탭 */}
            <div className="flex space-x-2 border-b">
                <button
                    onClick={() => setMode('read')}
                    className={`flex items-center space-x-2 px-4 py-3 ${
                        mode === 'read'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <BookOpen size={20} />
                    <span>읽기</span>
                </button>
                <button
                    onClick={() => setMode('comprehension')}
                    className={`flex items-center space-x-2 px-4 py-3 ${
                        mode === 'comprehension'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <BrainCircuit size={20} />
                    <span>이해도 체크</span>
                </button>
                <button
                    onClick={() => setMode('quiz')}
                    className={`flex items-center space-x-2 px-4 py-3 ${
                        mode === 'quiz'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <MessageCircle size={20} />
                    <span>퀴즈</span>
                </button>
            </div>

            {/* 선택된 모드의 컨텐츠 */}
            {renderContent()}

            {/* 네비게이션 - 퀴즈 모드가 아닐 때만 표시 */}
            {mode !== 'quiz' && (
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
                        <span>이전</span>
                    </button>

                    <div className="text-sm text-gray-500">
                        {currentIndex + 1} / {paragraphs.length} 단락
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={mode === 'comprehension' && !comprehension[currentIndex]?.trim()}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                            mode === 'comprehension' && !comprehension[currentIndex]?.trim()
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-indigo-600 hover:text-indigo-800'
                        }`}
                    >
                        <span>다음</span>
                    </button>
                </div>
            )}

            {/* 진행률 - 퀴즈 모드가 아닐 때만 표시 */}
            {mode !== 'quiz' && (
                <div className="pt-4 pb-8 border-t">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>읽기 진행률</span>
                        <span>{Math.round((currentIndex / paragraphs.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all"
                            style={{ width: `${(currentIndex / paragraphs.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
