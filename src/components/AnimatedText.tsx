import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  // inline-block keeps the word atomic, so a line can only break between
  // words. Per character it broke mid-word ("full-stack web a / nd mobile").
  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

/**
 * Word-by-word scroll reveal: each word fades 0.2 -> 1 based on its position
 * in the sentence relative to scroll progress through the paragraph.
 *
 * Deliberately per word, not per character. Per character meant ~540 nodes
 * each with their own scroll-subscribed motion value, which was a visible
 * cost on phones, and it broke words across lines.
 */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <Word
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
