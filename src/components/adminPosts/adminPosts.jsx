"use client"

import { useState } from "react"
import styles from "./adminPosts.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/action";
import { LayoutGrid, List, Trash2, Edit } from "lucide-react";
import Link from "next/link";

const AdminPosts = ({ posts }) => {
  const [viewMode, setViewMode] = useState("list") // list | tiles

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>All Stories</h2>
        <div className={styles.viewToggle}>
          <button 
            className={`${styles.toggleBtn} ${viewMode === "list" ? styles.activeToggle : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <List size={20} />
          </button>
          <button 
            className={`${styles.toggleBtn} ${viewMode === "tiles" ? styles.activeToggle : ""}`}
            onClick={() => setViewMode("tiles")}
            title="Tile View"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      <div className={viewMode === "list" ? styles.list : styles.grid}>
        {posts.map((post) => (
          <div className={viewMode === "list" ? styles.post : styles.postCard} key={post._id.toString()}>
            <div className={styles.detail}>
              <div className={styles.imgWrapper}>
                <Image
                  src={post.img || "/noAvatar.png"}
                  alt=""
                  fill
                  className={styles.postImg}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.postTitle}>{post.title}</span>
                {viewMode === "tiles" && <span className={styles.postDate}>{post.createdAt?.toString().slice(0, 10)}</span>}
              </div>
            </div>
            <div className={styles.actions}>
              <Link href={`/admin/posts/${post._id.toString()}`} className={styles.editBtn}>
                <Edit size={16} />
                <span>Edit</span>
              </Link>
              <form action={deletePost} className={styles.deleteForm}>
                <input type="hidden" name="id" value={post._id.toString()} />
                <button className={styles.postButton}>
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPosts;