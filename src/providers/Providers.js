// src/providers/Providers.js
'use client';

import ReactQueryProvider from './ReactQueryProvider';

export default function Providers({ children }) {
    return (
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
    );
}
