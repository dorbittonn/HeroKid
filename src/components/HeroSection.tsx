import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-purple-600 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">הפכו את ילדכם לגיבור הסיפור שלו</h1>
        <p className="text-xl mb-8">צרו הרפתקאות מותאמות אישית שבהן ילדכם הוא הדמות הראשית!</p>
        <button 
          onClick={() => navigate('/create')}
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors flex items-center mx-auto"
        >
          <ChevronLeft className="mr-2" /> צור ספר משלך
        </button>
      </div>
    </section>
  );
}