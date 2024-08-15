'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTvSeriesPage() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const router = useRouter();

  const addSeries = () => {
    // Here you would normally send data to an API or update your state management
    alert(`Series Added: ${name}, Genre: ${genre}`);
    router.push('/tv-series');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add TV Series</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Genre</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <button
        onClick={addSeries}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add
      </button>
    </div>
  );
}
