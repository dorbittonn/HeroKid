import React from 'react';
import { useImageGeneration } from '../hooks/useImageGeneration';

interface BookPreviewProps {
  prompt: string;
}

export function BookPreview({ prompt }: BookPreviewProps) {
  const { status, imageUrl, error } = useImageGeneration(prompt);

  if (status === 'idle') return null;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      {status === 'generating' && (
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      )}
      
      {status === 'complete' && imageUrl && (
        <img src={imageUrl} alt="Generated preview" className="w-full h-64 object-cover" />
      )}
      
      {status === 'error' && (
        <div className="h-64 bg-red-50 flex items-center justify-center text-red-500 p-4 text-center">
          {error || 'Failed to generate image'}
        </div>
      )}
    </div>
  );
}