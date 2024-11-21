// src/hooks/useScrollPosition.js
import { useState, useEffect } from 'react';

export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showFloating, setShowFloating] = useState(false);

    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                const position = window.pageYOffset;
                setScrollPosition(position);
                setShowFloating(position > 500);
                timeoutId = null;
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return { scrollPosition, showFloating };
}
