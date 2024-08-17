'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

export default function EditTvSeriesPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchSeries() {

      try {
        const response = await axiosInstance.get(`/tvseries/${id}`);
        setName(response.data.data.name);
        setDescription(response.data.data.description)
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    }

    fetchSeries();
  }, [id]);

  const updateSeries = async () => {
    // Here you would normally send the updated data to an API or update your state management
    await axiosInstance.put(`/tvseries/${id}`,  { name, description} )
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
