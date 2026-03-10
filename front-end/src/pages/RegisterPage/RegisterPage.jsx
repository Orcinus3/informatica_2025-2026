import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <h1 className={styles.h1}>Register</h1>
      <form action="register.php" method="post" className={styles.form}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        ></input>
        <input type="email" name="email" id="email" placeholder="Email"></input>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        ></input>

        <button type="submit" className={styles.button}>
          CREATE ACCOUNT
        </button>
      </form>
      <a onClick={handleClick} className={styles.a}>
        Already have an account?
      </a>
    </>
  );
}

export default RegisterPage;
