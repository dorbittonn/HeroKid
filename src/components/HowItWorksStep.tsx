import React from 'react';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

export function HowItWorksStep({ number, title, description }: HowItWorksStepProps) {
  return (
    <div className="text-center">
      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-purple-600">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}