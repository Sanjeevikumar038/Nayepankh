import { useState } from "react";
import { faqData, aboutNayePankh } from "../data/predefinedQuestions";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("faq");

  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === "faq" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("faq")}
          aria-selected={activeTab === "faq"}
          role="tab"
        >
          ❓ FAQ
        </button>
        <button
          className={`${styles.tab} ${activeTab === "about" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("about")}
          aria-selected={activeTab === "about"}
          role="tab"
        >
          🌟 About
        </button>
        <button
          className={`${styles.tab} ${activeTab === "contact" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("contact")}
          aria-selected={activeTab === "contact"}
          role="tab"
        >
          📞 Contact
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "faq" && (
          <div id="faq" className={styles.faqSection}>
            <h3 className={styles.panelTitle}>Frequently Asked Questions</h3>
            <div className={styles.faqList} role="list">
              {faqData.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.faqItem} ${openFaq === item.id ? styles.faqOpen : ""}`}
                  role="listitem"
                >
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={openFaq === item.id}
                  >
                    <span>{item.question}</span>
                    <span className={styles.faqIcon}>
                      {openFaq === item.id ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === item.id && (
                    <div className={styles.faqAnswer}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div id="about" className={styles.aboutSection}>
            <h3 className={styles.panelTitle}>About NayePankh</h3>

            <div className={styles.aboutCard}>
              <div className={styles.aboutLogo}>🪶</div>
              <h4 className={styles.aboutName}>{aboutNayePankh.name}</h4>
              <p className={styles.aboutTagline}>{aboutNayePankh.tagline}</p>
              <div className={styles.aboutBadge}>Est. {aboutNayePankh.founded}</div>
            </div>

            <div className={styles.infoSection}>
              <h5 className={styles.infoTitle}>🎯 Mission</h5>
              <p className={styles.infoText}>{aboutNayePankh.mission}</p>
            </div>

            <div className={styles.infoSection}>
              <h5 className={styles.infoTitle}>👁️ Vision</h5>
              <p className={styles.infoText}>{aboutNayePankh.vision}</p>
            </div>

            <div className={styles.infoSection}>
              <h5 className={styles.infoTitle}>🌟 Focus Areas</h5>
              <ul className={styles.focusList}>
                {aboutNayePankh.focus_areas.map((area, i) => (
                  <li key={i} className={styles.focusItem}>
                    <span className={styles.focusDot}></span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.socialLinks}>
              <a
                href={aboutNayePankh.social_links.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                🌐 Website
              </a>
              <a
                href={aboutNayePankh.social_links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                📸 Instagram
              </a>
              <a
                href={aboutNayePankh.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div id="contact" className={styles.contactSection}>
            <h3 className={styles.panelTitle}>Get In Touch</h3>

            <div className={styles.contactCard}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🌐</span>
                <div>
                  <div className={styles.contactLabel}>Website</div>
                  <a href="https://nayepankh.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    nayepankh.com
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📸</span>
                <div>
                  <div className={styles.contactLabel}>Instagram</div>
                  <a href="https://instagram.com/nayepankh" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    @nayepankh
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>💼</span>
                <div>
                  <div className={styles.contactLabel}>LinkedIn</div>
                  <a href="https://linkedin.com/company/nayepankh" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    NayePankh Foundation
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.volunteerCta}>
              <h4>Ready to Make a Difference?</h4>
              <p>Join thousands of volunteers making a real impact through NayePankh Foundation.</p>
              <a
                href="https://nayepankh.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                🤝 Join as Volunteer
              </a>
            </div>

            <div className={styles.donationCta}>
              <h4>💝 Support Our Mission</h4>
              <p>Your donation, no matter how small, creates wings for someone who needs them.</p>
              <a
                href="https://nayepankh.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.donateBtn}
              >
                ❤️ Donate Now
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
