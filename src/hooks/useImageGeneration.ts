import { useState, useEffect } from 'react';
import { generateImage, uploadReferenceImage, checkGenerationStatus } from '../services/leonardo';
import type { LeonardoResponse } from '../types';

export function useImageGeneration(prompt: string | null, imageFile: File | null) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'generating' | 'complete' | 'error'>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!prompt || !imageFile) return;

    let timeoutId: number;
    let isMounted = true;

    const checkStatus = async (generationId: string) => {
      try {
        const response = await checkGenerationStatus(generationId);
        if (!isMounted) return;

        if (response.status === 'complete' && response.imageUrl) {
          setStatus('complete');
          setImageUrl(response.imageUrl);
        } else if (response.status === 'failed') {
          setStatus('error');
          setError('Image generation failed');
        } else {
          timeoutId = window.setTimeout(() => checkStatus(generationId), 2000);
        }
      } catch (err) {
        if (!isMounted) return;
        setStatus('error');
        setError('Failed to check generation status');
      }
    };

    const startGeneration = async () => {
      try {
        setStatus('uploading');
        const referenceImageId = await uploadReferenceImage(imageFile);
        
        setStatus('generating');
        const response = await generateImage(prompt, referenceImageId);
        if (!isMounted) return;
        
        checkStatus(response.id);
      } catch (err) {
        if (!isMounted) return;
        setStatus('error');
        setError('Failed to start image generation');
      }
    };

    startGeneration();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [prompt, imageFile]);

  return { status, imageUrl, error };
}