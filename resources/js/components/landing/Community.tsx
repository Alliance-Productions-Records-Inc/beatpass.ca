import React from 'react';
import { Button } from '@/components/ui/Button';
import { DiscordIcon } from '@/components/icons/social/discord';
import { YoutubeIcon } from '@/components/icons/social/youtube';

export default function Community() {
  return <section className="landing-community" aria-labelledby="community-heading">
    <img className="community-image" src="/images/landing/community-current.webp" alt="" width="1600" height="640" loading="lazy" onError={event => { event.currentTarget.hidden = true; }} />
    <div className="community-material" aria-hidden="true">{[2, 4, 8, 16].map((blur, index) => <div key={blur} style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: `linear-gradient(transparent ${index * 15}%, black ${30 + index * 15}%)`, WebkitMaskImage: `linear-gradient(transparent ${index * 15}%, black ${30 + index * 15}%)` }} />)}</div>
    <div className="landing-community-inner landing-shell">
      <div className="community-copy">
        <img className="community-logo" src="/images/landing/discord-lockup-white.svg" width="219" height="32" alt="Discord" loading="lazy" />
        <h2 id="community-heading">Keep creating.</h2><p>Trade ideas with artists and producers. Share a work in progress, find a useful guide or catch the latest beat.</p>
        <div className="landing-actions community-actions">
          <Button href="https://discord.com/invite/N257QBkSeg" variant="flat" className="social-button" target="_blank" startIcon={<DiscordIcon size="sm" />}>Join Discord<span className="sr-only"> (opens in a new tab)</span></Button>
          <Button href="https://www.youtube.com/@beatpasswav" variant="outline" className="social-button" target="_blank" startIcon={<YoutubeIcon size="sm" />}>Watch on YouTube<span className="sr-only"> (opens in a new tab)</span></Button>
        </div>
      </div>
    </div>
  </section>;
}
