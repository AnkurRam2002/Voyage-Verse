"use client"

import { addPost, updatePost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useActionState, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import the RichEditor (client-only, avoids SSR issues)
const RichEditor = dynamic(() => import("@/components/richEditor/RichEditor"), { ssr: false });

const AdminPostForm = ({ userId, post }) => {
  const router = useRouter();
  const isEdit = !!post;
  
  // Choose action based on mode
  const [state, formAction] = useActionState(isEdit ? updatePost : addPost, undefined);
  const [desc, setDesc] = useState(post?.desc || post?.body || "");

  // Redirect on success if editing
  useEffect(() => {
    if (state?.success && isEdit) {
      router.push("/admin/posts");
    }
  }, [state, isEdit, router]);

  return (
    <form action={formAction} className={styles.container}>
      <h1>{isEdit ? "Edit Story" : "Add New Post"}</h1>
      
      {isEdit && <input type="hidden" name="id" value={post._id.toString()} />}
      <input type="hidden" name="userId" value={userId} />
      
      {/* Hidden field carries the HTML from rich editor */}
      <input type="hidden" name="desc" value={desc} />

      <input 
        type="text" 
        name="title" 
        placeholder="Story Title" 
        defaultValue={post?.title || ""} 
        required 
      />
      
      <input 
        type="text" 
        name="img" 
        placeholder="Cover Image URL (Optional - will auto-fetch if empty)" 
        defaultValue={post?.img || ""} 
      />
      
      <input 
        type="text" 
        name="location" 
        placeholder="Location (e.g. Paris, France)" 
        defaultValue={post?.location || ""} 
      />

      <div className={styles.editorWrapper}>
        <label className={styles.editorLabel}>Story Content</label>
        <RichEditor
          value={desc}
          onChange={setDesc}
          placeholder="Write your travel story here..."
        />
      </div>

      <button type="submit" className={styles.publishBtn}>
        {isEdit ? "Update Story" : "Publish Story"}
      </button>
      
      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.success && !isEdit && <p className={styles.success}>Post published successfully!</p>}
    </form>
  );
};

export default AdminPostForm;