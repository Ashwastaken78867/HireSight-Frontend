// src/pages/Signup.tsx
import React, { useState } from "react";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Logo from  "../assets/logo.png"
const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (name.trim().length < 2) {
        throw new Error("Please enter your full name");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      await signup(name, email, password);
      navigate("/login", { replace: true, state: { justSignedUp: true, email } });
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error instanceof Error ? error.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-light-grey to-grey-50 flex">
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            
          <img
        src={Logo}
        alt="HireSight Logo"
        className="h-9 w-9 rounded-lg shadow-md bg-black/10 p-1"
      />
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">HireSight</h1> 
         
          
          </div>

          <h2 className="mt-10 text-4xl font-bold tracking-tight text-gray-900">Create your free account</h2>
          <p className="mt-4 text-gray-600">It takes less than a minute to get started.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-8">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h1>
              <p className="mt-2 text-sm text-gray-500">Join ATS Tracker to manage your applications</p>
            </div>
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-1 text-xs text-gray-500">Use 8+ characters for stronger security</p>
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
