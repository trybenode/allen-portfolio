export type ScreenKind = 'phone' | 'web';

interface ScreenFrameProps {
  src: string;
  alt: string;
  kind: ScreenKind;
  /** Sizing/aspect comes from the parent, e.g. "aspect-[9/19.5] h-full". */
  className?: string;
  /** Extra classes for the <img>, used for the scrim/hover treatment. */
  imgClassName?: string;
  eager?: boolean;
}

/**
 * Wraps a screenshot in a device chrome so phone and desktop captures share
 * one visual language instead of looking like two unrelated image sets.
 * Phones get a bezel, web captures get a browser title bar.
 */
export default function ScreenFrame({
  src,
  alt,
  kind,
  className = '',
  imgClassName = '',
  eager = false,
}: ScreenFrameProps) {
  const shell =
    'overflow-hidden border border-white/15 bg-white/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.35)]';

  if (kind === 'web') {
    return (
      <div className={`flex flex-col rounded-xl ${shell} ${className}`}>
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 shrink-0">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          className={`w-full flex-1 min-h-0 object-cover object-top ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div className={`rounded-[20px] p-1 ${shell} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        className={`w-full h-full object-cover object-top rounded-[16px] ${imgClassName}`}
      />
    </div>
  );
}
