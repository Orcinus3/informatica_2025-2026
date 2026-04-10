import styles from "./Header.module.css";
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
        <h2 className={styles.logo}>Erudition</h2>

        <nav className={styles.nav}>
          <a className="cursor-pointer">Home</a>
          <a onClick={handleNotesClick} className="cursor-pointer">
            Your Notes
          </a>
          <a onClick={handleAboutClick} className="cursor-pointer">
            About
          </a>
          <a className="cursor-pointer">GitHub</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
