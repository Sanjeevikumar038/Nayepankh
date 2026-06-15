import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>🪶</div>
            <div>
              <div className={styles.brandName}>NayePankh AI Assistant</div>
              <div className={styles.brandTagline}>Empowering Lives, Creating New Wings</div>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Quick Links</h4>
              <a href="#home" className={styles.link}>Home</a>
              <a href="#features" className={styles.link}>Features</a>
              <a href="#chat" className={styles.link}>Chat</a>
              <a href="#faq" className={styles.link}>FAQ</a>
              <a href="#about" className={styles.link}>About</a>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>NayePankh</h4>
              <a href="https://nayepankh.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Website</a>
              <a href="https://instagram.com/nayepankh" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>
              <a href="https://linkedin.com/company/nayepankh" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Get Involved</h4>
              <a href="https://nayepankh.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Volunteer</a>
              <a href="https://nayepankh.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Internships</a>
              <a href="https://nayepankh.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Donate</a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} NayePankh Foundation. All rights reserved.
          </p>
          <div className={styles.devCredit}>
            <span>Developed with</span>
            <span className={styles.heart}>❤️</span>
            <span>by</span>
            <span className={styles.devName}>Sanjeevikumar D</span>
          </div>
          <div className={styles.techStack}>
            <span className={styles.techBadge}>React</span>
            <span className={styles.techBadge}>Vite</span>
            <span className={styles.techBadge}>Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
