import React from 'react'
import Image from 'next/image';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import styles from './contact.module.css'

export const metadata = {
  title: "Contact | Voyage Verse",
  description: "Get in touch with us for collaborations, feedback, or travel inquiries.",
};

const ContactPage = () => {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroBadge}>Get In Touch</div>
        <h1 className={styles.heroTitle}>
          Let's talk about your<br />
          <span>next adventure</span>
        </h1>
        <p className={styles.heroDesc}>
          Have a story to share, a collaboration in mind, or just want to say hello? We'd love to hear from fellow explorers.
        </p>
      </section>

      {/* Content Grid */}
      <section className={styles.content}>

        {/* Info Panel */}
        <div className={styles.infoPanel}>
          <div className={styles.imgContainer}>
            <div className={styles.glow} />
            <Image src="/contact2.png" alt="Contact Us" fill className={styles.img} />
          </div>
          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><Mail size={20} /></div>
              <div>
                <p className={styles.contactLabel}>Email</p>
                <p className={styles.contactValue}>hello@voyageverse.com</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><Phone size={20} /></div>
              <div>
                <p className={styles.contactLabel}>Phone</p>
                <p className={styles.contactValue}>+1 (800) VOYAGE-1</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><MapPin size={20} /></div>
              <div>
                <p className={styles.contactLabel}>Location</p>
                <p className={styles.contactValue}>Somewhere between Tokyo & Patagonia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Send us a message</h2>
          <p className={styles.formSubtitle}>We typically reply within 24 hours.</p>
          <form action="" className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input type="text" placeholder="Your full name" />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Subject</label>
              <input type="text" placeholder="What's this about?" />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea placeholder="Tell us about your inquiry, collaboration, or just say hi..." rows={7} />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>

      </section>
    </div>
  );
};

export default ContactPage