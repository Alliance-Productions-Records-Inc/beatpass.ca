import React from 'react';

const LOGOS = {
  darkDesktop: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/8524b656-7e0d-4271-9503-03d515ac6ecc.png',
  darkMobile: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/2e638426-07a8-4a23-bfcc-c30e5d588bf8.png',
  lightDesktop: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/e5cfac08-433a-4dfd-b575-b1cfdb75ea81.png',
  lightMobile: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/48747fba-5202-43ce-8022-3a68dcc87277.png',
};

const Brand: React.FC<{ variant?: 'navigation' | 'footer' }> = ({ variant = 'navigation' }) => (
  <a href="/" className="landing-brand" aria-label="BeatPass home">
    <picture data-theme-logo data-dark-desktop={LOGOS.darkDesktop} data-dark-mobile={variant === 'footer' ? LOGOS.darkDesktop : LOGOS.darkMobile}
      data-light-desktop={LOGOS.lightDesktop} data-light-mobile={variant === 'footer' ? LOGOS.lightDesktop : LOGOS.lightMobile}>
      <source data-logo-mobile media="(max-width: 767px)" srcSet={variant === 'footer' ? LOGOS.darkDesktop : LOGOS.darkMobile} />
      <source data-logo-desktop media="(min-width: 768px)" srcSet={LOGOS.darkDesktop} />
      <img data-logo-img src={LOGOS.darkDesktop} alt="BeatPass" width="180" height="44" />
    </picture>
  </a>
);

export default Brand;
