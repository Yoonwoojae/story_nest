// src/components/dashboard/ChallengeListModal.js
'use client';

import { useState } from 'react';

export default function ChallengeListModal({ isOpen, onClose, challenges, onJoinChallenge }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">전체 챌린지</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid gap-4">
                    {challenges?.map(challenge => (
                        <div key={challenge.id} className="bg-indigo-50 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{challenge.title}</h3>
                                    <p className="text-gray-600 mt-1">{challenge.description}</p>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-sm text-gray-600">목표: {challenge.goal}</p>
                                        <p className="text-sm text-gray-600">기간: {challenge.period}</p>
                                        <p className="text-sm text-gray-600">보상: {challenge.reward}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onJoinChallenge(challenge.id)}
                                    className={`px-6 py-2 rounded-full transition-colors min-w-[100px] ${
                                        challenge.isJoined
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                    }`}
                                >
                                    {challenge.isJoined ? '참여중' : '참여하기'}
                                </button>
                            </div>

                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(challenge.currentCount / challenge.totalCount) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm text-gray-600">
                                        진행률: {(challenge.currentCount / challenge.totalCount) * 100}%
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {challenge.participants}명 참여중
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

