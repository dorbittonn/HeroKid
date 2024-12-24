import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedBooks } from '../components/FeaturedBooks';
import { HowItWorks } from '../components/HowItWorks';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedBooks />
      <HowItWorks />
    </>
  );
}