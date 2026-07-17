'use client';

import { useState } from 'react';

export default function InitiativeGallery({ mediaUrls }: { mediaUrls: string[] }) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  if (!mediaUrls || mediaUrls.length === 0) return null;

  return (
    <>
      <section className="py-16" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-center mb-12">
            <span
              className="font-bold text-sm uppercase tracking-[.15em] mb-3 block"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Photo & Video Gallery
            </span>
            <h2
              className="font-extrabold"
              style={{ color: '#6E1110', fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Moments From the Event
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {mediaUrls.map((mediaSrc, idx) => {
              const isVideo = mediaSrc.includes('video') || mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.startsWith('data:video');
              return (
                <div
                  key={idx}
                  className="gallery-thumb relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer group"
                  style={{ aspectRatio: '1/1' }}
                  onClick={() => setSelectedMedia(mediaSrc)}
                >
                  {isVideo ? (
                    <video
                      src={mediaSrc}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={mediaSrc}
                      alt={`Gallery media ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)' }}
          onClick={() => setSelectedMedia(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-4xl hover:text-gray-300 transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMedia(null);
            }}
          >
            &times;
          </button>
          
          <div 
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.includes('video') || selectedMedia.endsWith('.mp4') || selectedMedia.endsWith('.webm') || selectedMedia.startsWith('data:video') ? (
              <video 
                src={selectedMedia} 
                controls 
                autoPlay 
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
            ) : (
              <img 
                src={selectedMedia} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
