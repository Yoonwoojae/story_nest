// src/components/learn/modes/AnnotationMode.js
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookPage from '../BookPage';

const PageNavigation = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-between items-center mt-4 w-full max-w-3xl mx-auto">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300"
            >
                <ChevronLeft size={20} />
                <span>이전</span>
            </button>
            <span className="text-gray-600">{currentPage} / {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300"
            >
                <span>다음</span>
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default function AnnotationMode({
    content,
    fontSize,
    categories,
    activeCategory,
    setActiveCategory,
    isRecording,
    onRecordingToggle,
    audioUrl,
    isCompleted,
    onComplete
}) {
    const [annotations, setAnnotations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageContents, setPageContents] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        if (typeof content === 'string') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const pageElements = doc.querySelectorAll('.page');
            const pages = Array.from(pageElements).map(el => el.outerHTML);
            setPageContents(pages);
        } else {
            console.error('Unexpected content type:', typeof content);
            setPageContents([]);
        }
    }, [content]);

    useEffect(() => {
        const savedAnnotations = localStorage.getItem('annotations');
        if (savedAnnotations) {
            setAnnotations(JSON.parse(savedAnnotations));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('annotations', JSON.stringify(annotations));
        restoreHighlights();
    }, [annotations, currentPage]);

    const getAllTextNodes = (node) => {
        const textNodes = [];
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        let currentNode;
        while (currentNode = walker.nextNode()) {
            textNodes.push(currentNode);
        }
        return textNodes;
    };

    const restoreHighlights = useCallback(() => {
        if (!contentRef.current) return;

        // 기존 하이라이트 제거
        contentRef.current.querySelectorAll('.highlight').forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });

        // 현재 페이지의 주석만 하이라이트
        annotations
            .filter(ann => ann.page === currentPage)
            .forEach(annotation => {
                highlightRange(annotation);
            });
    }, [annotations, currentPage]);

    const handleTextSelection = useCallback(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text) {
            const range = selection.getRangeAt(0);
            const allTextNodes = getAllTextNodes(contentRef.current);
            let startOffset = 0;
            let endOffset = 0;

            for (let i = 0; i < allTextNodes.length; i++) {
                const node = allTextNodes[i];
                if (node === range.startContainer) {
                    startOffset += range.startOffset;
                    break;
                }
                startOffset += node.length;
            }

            for (let i = 0; i < allTextNodes.length; i++) {
                const node = allTextNodes[i];
                if (node === range.endContainer) {
                    endOffset += range.endOffset;
                    break;
                }
                endOffset += node.length;
            }

            // 겹치는 주석 확인
            const overlappingAnnotations = annotations.filter(
                ann => ann.page === currentPage && (startOffset < ann.endOffset && endOffset > ann.startOffset)
            );

            if (overlappingAnnotations.length > 0) {
                // 겹치는 주석이 있을 경우 처리
                const confirmed = window.confirm('이미 주석이 있는 부분입니다. 새로운 주석으로 대체하시겠습니까?');
                if (confirmed) {
                    // 겹치는 주석 제거
                    setAnnotations(prev => prev.filter(ann => !overlappingAnnotations.includes(ann)));
                } else {
                    return; // 사용자가 취소한 경우 함수 종료
                }
            }

            const newAnnotation = {
                id: Date.now(),
                text,
                category: activeCategory.id,
                color: activeCategory.color,
                audioUrl: audioUrl,
                startOffset,
                endOffset,
                page: currentPage
            };

            setAnnotations(prev => [...prev, newAnnotation]);
            highlightRange(newAnnotation);

            showToast('주석이 추가되었어요!');
        }
    }, [activeCategory, audioUrl, annotations, currentPage]);

    const highlightRange = (annotation) => {
        const allTextNodes = getAllTextNodes(contentRef.current);
        let currentOffset = 0;

        for (let i = 0; i < allTextNodes.length; i++) {
            const node = allTextNodes[i];
            const nodeLength = node.length;

            if (currentOffset + nodeLength > annotation.startOffset) {
                const startOffset = Math.max(0, annotation.startOffset - currentOffset);
                const endOffset = Math.min(nodeLength, annotation.endOffset - currentOffset);

                if (startOffset < endOffset) {
                    const range = document.createRange();
                    range.setStart(node, startOffset);
                    range.setEnd(node, endOffset);

                    const span = document.createElement('span');
                    span.className = 'highlight';
                    span.style.backgroundColor = annotation.color;
                    span.style.cursor = 'pointer';
                    span.dataset.id = annotation.id;

                    try {
                        range.surroundContents(span);
                    } catch (error) {
                        console.error('Failed to highlight range:', error);
                    }

                    span.addEventListener('click', () => {
                        if (annotation.audioUrl) {
                            new Audio(annotation.audioUrl).play();
                        }
                    });
                }
            }

            if (currentOffset >= annotation.endOffset) {
                break;
            }

            currentOffset += nodeLength;
        }
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#4CAF50';
        toast.style.color = 'white';
        toast.style.padding = '15px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1000';
        document.body.appendChild(toast);

        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pageContents.length) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="mt-4">
            <div ref={contentRef} className="w-full">
                {pageContents.length > 0 && (
                    <BookPage
                        content={pageContents[currentPage - 1]}
                        onMouseUp={handleTextSelection}
                        fontSize={fontSize}
                    />
                )}
            </div>
            {pageContents.length > 1 && (
                <PageNavigation
                    currentPage={currentPage}
                    totalPages={pageContents.length}
                    onPageChange={handlePageChange}
                />
            )}

            {/* 완료 버튼 - BasicMode와 동일한 스타일 적용 */}
            <div className="mt-8 mb-8 flex justify-end">
                <button
                    onClick={() => onComplete?.(!isCompleted)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                        isCompleted
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                >
                    {isCompleted ? '학습 완료 취소' : '학습 완료'}
                </button>
            </div>
        </div>
    );
}
