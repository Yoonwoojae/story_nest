// src/components/learn/LearningContent.js
'use client';

import { useState } from 'react';
import { BookOpen, BrainCircuit, MessageCircle } from 'lucide-react';
import BasicMode from './modes/BasicMode';
import FocusMode from './modes/FocusMode';
import AnnotationMode from './modes/AnnotationMode';

export default function LearningContent({
    bookData,
    autoScroll,
    scrollSpeed,
    fontSize,
    setFontSize,
    isCompleted,
    onComplete,
    onProgressUpdate,
    categories,
    activeCategory,
    setActiveCategory,
    isRecording,
    onRecordingToggle,
    audioUrl
}) {
    const [readingMode, setReadingMode] = useState('normal');

    const getCurrentMode = () => {
        const props = {
            content: bookData.content,
            autoScroll,
            scrollSpeed,
            fontSize,
            isCompleted,
            onComplete,
            onProgressUpdate,
            categories,
            activeCategory,
            setActiveCategory,
            isRecording,
            onRecordingToggle,
            audioUrl
        };

        switch (readingMode) {
        case 'normal':
            return <BasicMode {...props} />;
        case 'focus':
            return <FocusMode {...props} />;
        case 'annotation':
            return <AnnotationMode {...props} />;
        default:
            return <BasicMode {...props} />;
        }
    };

    return (
        <div>
            <div className="sticky top-16 bg-white z-10 pb-4">
                <div className="flex justify-between items-center mb-4 pt-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{bookData.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">저자: {bookData.author}</p>
                    </div>
                </div>

                <div className="border-b">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setReadingMode('normal')}
                            className={`flex items-center space-x-2 px-4 py-3 ${
                                readingMode === 'normal'
                                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <BookOpen size={20} />
                            <span>기본 읽기</span>
                        </button>
                        <button
                            onClick={() => setReadingMode('focus')}
                            className={`flex items-center space-x-2 px-4 py-3 ${
                                readingMode === 'focus'
                                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <BrainCircuit size={20} />
                            <span>집중 읽기</span>
                        </button>
                        <button
                            onClick={() => setReadingMode('annotation')}
                            className={`flex items-center space-x-2 px-4 py-3 ${
                                readingMode === 'annotation'
                                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <MessageCircle size={20} />
                            <span>주석 달기</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {getCurrentMode()}
            </div>
        </div>
    );
}
