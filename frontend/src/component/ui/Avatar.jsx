import React, { useState } from 'react'
import defaultProfile from '../../assets/profile.webp'

export default function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
  ring = true,
  onClick
}) {
  const [imgError, setImgError] = useState(false)

  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl'
  }

  const getInitials = (str) => {
    if (!str) return 'U'
    const parts = str.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  const ringStyles = ring
    ? 'ring-2 ring-white/90 shadow-xs dark:ring-slate-800'
    : ''

  const resolvedSize = sizeMap[size] || sizeMap.md

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 select-none bg-gradient-to-br from-brand-subtle to-accent-light text-brand-dark font-semibold ${resolvedSize} ${ringStyles} ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
      aria-label={alt || name || 'User avatar'}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <img
          src={defaultProfile}
          alt={alt || 'Default avatar'}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

