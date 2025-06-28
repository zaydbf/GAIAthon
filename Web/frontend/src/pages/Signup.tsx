import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  if (location.state?.success) {
    setSuccessMessage(location.state.success);
    }
  }, [location]);
  const onSignupSuccess = (username: string) => {
    console.log('Signup successful for:', username);
    navigate('/Signin', { state: { success: 'Account created successfully. Please log in.' } });
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');  
    setSuccessMessage(''); 
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const res = await fetch('http://localhost:8000/api/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      onSignupSuccess(username);
    } else {
      setErrorMessage('Error creating user, please verify your credentials or use another username & email');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Join CARBONSENS and be part of the movement for a sustainable future.
        </p>

        {successMessage && (
        <div
          className="mb-4 rounded-lg border-l-4 border-blue-600 bg-blue-100 px-4 py-3 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          role="alert"
        >
          {successMessage}
        </div>
        )}

      {errorMessage && (
        <div
          className="mb-4 rounded-lg border-l-4 border-red-600 bg-red-100 px-4 py-3 text-red-800 dark:bg-red-900 dark:text-red-200"
          role="alert"
        >
          {errorMessage}
        </div>
      )}


        <form className="space-y-6" onSubmit={signup}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/Signin" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
