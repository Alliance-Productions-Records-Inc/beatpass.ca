import React from 'react';
import { ArrowForwardIcon } from '@/components/icons/material/ArrowForward';
import { ChannelCarousel } from '@/components/ui/ChannelCarousel';
import { APP_URLS } from '@/utils/navigation';

const PATHS = [
  { role: 'For artists & creators', title: 'Find your next beat.', description: 'Listen, find your sound and choose the license for your next release.', action: 'Compare plans', href: APP_URLS.pricing, image: '/images/landing/artist-studio-current.webp', className: 'artist-path' },
  { role: 'For producers', title: 'Put your beats out there.', description: 'Build your catalog, shape your license offers and connect with artists.', action: 'Explore the Producer Program', href: APP_URLS.producers, image: '/images/landing/producer-studio-current.webp', className: 'producer-path' },
];

export default function AudiencePaths() {
  return <section className="landing-shell landing-section">
    <ChannelCarousel mobileOnly title="Take your next step." description="Two sides of the session. Where will you go?" label="paths">{PATHS.map(path => <a key={path.role} href={path.href} className={`landing-path ${path.className}`}>
      <img className="landing-path-image" src={path.image} alt="" width="960" height="1080" loading="lazy" onError={event => { event.currentTarget.hidden = true; }} />
      <span className="landing-path-shade" />
      <span className="landing-path-copy"><span className="landing-path-role">{path.role}</span><h3>{path.title}</h3><span className="landing-path-description">{path.description}</span><span className="landing-path-action">{path.action}<ArrowForwardIcon size="sm" /></span></span>
    </a>)}</ChannelCarousel>
  </section>;
}
