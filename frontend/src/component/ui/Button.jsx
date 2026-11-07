import React from 'react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  loadingText,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]'

  const variantClasses = {
    primary:
      'bg-brand text-white shadow-sm hover:bg-brand-dark hover:shadow-md border border-transparent',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 shadow-xs dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:border-slate-700',
    outline:
      'bg-white/80 backdrop-blur-xs text-brand border border-brand/30 hover:bg-brand-light hover:border-brand shadow-xs dark:bg-slate-900/60 dark:text-blue-400 dark:hover:bg-slate-800',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
    danger:
      'bg-danger text-white shadow-sm hover:bg-danger-dark hover:shadow-md border border-transparent',
    dangerOutline:
      'bg-transparent text-danger border border-danger/30 hover:bg-danger-light hover:border-danger dark:hover:bg-red-950/30'
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5 min-w-[72px]',
    md: 'h-10 px-4 text-sm gap-2 min-w-[96px]',
    lg: 'h-12 px-6 text-base gap-2.5 min-w-[120px]'
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
          <span>{children}</span>
        </>
      )}
    </button>
  )
}

