import { useState } from 'react';
import { generateImage, uploadReferenceImage } from '../services/leonardo.ts';

interface ImageGeneratorProps {
    prompt: string;
    imageFile: File;
}

export function ImageGenerator({ prompt, imageFile }: ImageGeneratorProps) {
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const referenceImageId = await uploadReferenceImage(imageFile);
            console.log('Reference Image ID:', referenceImageId);
            const result = await generateImage(prompt, referenceImageId);
            if (result.imageUrl) {
                setGeneratedImage(result.imageUrl);
            }
        } catch (error) {
            console.error('Failed to generate image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isLoading ? 'Generating...' : 'Generate Image'}
            </button>

            {generatedImage && (
                <div className="mt-6">
                    <h2 className="text-lg font-medium mb-2">Generated Image:</h2>
                    <img
                        src={generatedImage}
                        alt="Generated"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}