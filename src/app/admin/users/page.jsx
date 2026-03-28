import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";
import { getUsers } from "@/lib/data";
import styles from "../admin.module.css";

const AdminUsersPage = async () => {
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Explorer Management</h1>
      <div className={styles.row}>
        <div className={styles.col}>
          <AdminUsers users={users} />
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
