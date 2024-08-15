'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TvSeriesPage() {
  const [series, setSeries] = useState([
    { id: 1, name: 'Breaking Bad', genre: 'Drama' },
    { id: 2, name: 'Game of Thrones', genre: 'Fantasy' },
  ]);

  const router = useRouter();

  const deleteSeries = (id) => {
    setSeries(series.filter((s) => s.id !== id));
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
              <th className="py-2 px-4 border-b">Genre</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {series.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="py-2 px-4 border-b">{s.id}</td>
                <td className="py-2 px-4 border-b">{s.name}</td>
                <td className="py-2 px-4 border-b">{s.genre}</td>
                <td className="py-2 px-4 border-b">
                <button
                    onClick={() => getSeasons(s.id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Seasons
                  </button>
                  <button
                    onClick={() => editSeries(s.id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSeries(s.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
