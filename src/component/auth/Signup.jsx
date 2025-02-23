import React, { useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { signup } from '../../redux/action/authAction';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch  = useDispatch()

    const { loading, error, token } = useSelector((state) => state?.auth);
    console.log(error)

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
    
      if (password?.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
    
      try {
        await dispatch(signup(name, email, password));
        toast.success("Account created successfully!");
        navigate("/");
      } catch (err) {
        toast.error(err.message);
      }
    };
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Create an account</h1>
          <p className="text-gray-500">Enter your details to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
          >
            {loading ? "Signing up..." : "Create account"}
          </button>
        </form>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline font-medium cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default Signup