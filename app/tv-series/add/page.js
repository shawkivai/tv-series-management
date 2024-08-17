'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../utils/axiosInstance';

export default function AddTvSeriesPage() {
  const [name, setName] = useState('');
  const [description, setdescription] = useState('');
  const router = useRouter();

  const addSeries = async () => {
    try {
      const response = await axiosInstance.post('/tvseries', { name, description });
      router.push('/tv-series');
    } catch (error) {
      console.error('Error adding TV series:', error);
      alert('Failed to add series. Please try again.');
    }
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
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={description}
          name="description"
          onChange={(e) => setdescription(e.target.value)}
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
