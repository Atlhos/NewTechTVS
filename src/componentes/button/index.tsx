import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    className?: string;
    children?: React.ReactNode;
}

function Button({ text, className = '', children, ...rest }: ButtonProps) {
    return (
        <button
        {...rest}
        className={`bg-main text-white p-6 py-3 rounded-lg text-xs md:text-md font-semibold hover:bg-mainDark cursor-pointer ${className}`}
        >
        {children ?? text}
        </button>
    );
}

export default Button;
