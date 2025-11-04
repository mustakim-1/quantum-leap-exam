
import React, { useState, useEffect, useCallback } from 'react';
import { Exam } from '../types';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface ExamPageProps {
  exam: Exam;
  onFinish: (result: any) => void;
}

const Timer: React.FC<{ seconds: number }> = ({ seconds }) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const progress = (seconds / 300) * 100; // Assuming max 300s for full circle
  
    return (
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-gray-700"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            className="text-blue-500 transition-all duration-1000"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(90 18 18)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
        </div>
      </div>
    );
  };
  

const ExamPage: React.FC<ExamPageProps> = ({ exam, onFinish }) => {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(exam.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(exam.duration);

  const handleSubmit = useCallback(() => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === exam.questions[index].correctAnswer) {
        score++;
      }
    });
    
    const result = {
      examId: exam.id,
      userId: user!.id,
      score: Math.round((score / exam.questions.length) * 100),
      timeTaken: exam.duration - timeLeft,
      totalQuestions: exam.questions.length,
      answers,
    };
    onFinish(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, exam, onFinish, timeLeft, user]);
  

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0D1117] to-[#111827]">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="sticky top-0 bg-[#0D1117]/80 backdrop-blur-md p-4 rounded-b-xl shadow-lg z-10 mb-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-400">{exam.title}</h1>
                <div className="flex items-center space-x-4">
                    <Timer seconds={timeLeft} />
                    <Button onClick={handleSubmit}>Submit Exam</Button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="p-4 bg-gray-800/50 rounded-lg sticky top-28">
              <h3 className="font-bold mb-4">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-200
                      ${currentQuestionIndex === index ? 'bg-blue-500 text-white' : ''}
                      ${answers[index] !== null ? 'bg-green-500/50' : 'bg-gray-700'}
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="p-8 bg-[#161B22]/80 border border-gray-700 rounded-xl">
              <h2 className="text-2xl font-semibold mb-2">Question {currentQuestionIndex + 1} of {exam.questions.length}</h2>
              <p className="text-xl mb-6 text-gray-300">{currentQuestion.text}</p>
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                      ${answers[currentQuestionIndex] === index 
                        ? 'bg-blue-500/30 border-blue-500' 
                        : 'bg-gray-800/50 border-gray-700 hover:border-blue-600'}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
