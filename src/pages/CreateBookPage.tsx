import React, { useState } from 'react';
import type { BookType, ChildInfo } from '../types';
import { bookTypes } from '../data/bookTypes';
import { ChildInfoForm } from '../components/ChildInfoForm';
import { BookPreview } from '../components/BookPreview';
import { generateImage, uploadReferenceImage } from '../services/leonardo';
import { motion } from 'framer-motion';

type Step = 'book-type' | 'child-info' | 'generating' | 'preview';

export function CreateBookPage() {
  const [currentStep, setCurrentStep] = useState<Step>('book-type');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleChildInfoSubmit = async (info: ChildInfo) => {
    setChildInfo(info);
    setCurrentStep('generating');
    setIsGenerating(true);

    try {
      // Upload the image and generate
      const referenceImageId = await uploadReferenceImage(info.image);
      const result = await generateImage(
        `Create a children's book illustration for a ${info.age} year old ${
          info.gender === 'זכר' ? 'boy' : 'girl'
        } named ${info.name} in the style of ${selectedBook!.title}`,
        referenceImageId
      );
      
      if (result.imageUrl) {
        setGeneratedImageUrl(result.imageUrl);
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">יצירת ספר מותאם אישית</h1>
        
        {currentStep === 'book-type' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">בחרו את סוג הספר</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookTypes.map((book) => (
                <motion.div
                  key={book.id}
                  className={`p-4 backdrop-blur-sm rounded-lg cursor-pointer transition-colors ${
                    selectedBook?.id === book.id
                      ? 'bg-white/30 border-2 border-cyan-400'
                      : 'bg-white/20 hover:bg-white/25'
                  }`}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedBook(book)}
                >
                  <img
                    src={book.previewImage}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2">{book.description}</p>
                  <p className="text-sm text-purple-600">גילאים: {book.ageRange}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedBook}
                onClick={() => setCurrentStep('child-info')}
              >
                המשך
              </button>
            </div>
          </div>
        )}

        {currentStep === 'child-info' && selectedBook && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">פרטי הילד/ה:</h2>
            <ChildInfoForm onSubmit={handleChildInfoSubmit} />
          </div>
        )}

        {currentStep === 'generating' && selectedBook && childInfo && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">יוצר את הספר שלך...</h2>
            <BookPreview 
              generatedImageUrl={generatedImageUrl}
              isLoading={isGenerating}
            />
          </div>
        )}
      </div>
    </div>
  );
}
