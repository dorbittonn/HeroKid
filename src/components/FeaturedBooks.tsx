import React from 'react';
import { Sparkles } from 'lucide-react';
import { BookCard } from './BookCard';
import { bookTypes } from '../data/bookTypes';

export function FeaturedBooks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">הרפתקאות מומלצות</h2>
          <Sparkles className="text-purple-600 mr-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookTypes.map((book) => (
            <BookCard 
              key={book.id} 
              book={book}
              onClick={() => console.log('Selected book:', book.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}