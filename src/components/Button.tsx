import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  href?: string;  // Optional: switch to an anchor
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const variantClasses = {
    secondary: 'bg-orange-1 text-white hover:bg-[#ff7757]/90 focus:ring-[#ff7757]',
    primary: 'bg-teal-500 text-white hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
    danger: 'bg-red-500 text-white hover:bg-red-400 focus:ring-red-500',
  };

  const sizeClasses = {
    small: 'px-4 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
  };

  const buttonClasses = clsx(
    'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
