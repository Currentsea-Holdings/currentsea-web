import logo from '@/assets/logo.png';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = oldProgress + 20; // increment loading
        return newProgress;
      });
    }, 1000); // Updating progress every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <img src={logo} className="animate-spin h-12 w-12 mb-4" alt="Loading logo" />
        <div className="w-64 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
