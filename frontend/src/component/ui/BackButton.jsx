import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'

export default function BackButton({
  onClick,
  label = 'Back',
  className = '',
  iconOnly = false,
  ariaLabel
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-xl text-slate-700 hover:text-brand bg-white/70 hover:bg-white border border-slate-200/80 shadow-xs backdrop-blur-xs transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-blue-400 ${className}`}
    >
      <HiArrowLeft className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      {!iconOnly && <span>{label}</span>}
    </button>
  )
}

