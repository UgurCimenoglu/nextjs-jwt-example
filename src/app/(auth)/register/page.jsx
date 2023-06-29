import React from "react";
import styles from "./page.module.css";

const Register = () => {
  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <input className={styles.input} type="text" placeholder="Username" />
        <input className={styles.input} type="text" placeholder="Email" />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        <button className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
