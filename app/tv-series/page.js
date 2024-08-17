'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance'; 

export default function TvSeriesPage() {
  const [series, setSeries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await axiosInstance.get('/tvseries');
        setSeries(response.data.data);
      } catch (error) {
        console.error('Error fetching TV series:', error);
      }
    }

    fetchSeries();
  }, []);

  const deleteSeries = async (id) => {
    try {
      await axiosInstance.delete(`/tvseries/${id}`);
      setSeries(series.filter((s) => s._id !== id));
       
    } catch (error) {
      console.error('Error deleting TV series:', error);
    }
  };

  const editSeries = (id) => {
    router.push(`/tv-series/edit/${id}`);
  };

  const getSeasons = (id) => {
    router.push(`/tv-series/${id}/seasons`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">TV Series List</h1>
      <button
        onClick={() => router.push('/tv-series/add')}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add TV Series
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(series) ? series.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="py-2 px-4 border-b">{s._id}</td>
                <td className="py-2 px-4 border-b">{s.name}</td>
                <td className="py-2 px-4 border-b">{s.description}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => getSeasons(s._id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Seasons
                  </button>
                  <button
                    onClick={() => editSeries(s._id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSeries(s._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center">No series available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
