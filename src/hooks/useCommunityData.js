// src/hooks/useCommunityData.js
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardAPI } from '@/lib/api/dashboard';

export const useChallenges = () => {
    return useQuery({
        queryKey: ['challenges'],
        queryFn: async () => {
            try {
                const data = await DashboardAPI.challenges.getAll();
                return data;
            } catch (error) {
                console.error('Error fetching challenges:', error);
                throw new Error('챌린지 목록을 불러오는데 실패했습니다.');
            }
        }
    });
};

export const useReadingGroups = () => {
    return useQuery({
        queryKey: ['readingGroups'],
        queryFn: async () => {
            try {
                const data = await DashboardAPI.readingGroups.getAll();
                return data;
            } catch (error) {
                console.error('Error fetching reading groups:', error);
                throw new Error('독서 모임 목록을 불러오는데 실패했습니다.');
            }
        }
    });
};

export const useActivityFeed = () => {
    return useQuery({
        queryKey: ['activityFeed'],
        queryFn: async () => {
            try {
                const data = await DashboardAPI.activityFeed.getAll();
                return data;
            } catch (error) {
                console.error('Error fetching activity feed:', error);
                throw new Error('활동 피드를 불러오는데 실패했습니다.');
            }
        }
    });
};

export const useJoinChallenge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (challengeId) => {
            try {
                const data = await DashboardAPI.challenges.join(challengeId);
                return data;
            } catch (error) {
                console.error('Error joining challenge:', error);
                throw new Error('챌린지 참여에 실패했습니다.');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['challenges'] });
        }
    });
};

export const useAddReaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ activityId, type }) => {
            try {
                const data = await DashboardAPI.activityFeed.addReaction({ activityId, type });
                return data;
            } catch (error) {
                console.error('Error adding reaction:', error);
                throw new Error('반응 추가에 실패했습니다.');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activityFeed'] });
        }
    });
};
