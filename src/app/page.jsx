import React from 'react'
import styles from './home.module.css'
import Link from 'next/link';
import { getPosts } from '@/lib/data';
import GlobalGlobe from '@/components/globalGlobe/GlobalGlobe';

const Home = async () => {
  const posts = await getPosts();
  
  // Clean mongoose objects for client components
  const plainPosts = posts.map(post => ({
    _id: post._id.toString(),
    lat: post.lat,
    lng: post.lng
  }));

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Explore the World <br />
          <span>Through Stories</span>
        </h1>
        <p className={styles.desc}>
          Your ultimate destination for captivating travel stories and adventures. 
          Discover hidden gems, find inspiration, and connect with our community of global explorers.
        </p>
        <div className={styles.buttons}>
          <Link href='/blog' className="glow-btn">Read Stories</Link>
          <Link href='/contact' className={styles.secondaryButton}>Contact Us</Link>
        </div>
      </div>
      
      <div className={styles.imageContainer}>
        <div className={styles.globeWrapper}>
          <GlobalGlobe posts={plainPosts} />
        </div>
        <div className={styles.globeLabel}>
          <h3>Global Stories Tracker</h3>
          <p>Every marker is a journey shared by our community</p>
        </div>
        <div className={styles.glow} />
      </div>
    </div>
  );
};

export default Home;