// src/components/learn/modes/components/AnnotationEditor.js
import React, { useState } from 'react';

export default function AnnotationEditor({ annotation, onSave, onCancel }) {
    const [editedNote, setEditedNote] = useState(annotation.note);

    const handleSave = () => {
        onSave({ note: editedNote });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Edit Annotation</h3>
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Original text:</p>
                    <p className="text-gray-800">{annotation.text}</p>
                </div>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    rows={4}
                    placeholder="Add your notes here..."
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
