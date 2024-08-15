'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EpisodesPage() {
  const [title, setTtile] = useState('');
  const [duration, setDuration] = useState('');
  const router = useRouter();

  const addEpisodes = () => {
    // Here you would normally send data to an API or update your state management
    alert(`Episode Added: ${name}, Genre: ${genre}`);
    router.push('/episodes');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add Episode</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={title}
          onChange={(e) => setTtile(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Duration</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button
        onClick={addEpisodes}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add
      </button>
    </div>
  );
}
