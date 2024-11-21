// src/components/learn/modes/AnnotationMode.js
import { useState, useEffect } from 'react';
import CategorySelector from './components/CategorySelector';
import AnnotationList from './components/AnnotationList';
import AnnotationToolbar from './components/AnnotationToolbar';
import { defaultCategories } from '../constants/annotationCategories';

export default function AnnotationMode({ content }) {
    const [annotations, setAnnotations] = useState([]);
    const [activeCategory, setActiveCategory] = useState('important');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedText, setSelectedText] = useState(null);
    const [toolbarPosition, setToolbarPosition] = useState(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.annotation-toolbar')) {
                setToolbarPosition(null);
                setSelectedText(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTextSelection = () => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            setSelectedText({
                text,
                range,
                category: activeCategory
            });

            setToolbarPosition({
                top: rect.bottom + window.scrollY + 10,
                left: rect.left + (rect.width / 2)
            });
        }
    };

    const addAnnotation = (note = '') => {
        if (!selectedText) return;

        const newAnnotation = {
            id: Date.now(),
            text: selectedText.text,
            category: selectedText.category,
            note,
            timestamp: new Date().toISOString()
        };

        setAnnotations(prev => [...prev, newAnnotation]);
        setToolbarPosition(null);
        setSelectedText(null);
    };

    return (
        <div className="flex gap-6">
            {/* 본문 영역 */}
            <div className="flex-1">
                <div
                    className="prose max-w-none"
                    onMouseUp={handleTextSelection}
                >
                    <div
                        className="text-gray-800 leading-relaxed relative"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

                {/* 텍스트 선택 시 나타나는 도구 모음 */}
                {toolbarPosition && (
                    <AnnotationToolbar
                        position={toolbarPosition}
                        onAdd={addAnnotation}
                        onCancel={() => {
                            setToolbarPosition(null);
                            setSelectedText(null);
                        }}
                    />
                )}
            </div>

            {/* 사이드바 */}
            <div className="w-80 shrink-0">
                <div className="sticky top-4 space-y-6">
                    <CategorySelector
                        categories={defaultCategories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                    <AnnotationList
                        annotations={annotations}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onAnnotationUpdate={(id, updates) => {
                            setAnnotations(prev =>
                                prev.map(a => a.id === id ? { ...a, ...updates } : a)
                            );
                        }}
                        onAnnotationDelete={(id) => {
                            setAnnotations(prev => prev.filter(a => a.id !== id));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
