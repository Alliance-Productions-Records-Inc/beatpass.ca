import { ArrowForwardIcon } from '@/components/icons/material/ArrowForward';
import React from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { APP_URLS } from '@/utils/navigation';

const QUESTIONS = [
  { question: 'Do I need an account to listen?', answer: 'You can explore and stream beats for free. Create an account to save favorites, build playlists and connect with producers.', href: APP_URLS.discover, label: 'Explore beats' },
  { question: 'Where can I compare plans and license details?', answer: 'The pricing page has the current plans, billing information and licensing details. Paid plans cover eligible non-exclusive downloads. Exclusive offers are separate.', href: APP_URLS.pricing, label: 'View plans and details' },
  { question: 'How do I publish my beats?', answer: 'Start with the Producer Program to explore the tools and application process. Once your application is approved, you can start publishing.', href: APP_URLS.producers, label: 'Explore the Producer Program' },
];

const FAQ: React.FC = () => (
  <section className="landing-shell landing-section landing-faq" aria-labelledby="landing-faq-heading">
    <div className="landing-section-heading"><h2 id="landing-faq-heading">Before you jump in.</h2><p>A quick introduction. The full details are in the app.</p></div>
    <Accordion items={QUESTIONS.map((item, index) => ({ id: `question-${index}`, label: item.question, content: <><p>{item.answer}</p><Button href={item.href} variant="link" color="primary" endIcon={<ArrowForwardIcon />}>{item.label}</Button></> }))} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: QUESTIONS.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }) }} />
  </section>
);

export default FAQ;
