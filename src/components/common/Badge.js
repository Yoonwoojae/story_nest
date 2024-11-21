// src/components/common/Badge.js
'use client';

const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-indigo-50 text-indigo-600',
    success: 'bg-green-50 text-green-600',
    destructive: 'bg-red-50 text-red-600',
    warning: 'bg-yellow-50 text-yellow-600',
    outline: 'border border-gray-200 text-gray-600',
};

const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
};

export default function Badge({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}) {
    const baseStyles = `
    inline-flex 
    items-center 
    font-medium 
    rounded-full 
    transition-colors 
    duration-200
  `;

    const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

    return (
        <span
            className={combinedClassName}
            {...props}
        >
            {children}
        </span>
    );
}
