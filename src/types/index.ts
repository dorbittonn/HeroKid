export interface BookType {
  id: string;
  title: string;
  description: string;
  previewImage: string;
  ageRange: string;
}

export interface BookPage {
  pageNumber: number;
  imagePrompt: string;
  text: string;
  generatedImage?: string;
}

export interface ChildInfo {
  name: string;
  age: number;
  gender: string;
  photo?: string;
}

export interface LeonardoResponse {
  id: string;
  status: 'pending' | 'complete' | 'failed';
  imageUrl?: string;
}