import AdminPosts from "@/components/adminPosts/adminPosts";
import { getPosts } from "@/lib/data";
import styles from "../admin.module.css";

const AdminPostsPage = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Manage Stories</h1>
      <AdminPosts posts={posts} />
    </div>
  );
};

export default AdminPostsPage;
