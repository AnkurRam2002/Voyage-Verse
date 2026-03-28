"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useActionState } from "react";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useActionState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <h2 className={styles.title}>Welcome Back</h2>
      <p className={styles.subtitle}>Enter your details to continue your journey</p>
      <div className={styles.inputGroup}>
        <input type="text" placeholder="Username" name="username" required />
      </div>
      <div className={styles.inputGroup}>
        <input type="password" placeholder="Password" name="password" required />
      </div>
      <button className={styles.button}>Login</button>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      <Link href="/register" className={styles.link}>
        {"Don't have an account?"} <b>Register Now</b>
      </Link>
    </form>
  );
};

export default LoginForm;