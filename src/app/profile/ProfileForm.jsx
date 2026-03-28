"use client";

import { useActionState } from "react";
import styles from "./profileForm.module.css";
import { updateUser } from "@/lib/action";
import { Camera, Save, X } from "lucide-react";
import { useState } from "react";

const ProfileForm = ({ user, setEditMode }) => {
  const [state, formAction] = useActionState(updateUser, undefined);
  const [img, setImg] = useState(user.image || "");

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={user.id} />
      
      <div className={styles.avatarSection}>
        <div className={styles.avatarWrapper}>
          <img
            src={img || "/noavatar.png"}
            alt=""
            className={styles.avatar}
          />
          <div className={styles.cameraIcon}>
            <Camera size={20} />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>Avatar URL</label>
          <input 
            type="text" 
            name="img" 
            value={img} 
            onChange={(e) => setImg(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Username</label>
        <input type="text" name="username" defaultValue={user.name} required />
      </div>

      <div className={styles.inputGroup}>
        <label>Email</label>
        <input type="email" name="email" defaultValue={user.email} required />
      </div>

      <div className={styles.inputGroup}>
        <label>New Password (Optional)</label>
        <input type="password" name="password" placeholder="Leave empty to keep current" />
      </div>

      <div className={styles.actions}>
        <button 
          type="button" 
          onClick={() => setEditMode(false)} 
          className={styles.cancelBtn}
        >
          <X size={18} /> Cancel
        </button>
        <button type="submit" className={styles.saveBtn}>
          <Save size={18} /> Save Changes
        </button>
      </div>

      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.success && <p className={styles.success}>Profile updated successfully!</p>}
    </form>
  );
};

export default ProfileForm;
