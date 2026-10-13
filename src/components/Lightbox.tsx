import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  images: { src: string; alt: string }[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 80;

/**
 * Full-size viewer for gallery thumbnails. Keyboard (Esc / ← / →), swipe on
 * touch, click the backdrop to close. Locks page scroll while open.
 */
export default function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  const count = images.length;

  const prev = () => index !== null && onChange((index - 1 + count) % count);
  const next = () => index !== null && onChange((index + 1) % count);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // prev/next close over `index`; re-bind whenever it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full p-2 text-[#D7E2EA] bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={22} />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full p-2 sm:p-3 text-[#D7E2EA] bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full p-2 sm:p-3 text-[#D7E2EA] bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[84vw] sm:max-w-[80vw] object-contain rounded-2xl select-none"
              draggable={false}
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x > SWIPE_THRESHOLD) prev();
                else if (info.offset.x < -SWIPE_THRESHOLD) next();
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </AnimatePresence>

          <p className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 font-mono text-[#D7E2EA]/60 text-xs tracking-widest">
            {index + 1} / {count}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
