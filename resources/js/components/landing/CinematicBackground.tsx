import React, { useEffect, useRef, useState } from 'react';
import { LANDING_BACKGROUND, LANDING_BACKGROUND_SET } from '@/config/landing';
import { attachParallax } from '@/utils/parallax';

export default function CinematicBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => ref.current ? attachParallax(ref.current) : undefined, []);
  return <div ref={ref} className={`cinematic-scene${failed ? ' is-unavailable' : ''}`} aria-hidden="true">
    <div className="cinematic-art">
      <img src={LANDING_BACKGROUND} srcSet={LANDING_BACKGROUND_SET} sizes="100vw" width="1920" height="1280" alt="" fetchPriority="high" decoding="async" onError={() => setFailed(true)} />
      <div className="cinematic-tone" />
      <div className="cinematic-color" />
      {[{ blur: 2, start: 0, end: 30 }, { blur: 4, start: 14, end: 44 }, { blur: 8, start: 30, end: 60 }, { blur: 12, start: 46, end: 76 }].map(layer => <div key={layer.blur} className="cinematic-blur" style={{ backdropFilter: `blur(${layer.blur}px)`, WebkitBackdropFilter: `blur(${layer.blur}px)`, maskImage: `linear-gradient(transparent ${layer.start}%, black ${layer.end}%)`, WebkitMaskImage: `linear-gradient(transparent ${layer.start}%, black ${layer.end}%)` }} />)}
    </div>
    <div className="cinematic-fade" />
  </div>;
}
