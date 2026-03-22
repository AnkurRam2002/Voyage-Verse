import Image from 'next/image'
import React from 'react'
import styles from './about.module.css'
import { Globe, Users, BookOpen, Compass } from 'lucide-react'

export const metadata = {
  title: "About | Voyage Verse",
  description: "Learn more about our mission to explore the world through captivating stories.",
};

const AboutPage = () => {
  return (
    <div className={styles.page}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroBadge}>Our Story</div>
        <h1 className={styles.heroTitle}>
          Travel is the only thing<br />
          <span>you buy that makes you richer</span>
        </h1>
        <p className={styles.heroDesc}>
          VoyageVerse is a community built by explorers, for explorers. We believe every journey deserves to be remembered and every story deserves to be heard.
        </p>
      </section>

      {/* Stats row */}
      <section className={styles.statsRow}>
        <div className={styles.statCard}>
          <Globe size={28} className={styles.statIcon} />
          <span className={styles.statNum}>50+</span>
          <span className={styles.statLabel}>Countries</span>
        </div>
        <div className={styles.statCard}>
          <BookOpen size={28} className={styles.statIcon} />
          <span className={styles.statNum}>100+</span>
          <span className={styles.statLabel}>Stories Shared</span>
        </div>
        <div className={styles.statCard}>
          <Users size={28} className={styles.statIcon} />
          <span className={styles.statNum}>500+</span>
          <span className={styles.statLabel}>Explorers</span>
        </div>
        <div className={styles.statCard}>
          <Compass size={28} className={styles.statIcon} />
          <span className={styles.statNum}>∞</span>
          <span className={styles.statLabel}>Adventures Ahead</span>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionImg}>
          <div className={styles.glow} />
          <Image src="/about2.png" alt="About VoyageVerse" fill className={styles.img} />
        </div>
        <div className={styles.missionText}>
          <span className={styles.badge}>Our Mission</span>
          <h2 className={styles.sectionTitle}>Built by wanderers,<br />for the world</h2>
          <p className={styles.sectionDesc}>
            VoyageVerse was founded by a group of wanderlust enthusiasts who believed that the world's best stories were going untold. Our platform connects travelers across the globe, giving them a beautiful canvas to document their adventures, share local insights, and inspire others to take the leap.
          </p>
          <p className={styles.sectionDesc}>
            From solo backpacking trips through Southeast Asia to family road trips across Europe — every journey matters here.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <h2 className={styles.centeredTitle}>What we stand for</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>✦</div>
            <h3>Authenticity</h3>
            <p>Real stories from real travelers. No sponsored fluff, just honest adventures from people like you.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🌍</div>
            <h3>Community</h3>
            <p>We're stronger together. A global network of explorers who uplift, inspire, and learn from each other.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>💡</div>
            <h3>Discovery</h3>
            <p>Every culture is a lesson. We celebrate the joy of stumbling onto something new, every single day.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage