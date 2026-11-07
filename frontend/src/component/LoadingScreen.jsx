import React from 'react'

function LoadingScreen() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-light/60 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent-light/60 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="flex flex-col items-center gap-5 z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-brand/25">
            C
          </div>
          <div className="absolute -inset-2.5 rounded-3xl border-2 border-brand/20 animate-ping opacity-60 pointer-events-none" />
        </div>

        <div className="flex flex-col items-center text-center mt-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
            ConnectHub
          </h2>
          <div className="flex items-center gap-2.5 mt-2.5 text-sm text-slate-500 font-medium">
            <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            <span>Connecting to your network...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
