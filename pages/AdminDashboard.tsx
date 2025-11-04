import React, { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { MOCK_EXAMS } from '../constants';
import { Exam, Question } from '../types';

interface QuestionFormState {
    id: string; // for React key
    text: string;
    options: string[];
    correctAnswer: number;
}

const AdminDashboard: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>(MOCK_EXAMS);
    const [newExamTitle, setNewExamTitle] = useState('');
    const [newExamDuration, setNewExamDuration] = useState(600);
    const [newExamDifficulty, setNewExamDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    
    const [questions, setQuestions] = useState<QuestionFormState[]>([
        { id: `q-${Date.now()}`, text: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { id: `q-${Date.now()}`, text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };
    
    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index].text = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex: number, oIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswer = oIndex;
        setQuestions(newQuestions);
    };
    
    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };


    const handleCreateExam = (e: React.FormEvent) => {
        e.preventDefault();
        
        for (const q of questions) {
            if (!q.text.trim() || q.options.some(opt => !opt.trim())) {
                alert('Please fill out all question and option fields.');
                return;
            }
        }

        const finalQuestions: Question[] = questions.map((q, index) => ({
            id: `q-new-${Date.now()}-${index}`,
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
        }));

        const newExam: Exam = {
            id: `exam-${Date.now()}`,
            title: newExamTitle,
            duration: newExamDuration,
            difficulty: newExamDifficulty,
            questions: finalQuestions,
        };
        setExams(prev => [...prev, newExam]);
        // Also update the shared mock data
        MOCK_EXAMS.push(newExam);

        // Reset form
        setNewExamTitle('');
        setNewExamDuration(600);
        setNewExamDifficulty('medium');
        setQuestions([{ id: `q-${Date.now()}`, text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <h3 className="text-xl font-semibold mb-4 text-blue-400">Create New Exam</h3>
                        <form onSubmit={handleCreateExam} className="space-y-4">
                            <input type="text" placeholder="Exam Title" value={newExamTitle} onChange={e => setNewExamTitle(e.target.value)} required className="w-full bg-[#0D1117] border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Duration (seconds)" value={newExamDuration} onChange={e => setNewExamDuration(parseInt(e.target.value))} required className="w-full bg-[#0D1117] border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                <select value={newExamDifficulty} onChange={e => setNewExamDifficulty(e.target.value as any)} className="w-full bg-[#0D1117] border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div className="space-y-6 pt-4 border-t border-gray-700">
                                {questions.map((q, qIndex) => (
                                    <div key={q.id} className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg relative">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-gray-300">Question {qIndex + 1}</h4>
                                            {questions.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveQuestion(qIndex)} className="text-sm text-red-400 hover:text-red-300 transition-colors">
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <textarea placeholder={`Question ${qIndex + 1} Text`} value={q.text} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} required rows={2} className="w-full bg-[#0D1117] border border-gray-600 rounded-md p-2 text-white font-sans text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                            {q.options.map((opt, oIndex) => (
                                                <div key={oIndex} className="flex items-center space-x-2 bg-[#0D1117] border border-gray-600 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                                    <input type="radio" name={`correct-answer-${q.id}`} checked={q.correctAnswer === oIndex} onChange={() => handleCorrectAnswerChange(qIndex, oIndex)} className="form-radio h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 shrink-0" />
                                                    <input type="text" placeholder={`Option ${oIndex + 1}`} value={opt} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} required className="w-full bg-transparent border-none p-0 text-white focus:ring-0" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <Button type="button" variant="secondary" onClick={handleAddQuestion}>
                                    Add Another Question
                                </Button>
                                <Button type="submit">Create Exam</Button>
                            </div>
                        </form>
                    </Card>
                    <Card>
                        <h3 className="text-xl font-semibold mb-4 text-blue-400">Manage Exams</h3>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {exams.map(exam => (
                                <div key={exam.id} className="p-4 bg-gray-800/50 rounded-lg">
                                    <h4 className="font-bold text-lg">{exam.title}</h4>
                                    <p className="text-sm text-gray-400">{exam.questions.length} Questions | {exam.duration / 60} Minutes</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
