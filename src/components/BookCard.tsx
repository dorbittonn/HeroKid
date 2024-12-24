import React from 'react';
import { BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img 
        src={book.previewImage} 
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-right">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">{book.description}</p>
        <p className="text-sm text-purple-600">גילאים: {book.ageRange}</p>
      </div>
    </div>
  );
}