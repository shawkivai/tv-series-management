'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';  // Import your axios instance

export default function SeasonsPage() {
  const [season, setSeason] = useState([]);
  const [seriesName, setSeriesName] = useState('');
  const router = useRouter();
  const pathname = usePathname(); 

  // Extract seriesId from the query parameters
  const seriesId = pathname.split('/')[2];

  useEffect(() => {
    async function fetchSeason() {

      try {
        const response = await axiosInstance.get(`/tvseries/${seriesId}`);
        setSeason(response.data.data.seasons);
        setSeriesName(response.data.data.name)
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    }

    fetchSeason();
  }, []); // Add seriesId as a dependency

  const deleteSeason = (id) => {
    setSeason(season.filter((s) => s.id !== id));
  };

  const editSeason = (id) => {
    router.push(`/tv-series/${seriesId}/seasons/edit/${id}`);
  };

  const getEpisodes = (id) => {
    router.push(`/tv-series/${seriesId}/seasons/${id}/episodes`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{seriesName} Seasons List</h1>
      <button
        onClick={() => router.push(`/tv-series/${seriesId}/seasons/add`)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add Season
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Season Number</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(season) && season.length > 0 ? season.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="py-2 px-4 border-b">{s._id}</td>
                <td className="py-2 px-4 border-b">{s.seasonNumber}</td>
                <td className="py-2 px-4 border-b">{s.title}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => getEpisodes(s._id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Episodes
                  </button>
                  <button
                    onClick={() => editSeason(s._id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSeason(s._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center">No seasons available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
