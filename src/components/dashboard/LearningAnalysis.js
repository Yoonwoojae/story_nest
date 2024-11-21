// src/components/dashboard/LearningAnalysis.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale
} from 'chart.js';
import Image from 'next/image';
import { Line, Radar } from 'react-chartjs-2';
import cover1 from '@/assets/images/ai_section.jpg';
import cover2 from '@/assets/images/game_section.jpg';

// Chart.js 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale
);

// 독해력 발달 그래프 데이터
const comprehensionData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
        {
            label: '독해력 점수',
            data: [65, 68, 72, 75, 82, 85],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            tension: 0.3,
        },
        {
            label: '어휘력 점수',
            data: [70, 72, 75, 78, 80, 85],
            borderColor: 'rgb(147, 51, 234)',
            backgroundColor: 'rgba(147, 51, 234, 0.5)',
            tension: 0.3,
        }
    ],
};

// 영역별 능력치 데이터
const skillsData = {
    labels: ['문맥 이해', '핵심 파악', '추론', '비판적 사고', '어휘 활용', '정보 통합'],
    datasets: [{
        label: '현재 능력치',
        data: [85, 78, 82, 75, 80, 77],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)'
    }]
};

// 차트 공통 옵션
const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: '독해력 및 어휘력 발달 추이'
        }
    },
    scales: {
        y: {
            min: 0,
            max: 100,
        }
    }
};

const radarOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        r: {
            min: 0,
            max: 100,
            beginAtZero: true,
            ticks: {
                stepSize: 20
            }
        }
    }
};

// 기간 옵션
const periodOptions = [
    { value: 'week', label: '1주일' },
    { value: 'month', label: '1개월' },
    { value: '3months', label: '3개월' },
    { value: '6months', label: '6개월' },
    { value: 'year', label: '1년' }
];

// 추천 도서 데이터 수정
const recommendedBooks = [
    {
        id: 1,
        title: '비판적 사고의 기술',
        description: '비판적 사고력 향상에 도움이 됩니다',
        fullDescription: '비판적 사고는 현대 사회에서 가장 중요한 능력 중 하나입니다. 이 책은 논리적 사고와 분석력을 향상시키는 다양한 방법과 실전 예제를 제공합니다.',
        coverImage: cover1,
        author: '김비판',
        pageCount: '280',
        estimatedTime: '약 5시간',
        slug: 'critical-thinking',
        learningPoints: [
            '논리적 사고력 향상',
            '문제 해결 능력 개발',
            '분석적 독해 능력 강화',
            '토론 및 논증 기술 습득'
        ]
    },
    {
        id: 2,
        title: '정보와 논리',
        description: '정보 통합 능력 향상에 좋습니다',
        fullDescription: '다양한 정보를 체계적으로 분석하고 통합하는 방법을 배웁니다. 실제 사례를 바탕으로 정보 처리와 논리적 사고의 핵심을 다룹니다.',
        coverImage: cover2,
        author: '이논리',
        pageCount: '320',
        estimatedTime: '약 6시간',
        slug: 'info-logic',
        learningPoints: [
            '정보 분석 능력 향상',
            '체계적 사고 방법 학습',
            '데이터 기반 의사결정 능력 개발',
            '효과적인 정보 통합 방법 습득'
        ]
    }
];

function BookDetailModal({ book, isOpen, onClose, onStartReading }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-3xl m-4 shadow-xl overflow-hidden">
                <div className="flex">
                    {/* 왼쪽: 책 커버 및 기본 정보 */}
                    <div className="w-1/3 p-8 bg-gray-50">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover"
                                width={96}
                                height={128}
                                priority
                            />
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {book.pageCount}페이지
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                예상 학습 시간: {book.estimatedTime}
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 상세 정보 */}
                    <div className="flex-1 p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{book.title}</h3>
                                <p className="text-gray-500 mt-1">{book.author}</p>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-2">책 소개</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{book.fullDescription}</p>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-2">학습 포인트</h4>
                            <ul className="space-y-2">
                                {book.learningPoints.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => onStartReading(book)}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-colors font-medium"
                            >
                                책 읽으러 가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 차트 데이터 부분 수정
const createComprehensionData = (goals) => ({
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
        {
            label: '독해력 점수',
            data: [65, 68, 72, 75, 82, 85],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            tension: 0.3,
        },
        {
            label: '어휘력 점수',
            data: [70, 72, 75, 78, 80, 85],
            borderColor: 'rgb(147, 51, 234)',
            backgroundColor: 'rgba(147, 51, 234, 0.5)',
            tension: 0.3,
        },
        // 목표선 추가
        {
            label: '독해력 목표',
            data: Array(6).fill(goals.comprehension),
            borderColor: 'rgba(99, 102, 241, 0.5)',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
        },
        {
            label: '어휘력 목표',
            data: Array(6).fill(goals.vocabulary),
            borderColor: 'rgba(147, 51, 234, 0.5)',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
        }
    ],
});

// GoalSettingModal 컴포넌트
function GoalSettingModal({ isOpen, onClose, currentGoals, onSave }) {
    const [goals, setGoals] = useState(currentGoals);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-xl w-full max-w-md p-6">
                <h3 className="text-xl font-bold mb-4">학습 목표 설정</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">독해력 목표</label>
                        <input
                            type="number"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={goals.comprehension}
                            onChange={(e) => setGoals({ ...goals, comprehension: e.target.value })}
                            min="0"
                            max="100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">어휘력 목표</label>
                        <input
                            type="number"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={goals.vocabulary}
                            onChange={(e) => setGoals({ ...goals, vocabulary: e.target.value })}
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => {
                                onSave(goals);
                                onClose();
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                        >
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 메인 LearningAnalysis 컴포넌트
export default function LearningAnalysis() {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [goals, setGoals] = useState({
        comprehension: 90,
        vocabulary: 85
    });
    const [selectedBook, setSelectedBook] = useState(null);
    const router = useRouter();

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    const handleStartReading = (book) => {
        router.push(`/books/read/${book.slug}`);
    };

    return (
        <section className="bg-white pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 섹션 헤더 - 기간 선택과 목표 설정 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900">
                학습 분석
                        </h2>
                        <p className="mt-3 text-xl font-semibold text-gray-600">
                AI 기반 학습 능력 분석 결과입니다
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            {periodOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => setIsGoalModalOpen(true)}
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                목표 설정
                        </button>
                    </div>
                </div>

                {/* 주요 그래프와 분석 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* 발달 그래프 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        {/* 목표 달성률 표시 추가 */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-indigo-50 p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">독해력 목표</span>
                                    <span className="text-sm font-semibold text-indigo-600">
                                        {goals.comprehension}점
                                    </span>
                                </div>
                                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
                                        style={{ width: `${(85 / goals.comprehension) * 100}%` }}
                                    />
                                </div>
                                <div className="mt-1 text-xs text-gray-500 text-right">
                    달성률 {Math.round((85 / goals.comprehension) * 100)}%
                                </div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">어휘력 목표</span>
                                    <span className="text-sm font-semibold text-purple-600">
                                        {goals.vocabulary}점
                                    </span>
                                </div>
                                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-purple-600 rounded-full transition-all duration-500"
                                        style={{ width: `${(85 / goals.vocabulary) * 100}%` }}
                                    />
                                </div>
                                <div className="mt-1 text-xs text-gray-500 text-right">
                    달성률 {Math.round((85 / goals.vocabulary) * 100)}%
                                </div>
                            </div>
                        </div>
                        <div className="h-80">
                            <Line
                                data={createComprehensionData(goals)}
                                options={lineOptions}
                            />
                        </div>
                    </div>

                    {/* 능력치 방사형 그래프 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="h-80">
                            <Radar data={skillsData} options={radarOptions} />
                        </div>
                    </div>
                </div>

                {/* AI 분석 결과 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 강점 및 개선점 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                주요 학습 포인트
                        </h3>

                        {/* 강점 */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-indigo-600 mb-2">
                  강점
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 text-green-500 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                      문맥 파악 능력이 뛰어납니다
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 text-green-500 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                      어휘력이 꾸준히 향상되고 있습니다
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* 개선점 */}
                        <div>
                            <h4 className="text-sm font-semibold text-indigo-600 mb-2">
                  개선이 필요한 부분
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 text-amber-500 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                      비판적 사고 능력을 더 강화해보세요
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 text-amber-500 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                      정보 통합 능력이 더 필요합니다
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* AI 추천 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            AI 맞춤 추천
                        </h3>

                        {/* 추천 도서 */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-indigo-600 mb-2">추천 도서</h4>
                            <div className="space-y-4">
                                {recommendedBooks.map((book) => (
                                    <div
                                        key={book.id}
                                        className="flex items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
                                        onClick={() => handleBookClick(book)}
                                    >
                                        <div
                                            className="flex-shrink-0 w-24 h-32 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                                            <Image
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                                width={96}
                                                height={128}
                                            />
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-gray-900">{book.title}</h5>
                                            <p className="text-sm text-gray-600 mt-1">{book.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 책 상세 정보 모달 */}
                        <BookDetailModal
                            book={selectedBook}
                            isOpen={selectedBook !== null}
                            onClose={() => setSelectedBook(null)}
                            onStartReading={handleStartReading}
                        />

                        {/* 학습 제안 */}
                        <div>
                            <h4 className="text-sm font-semibold text-indigo-600 mb-2">
                                학습 제안
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
                                    <div
                                        className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                        <svg
                                            className="w-6 h-6 text-indigo-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            토론 학습을 통해 비판적 사고력을 키워보세요
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
                                    <div
                                        className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                        <svg
                                            className="w-6 h-6 text-indigo-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            다양한 장르의 책을 읽어 시야를 넓혀보세요
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 목표 설정 모달 */}
                <GoalSettingModal
                    isOpen={isGoalModalOpen}
                    onClose={() => setIsGoalModalOpen(false)}
                    currentGoals={goals}
                    onSave={setGoals}
                />
            </div>
        </section>
    );
}
