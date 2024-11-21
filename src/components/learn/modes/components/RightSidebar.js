// src/components/learn/modes/components/RightSidebar.js
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function RightSidebar({ progress, bookId, isCompleted }) {
    const [notes, setNotes] = useLocalStorage(`book-notes-${bookId}`, []);
    const [currentNote, setCurrentNote] = useState('');

    const addNote = () => {
        if (!currentNote.trim()) return;

        setNotes(prev => [...prev, {
            id: Date.now(),
            content: currentNote,
            timestamp: new Date().toISOString(),
            progress: Math.round(progress)
        }]);
        setCurrentNote('');
    };

    return (
        <div className="w-80 ml-8">
            <div className="sticky top-4 space-y-6">
                {/* 진행 상태 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">읽기 진행률</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>전체 진행률</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-indigo-600 h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* 학습 노트 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">학습 노트</h3>
                    <div className="space-y-4">
                        <textarea
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            placeholder="학습 중 떠오른 생각을 메모하세요..."
                            className="w-full h-32 p-3 border rounded-lg resize-none"
                        />
                        <button
                            onClick={addNote}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            노트 추가
                        </button>
                    </div>

                    {/* 노트 목록 */}
                    <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto">
                        {notes.map(note => (
                            <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500 mb-2">
                                    {new Date(note.timestamp).toLocaleString()} · {note.progress}% 지점
                                </div>
                                <p className="text-gray-700">{note.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
