import React, { useMemo } from 'react';
import { getLeaderboardForExam } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';
import Confetti from '../components/Confetti';
import LeaderboardItem from '../components/Leaderboarditem';
import { LeaderboardEntry } from '../types';

interface ResultsPageProps {
  result: any;
  onBackToDashboard: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onBackToDashboard }) => {
    const leaderboard: LeaderboardEntry[] = useMemo(() => getLeaderboardForExam(result.examId), [result.examId]);

    return (
    <>
      {result.score > 70 && <Confetti />}
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#111827] to-[#0D1117]">
        <div className="container mx-auto max-w-4xl">
            <Card className="text-center">
                <h1 className="text-4xl font-bold text-blue-400 mb-2">Exam Completed!</h1>
                <p className="text-lg text-gray-300 mb-6">Here's how you performed.</p>

                <div className="mb-8">
                    <p className="text-xl mb-2">Your Score</p>
                    <div className="relative inline-block">
                        <p className="text-8xl font-bold text-green-400 animate-pulse">{result.score}%</p>
                        <div className="absolute inset-0 -z-10 bg-green-500/20 blur-2xl rounded-full"></div>
                    </div>
                    <p className="text-gray-400 mt-2">You answered {Math.round(result.score / 100 * result.totalQuestions)} out of {result.totalQuestions} questions correctly.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
                    <div className="space-y-3 text-left max-h-64 overflow-y-auto pr-2">
                        {leaderboard.map((entry) => (
                           <LeaderboardItem key={entry.userId} entry={entry} rank={entry.rank} />
                        ))}
                    </div>
                </div>

                <Button onClick={onBackToDashboard}>Back to Dashboard</Button>
            </Card>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
