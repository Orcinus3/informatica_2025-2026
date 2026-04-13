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

    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
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
    <div className="min-h-screen w-full flex items-center justify-center bg-white/85 font-sans">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[28px]">Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form
          onSubmit={handleLogin}
          className="w-125 p-8 flex flex-col justify-center items-center gap-4
                     rounded-xl bg-white/85 border border-black shadow-lg"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-[95%] h-12 text-base rounded-lg px-2 py-3 border border-gray-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-[95%] h-12 text-base rounded-lg px-2 py-3 border border-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-[95%] h-12 text-base rounded-lg px-2 py-3 border border-gray-300"
          />

          <button
            type="submit"
            className="w-full mt-2 h-12 px-6 py-3 rounded-lg bg-white border border-black
                       transition-all duration-150 hover:bg-black/75 hover:text-white"
          >
            LOG IN
          </button>
        </form>

        <button
          onClick={handleClick}
          className="text-blue-400 hover:text-blue-600"
        >
          Don't have an account?
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-blue-400 hover:text-blue-600"
        >
          Link for testing purposes
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
