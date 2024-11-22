// src/components/learn/BookPage.js
import React from 'react';

const BookPage = ({ content, onMouseUp, fontSize }) => {
    return (
        <div
            className="book-page"
            onMouseUp={onMouseUp}
        >
            <div
                style={{ fontSize: `${fontSize}pt` }}
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default BookPage;
