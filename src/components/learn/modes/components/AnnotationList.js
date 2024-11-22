// src/components/learn/modes/components/AnnotationList.js
import { Search, X } from 'lucide-react';
import AnnotationCard from '@/components/learn/modes/components/AnnotationCard';
export default function AnnotationList({
    annotations,
    searchTerm,
    onSearchChange,
    onAnnotationUpdate,
    onAnnotationDelete
}) {
    const filteredAnnotations = annotations.filter(anno =>
        anno.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anno.note.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* 검색 */}
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="주석 검색..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
            </div>

            {/* 주석 목록 */}
            <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto">
                {filteredAnnotations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {searchTerm ? '검색 결과가 없습니다.' : '주석을 추가해보세요.'}
                    </div>
                ) : (
                    filteredAnnotations.map(anno => (
                        <AnnotationCard
                            key={anno.id}
                            annotation={anno}
                            onUpdate={updates => onAnnotationUpdate(anno.id, updates)}
                            onDelete={() => onAnnotationDelete(anno.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
