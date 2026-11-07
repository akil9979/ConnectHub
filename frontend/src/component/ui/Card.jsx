import React from 'react'

export default function Card({
  children,
  className = '',
  hoverable = false,
  as = 'div',
  onClick,
  ...props
}) {
  const Component = as
  const hoverStyles = hoverable
    ? 'hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300/90 hover:bg-white transition-all duration-200 cursor-pointer'
    : 'transition-all duration-200'

  return (
    <Component
      onClick={onClick}
      className={`bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-sm p-5 sm:p-6 dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-none ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
