import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/register");
  }

  return (
    <div className={styles.html}>
      <h1>Login</h1>

      <form action="login.php" method="post" className={styles.form}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
        ></input>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        ></input>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        ></input>
        <button type="submit">LOG IN</button>
      </form>

      <a onClick={handleClick} className={styles.a}>
        Don't have an account?
      </a>
    </div>
  );
}

export default LoginPage;
