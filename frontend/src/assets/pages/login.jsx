import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../api/auth';


const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [notUser, setNotUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError('');
  };

  const handleToggle = () => {
    setNotUser(!notUser);
    setForm({ username: "", email: "", password: "", confirmPassword: "" });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (notUser) {
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }

        const res = await registerUser({
          username: form.username,
          email: form.email,
          password: form.password,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');

      } else {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-bg relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-tl-full opacity-90 z-0" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-100 rounded-br-full opacity-60 z-0" />

      <div className="relative z-10 bg-white rounded-3xl shadow-xl w-full max-w-sm mx-4 px-8 py-10 flex flex-col items-center">

        <div className="mb-4">
          <div className="flex flex-col items-center">
            <img src="/svg-logos/bankLogo.svg" alt="Secure Bank logo" />
            <span className="mt-2 text-xl font-bold tracking-tight">
              <span className="text-gray-900">Secure</span>
              <span className="text-blue-600">Bank</span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mt-2 mb-1">
          {notUser ? "Create Account" : "Welcome Back!"}
        </h1>
        <p className="text-gray-400 text-sm mb-7">
          {notUser ? "Sign up to get started with SecureBank" : "Login to access your account"}
        </p>

        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {notUser && (
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white focus-within:border-blue-500 transition">
              <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                required
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                value={form.username}
                onChange={handleChange("username")}
              />
            </div>
          )}

          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white focus-within:border-blue-500 transition">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              required
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>

          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white focus-within:border-blue-500 transition">
            <FontAwesomeIcon icon={faLock} className="text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              value={form.password}
              onChange={handleChange("password")}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition">
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          {notUser && (
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white focus-within:border-blue-500 transition">
              <FontAwesomeIcon icon={faLock} className="text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-400 hover:text-gray-600 transition">
                {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          )}

          {!notUser && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Forgot Password?</a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center font-semibold py-4 rounded-2xl transition text-base mt-1 text-white
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
          >
            {loading
              ? (notUser ? 'Creating Account...' : 'Logging in...')
              : (notUser ? 'Create Account' : 'Login')}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          {notUser ? "Already have an account? " : "Don't have an account? "}
          <button onClick={handleToggle} className="text-blue-600 font-semibold hover:underline">
            {notUser ? "Login" : "Signup"}
          </button>
        </p>

        <div className="flex items-center gap-2 mt-5 text-gray-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <span className="text-xs">Your security is our priority</span>
        </div>
      </div>
    </div>
  );
}

export default Login;



