// src/components/learn/FontSizeControl.js
import { useState } from 'react';

export default function FontSizeControl({ fontSize, onFontSizeChange }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">글자 크기</h3>
                <span className="text-sm text-gray-500">{fontSize}pt</span>
            </div>
            <div className="space-y-2">
                <input
                    type="range"
                    min="12"
                    max="24"
                    step="1"
                    value={fontSize}
                    onChange={(e) => onFontSizeChange(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                    <span>12pt</span>
                    <span>16pt</span>
                    <span>24pt</span>
                </div>
            </div>
        </div>
    );
}
