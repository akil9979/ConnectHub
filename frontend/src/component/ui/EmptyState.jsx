import React from 'react'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = ''
}) {
  return (
    <div
      className={`w-full bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-xs flex flex-col items-center justify-center p-8 sm:p-12 text-center gap-4 dark:bg-slate-900/80 dark:border-slate-800 ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand shadow-xs border border-brand/10 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800">
          <Icon className="w-8 h-8" aria-hidden="true" />
        </div>
      )}
      <div className="max-w-sm flex flex-col gap-1.5">
        {title && (
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

