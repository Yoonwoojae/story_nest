// src/app/dashboard/page.js
'use client';
import { useEffect } from 'react';
import RecentBooks from '@/components/dashboard/RecentBooks';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import LearningAnalysis from '@/components/dashboard/LearningAnalysis';
import RecommendedBooks from '@/components/dashboard/RecommendedBooks';
import CommunitySection from '@/components/dashboard/CommunitySection';

export default function Dashboard() {
    // 페이지 타이틀 변경
    useEffect(() => {
        document.title = '대시보드 - Story Nest';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 최근 읽은 책 섹션 */}
            <RecentBooks />

            {/* 대시보드 요약 섹션 */}
            <DashboardSummary />

            {/* 학습 분석 섹션 */}
            <LearningAnalysis />

            {/* 추천 도서 섹션 */}
            <RecommendedBooks />

            {/* 커뮤니티 섹션 */}
            <CommunitySection /> 
        </div>
    );
}
