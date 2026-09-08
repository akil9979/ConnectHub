import React from 'react';

function LoadingScreen() {
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 overflow-hidden'>
      {/* Background ambient shapes */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-[-10rem] left-[-10rem] w-[25rem] h-[25rem] bg-indigo-300/30 rounded-full filter blur-3xl animate-pulse'></div>
        <div className='absolute bottom-[-10rem] right-[-10rem] w-[25rem] h-[25rem] bg-teal-300/30 rounded-full filter blur-3xl animate-pulse'></div>
      </div>

      <div className='flex flex-col items-center gap-4 z-10 animate-in fade-in zoom-in-95 duration-300'>
        {/* Animated Brand Logo */}
        <div className='relative flex items-center justify-center'>
          <div className='w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-blue-500/25 animate-bounce'>
            C
          </div>
          <div className='absolute -inset-2 rounded-3xl border-2 border-blue-500/30 animate-ping opacity-75'></div>
        </div>

        <div className='flex flex-col items-center text-center mt-2'>
          <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>ConnectHub</h2>
          <div className='flex items-center gap-2 mt-2 text-sm text-gray-500 font-medium'>
            <div className='w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            <span>Loading application...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
