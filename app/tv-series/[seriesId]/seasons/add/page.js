'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axiosInstance from '../../../../../utils/axiosInstance';

export default function AddSeasonPage() {
  const [seasonNumber, setSeasonNUmber] = useState(0);
  const [title, setTitle] = useState('');
  const router = useRouter();
  const pathname = usePathname(); 

  // Extract seriesId from the query parameters
  const seriesId = pathname.split('/')[2];

  const addSeason = async () => {
    try {
      const response = await axiosInstance.post(`/tvseries/${seriesId}/seasons`, { seasonNumber, title });
      router.push('/tv-series');
    } catch (error) {
      console.error('Error adding:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add Season </h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">SeasonNumber</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={seasonNumber}
          name="seasonNumber"
          onChange={(e) => setSeasonNUmber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button
        onClick={addSeason}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add
      </button>
    </div>
  );
}
