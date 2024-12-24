import { ImageGenerator } from './ImageGenerator';

interface BookPreviewProps {
    generatedImageUrl: string | null;
    isLoading: boolean;
}

export function BookPreview({ generatedImageUrl, isLoading }: BookPreviewProps) {
    return (
        <div className="space-y-6">
            {isLoading ? (
                <div className="text-center">
                    <p>מייצר את האיור...</p>
                </div>
            ) : generatedImageUrl && (
                <div className="mt-6">
                    <img
                        src={generatedImageUrl}
                        alt="Generated"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}