// Button.tsx
import React from 'react';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <a
      className={`inline-flex h-9 items-center justify-center rounded-full bg-orange-1 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#ff7757]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7757] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
