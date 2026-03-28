"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./adminLayout.module.css";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  PlusCircle, 
  ArrowLeft 
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Overview",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "All Stories",
      path: "/admin/posts",
      icon: <FileText size={20} />,
    },
    {
      title: "Create Story",
      path: "/admin/posts/new",
      icon: <PlusCircle size={20} />,
    },
    {
      title: "Explorers",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Admin Panel</h3>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            Exit Admin
          </Link>
        </div>
        
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${
                pathname === item.path ? styles.active : ""
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
