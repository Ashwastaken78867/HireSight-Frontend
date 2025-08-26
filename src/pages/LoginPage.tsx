// src/pages/Login.tsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState<string>("");

  if (!auth) return null;

  useEffect(() => {
    if (location.state && (location.state as any).justSignedUp) {
      const emailPrefill = (location.state as any).email as string | undefined;
      if (emailPrefill) setEmail(emailPrefill);
      setInfo("Account created successfully. Please sign in.");
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.loginUser(email, password);
      navigate("/dashboard"); // redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex">
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            {/* <div className="h-10 w-10 rounded-xl bg-indigo-600" /> */}

  <img
        src={Logo}
        alt="HireSight Logo"
        className="h-9 w-9 rounded-lg shadow-md bg-black/10 p-1"
      />
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">HireSight</h1> 
         
         
         
          </div>
          <h2 className="mt-10 text-4xl font-bold tracking-tight text-gray-900">Manage your applications smarter</h2>
          <p className="mt-4 text-gray-600">Track, analyze, and streamline your job search with a modern, intuitive dashboard.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-8">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
              <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
            </div>
            {info && (
              <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
                {info}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  Remember me
                </label>
                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
