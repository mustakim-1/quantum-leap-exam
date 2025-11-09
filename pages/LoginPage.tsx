
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
        <label htmlFor={id} className="block text-sm font-medium text-[#778DA9]">
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
            className="mt-1 block w-full bg-[#1B263B] border border-[#415A77] rounded-md shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#778DA9] focus:border-[#778DA9]"
            placeholder={placeholder}
        />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-[#0D1B2A]">

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
                <img src="/image/Adobe Express - file.png" alt="SULPHURIC BENCH Logo" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Welcome to SULPHURIC BENCH</h1>
            <p className="text-lg text-[#778DA9] mt-2">The Future of Examination is Here.</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-white">{isRegister ? 'Create Your Account' : 'Login'}</h2>
            {!isRegister && (
                 <p className="text-center text-[#778DA9] text-sm">
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

            <p className="text-center text-sm text-[#778DA9]">
              {isRegister ? 'Already have an account? ' : "Don't have an account? "}
              <button type="button" onClick={toggleForm} className="font-medium text-[#778DA9] hover:text-white">
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