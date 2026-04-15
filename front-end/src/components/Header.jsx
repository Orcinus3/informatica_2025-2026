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

  return (
    <header className="border-b-[1px] border-b-[#eee] bg-white">
      <div className="w-full mx-auto p-5 flex justify-between items-center">
        <a
          onClick={handleHomeClick}
          className="font-bold mono-font cursor-pointer"
        >
          Erudition
        </a>

        <nav className="flex">
          <a
            onClick={handleHomeClick}
            className="ml-5 cursor-pointer text-[#333] sans-font"
          >
            Home
          </a>
          <a
            onClick={handleNotesClick}
            className="ml-5 cursor-pointer text-[#333] sans-font"
          >
            Your Notes
          </a>
          <a
            onClick={handleAboutClick}
            className="ml-5 cursor-pointer text-[#333] sans-font"
          >
            About
          </a>
          <a className="ml-5 cursor-pointer text-[#333] sans-font">GitHub</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
