// src/components/common/Button.js
'use client';

const variantStyles = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 text-gray-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    link: 'text-indigo-600 hover:underline',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
};

export default function Button({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    onClick,
    ...props
}) {
    const baseStyles = `
    inline-flex 
    items-center 
    justify-center 
    font-medium 
    rounded-lg 
    transition-colors 
    duration-200 
    focus:outline-none 
    focus:ring-2 
    focus:ring-indigo-500 
    focus:ring-offset-2
    disabled:opacity-50 
    disabled:pointer-events-none
  `;

    const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

    return (
        <button
            type={type}
            className={combinedClassName}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
