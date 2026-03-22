"use client";

import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useActionState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <h2 className={styles.title}>Create Account</h2>
      <p className={styles.subtitle}>Join VoyageVerse and start your adventure today</p>
      
      <div className={styles.inputGroup}>
        <input type="text" placeholder="Username" name="username" required />
      </div>
      <div className={styles.inputGroup}>
        <input type="email" placeholder="Email Address" name="email" required />
      </div>
      <div className={styles.inputGroup}>
        <input type="password" placeholder="Password" name="password" required />
      </div>
      <div className={styles.inputGroup}>
        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordRepeat"
          required
        />
      </div>
      
      <button className={styles.button}>Register</button>
      
      {state?.error && <p className={styles.error}>{state.error}</p>}
      
      <Link href="/login" className={styles.link}>
        Already have an account? <b>Login Now</b>
      </Link>
    </form>
  );
};

export default RegisterForm;