import { useState } from 'react';
import { generateImage, uploadImage } from '../services/leonardo.ts';

export function ImageGenerator() {
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !prompt) return;

        setIsLoading(true);
        try {
            const referenceImageId = await uploadImage(selectedFile);
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
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Upload Reference Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Enter Prompt
                    </label>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        placeholder="Describe the image you want to generate..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !selectedFile || !prompt}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isLoading ? 'Generating...' : 'Generate Image'}
                </button>
            </form>

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