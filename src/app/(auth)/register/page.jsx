import RegisterForm from "@/components/registerForm/registerForm";
import styles from "./register.module.css";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image 
          src="/travel_login_bg.png" 
          alt="Travel Background" 
          fill 
          className={styles.bgImage}
          priority
        />
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;