import React from 'react'
import Links from './links/Links'
import styles from './navbar.module.css'
import Link from 'next/link'
import { auth } from '@/auth'

const Navbar = async() => {

  const session = await auth();
  console.log(session);

  return (
    <nav className={styles.container}>
      <Link href='/' className={styles.logo}>
        <div className={styles.logoIcon}>V</div>
        <div className={styles.logoText}>VOYAGE<span>VERSE</span></div>
      </Link>
      <div className={styles.linksContainer}>
        <Links session={session}/>
      </div>
    </nav>
  );
};

export default Navbar