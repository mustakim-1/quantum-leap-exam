
import React from 'react';
import UniversalLeaderboard from '../components/UniversalLeaderboard';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center text-center p-4 pt-20 pb-10">
        <h1 className="text-6xl font-bold">SULPHURIC BENCH EXAM</h1>
        <p className="mt-4 text-xl text-gray-400">Start Your Exam Journey.</p>
      </div>
      
      {/* Universal Leaderboard - Visible to all visitors */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <UniversalLeaderboard limit={15} />
      </div>
    </div>
  );
};

export default HomePage;
