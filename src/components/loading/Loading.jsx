import React, { useState, useEffect } from 'react';
import bgDark from '../../assets/bgDark.svg';
import bgLight from '../../assets/bgLight.svg';

export default function Loading() {
  const [theme, setTheme] = useState('dark'); // Default theme is 'dark', can be changed
  const [isLoading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Simulating a delay for loading effect (replace with actual async task)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after delay (simulated async task completion)
    }, 2000); // Simulated 2 second delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const background = theme === 'light' ? bgLight : bgDark;

  return (
    <div className={`min-h-screen flex justify-center items-center ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'}`}>
      {isLoading ? (
        <div className='flex flex-col justify-center items-center'>
          <img src={background} alt="Loading Logo" className="w-24 h-24" />
          <p className="mt-4 text-lg">Please wait...</p>
        </div>
      ) : (
        <div>No content loaded yet.</div> // Replace with actual loaded content or null
      )}
    </div>
  );
}
