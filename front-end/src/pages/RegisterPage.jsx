import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      const response = await fetch("api/register.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setMessage(data.message || "Account creation successful.");
      } else {
        setMessage(data.message || "Account creation failed.");
      }
    } catch (e) {
      setMessage("Could not connect to the server.");
      console.error("Login Error:", e);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f9f9f9] font-sans">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[2rem] serif-font text-purple-800">Register</h1>

        {message && (
          <p className="text-purple-500 text-sm font-mono">{message}</p>
        )}

        <form
          onSubmit={handleRegister}
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
            CREATE ACCOUNT
          </button>
        </form>

        <button
          onClick={handleClick}
          className="text-blue-400 hover:text-blue-600 font-mono"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
