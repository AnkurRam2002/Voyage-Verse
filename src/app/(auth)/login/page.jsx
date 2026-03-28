import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/action";
import styles from "./login.module.css";
import Image from "next/image";

const LoginPage = () => {
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
          <LoginForm />
          
          <div className={styles.divider}>
            <span>or continue with</span>
          </div>
          
          <form action={handleGithubLogin}>
            <button className={styles.github}>
              <Image src="/github_icon.png" alt="Github" width={24} height={24} />
              Login with Github
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;