import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import { getPostById } from "@/lib/data"; // I need to add this
import { auth } from "@/auth";
import styles from "../../admin.module.css";

const AdminEditPostPage = async ({ params }) => {
  const { id } = params;
  const post = await getPostById(id);
  const session = await auth();

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Edit Story</h1>
      <AdminPostForm userId={session.user.id} post={post} />
    </div>
  );
};

export default AdminEditPostPage;
