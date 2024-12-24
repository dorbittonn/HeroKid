import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CreateBookPage } from './pages/CreateBookPage';

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateBookPage />} />
      </Routes>
    </div>
  );
}