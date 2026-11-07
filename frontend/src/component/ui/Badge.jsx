import React from 'react'

export default function Badge({
  children,
  variant = 'brand',
  size = 'md',
  className = '',
  onRemove
}) {
  const variantStyles = {
    brand:
      'bg-brand-light text-brand-dark border-brand/20 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    accent:
      'bg-accent-light text-accent-dark border-accent/20 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    neutral:
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    success:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    danger:
      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    warning:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
  }

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md',
    md: 'text-xs sm:text-sm px-3 py-1 rounded-lg',
    lg: 'text-sm px-3.5 py-1.5 rounded-xl'
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border ${variantStyles[variant] || variantStyles.brand} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:opacity-75 focus-visible:outline-none cursor-pointer -mr-0.5"
          aria-label="Remove tag"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

