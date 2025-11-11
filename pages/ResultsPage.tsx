import React, { useMemo } from 'react';
import { getLeaderboardForExam, MOCK_EXAMS } from '../constants';
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
    const exam = useMemo(() => MOCK_EXAMS.find(e => e.id === result.examId), [result.examId]);
    const reviewItems = useMemo(() => {
      if (!exam) return [];
      return exam.questions.map((q, idx) => {
        const selected = result.answers?.[idx];
        const isCorrect = selected === q.correctAnswer;
        return {
          index: idx,
          question: q.text,
          options: q.options,
          correctIndex: q.correctAnswer,
          selectedIndex: selected,
          isCorrect,
        };
      });
    }, [exam, result.answers]);

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

                {/* Answer Review Section */}
                {exam && reviewItems.length > 0 && (
                  <div className="mb-8 text-left">
                    <h2 className="text-2xl font-bold mb-4">Answer Review</h2>
                    <div className="space-y-4">
                      {reviewItems.map(item => (
                        <div
                          key={item.index}
                          className={`p-4 rounded-lg border ${item.isCorrect ? 'bg-green-900/20 border-green-600' : 'bg-red-900/20 border-red-600'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold">Q{item.index + 1}. {item.question}</p>
                            <span className={`px-2 py-1 text-xs rounded ${item.isCorrect ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
                              {item.isCorrect ? 'Correct' : 'Wrong'}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {item.options.map((opt, i) => {
                              const isSelected = i === item.selectedIndex;
                              const isRight = i === item.correctIndex;
                              const base = 'p-3 rounded border';
                              const selectedCls = isSelected ? ' border-blue-500 bg-blue-900/20' : ' border-gray-700 bg-gray-800/40';
                              const rightCls = isRight ? ' ring-2 ring-green-500' : '';
                              return (
                                <div key={i} className={`${base}${selectedCls}${rightCls}`}>
                                  <div className="flex items-center justify-between">
                                    <span>{opt}</span>
                                    <div className="flex items-center gap-2">
                                      {isRight && <span className="text-green-400 text-sm">Correct Answer</span>}
                                      {isSelected && !isRight && <span className="text-blue-400 text-sm">Your Choice</span>}
                                      {isSelected && isRight && <span className="text-green-400 text-sm">Your Choice</span>}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={onBackToDashboard}>Back to Dashboard</Button>
            </Card>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
