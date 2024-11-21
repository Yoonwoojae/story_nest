// src/components/learn/constants/annotationCategories.js
import {
    Star,
    HelpCircle,
    Lightbulb,
    BookOpen,
    Flag
} from 'lucide-react';

export const defaultCategories = [
    {
        id: 'important',
        label: '중요',
        color: 'yellow',
        icon: Star
    },
    {
        id: 'question',
        label: '질문',
        color: 'blue',
        icon: HelpCircle
    },
    {
        id: 'insight',
        label: '통찰',
        color: 'green',
        icon: Lightbulb
    },
    {
        id: 'vocabulary',
        label: '어휘',
        color: 'purple',
        icon: BookOpen
    },
    {
        id: 'review',
        label: '복습',
        color: 'red',
        icon: Flag
    }
];
