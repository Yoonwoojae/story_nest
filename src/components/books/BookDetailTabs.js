// src/components/books/BookDetailTabs.js
'use client';

import { useState } from 'react';
import Progress from '@/components/common/Progress';

// 공통 Tab 컨테이너 컴포넌트
function TabContainer({ children }) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            {children}
        </div>
    );
}

// 개요 탭
function OverviewTab({ book }) {
    return (
        <TabContainer>
            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold mb-3">상세 소개</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {book.description}
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-3">학습 목표</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>텍스트 이해력 향상</li>
                        <li>비판적 사고력 개발</li>
                        <li>독해 속도 향상</li>
                        <li>어휘력 증진</li>
                    </ul>
                </section>
            </div>
        </TabContainer>
    );
}

// 미리보기 탭
function PreviewTab({ book }) {
    return (
        <TabContainer>
            <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-3">미리보기</h3>
                <p className="text-gray-600">
                    {book.preview || '미리보기 내용이 없습니다.'}
                </p>
            </div>
        </TabContainer>
    );
}

// 리뷰 탭
function ReviewsTab({ book }) {
    const [sortBy, setSortBy] = useState('recent');

    return (
        <TabContainer>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">독자 리뷰</h3>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded-lg px-3 py-1.5 text-sm"
                    >
                        <option value="recent">최신순</option>
                        <option value="rating">평점순</option>
                    </select>
                </div>

                {book.reviews?.length > 0 ? (
                    <div className="space-y-4">
                        {book.reviews.map((review) => (
                            <div key={review.id} className="border rounded-lg p-4">
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">{review.userName}</span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-600">{review.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">아직 리뷰가 없습니다.</p>
                )}
            </div>
        </TabContainer>
    );
}

// 통계 탭
function StatsTab({ book }) {
    // 기본값을 포함한 안전한 데이터 접근
    const stats = {
        completionRate: 0,
        avgReadTime: 0,
        totalReaders: 0,
        satisfaction: 0,
        ...book?.stats // book.stats가 있으면 기본값을 덮어씌움
    };

    return (
        <TabContainer>
            <div className="space-y-8">
                {/* 학습 통계 섹션 */}
                <div>
                    <h3 className="text-lg font-semibold mb-6">학습 통계</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">완독률</span>
                                <span className="text-sm text-gray-500">{stats.completionRate}%</span>
                            </div>
                            <Progress value={stats.completionRate} />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">평균 학습 시간</span>
                                <span className="text-sm text-gray-500">{stats.avgReadTime}시간</span>
                            </div>
                            <Progress value={(stats.avgReadTime / 12) * 100} />
                        </div>
                    </div>
                </div>

                {/* 통계 카드 섹션 */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600">
                            {stats.totalReaders.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">총 학습자 수</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600">
                            {stats.satisfaction}%
                        </div>
                        <div className="text-sm text-gray-500">만족도</div>
                    </div>
                </div>

                {/* 추가 통계 정보 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">학습자 피드백</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>• 평균 독서 시간: {stats.avgReadTime}시간</li>
                        <li>• 완독 비율: {stats.completionRate}%</li>
                        <li>• 만족도: {stats.satisfaction}%</li>
                    </ul>
                </div>
            </div>
        </TabContainer>
    );
}

// 메인 Tabs 컴포넌트
export default function BookDetailTabs({ book }) {
    const [activeTab, setActiveTab] = useState('overview');

    // book prop 유효성 검사 추가
    if (!book) {
        return null;
    }

    return (
        <div className="mt-8">
            {/* 탭 버튼 */}
            <div className="flex space-x-1 border-b border-gray-200 mb-6">
                {[
                    { id: 'overview', label: '개요' },
                    { id: 'preview', label: '미리보기' },
                    { id: 'reviews', label: '리뷰' },
                    { id: 'stats', label: '통계' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium ${
                            activeTab === tab.id
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            {activeTab === 'overview' && <OverviewTab book={book} />}
            {activeTab === 'preview' && <PreviewTab book={book} />}
            {activeTab === 'reviews' && <ReviewsTab book={book} />}
            {activeTab === 'stats' && <StatsTab book={book} />}
        </div>
    );
}
