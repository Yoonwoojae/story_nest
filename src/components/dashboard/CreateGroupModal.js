// src/components/dashboard/CreateGroupModal.js
'use client';

import { useState } from 'react';

export default function CreateGroupModal({ isOpen, onClose, onCreateGroup }) {
    const [groupData, setGroupData] = useState({
        name: '',
        description: '',
        currentBook: {
            title: '',
            author: '',
        },
        meetingSchedule: '',
        maxMembers: 10
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateGroup(groupData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">독서 모임 만들기</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            모임 이름
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={groupData.name}
                            onChange={(e) => setGroupData({...groupData, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            모임 설명
                        </label>
                        <textarea
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={groupData.description}
                            onChange={(e) => setGroupData({...groupData, description: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                현재 읽는 책
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                value={groupData.currentBook.title}
                                onChange={(e) => setGroupData({
                                    ...groupData,
                                    currentBook: {...groupData.currentBook, title: e.target.value}
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                저자
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                value={groupData.currentBook.author}
                                onChange={(e) => setGroupData({
                                    ...groupData,
                                    currentBook: {...groupData.currentBook, author: e.target.value}
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            모임 일정
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="예: 매주 토요일 오후 3시"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={groupData.meetingSchedule}
                            onChange={(e) => setGroupData({...groupData, meetingSchedule: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            최대 인원
                        </label>
                        <input
                            type="number"
                            required
                            min="2"
                            max="50"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={groupData.maxMembers}
                            onChange={(e) => setGroupData({...groupData, maxMembers: parseInt(e.target.value)})}
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                            모임 만들기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
