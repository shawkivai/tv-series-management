'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditTvSeriesPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch the existing series data based on the ID
    // For simplicity, we'll use hardcoded data
    const seriesData = {
      1: { name: 'Breaking Bad', genre: 'Drama' },
      2: { name: 'Game of Thrones', genre: 'Fantasy' },
    };
    const series = seriesData[id];
    if (series) {
      setName(series.name);
      setGenre(series.genre);
    }
  }, [id]);

  const updateSeries = () => {
    // Here you would normally send the updated data to an API or update your state management
    alert(`Series Updated: ${name}, Genre: ${genre}`);
    router.push('/tv-series');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit TV Series</h1>
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
        onClick={updateSeries}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Update
      </button>
    </div>
  );
}
