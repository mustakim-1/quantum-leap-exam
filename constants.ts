
import { User, Exam, LeaderboardEntry, ExamResult } from './types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alex Johnson', email: 'student@example.com', password_insecure: 'student123', role: 'student', avatar: 'https://i.pravatar.cc/150?u=student@example.com', school: 'Quantum High', grade: '11' },
  { id: 'user-2', name: 'Admin', email: 'admin@example.com', password_insecure: 'admin123', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=admin@example.com', school: 'Admin Academy', grade: 'N/A' },
  { id: 'user-3', name: 'Brian Smith', email: 'brian@example.com', password_insecure: 'brian123', role: 'student', avatar: 'https://i.pravatar.cc/150?u=brian@example.com', school: 'Starlight Academy', grade: '10' },
  { id: 'user-4', name: 'Clara Doe', email: 'clara@example.com', password_insecure: 'clara123', role: 'student', avatar: 'https://i.pravatar.cc/150?u=clara@example.com', school: 'Quantum High', grade: '12' },
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    title: 'React Fundamentals',
    duration: 600, // 10 minutes
    difficulty: 'easy',
    questions: [
      { id: 'q-1-1', text: 'What is JSX?', options: ['A JavaScript syntax extension', 'A CSS preprocessor', 'A database query language', 'A templating engine'], correctAnswer: 0 },
      { id: 'q-1-2', text: 'Which hook is used for state management in functional components?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 1 },
      { id: 'q-1-3', text: 'What does `ReactDOM.render` do?', options: ['Renders a React element into the DOM', 'Compiles React components', 'Fetches data from an API', 'Handles routing'], correctAnswer: 0 },
      { id: 'q-1-4', text: 'Props are...?', options: ['Mutable', 'Internal state of a component', 'Immutable', 'Used for side effects'], correctAnswer: 2 },
      { id: 'q-1-5', text: 'What is the purpose of a key prop in lists?', options: ['For styling', 'To identify which items have changed', 'To store data', 'To handle events'], correctAnswer: 1 },
    ]
  },
  {
    id: 'exam-2',
    title: 'Advanced TypeScript',
    duration: 900, // 15 minutes
    difficulty: 'medium',
    questions: [
      { id: 'q-2-1', text: 'What is a Generic in TypeScript?', options: ['A type of class', 'A feature for creating reusable components', 'A specific data type', 'A way to define interfaces'], correctAnswer: 1 },
      { id: 'q-2-2', text: 'What is the difference between `interface` and `type`?', options: ['Interfaces can be implemented by classes, types cannot', 'Types can be used for unions and intersections, interfaces cannot', 'They are identical', 'Both A and B are correct'], correctAnswer: 3 },
      { id: 'q-2-3', text: 'The `never` type represents values that...', options: ['Can be of any type', 'Never occur', 'Are null or undefined', 'Are functions'], correctAnswer: 1 },
    ]
  },
  {
    id: 'exam-3',
    title: 'Tailwind CSS Mastery',
    duration: 300, // 5 minutes
    difficulty: 'hard',
    questions: [
      { id: 'q-3-1', text: 'How do you apply a responsive style in Tailwind?', options: ['Using media queries in a CSS file', 'With breakpoint prefixes like `md:`', 'Using the `style` attribute', 'It is not possible'], correctAnswer: 1 },
      { id: 'q-3-2', text: 'What is the purpose of `tailwind.config.js`?', options: ['To install Tailwind', 'To customize the default theme', 'To write CSS rules', 'To import fonts'], correctAnswer: 1 },
    ]
  }
];

export const MOCK_RESULTS: ExamResult[] = [
    { examId: 'exam-1', userId: 'user-3', score: 80, timeTaken: 450, totalQuestions: 5 },
    { examId: 'exam-1', userId: 'user-4', score: 100, timeTaken: 380, totalQuestions: 5 },
];

export const getLeaderboardForExam = (examId: string): LeaderboardEntry[] => {
    const examResults = MOCK_RESULTS.filter(r => r.examId === examId);
    const users = MOCK_USERS;

    const leaderboardData = examResults.map(result => {
        const user = users.find(u => u.id === result.userId);
        return {
            userId: result.userId,
            name: user?.name || 'Unknown',
            avatar: user?.avatar || '',
            score: result.score,
            timeTaken: result.timeTaken,
        };
    });

    return leaderboardData
        .sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
};