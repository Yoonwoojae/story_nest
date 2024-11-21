// src/hooks/useLocalStorage.js
'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // 초기 상태를 lazy하게 설정
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    // 값이 변경될 때마다 localStorage 업데이트
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
