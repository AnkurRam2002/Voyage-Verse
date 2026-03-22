import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import { auth } from "@/auth";
import styles from "../../admin.module.css";

const AdminNewPostPage = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Create New Story</h1>
      <AdminPostForm userId={session.user.id} />
    </div>
  );
};

export default AdminNewPostPage;
