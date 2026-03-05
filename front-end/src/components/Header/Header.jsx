import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo}>Erudition</h2>

        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">Your Notes</a>
          <a href="#">About</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
