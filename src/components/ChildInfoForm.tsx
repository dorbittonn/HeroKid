import React from 'react';
import type { ChildInfo } from '../types';

interface ChildInfoFormProps {
  onSubmit: (childInfo: ChildInfo) => void;
}

export function ChildInfoForm({ onSubmit }: ChildInfoFormProps) {
  const [formData, setFormData] = React.useState<ChildInfo>({
    name: '',
    age: 5,
    gender: 'זכר',
    photo: undefined
  });
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.photo) {
      setError('נא להעלות תמונה');
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <div className="text-center">
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="w-[200px]">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="שם הילד"
            className="w-full p-2 rounded-md border"
          />
        </div>

        <div className="w-[200px]">
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            placeholder="גיל"
            className="w-full p-2 rounded-md border"
          />
        </div>

        <div className="w-[200px]">
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full p-2 rounded-md border"
          >
            <option value="">מין</option>
            <option value="male">זכר</option>
            <option value="female">נקבה</option>
          </select>
        </div>

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          תמונה של הילד/ה
          <span className="text-red-500 mr-1">*</span>
        </label>
        <input
          type="file"
          id="photo"
          required
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result as string });
                setError(null);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          המשך
        </button>
      </form>
    </div>
  );
}