import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'purple'
    | 'success'
    | 'warning'
    | 'danger'
    | 'neutral'
    | 'beginner'
    | 'intermediate'
    | 'advanced'
    | 'easy'
    | 'medium'
    | 'hard';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-medium tracking-wide',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  const variantStyles = {
    primary: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/60',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    beginner: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    intermediate: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
    advanced: 'bg-purple-50 text-purple-700 border border-purple-200/80',
    easy: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    medium: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    hard: 'bg-rose-50 text-rose-700 border border-rose-200/80',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
