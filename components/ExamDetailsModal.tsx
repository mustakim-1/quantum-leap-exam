import React, { useMemo } from 'react';
import { Exam } from '../types';
import Card from './Card';
import Button from './Button';
import { getLeaderboardForExam } from '../constants';
import LeaderboardItem from './Leaderboarditem';

interface ExamDetailsModalProps {
    exam: Exam;
    onStart: () => void;
    onClose: () => void;
}

const ExamDetailsModal: React.FC<ExamDetailsModalProps> = ({ exam, onStart, onClose }) => {
    const leaderboard = useMemo(() => getLeaderboardForExam(exam.id), [exam.id]);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                <Card className="relative animate-fade-in">
                    <style>{`
                        @keyframes fade-in {
                            from { opacity: 0; transform: scale(0.95); }
                            to { opacity: 1; transform: scale(1); }
                        }
                        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                    `}</style>
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-3xl font-bold mb-2 text-blue-400">{exam.title}</h2>
                    <div className="text-gray-400 mb-6 flex flex-wrap items-center gap-x-4">
                        <span>{exam.questions.length} Questions</span>
                        <span className="text-gray-600">&bull;</span>
                        <span>{exam.duration / 60} Minutes</span>
                        <span className="text-gray-600">&bull;</span>
                        <span className="capitalize">{exam.difficulty} Difficulty</span>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Leaderboard</h3>
                        <div className="space-y-3 text-left max-h-60 overflow-y-auto pr-2">
                            {leaderboard.length > 0 ? (
                                leaderboard.map((entry) => (
                                    <LeaderboardItem key={entry.userId} entry={entry} rank={entry.rank} />
                                ))
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500">No results yet for this exam. Be the first!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button onClick={onStart} className="w-full">
                        Start Exam Now
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default ExamDetailsModal;
