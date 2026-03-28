"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./profile.module.css";
import { MapPin, Calendar, Award, BookOpen } from "lucide-react";
import ProfileForm from "./ProfileForm";
import GlobalGlobe from "@/components/globalGlobe/GlobalGlobe";

const ProfileClient = ({ user, posts }) => {
  const [editMode, setEditMode] = useState(false);

  if (editMode) {
    return (
      <div className={styles.profileCard}>
        <ProfileForm user={user} setEditMode={setEditMode} />
      </div>
    );
  }

  return (
    <div className={styles.profileCard}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Image
            src={user.image || "/noavatar.png"}
            alt="Profile"
            fill
            className={styles.avatar}
          />
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.name}>{user.name || "Explorer"}</h1>
          <p className={styles.email}>{user.email}</p>
          <div className={styles.tags}>
            <span className={styles.tag}>
              <MapPin size={14} /> Global Traveler
            </span>
            <span className={styles.tag}>
              <Calendar size={14} /> Joined {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bio}>
        <h3>About You</h3>
        <p>
          You are a member of the Voyage Verse community. Start exploring new stories or 
          create your own adventure to inspire others around the globe!
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.editBtn} onClick={() => setEditMode(true)}>Edit Profile</button>
      </div>

      <div style={{ marginTop: "40px", width: "100%", background: "var(--glass-bg)", backdropFilter: "blur(10px)", border: "1px solid var(--glass-border)", padding: "20px", borderRadius: "10px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ margin: "0", color: "var(--text)" }}>Your Personal Journey</h3>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "var(--textSoft)", opacity: 0.8 }}>Follow your individual tracks across the globe</p>
        </div>
        <GlobalGlobe posts={posts} />
      </div>
    </div>
  );
};

export default ProfileClient;
