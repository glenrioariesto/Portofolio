import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fbead4] z-[9999]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-custom-progress {
          animation: custom-progress 2s ease-in-out infinite;
        }
      `}} />
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner Ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-amber-950/10 border-t-amber-950 animate-spin" />
          <div className="absolute inset-3 rounded-full bg-amber-900/20 animate-pulse" />
        </div>
        
        {/* Progress Bar & Text */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-xs font-bold tracking-widest text-amber-950/80 uppercase animate-pulse">
            Loading
          </h2>
          <div className="w-32 h-1 bg-amber-950/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-900 rounded-full animate-custom-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
