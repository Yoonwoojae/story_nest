// src/components/learn/AnnotationControls.js
'use client';

import React from 'react';

const AnnotationControls = ({ categories, activeCategory, setActiveCategory, isRecording, onRecordingToggle }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-2">주석 설정</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category)}
                        className={`flex items-center p-2 rounded-lg ${activeCategory.id === category.id ? 'bg-gray-200' : ''}`}
                        style={{ color: category.color }}
                    >
                        <span className="text-xl mr-1">{category.icon}</span>
                        <span className="text-sm">{category.label}</span>
                    </button>
                ))}
            </div>
            <button
                onClick={onRecordingToggle}
                className={`w-full px-4 py-2 rounded-full text-white ${isRecording ? 'bg-red-500' : 'bg-indigo-600'}`}
            >
                {isRecording ? '녹음 중지' : '음성 메모 녹음'}
            </button>
        </div>
    );
};

export default AnnotationControls;
