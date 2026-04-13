import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleNotesClick() {
    navigate("/notes");
  }

  function handleAboutClick() {
    navigate("/about");
  }

  return (
    <header className="border-b-[1px] border-b-[#eee] bg-white">
      <div className="w-full mx-auto p-5 flex justify-between items-center">
        <h2 className="font-bold">Erudition</h2>

        <nav className="flex">
          <a className="ml-5 cursor-pointer no-underline text-[#333]">Home</a>
          <a
            onClick={handleNotesClick}
            className="ml-5 cursor-pointer no-underline text-[#333]"
          >
            Your Notes
          </a>
          <a
            onClick={handleAboutClick}
            className="ml-5 cursor-pointer no-underline text-[#333]"
          >
            About
          </a>
          <a className="ml-5 cursor-pointer no-underline text-[#333]">GitHub</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
