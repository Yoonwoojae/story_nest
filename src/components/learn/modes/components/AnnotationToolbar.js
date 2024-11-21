// src/components/learn/modes/components/AnnotationToolbar.js
import { Plus, X } from 'lucide-react';

export default function AnnotationToolbar({ position, onAdd, onCancel }) {
    return (
        <div
            className="annotation-toolbar fixed bg-white rounded-lg shadow-lg p-2 flex space-x-2 transform -translate-x-1/2"
            style={{
                top: position.top,
                left: position.left
            }}
        >
            <button
                onClick={() => onAdd()}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg flex items-center space-x-1"
            >
                <Plus size={16} />
                <span>주석 추가</span>
            </button>
            <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"
            >
                <X size={16} />
            </button>
        </div>
    );
}
