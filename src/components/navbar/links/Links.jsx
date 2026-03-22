"use client"

import React from 'react'
import { useState } from 'react';
import styles from './links.module.css'
import NavLink from './navLink/navLink';
import Image from 'next/image';
import Link from 'next/link';
import { handleLogout } from '@/lib/action';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useRef, useEffect } from 'react';

const Links = ({session}) => {

  const [open, setOpen] = useState(false); 
  const [userMenuOpen, setUserMenuOpen] = useState(false); 

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    const links = [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "About",
          path: "/about",
        },
        {
          title: "Contact",
          path: "/contact",
        },
        {
          title: "Stories",
          path: "/blog",
        },
      ];

      
      const isAdmin = true;

  return (
    <div className={styles.container}>
    <div className={styles.links}>
        {links.map((link => (
            <NavLink item={link} key={link.title} />
        )))}
        {session?.user ? (
          <div className={styles.userContainer} ref={userMenuRef}>
            <div 
              className={styles.userBadgeWrapper} 
              onClick={() => setUserMenuOpen((prev) => !prev)}
            >
              <Image
                src={session.user.image || "/noavatar.png"}
                alt="User"
                width={35}
                height={35}
                className={styles.userBadge}
              />
            </div>
            
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={styles.userMenu}
                >
                  <div className={styles.userInfo}>
                    <Image
                      src={session.user.image || "/noavatar.png"}
                      alt="User"
                      width={45}
                      height={45}
                      className={styles.userMenuAvatar}
                    />
                    <div className={styles.userDetails}>
                      <p className={styles.userName}>{session.user.name || "Explorer"}</p>
                      <p className={styles.userEmail}>{session.user.email}</p>
                    </div>
                  </div>
                  <hr className={styles.separator} />
                  <Link href="/profile" className={styles.menuLink}>
                    <User size={16} />
                    Profile
                  </Link>
                  {session.user?.isAdmin && (
                    <Link href="/admin" className={styles.menuLink}>
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  )}
                  <hr className={styles.separator} />
                  <form action={handleLogout}>
                    <button className={styles.logoutBtn}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
    </div>
    <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
    {open && (
      <div className={styles.mobileLinks} ref={mobileMenuRef}>
        {links.map((link) => (
            <NavLink item={link} key={link.title} />
        ))}
    </div>
    )}
    </div>
  )
}

export default Links

