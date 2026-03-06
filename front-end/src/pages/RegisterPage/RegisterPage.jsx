import styles from "./RegisterPage.module.css";

function RegisterPage() {
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
    </>
  );
}

export default RegisterPage;
