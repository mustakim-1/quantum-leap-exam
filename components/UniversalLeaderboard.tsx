import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, ExamResult, User } from '../types';
import LeaderboardItem from './Leaderboarditem';
import { MOCK_RESULTS, MOCK_USERS, MOCK_EXAMS } from '../constants';

interface UniversalLeaderboardProps {
  limit?: number;
}

const UniversalLeaderboard: React.FC<UniversalLeaderboardProps> = ({ limit = 10 }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const overallLeaderboard = calculateOverallLeaderboard();
      setLeaderboardData(overallLeaderboard);
      setLoading(false);
    }, 500);
  }, []);

  const calculateOverallLeaderboard = (): LeaderboardEntry[] => {
    const userScores: { [key: string]: { totalScore: number; totalExams: number; totalTime: number; user: User } } = {};

    // Aggregate scores across all exams
    MOCK_RESULTS.forEach(result => {
      const user = MOCK_USERS.find(u => u.id === result.userId);
      if (!user) return;

      if (!userScores[result.userId]) {
        userScores[result.userId] = {
          totalScore: 0,
          totalExams: 0,
          totalTime: 0,
          user: user
        };
      }

      userScores[result.userId].totalScore += result.score;
      userScores[result.userId].totalExams += 1;
      userScores[result.userId].totalTime += result.timeTaken;
    });

    // Calculate average scores and create leaderboard entries
    const leaderboardEntries: LeaderboardEntry[] = Object.values(userScores).map(data => ({
      userId: data.user.id,
      name: data.user.name,
      avatar: data.user.avatar,
      score: Math.round(data.totalScore / data.totalExams), // Average score
      timeTaken: Math.round(data.totalTime / data.totalExams), // Average time
      rank: 0 // Will be set after sorting
    }));

    // Sort by average score (descending) and average time (ascending)
    leaderboardEntries.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timeTaken - b.timeTaken;
    });

    // Assign ranks
    return leaderboardEntries.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  };

  const getExamLeaderboard = (examId: string): LeaderboardEntry[] => {
    const examResults = MOCK_RESULTS.filter(r => r.examId === examId);
    
    const leaderboardEntries: LeaderboardEntry[] = examResults.map(result => {
      const user = MOCK_USERS.find(u => u.id === result.userId);
      return {
        userId: result.userId,
        name: user?.name || 'Unknown',
        avatar: user?.avatar || '',
        score: result.score,
        timeTaken: result.timeTaken,
        rank: 0
      };
    });

    // Sort by score (descending) and time (ascending)
    leaderboardEntries.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timeTaken - b.timeTaken;
    });

    // Assign ranks
    return leaderboardEntries.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  };

  const handleExamChange = (examId: string) => {
    setSelectedExam(examId);
    if (examId === 'all') {
      setLeaderboardData(calculateOverallLeaderboard());
    } else {
      setLeaderboardData(getExamLeaderboard(examId));
    }
  };

  const displayData = limit ? leaderboardData.slice(0, limit) : leaderboardData;

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏆 Leaderboard</h2>
        <select
          value={selectedExam}
          onChange={(e) => handleExamChange(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Overall Ranking</option>
          {MOCK_EXAMS.map(exam => (
            <option key={exam.id} value={exam.id}>{exam.title}</option>
          ))}
        </select>
      </div>

      {displayData.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No results available yet.</p>
      ) : (
        <div className="space-y-3">
          {displayData.map((entry, index) => (
            <LeaderboardItem key={entry.userId} entry={entry} rank={index + 1} />
          ))}
        </div>
      )}

      {selectedExam === 'all' && (
        <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700">
          <p className="text-sm text-blue-300">
            📊 Overall ranking is based on average scores across all exams
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversalLeaderboard;