'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

export default function EditTvSeriesPage() {
  const { seriesId, id } = useParams();
  const [seasonNumber, setSeasonNumber] = useState();
  const [title, setTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchSeasonById() {

      try {
        const response = await axiosInstance.get(`/tvseries/${seriesId}/seasons/${id}`);
        setSeasonNumber(response.data.data.seasonNumber);
        setTitle(response.data.data.title)
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    }

    fetchSeasonById();
  }, [seriesId, id]);

  const updateSeries = async (seasonNumber) => {
    try {
        await axiosInstance.put(`/tvseries/${seriesId}/seasons/${seasonNumber}`,  { seasonNumber, title} )
        router.push(`/tv-series/${seriesId}/seasons`);
    } catch (error) {
        console.error('Error updating season:', error);
    }
    
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Season</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">SeasonNumber</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={seasonNumber}
          onChange={(e) => setSeasonNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button
        onClick={updateSeries(seasonNumber)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Update
      </button>
    </div>
  );
}
