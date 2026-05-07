import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { isLogged, logout, user } = useAuth();

  function handleHomeClick() {
    navigate("/");
  }

  function handleExploreClick() {
    navigate("/explore");
  }

  function handleNotesClick() {
    navigate("/notes");
  }

  function handleNotesCreationClick() {
    navigate("/notes/creation");
  }

  function handleAboutClick() {
    navigate("/about");
  }

  function handleLogOut() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b-[1px] border-b-[#eee] bg-white sticky top-0 z-50">
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
            onClick={handleExploreClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            Explore
          </a>
          <a
            onClick={handleNotesClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            Your Notes
          </a>
          <a
            onClick={handleNotesCreationClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            Create Notes
          </a>
          {/*<a
            onClick={handleAboutClick}
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            About
          </a> */}
          <a
            target="_blank"
            href="https://github.com/Orcinus3/informatica_2025-2026"
            className="ml-7 cursor-pointer text-[#333] sans-font hover:text-purple-600"
          >
            GitHub
          </a>
          <a
            onClick={handleLogOut}
            className="ml-7 cursor-pointer text-purple-400 sans-font hover:text-purple-600"
          >
            Log out (Username {user})
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
