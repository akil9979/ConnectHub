import React from 'react'

export function Skeleton({ className = '', rounded = 'rounded-xl', ...props }) {
  return (
    <div
      className={`skeleton-shimmer bg-slate-200/70 dark:bg-slate-800/70 ${rounded} ${className}`}
      {...props}
    />
  )
}

export function PostSkeleton() {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-xs p-5 sm:p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12" rounded="rounded-full" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="w-1/3 h-4" />
          <Skeleton className="w-1/4 h-3" />
        </div>
      </div>
      <div className="flex flex-col gap-2 my-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-5/6 h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
      <Skeleton className="w-full h-48" rounded="rounded-2xl" />
      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
      </div>
    </div>
  )
}

export function UserCardSkeleton() {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/70 p-4 flex items-center justify-between gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12" rounded="rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-40 h-3" />
        </div>
      </div>
      <Skeleton className="w-24 h-9" rounded="rounded-xl" />
    </div>
  )
}

