import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate("/");
  }

  function handleNotesClick() {
    navigate("/notes");
  }

  function handleAboutClick() {
    navigate("/about");
  }

  function handleSignInClick() {
    navigate("/login");
  }

  return (
    <header className="border-b-[1px] border-b-[#eee] bg-white">
      <div className="w-full mx-auto p-5 flex justify-between items-center">
        <a
          onClick={handleHomeClick}
          className="font-bold mono-font cursor-pointer text-purple-700"
        >
          Erudition
        </a>

        <nav className="flex">
          <a
            onClick={handleHomeClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600 "
          >
            Home
          </a>
          <a
            onClick={handleNotesClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            Your Notes
          </a>
          <a
            onClick={handleAboutClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            About
          </a>
          <a className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600">
            GitHub
          </a>
          <a
            onClick={handleSignInClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            Sign in
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
