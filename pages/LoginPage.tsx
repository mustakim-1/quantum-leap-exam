
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const { login, register } = useAuth();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        register(name, email, password, school, grade);
    } else {
        login(email, password);
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSchool('');
    setGrade('');
  }

  const renderTextField = (id: string, label: string, type: string, value: string, setter: (val: string) => void, placeholder: string, required = true) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300">
            {label}
        </label>
        <input
            id={id}
            name={id}
            type={type}
            autoComplete={id}
            required={required}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="mt-1 block w-full bg-[#0D1117] border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
        />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-gray-900 to-black animate-gradient-xy"></div>
        <style>{`
          @keyframes gradient-xy {
            0%, 100% {
              background-size: 400% 400%;
              background-position: top right;
            }
            50% {
              background-size: 400% 400%;
              background-position: bottom left;
            }
          }
          .animate-gradient-xy {
            animation: gradient-xy 15s ease infinite;
          }
        `}</style>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Welcome to QuantumLeap</h1>
            <p className="text-lg text-gray-400 mt-2">The Future of Examination is Here.</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-white">{isRegister ? 'Create Your Account' : 'Login'}</h2>
            {!isRegister && (
                 <p className="text-center text-gray-400 text-sm">
                    Use <code className="bg-gray-700 p-1 rounded">student@example.com</code> (pw: student123) or <code className="bg-gray-700 p-1 rounded">admin@example.com</code> (pw: admin123).
                </p>
            )}
            
            {isRegister && (
              <>
                {renderTextField("name", "Full Name", "text", name, setName, "Alex Johnson")}
              </>
            )}

            {renderTextField("email", "Email Address", "email", email, setEmail, "you@example.com")}
            {renderTextField("password", "Password", "password", password, setPassword, "••••••••")}
            
            {isRegister && (
              <>
                {renderTextField("confirmPassword", "Confirm Password", "password", confirmPassword, setConfirmPassword, "••••••••")}
                <div className="grid grid-cols-2 gap-4">
                  {renderTextField("school", "School Name", "text", school, setSchool, "Quantum High")}
                  {renderTextField("grade", "Grade", "text", grade, setGrade, "11")}
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full">
              {isRegister ? 'Register & Start' : 'Proceed'}
            </Button>

            <p className="text-center text-sm text-gray-400">
              {isRegister ? 'Already have an account? ' : "Don't have an account? "}
              <button type="button" onClick={toggleForm} className="font-medium text-blue-400 hover:text-blue-300">
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;