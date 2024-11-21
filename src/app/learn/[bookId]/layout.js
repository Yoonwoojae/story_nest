// src/app/learn/[bookId]/layout.js
import { use } from 'react';

export default function LearnLayout({ children, params }) {
    const { bookId } = use(Promise.resolve(params));

    return (
        <div>
            {children}
        </div>
    );
}
