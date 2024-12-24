import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <nav className="flex gap-8">
            <Link to="/gallery" className="hover:text-purple-200">גלריה</Link>
            <Link to="/create" className="hover:text-purple-200">יצירת ספר</Link>
            <Link to="/" className="hover:text-purple-200">דף הבית</Link>
          </nav>
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">גיבור הסיפור</h1>
            <BookOpen className="h-8 w-8" />
          </div>
        </div>
      </div>
    </header>
  );
}