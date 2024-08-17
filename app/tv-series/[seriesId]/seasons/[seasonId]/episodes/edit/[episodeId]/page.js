'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

export default function EditEpisodesPage() {
  const { seriesId, seasonId, episodeId } = useParams();
  const [episodeNumber, setEpisodeNumber] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription]= useState('');
  const [duration, setDuration] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchEpisodeById() {

      try {
        const response = await axiosInstance.get(`/tvseries/${seriesId}/seasons/${seasonId}/episodes/${episodeId}`);
        setEpisodeNumber(response.data.data.episodeNumber);
        setTitle(response.data.data.title);
        setDescription(response.data.data.description);
        setDuration(response.data.data.duration);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    }

    fetchEpisodeById();
  }, [seriesId, seasonId, episodeId]);

  const updateEpisode = async () => {
    try {
        await axiosInstance.put(`/tvseries/${seriesId}/seasons/${seasonId}/episodes/${episodeId}`,  { episodeNumber, title, description, duration} )
        router.push(`/tv-series/${seriesId}/seasons/${seasonId}/episodes`);
    } catch (error) {
        console.error('Error updating season:', error);
    }
    
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Episode</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Episode Number</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={episodeNumber}
          name='episodeNumber'
          onChange={(e) => setEpisodeNumber(e.target.value)}
        />
      </div>
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
        <label className="block text-gray-700 mb-2">Description</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Duration</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button
        onClick={() => updateEpisode()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Update
      </button>
    </div>
  );
}
