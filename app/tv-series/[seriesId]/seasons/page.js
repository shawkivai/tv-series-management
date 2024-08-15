'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SeasonsPage() {
  const [series, setSeries] = useState([
    { id: 1, name: 'S1', title: 'T1' },
    { id: 2, name: 'S2', title: 'T2' },
  ]);
  
  const router = useRouter();
  console.log(router.query)
  const seriesId = router.query;

  const deleteSeason = (id) => {
    setSeries(series.filter((s) => s.id !== id));
  };

  const editSeason = (id) => {
    router.push(`/tv-series/${seriesId}/seasons/edit/${id}`);
  };


  const getEpisodes = (id) => {
    router.push(`/tv-series/${seriesId}/seasons/${id}/episodes`);
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
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {series.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="py-2 px-4 border-b">{s.id}</td>
                <td className="py-2 px-4 border-b">{s.name}</td>
                <td className="py-2 px-4 border-b">{s.title}</td>
                <td className="py-2 px-4 border-b">

                <button
                    onClick={() => getEpisodes(s.id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Episodes
                  </button>
                  <button
                    onClick={() => editSeason(s.id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSeason(s.id)}
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
