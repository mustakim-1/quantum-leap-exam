import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { MOCK_EXAMS, MOCK_RESULTS } from '../constants';
import { Exam } from '../types';
import ExamPage from './ExamPage';
import ResultsPage from './ResultsPage';
import ExamDetailsModal from '../components/ExamDetailsModal';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [currentView, setCurrentView] = useState<'dashboard' | 'exam' | 'results'>('dashboard');
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
    const [lastResult, setLastResult] = useState<any>(null);
    const [selectedExamForDetails, setSelectedExamForDetails] = useState<Exam | null>(null);

    const userResults = MOCK_RESULTS.filter(r => r.userId === user?.id);

    const handleStartExam = (exam: Exam) => {
        setSelectedExam(exam);
        setCurrentView('exam');
    };
    
    const handleExamFinish = (result: any) => {
        setLastResult(result);
        if(!MOCK_RESULTS.find(r => r.examId === result.examId && r.userId === result.userId)) {
             MOCK_RESULTS.push(result);
        }
        setCurrentView('results');
    }

    if (currentView === 'exam' && selectedExam) {
        return <ExamPage exam={selectedExam} onFinish={handleExamFinish} />;
    }
    
    if (currentView === 'results' && lastResult) {
        return <ResultsPage result={lastResult} onBackToDashboard={() => setCurrentView('dashboard')} />;
    }

    return (
        <>
            <div className="min-h-screen">
                <Header />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-3xl font-bold mb-6">Student Dashboard</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <h3 className="text-xl font-semibold mb-4 text-[#778DA9]">Available Exams</h3>
                                <div className="space-y-4">
                                    {MOCK_EXAMS.map(exam => (
                                        <div key={exam.id} className="p-4 bg-gray-800/50 rounded-lg flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-lg">{exam.title}</h4>
                                                <p className="text-sm text-gray-400">{exam.questions.length} Questions | {exam.duration / 60} Minutes | Difficulty: <span className="capitalize">{exam.difficulty}</span></p>
                                            </div>
                                            <Button onClick={() => setSelectedExamForDetails(exam)}>View Details</Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <h3 className="text-xl font-semibold mb-4 text-[#778DA9]">Past Results</h3>
                                <div className="space-y-3">
                                    {userResults.length > 0 ? userResults.map(result => {
                                        const exam = MOCK_EXAMS.find(e => e.id === result.examId);
                                        return (
                                            <div key={`${result.examId}-${result.userId}`} className="p-3 bg-gray-800/50 rounded-md">
                                                <p className="font-semibold">{exam?.title}</p>
                                                <p className="text-sm text-gray-300">Score: <span className="font-bold text-green-400">{result.score}%</span></p>
                                            </div>
                                        )
                                    }) : (
                                        <p className="text-gray-400">No exams taken yet.</p>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
            {selectedExamForDetails && (
                <ExamDetailsModal
                    exam={selectedExamForDetails}
                    onStart={() => {
                        handleStartExam(selectedExamForDetails);
                        setSelectedExamForDetails(null);
                    }}
                    onClose={() => setSelectedExamForDetails(null)}
                />
            )}
        </>
    );
};

export default StudentDashboard;
