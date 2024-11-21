// src/components/dashboard/CommunitySection.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import {
    useChallenges,
    useReadingGroups,
    useActivityFeed,
    useJoinChallenge,
    useAddReaction
} from '@/hooks/useCommunityData';
import ChallengeListModal from './ChallengeListModal';
import CreateGroupModal from './CreateGroupModal';

export default function CommunitySection() {
    // 상태 관리
    const [notifications, setNotifications] = useState([]);

    // API 데이터 fetching
    const {
        data: challenges,
        isLoading: challengesLoading,
        error: challengesError
    } = useChallenges();

    const {
        data: readingGroups,
        isLoading: groupsLoading,
        error: groupsError
    } = useReadingGroups();

    const {
        data: activityFeed,
        isLoading: feedLoading,
        error: feedError
    } = useActivityFeed();

    // Mutations
    const { mutate: joinChallenge } = useJoinChallenge();
    const { mutate: addReaction } = useAddReaction();

    // 실시간 알림 처리를 useEffect 내부로 이동
    useEffect(() => {
        const interval = setInterval(() => {
            const newNotification = {
                id: Date.now(),
                message: '새로운 독서 활동이 있습니다!',
                timestamp: new Date().toLocaleTimeString()
            };

            setNotifications(prev => [newNotification, ...prev].slice(0, 5));
        }, 30000);

        // cleanup function
        return () => clearInterval(interval);
    }, []); // 빈 의존성 배열

    // 모달 상태
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    // 챌린지 참여 처리
    const handleJoinChallenge = (challengeId) => {
        joinChallenge(challengeId);
    };

    // 활동 반응 처리
    const handleReaction = (activityId, type) => {
        addReaction({ activityId, type });
    };

    // 독서 모임 생성 처리
    const handleCreateGroup = async (groupData) => {
        try {
            // API 호출 로직 추가 필요
            console.log('Creating group:', groupData);
            setShowCreateGroupModal(false);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    // 로딩 상태 처리
    if (challengesLoading || groupsLoading || feedLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-20 bg-gray-200 rounded"></div>
                                    <div className="h-20 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 에러 상태 처리
    if (challengesError || groupsError || feedError) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-700 font-medium">데이터를 불러오는데 문제가 발생했습니다.</p>
                    <p className="text-sm text-red-600 mt-2">
                        {/* 구체적인 에러 메시지 표시 */}
                        {challengesError?.message || groupsError?.message || feedError?.message}
                    </p>
                    <button
                        onClick={() => {
                            // React Query의 refetch 함수들을 호출
                            challenges.refetch();
                            readingGroups.refetch();
                            activityFeed.refetch();
                        }}
                        className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-white pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 알림 섹션 */}
                <div className="fixed top-4 right-4 z-50">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg mb-2 animate-fade-in"
                        >
                            <p className="text-sm">{notification.message}</p>
                            <span className="text-xs opacity-75">
                                {notification.timestamp}
                            </span>
                        </div>
                    ))}
                </div>

                {/* 섹션 헤더 */}
                <div className="mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-900">
              함께 읽는 즐거움
                    </h2>
                    <p className="mt-3 text-xl font-semibold text-gray-600">
              친구들과 함께하는 독서 여정
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 챌린지 섹션 */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                  진행 중인 챌린지
                            </h3>
                            <button
                                onClick={() => setShowChallengeModal(true)}
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                  전체보기
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {challenges?.map((challenge) => (
                                <div
                                    key={challenge.id}
                                    className="bg-indigo-50 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {challenge.title}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {challenge.goal}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {challenge.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleJoinChallenge(challenge.id)}
                                            className={`text-xs px-6 py-2 rounded-full transition-colors min-w-[100px] ${
                                                challenge.isJoined
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                            }`}
                                        >
                                            {challenge.isJoined ? '참여중' : '참여하기'}
                                        </button>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${(challenge.currentCount / challenge.totalCount) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>
                                            {challenge.currentCount}/{challenge.totalCount}
                                        </span>
                                        <span>{challenge.period}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 독서 모임 섹션 */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                  나의 독서 모임
                            </h3>
                            <button
                                onClick={() => setShowCreateGroupModal(true)}
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                  모임 만들기
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {readingGroups?.map((group) => (
                                <div
                                    key={group.id}
                                    className="bg-green-50 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors"
                                    onClick={() => setSelectedGroup(group)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-20 relative flex-shrink-0">
                                            <Image
                                                src={group.currentBook.coverImage}
                                                alt={group.currentBook.title}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">
                                                {group.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">
                          현재 읽는 책: {group.currentBook.title}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                          다음 모임: {group.upcomingMeeting.date}{' '}
                                                {group.upcomingMeeting.time}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                                    {group.members}명의 멤버
                                                </span>
                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                                    {group.currentBook.progress}% 완료
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 활동 피드 섹션 */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                  친구들의 활동
                            </h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-500">
                  새로고침
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {activityFeed?.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
                                >
                                    <div className="w-10 h-10 relative flex-shrink-0">
                                        <Image
                                            src={activity.user.avatar}
                                            alt={activity.user.name}
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">
                                                {activity.user.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {activity.user.grade}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            <span className="font-medium">{activity.book}</span>{' '}
                                            {activity.message}
                                        </p>
                                        <span className="text-xs text-gray-500">
                                            {activity.timestamp}
                                        </span>

                                        {/* 활동 반응 버튼 */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <button
                                                onClick={() => handleReaction(activity.id, 'like')}
                                                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Heart size={16} />
                                                <span className="text-xs">
                                                    {activity.reactions.likes}
                                                </span>
                                            </button>
                                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                                                <MessageCircle size={16} />
                                                <span className="text-xs">
                                                    {activity.reactions.comments.length}
                                                </span>
                                            </button>
                                            <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                                                <Share2 size={16} />
                                            </button>
                                        </div>

                                        {/* 댓글 섹션 */}
                                        {activity.reactions.comments.length > 0 && (
                                            <div className="mt-2 pl-2 border-l-2 border-gray-200">
                                                {activity.reactions.comments.map((comment) => (
                                                    <div
                                                        key={comment.id}
                                                        className="text-sm text-gray-600 mt-1"
                                                    >
                                                        <span className="font-medium">
                                                            {comment.user}:
                                                        </span>{' '}
                                                        {comment.content}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 독서 모임 상세 모달 */}
                {selectedGroup && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setSelectedGroup(null);
                            }
                        }}
                    >
                        <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {selectedGroup.name}
                                </h2>
                                <button
                                    onClick={() => setSelectedGroup(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                <p className="text-gray-600">{selectedGroup.description}</p>

                                {/* 현재 읽는 책 정보 */}
                                <div className="flex gap-6">
                                    <div className="w-32 h-40 relative flex-shrink-0">
                                        <Image
                                            src={selectedGroup.currentBook.coverImage}
                                            alt={selectedGroup.currentBook.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold">
                                            {selectedGroup.currentBook.title}
                                        </h3>
                                        <p className="text-gray-600">
                        저자: {selectedGroup.currentBook.author}
                                        </p>
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600">읽기 진행률</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${selectedGroup.currentBook.progress}%`,
                                                    }}
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {selectedGroup.currentBook.currentPage}/
                                                {selectedGroup.currentBook.totalPages} 페이지
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 다음 모임 정보 */}
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                      다음 모임
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">
                          날짜: {selectedGroup.upcomingMeeting.date}
                                            </p>
                                            <p className="text-sm text-gray-600">
                          시간: {selectedGroup.upcomingMeeting.time}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">
                          주제: {selectedGroup.upcomingMeeting.topic}
                                            </p>
                                            <p className="text-sm text-gray-600">
                          장소: {selectedGroup.upcomingMeeting.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 토론 섹션 */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">
                      최근 토론
                                    </h4>
                                    <div className="space-y-4">
                                        {selectedGroup.discussions.map((discussion) => (
                                            <div
                                                key={discussion.id}
                                                className="bg-gray-50 rounded-lg p-4"
                                            >
                                                <p className="font-medium text-gray-900">
                                                    {discussion.user}
                                                </p>
                                                <p className="text-gray-600 mt-1">
                                                    {discussion.content}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <button className="text-sm text-gray-500 hover:text-blue-500">
                              좋아요 {discussion.likes}
                                                    </button>
                                                    <button className="text-sm text-gray-500 hover:text-blue-500">
                              답글 {discussion.replies}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* 챌린지 목록 모달 */}
            <ChallengeListModal
                isOpen={showChallengeModal}
                onClose={() => setShowChallengeModal(false)}
                challenges={challenges}
                onJoinChallenge={handleJoinChallenge}
            />

            {/* 모임 만들기 모달 */}
            <CreateGroupModal
                isOpen={showCreateGroupModal}
                onClose={() => setShowCreateGroupModal(false)}
                onCreateGroup={handleCreateGroup}
            />
        </section>
    );
}
