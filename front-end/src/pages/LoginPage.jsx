import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  function handleClick() {
    navigate("/register");
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);

    try {
      const response = await fetch("api/login.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        login(data.username);

        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Could not connect to the server.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f9f9f9] font-sans">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[2rem] serif-font text-purple-800">Login</h1>

        {error && <p className="text-red-500 text-sm font-mono">{error}</p>}

        <form
          onSubmit={handleLogin}
          className="min-w-135 p-12 flex flex-col justify-center items-center gap-4
                     rounded-lg bg-white/85 border border-gray-300 shadow"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-[95%] h-12 text-base rounded px-2 py-3 outline-gray-300 focus:outline-purple-500 outline-1 focus:bg-purple-50 font-mono"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-[95%] h-12 text-base rounded px-2 py-3 outline-gray-300 focus:outline-purple-500 outline-1 focus:bg-purple-50 font-mono"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-[95%] h-12 text-base rounded px-2 py-3 outline-gray-300 focus:outline-purple-500 outline-1 focus:bg-purple-50 font-mono"
          />

          <button
            type="submit"
            className="w-full mt-2 h-12 px-6 py-3 rounded bg-white border border-gray-300
                       transition-all hover:bg-purple-50 hover:border-purple-500 sans-font"
          >
            LOG IN
          </button>
        </form>

        <button
          onClick={handleClick}
          className="text-blue-400 hover:text-blue-600 font-mono"
        >
          Don't have an account?
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
