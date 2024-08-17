import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'TV Series Management',
  description: 'Manage TV series, episodes, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-8">Menu</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <Link href="/dashboard">
                  <a className="hover:text-gray-300">Dashboard</a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/tv-series">
                  <a className="hover:text-gray-300">Series</a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/episodes">
                  <a className="hover:text-gray-300">Episodes</a>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}
