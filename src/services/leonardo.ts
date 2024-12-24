import type { LeonardoResponse } from '../types';
import { useState } from 'react';

const LEONARDO_API_KEY = import.meta.env.VITE_LEONARDO_API_KEY;
const LEONARDO_API_URL = 'https://api.leonardo.ai/v1/generations';

interface GenerationResponse {
    sdGenerationJob: {
        generationId: string;
    };
    generations_by_pk?: {
        status: string;
        generated_images: Array<{ url: string }>;
    };
}

// First, add a separate upload function
export async function uploadReferenceImage(imageFile: File): Promise<string> {
  const extension = imageFile.name.split('.').pop();
  
  // Get presigned URL
  const initResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/init-image', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${LEONARDO_API_KEY}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ extension })
  });

  if (!initResponse.ok) {
      throw new Error('Failed to initialize image upload');
  }

  const initData = await initResponse.json();
  const { url: uploadUrl, fields, id: imageId } = initData.uploadInitImage;

  // Upload the image
  const formData = new FormData();
  Object.entries(JSON.parse(fields)).forEach(([key, value]) => {
      formData.append(key, value as string);
  });
  formData.append('file', imageFile);

  const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
  });

  if (!uploadResponse.ok) {
      throw new Error('Failed to upload image');
  }

  console.log('Image uploaded successfully, ID:', imageId);
  return imageId;
}

// Modified generate image function
async function generateImage(prompt: string, referenceImageId: string): Promise<LeonardoResponse> {
    const MODEL_ID = import.meta.env.VITE_LEONARDO_MODEL_ID;
    
    try {
        const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LEONARDO_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelId: MODEL_ID,
                prompt: prompt,
                height: 512,
                width: 512,
                negative_prompt: "No disfigured fingers, don't make human's fingers",
                presetStyle: "LEONARDO",
                num_images: 2,
                controlnets: [{
                    initImageId: referenceImageId,
                    initImageType: "UPLOADED",
                    preprocessorId: 133,
                    strengthType: "High"
                }]
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`Generation failed: ${response.status}`);
        }

        const data: GenerationResponse = await response.json();
        
        // Poll for results
        const generationId = data.sdGenerationJob.generationId;
        const images = await pollForResults(generationId);
        return {
            id: generationId,
            status: 'pending',
            imageUrl: images[0]
        };

    } catch (error) {
        console.error('Generation error:', error);
        throw error;
    }
}

// Add polling function
async function pollForResults(generationId: string): Promise<string[]> {
    const statusUrl = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
    const startTime = Date.now();
    const timeout = 300000; // 5 minutes timeout

    while (Date.now() - startTime < timeout) {
        const response = await fetch(statusUrl, {
            headers: {
                'Authorization': `Bearer ${LEONARDO_API_KEY}`,
                'accept': 'application/json'
            }
        });

        const data: GenerationResponse = await response.json();
        const status = data.generations_by_pk?.status;

        if (status === 'COMPLETE' && data.generations_by_pk) {
            return data.generations_by_pk.generated_images.map(img => img.url);
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before next poll
    }

    throw new Error('Generation timed out');
}

export async function checkGenerationStatus(generationId: string): Promise<LeonardoResponse> {
  try {
    const response = await fetch(`${LEONARDO_API_URL}/${generationId}`, {
      headers: {
        'Authorization': `Bearer ${LEONARDO_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to check generation status');
    }

    const data = await response.json();
    
    if (data.generations_by_pk.status === 'COMPLETE') {
      return {
        id: generationId,
        status: 'complete',
        imageUrl: data.generations_by_pk.generated_images[0]?.url,
      };
    } else if (data.generations_by_pk.status === 'FAILED') {
      return {
        id: generationId,
        status: 'failed',
      };
    }

    return {
      id: generationId,
      status: 'pending',
    };
  } catch (error) {
    console.error('Error checking generation status:', error);
    throw error;
  }
}

export { generateImage };