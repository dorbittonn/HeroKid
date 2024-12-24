import React from 'react';
import { HowItWorksStep } from './HowItWorksStep';

const steps = [
  {
    number: 1,
    title: 'בחרו הרפתקה',
    description: 'בחרו מתוך מגוון נושאי סיפור מרתקים'
  },
  {
    number: 2,
    title: 'התאמה אישית',
    description: 'הוסיפו את פרטי ילדכם ותמונה כדי להפוך אותו לכוכב'
  },
  {
    number: 3,
    title: 'יצירת קסם',
    description: 'צפו כיצד הבינה המלאכותית מביאה את ההרפתקה של ילדכם לחיים'
  }
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">איך זה עובד?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <HowItWorksStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}