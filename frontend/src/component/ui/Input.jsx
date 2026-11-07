import React from 'react'

export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  error = '',
  helperText = '',
  leftIcon: LeftIcon,
  rightElement,
  disabled = false,
  className = '',
  inputClassName = '',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full h-11 px-3.5 ${LeftIcon ? 'pl-10' : ''} ${rightElement ? 'pr-12' : ''} text-sm rounded-xl border ${
            error
              ? 'border-danger focus:ring-danger/25 focus:border-danger'
              : 'border-slate-300/80 hover:border-slate-400 focus:border-brand focus:ring-brand/20 dark:border-slate-700 dark:hover:border-slate-600'
          } bg-white/90 focus:bg-white text-slate-900 placeholder:text-slate-400 shadow-2xs outline-none focus:ring-3 transition-all duration-200 disabled:opacity-50 disabled:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 ${inputClassName}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <span className="text-xs text-danger font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-slate-500 dark:text-slate-400">{helperText}</span>
      ) : null}
    </div>
  )
}

