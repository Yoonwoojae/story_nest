// src/components/dashboard/DashboardSummary.js
'use client';

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
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

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

// 독서량 차트 데이터
const readingData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
        {
            label: '월별 독서량',
            data: [8, 7, 9, 10, 11, 12],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            tension: 0.3,
        },
    ],
};

// 학습 시간 차트 데이터
const studyTimeData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
        {
            label: '일일 학습 시간',
            data: [2.5, 1.8, 2.1, 1.5, 2.3, 3.0, 2.7],
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
        },
    ],
};

// 독해력 차트 데이터
const comprehensionData = {
    labels: ['문맥 이해', '핵심 파악', '추론', '분석력', '어휘력'],
    datasets: [
        {
            label: '영역별 점수',
            data: [90, 85, 88, 82, 87],
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            borderColor: 'rgb(139, 92, 246)',
        },
    ],
};

// 뱃지 획득 현황 차트 데이터
const badgeData = {
    labels: ['독서왕', '퀴즈마스터', '성실왕', '토론왕'],
    datasets: [
        {
            data: [3, 2, 2, 1],
            backgroundColor: [
                'rgba(245, 158, 11, 0.5)',
                'rgba(249, 115, 22, 0.5)',
                'rgba(236, 72, 153, 0.5)',
                'rgba(124, 58, 237, 0.5)',
            ],
            borderColor: [
                'rgb(245, 158, 11)',
                'rgb(249, 115, 22)',
                'rgb(236, 72, 153)',
                'rgb(124, 58, 237)',
            ],
        },
    ],
};

// Chart.js 공통 옵션
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
};

function DetailModal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 오버레이 */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* 모달 컨텐츠 */}
            <div className="relative bg-white rounded-2xl w-full max-w-2xl m-4 shadow-xl">
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, value, change, description, gradient, modalContent }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white`}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-white/90">{title}</p>
                        <h3 className="text-3xl font-bold mt-1">{value}</h3>
                    </div>
                    <span className="px-2 py-1 bg-white/20 rounded-lg text-sm">
                        {change}
                    </span>
                </div>
                <div className="mt-4 text-sm text-white/90">
                    {description}
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                    상세보기
                </button>
            </div>

            <DetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
            >
                {modalContent}
            </DetailModal>
        </>
    );
}

export default function DashboardSummary() {
    const dashboardData = [
        {
            title: '이번 달 독서량',
            value: '12권',
            change: '+3권 ↑',
            description: '지난 달 대비 33% 증가',
            gradient: 'from-indigo-500 to-indigo-600',
            modalContent: (
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-4">월별 독서량 추이</h4>
                        <div className="h-64">
                            <Line data={readingData} options={commonOptions} />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">최근 읽은 책</h4>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span>해리포터와 마법사의 돌</span>
                                <span className="text-gray-500">2024.01.15</span>
                            </li>
                            <li className="flex justify-between">
                                <span>어린왕자</span>
                                <span className="text-gray-500">2024.01.12</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: '총 학습 시간',
            value: '32시간',
            change: '+5h ↑',
            description: '일일 평균 1.2시간',
            gradient: 'from-emerald-500 to-emerald-600',
            modalContent: (
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-4">주간 학습 시간</h4>
                        <div className="h-64">
                            <Bar data={studyTimeData} options={commonOptions} />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">학습 통계</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-50 p-4 rounded-lg">
                                <p className="text-sm text-emerald-600">최장 학습 시간</p>
                                <p className="text-2xl font-bold text-emerald-700">3.0시간</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-lg">
                                <p className="text-sm text-emerald-600">주간 목표 달성</p>
                                <p className="text-2xl font-bold text-emerald-700">85%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '독해력 점수',
            value: '82점',
            change: '+5점 ↑',
            description: '상위 15% 수준',
            gradient: 'from-violet-500 to-violet-600',
            modalContent: (
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-4">영역별 독해력 분석</h4>
                        <div className="h-64">
                            <Radar data={comprehensionData} options={commonOptions} />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">독해력 성장</h4>
                        <div className="bg-violet-50 p-4 rounded-lg">
                            <p className="text-sm text-violet-600">지난 달 대비 성장률</p>
                            <p className="text-2xl font-bold text-violet-700">+12%</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '획득한 뱃지',
            value: '8개',
            change: 'New!',
            description: '신규 뱃지 획득!',
            gradient: 'from-amber-500 to-amber-600',
            modalContent: (
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-4">카테고리별 뱃지 현황</h4>
                        <div className="h-64">
                            <Doughnut data={badgeData} options={commonOptions} />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">최근 획득한 뱃지</h4>
                        <div className="bg-amber-50 p-4 rounded-lg">
                            <p className="text-sm text-amber-600">독서 마라토너</p>
                            <p className="text-lg text-amber-700">30일 연속 독서 달성</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="bg-white pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 text-center">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900">학습 현황</h2>
                        <p className="mt-3 text-xl font-semibold text-gray-600">오늘의 학습 진행 상황입니다</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardData.map((data, index) => (
                        <DashboardCard key={index} {...data} />
                    ))}
                </div>
            </div>
        </section>
    );
}
