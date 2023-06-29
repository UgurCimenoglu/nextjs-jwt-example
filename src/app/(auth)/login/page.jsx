"use client";

import React from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const { success } = await res.json();
    if (success) {
      const nextUrl = searchParams.get("next");
      router.push(nextUrl ? nextUrl : "/");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          name="username"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="password"
        />
        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
