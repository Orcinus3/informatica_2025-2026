import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white/85 font-sans">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[28px]">Register</h1>

        <form
          action="/api/register.php"
          method="post"
          className="w-[500px] p-8 flex flex-col justify-center items-center gap-4 
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
            CREATE ACCOUNT
          </button>
        </form>

        <button
          onClick={handleClick}
          className="text-blue-400 hover:text-blue-600"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
