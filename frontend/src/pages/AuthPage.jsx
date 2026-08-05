import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const AuthPage = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const isLogin = mode === "login";
  const title = isLogin ? "Welcome back" : "Create your account";
  const subtitle = isLogin
    ? "Sign in to keep your notes private and synced to your account."
    : "Create a username and password to start saving private notes.";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login({ username, password });
        toast.success("Logged in successfully");
      } else {
        await register({ username, password });
        toast.success("Account created successfully");
      }

      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Authentication failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body gap-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-base-content/70">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                placeholder="your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered"
                placeholder="your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
            </label>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Login" : "Create account"}
            </button>
          </form>

          <div className="text-center text-sm text-base-content/70">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="link link-primary font-medium">
                  Create account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-medium">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;