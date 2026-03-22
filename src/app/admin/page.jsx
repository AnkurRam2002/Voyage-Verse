import { Suspense } from "react";
import styles from "./admin.module.css";
import { auth } from "@/auth";
import { getPosts, getUsers, getAdminStats } from "@/lib/data";
import { BookOpen, Users } from "lucide-react";
import AdminDashboard from "@/components/adminDashboard/AdminDashboard";

const AdminPage = async () => {

  const session = await auth();
  const posts = await getPosts();
  const users = await getUsers();
  const { postStats, userStats } = await getAdminStats();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      
      <AdminDashboard postStats={postStats} userStats={userStats} />

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <BookOpen size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statTitle}>Total Stories</span>
            <span className={styles.statValue}>{posts.length}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statTitle}>Active Explorers</span>
            <span className={styles.statValue}>{users.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;