import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const login = () => {
 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [ registered, setRegistered ] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    // Wire to backend here
    console.log("Login:", form);
    navigate('/dashboard')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-bg relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-tl-full opacity-90 z-0" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-100 rounded-br-full opacity-60 z-0" />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl w-full max-w-sm mx-4 px-8 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="mb-4">
          <div className="flex flex-col items-center">
           <img src="/svg-logos/bankLogo.svg" alt="Secure Bank logo" />
            <span className="mt-2 text-xl font-bold tracking-tight">
              <span className="text-gray-900">Secure</span>
              <span className="text-blue-600">Bank</span>
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-900 mt-2 mb-1">Welcome Back!</h1>
        <p className="text-gray-400 text-sm mb-7">Login to access your account</p>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">

          {/* Email / Account Number */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white focus-within:border-blue-500 transition">
          <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              placeholder="Email or Account Number"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white focus-within:border-blue-500 transition">
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition">
              {showPassword ? (
                <Eye />
                 
              ) : (
                
               <EyeClosed />
              )}
            </button>
          </div>
          {/* Remember me + Forgot password */}
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

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 rounded-2xl transition text-base mt-1"
          >
            Login
          </button>
        </form>

        {/* OR divider */}
        {/* <div className="flex items-center gap-3 w-full my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium tracking-widest">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div> */}

        {/* Biometrics button */}
        {/* <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-2xl py-4 text-gray-800 font-semibold text-sm hover:bg-gray-50 active:bg-gray-100 transition">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
          </svg>
          Login with Biometrics
        </button> */}

        {/* Signup */}
        <p className="mt-6 text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">Signup</a>
        </p>

        {/* Security note */}
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

export default login;



