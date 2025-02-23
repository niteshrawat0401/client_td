import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { login } from '../../redux/action/authAction';
import { toast, Toaster } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  
    const { loading, error, token } = useSelector((state) => state.auth);
    
    useEffect(() => {
      if (token) {
        toast.success("User logged in successfully!");
        navigate("/todos");
      }
    }, [token, navigate]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
  
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
  
      dispatch(login(email, password));
    };
  
    useEffect(() => {
      if (error?.status === 400) {
        toast.error(error?.response?.data?.message);
      }
    }, [error]);
  
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 glass-card">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
            <p className="text-gray-500">Enter your details to sign in</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button type="submit" disabled={loading}
             className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an account?</span>{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline font-medium cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
        <Toaster/>
      </div>
    );
  
}

export default Login