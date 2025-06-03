import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.success || '');
  const [isError, setIsError] = useState(false);
  const [isFading, setIsFading] = useState(false);
 useEffect(() => {
  if (location.state?.success) {
    const fadeTimer = setTimeout(() => setIsFading(true), 4000); 
    const clearTimer = setTimeout(() => {
      setMessage('');
      setIsFading(false);
      navigate(location.pathname, { replace: true });
    }, 5000); 

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(clearTimer);
    };
  }
}, [location.state, navigate, location.pathname]);

  const onLoginSuccess = () => {
    console.log('Login successful');
    localStorage.setItem('username', username);
    navigate('/'); 
    window.location.reload();
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }), 
    });

    if (res.ok) {
      setIsError(false);     
      setMessage('');
      const data = await res.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      
      onLoginSuccess();
    } else {
      const errorData = await res.json();
      setIsError(true)
      setMessage(errorData.detail || 'Invalid username or password');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Sign In to Your Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Welcome back to CARBONSENS — continue your journey for a sustainable future.
        </p>

        {message && (
          <div
            className={`mb-4 rounded-lg border-l-4 px-4 py-3 transition-opacity duration-500 ${
              isFading ? 'opacity-0' : 'opacity-100'
            } ${
              isError
                ? 'border-red-600 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 ' 
                : 'border-green-600 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={login}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"  // changed from email to text
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
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

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{' '}
          <a href="/signup" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
