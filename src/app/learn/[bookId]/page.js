// src/app/learn/[bookId]/page.js
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LearningContent from '@/components/learn/LearningContent';
import LearningNotes from '@/components/learn/LearningNotes';
import LearningProgress from '@/components/learn/LearningProgress';
import { fetchBookContent } from '@/lib/api/bookService';
import FontSizeControl from '@/components/learn/FontSizeControl';
import AnnotationControls from '@/components/learn/AnnotationControls';

const categories = [
    { id: 'important', icon: '⭐', color: '#FFD700', label: '중요해요' },
    { id: 'question', icon: '❓', color: '#87CEFA', label: '궁금해요' },
    { id: 'idea', icon: '💡', color: '#90EE90', label: '아이디어' },
    { id: 'vocabulary', icon: '📚', color: '#FFB6C1', label: '새로운 단어' }
];

export default function LearnPage() {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [isCompleted, setIsCompleted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [readingMode, setReadingMode] = useState('normal');

    useEffect(() => {
        const loadBookContent = async () => {
            try {
                const data = await fetchBookContent(bookId);
                setBookData(data);
            } catch (error) {
                console.error('Failed to load book content:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBookContent();
    }, [bookId]);

    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
    };

    const handleComplete = (isCompleting) => {
        console.log('Completion status changing to:', isCompleting);
        setIsCompleted(isCompleting);
    };

    const handleRecordingToggle = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            // 녹음 시작 로직
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    const audioChunks = [];

                    mediaRecorder.addEventListener('dataavailable', event => {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener('stop', () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        setAudioUrl(audioUrl);
                    });

                    mediaRecorder.start();
                    setIsRecording(true);
                });
        } else {
            // 녹음 중지 로직
            // 여기서는 녹음 중지 로직을 구현해야 합니다.
            // 실제 MediaRecorder 인스턴스에 접근할 수 있어야 합니다.
            setIsRecording(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] mt-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!bookData) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] mt-16">
                <div className="text-gray-500">콘텐츠를 불러올 수 없습니다.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="pt-16">
                <div className="max-w-7xl mx-auto flex">
                    <div className="flex-1 bg-white border-r border-gray-200">
                        <div className="px-6">
                            <LearningContent
                                bookData={bookData}
                                fontSize={fontSize}
                                isCompleted={isCompleted}
                                onComplete={handleComplete}
                                onProgressUpdate={setProgress}
                                categories={categories}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                                isRecording={isRecording}
                                onRecordingToggle={handleRecordingToggle}
                                audioUrl={audioUrl}
                                readingMode={readingMode}
                                setReadingMode={setReadingMode}
                            />
                        </div>
                    </div>

                    <div className="w-[320px]">
                        <div className="sticky top-16 p-5 space-y-4">
                            <FontSizeControl
                                fontSize={fontSize}
                                onFontSizeChange={setFontSize}
                            />
                            {readingMode === 'annotation' && (
                                <AnnotationControls
                                    categories={categories}
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                    isRecording={isRecording}
                                    onRecordingToggle={handleRecordingToggle}
                                    audioUrl={audioUrl}
                                />
                            )}
                            <LearningProgress
                                progress={progress}
                                isCompleted={isCompleted}
                                onComplete={handleComplete}
                            />
                            <LearningNotes bookId={bookId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
