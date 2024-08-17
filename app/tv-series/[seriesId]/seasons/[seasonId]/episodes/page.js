'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';  // Import your axios instance

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const router = useRouter();
  const { seriesId, seasonId } = useParams();

  useEffect(() => {
    async function fetchEpisodes() {

      try {
        const response = await axiosInstance.get(`/tvseries/${seriesId}/seasons/${seasonId}`);
        setEpisodes(response.data.data.episodes);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    }

    fetchEpisodes();
  }, []); // Add seriesId as a dependency

  const deleteEpisode = async (id) => {
    try {
      await axiosInstance.delete(`/tvseries/${seriesId}/seasons/${seasonId}/episodes/${id}`);
      
      setEpisodes(episodes.filter((s) => s._id !== id));
    } catch (error) {
      console.error('Error deleting TV series:', error);
    }
  };

  const editEpisode = (id) => {
    router.push(`/tv-series/${seriesId}/seasons/${seasonId}/episodes/edit/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Episode List</h1>
      <button
        onClick={() => router.push(`/tv-series/${seriesId}/seasons/${seasonId}/episodes/add`)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add Episode
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b"> Episode Number</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(episodes) && episodes.length > 0 ? episodes.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="py-2 px-4 border-b">{s._id}</td>
                <td className="py-2 px-4 border-b">{s.episodeNumber}</td>
                <td className="py-2 px-4 border-b">{s.title}</td>
                <td className="py-2 px-4 border-b">{s.description}</td>
                <td className="py-2 px-4 border-b">{s.duration}</td>
                <td className="py-2 px-4 border-b">
                  
                  <button
                    onClick={() => editEpisode(s._id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEpisode(s._id)}
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
