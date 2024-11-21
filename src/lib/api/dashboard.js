// src/lib/api/dashboard.js
import cover1 from '@/assets/images/ai_section.jpg';
import cover2 from '@/assets/images/game_section.jpg';

// Mock 데이터
const mockData = {
    challenges: [
        {
            id: 1,
            title: '7월 독서 마라톤',
            goal: '10권 읽기',
            period: '7월 1일 ~ 7월 31일',
            currentCount: 6,
            totalCount: 10,
            participants: 128,
            reward: '금메달 배지 + 300포인트',
            isJoined: false,
            description: '한 달 동안 10권의 책을 읽고 독서 마라토너가 되어보세요!',
            participantsList: ['민준', '서연', '지호']
        },
        {
            id: 2,
            title: '연속 독서 챌린지',
            goal: '30일 연속 독서',
            currentCount: 15,
            totalCount: 30,
            participants: 256,
            reward: '연속 독서 배지',
            isJoined: false,
            description: '매일 30분 이상 독서하고 습관을 만들어보세요!',
            participantsList: ['유진', '하준', '소미']
        }
    ],

    readingGroups: [
        {
            id: 1,
            name: '과학 탐험대',
            members: 12,
            currentBook: {
                title: '별들의 과학',
                author: '김우주',
                coverImage: cover1,
                dueDate: '2024-07-15',
                progress: 45,
                totalPages: 300,
                currentPage: 135
            },
            meetingSchedule: '매주 토요일 오후 3시',
            description: '과학 서적을 함께 읽고 토론하는 모임입니다.',
            upcomingMeeting: {
                date: '2024-07-08',
                time: '15:00',
                topic: '우주의 신비',
                location: '온라인 (Zoom)'
            },
            discussions: [
                {
                    id: 1,
                    user: '민준',
                    content: '블랙홀 부분이 특히 흥미로웠어요!',
                    likes: 5,
                    replies: 2
                }
            ]
        },
        {
            id: 2,
            name: '판타지 북클럽',
            members: 8,
            currentBook: {
                title: '드래곤의 숨결',
                author: '마법사',
                coverImage: cover2,
                dueDate: '2024-07-20',
                progress: 60,
                totalPages: 400,
                currentPage: 240
            },
            meetingSchedule: '매주 일요일 오후 2시',
            description: '판타지 소설을 읽고 토론하는 모임입니다.',
            upcomingMeeting: {
                date: '2024-07-09',
                time: '14:00',
                topic: '마법 시스템 분석',
                location: '시립도서관'
            },
            discussions: [
                {
                    id: 1,
                    user: '서연',
                    content: '마법 설정이 정말 잘 되어 있어요!',
                    likes: 3,
                    replies: 1
                }
            ]
        }
    ],

    activityFeed: [
        {
            id: 1,
            user: {
                name: '민준',
                avatar: cover1,
                grade: '5학년'
            },
            type: 'completion',
            book: '드래곤의 숨결',
            message: '책을 완독했어요!',
            timestamp: '방금 전',
            reactions: {
                likes: 5,
                comments: [
                    { id: 1, user: '서연', content: '축하해요! 🎉' }
                ]
            }
        },
        {
            id: 2,
            user: {
                name: '서연',
                avatar: cover2,
                grade: '6학년'
            },
            type: 'review',
            book: '별들의 과학',
            message: '우주에 대해 쉽게 설명해주는 책이에요!',
            timestamp: '10분 전',
            reactions: {
                likes: 3,
                comments: []
            }
        }
    ]
};

// 지연시간을 시뮬레이션하는 유틸리티 함수
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const DashboardAPI = {
    challenges: {
        getAll: async () => {
            try {
                await delay(300); // 지연시간 줄임
                return mockData.challenges;
            } catch (error) {
                throw new Error('Failed to fetch challenges');
            }
        },
        join: async (challengeId) => {
            try {
                await delay(300);
                const challenge = mockData.challenges.find(c => c.id === challengeId);
                if (!challenge) {
                    throw new Error('Challenge not found');
                }
                challenge.isJoined = true;
                return { success: true, challenge };
            } catch (error) {
                throw new Error('Failed to join challenge');
            }
        }
    },

    readingGroups: {
        getAll: async () => {
            try {
                await delay(300);
                return mockData.readingGroups;
            } catch (error) {
                throw new Error('Failed to fetch reading groups');
            }
        },
        create: async (groupData) => {
            try {
                await delay(300);
                const newGroup = {
                    id: mockData.readingGroups.length + 1,
                    members: 1,
                    currentBook: {
                        ...groupData.currentBook,
                        coverImage: '/api/placeholder/200/300',
                        progress: 0,
                        totalPages: 0,
                        currentPage: 0
                    },
                    discussions: [],
                    ...groupData
                };
                mockData.readingGroups.push(newGroup);
                return newGroup;
            } catch (error) {
                throw new Error('Failed to create reading group');
            }
        }
    },

    activityFeed: {
        getAll: async () => {
            try {
                await delay(300);
                return mockData.activityFeed;
            } catch (error) {
                throw new Error('Failed to fetch activity feed');
            }
        },
        addReaction: async ({ activityId, type }) => {
            try {
                await delay(300);
                const activity = mockData.activityFeed.find(a => a.id === activityId);
                if (!activity) {
                    throw new Error('Activity not found');
                }
                if (type === 'like') {
                    activity.reactions.likes += 1;
                }
                return { success: true, activity };
            } catch (error) {
                throw new Error('Failed to add reaction');
            }
        }
    }
};
