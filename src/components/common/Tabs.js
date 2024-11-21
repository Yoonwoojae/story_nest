// src/components/common/Tabs.js
'use client';

import { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export function Tabs({ children, defaultValue, className = '', onChange }) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabChange = (value) => {
        setActiveTab(value);
        onChange?.(value);
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
            <div className={`w-full ${className}`}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className = '' }) {
    return (
        <div className={`flex space-x-1 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
}

export function TabsTrigger({ children, value, className = '' }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === value;

    return (
        <button
            className={`
        px-4 py-2 text-sm font-medium
        ${isActive
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }
        ${className}
      `}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    );
}

export function TabsContent({ children, value, className = '' }) {
    const { activeTab } = useContext(TabsContext);

    if (activeTab !== value) return null;

    return (
        <div className={`mt-4 ${className}`}>
            {children}
        </div>
    );
}
