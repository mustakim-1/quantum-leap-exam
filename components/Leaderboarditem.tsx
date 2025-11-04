import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardItemProps {
    entry: LeaderboardEntry;
    rank: number;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ entry, rank }) => {
    const rankColors: { [key: number]: string } = {
        1: 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.5)]',
        2: 'bg-gray-400/20 border-gray-300 text-gray-200 shadow-[0_0_15px_rgba(209,213,219,0.5)]',
        3: 'bg-orange-600/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(234,88,12,0.5)]',
    };
    const rankClass = rankColors[rank] || 'bg-gray-800/50 border-gray-700';

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 ${rankClass}`}>
            <div className="flex items-center space-x-4">
                <span className="font-bold text-lg w-6 text-center">{rank}</span>
                <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full"/>
                <span className="font-medium">{entry.name}</span>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg">{entry.score}%</p>
                <p className="text-sm text-gray-400">{entry.timeTaken}s</p>
            </div>
        </div>
    );
};

export default LeaderboardItem;
