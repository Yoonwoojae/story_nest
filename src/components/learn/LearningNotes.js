// src/components/learn/LearningNotes.js
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Trash2 } from 'lucide-react';

export default function LearningNotes({ bookId }) {
    const [notes, setNotes] = useLocalStorage(`book-notes-${bookId}`, []);
    const [currentNote, setCurrentNote] = useState('');

    const addNote = () => {
        if (!currentNote.trim()) return;

        const newNote = {
            id: Date.now(),
            content: currentNote,
            timestamp: new Date().toISOString(),
        };

        setNotes(prev => [newNote, ...prev]);
        setCurrentNote('');
    };

    const deleteNote = (noteId) => {
        setNotes(prev => prev.filter(note => note.id !== noteId));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-4">학습 노트</h3>
            <div className="space-y-4">
                <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="학습 중 떠오른 생각을 메모하세요..."
                    className="w-full h-24 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={addNote}
                    disabled={!currentNote.trim()}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                             disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    노트 추가
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {notes.map(note => (
                    <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                            <div className="text-sm text-gray-500">
                                {new Date(note.timestamp).toLocaleString()}
                            </div>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <p className="mt-2 text-gray-700">{note.content}</p>
                    </div>
                ))}
                {notes.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        작성된 노트가 없습니다
                    </div>
                )}
            </div>
        </div>
    );
}
