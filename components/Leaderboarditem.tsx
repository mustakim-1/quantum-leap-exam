import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardItemProps {
    entry: LeaderboardEntry;
    rank: number;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ entry, rank }) => {
    const rankColors: { [key: number]: string } = {
        1: 'bg-[#778DA9]/20 border-[#A9BCD0] text-[#DDE6ED] shadow-[0_0_15px_rgba(169,188,208,0.5)]',
        2: 'bg-[#415A77]/20 border-[#778DA9] text-[#E0E1DD] shadow-[0_0_15px_rgba(119,141,169,0.5)]',
        3: 'bg-[#1B263B]/20 border-[#415A77] text-[#C9D6DE] shadow-[0_0_15px_rgba(27,38,59,0.5)]',
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
