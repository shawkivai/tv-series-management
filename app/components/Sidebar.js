import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 h-500 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200">
           
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18m-7 4h7M5 20h7"></path>
              </svg>
              Dashboard
            
          </Link>
        </li>
        <li>
          <Link href="/tv-series" className="flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200">
           
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18m-7 4h7M5 20h7"></path>
              </svg>
              Series
           
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
