import { ExploreIcon } from '@/components/icons/material/Explore';
import React from 'react';
import { Button } from '@/components/ui/Button';
import CatalogSearch from './CatalogSearch';
import { APP_URLS } from '@/utils/navigation';

export default function Hero() {
  return <section className="landing-shell landing-hero" aria-labelledby="hero-heading">
    <div className="landing-hero-copy">
      <h1 id="hero-heading">Find your sound.<br />Make it yours.</h1>
      <p className="landing-lead">Beats from independent producers, ready for your next idea. Listen first. Choose a license when you’re ready to release.</p>
      <div className="landing-actions">
        <Button href={APP_URLS.discover} variant="flat" color="primary" size="lg" startIcon={<ExploreIcon />}>Explore beats</Button>
        <Button href={APP_URLS.pricing} variant="outline" size="lg">View plans</Button>
      </div>
      <p className="landing-caption">Free listening. Paid plans for eligible downloads.</p>
      <CatalogSearch />
    </div>
  </section>;
}
