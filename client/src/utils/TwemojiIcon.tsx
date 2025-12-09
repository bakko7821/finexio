import React, { useEffect, useRef } from 'react';

declare const twemoji: { parse: (element: HTMLElement | string) => void };

interface TwemojiIconProps {
  emoji: string;
}

export const TwemojiIcon: React.FC<TwemojiIconProps> = ({ emoji }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && typeof twemoji !== 'undefined') {
      // Это ключевой момент: Twemoji сканирует элемент и заменяет текстовый эмодзи на SVG.
      twemoji.parse(ref.current);
    }
  }, [emoji]);

  // Стилизация для того, чтобы Twemoji выглядел как иконка (фиксированный размер, предотвращение переполнения)
  const style: React.CSSProperties = {
      fontSize: '1em', 
      lineHeight: '1em',
      display: 'inline-block',
  };

  return (
    <span ref={ref} style={style} className="twemoji-icon">
      {emoji}
    </span>
  );
};