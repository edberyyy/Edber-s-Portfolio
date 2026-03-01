import PageLayout from "../components/PageLayout";
import styles from "./about.module.css";

const SKILLS = [
  {
    cat: "Languages",
    items: ["JavaScript (Intermediate)", "Java (Basic)", "Python (Basic)", "SQL (Basic)"],
  },
  {
    cat: "Web / App",
    items: ["HTML & CSS", "ReactJS", "Next.js", "NodeJS (Basic)"],
  },
  {
    cat: "Tools",
    items: ["Figma", "GitHub", "VS Code", "Android Studio", "Postman", "MySQL"],
  },
];

const PLATFORMS = [
  "Supabase", "Firebase", "Oracle 10g", "SAP", "Canva", "Linux", "macOS", "Android OS",
];

const TIMELINE = [
  {
    year: "2025",
    title: "Oracle Cloud AI Certifications",
    desc: "Passed Oracle Cloud Infrastructure 2025 Certified Generative AI Professional & AI Foundations Associate.",
  },
  {
    year: "2024",
    title: "PAWTROL — Capstone Project",
    desc: "Built a community-based animal reporting web & mobile app with AI-powered health assessment using Supabase and React.",
  },
  {
    year: "2022",
    title: "Started BSIT at TIP-QC",
    desc: "Enrolled in Bachelor of Science in Information Technology at the Technological Institute of the Philippines, Quezon City.",
  },
  {
    year: "2022",
    title: "Senior High School — With Honors",
    desc: "Graduated STEM strand from Basa Air Base National High School, Pampanga.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout label="02 — Background & Skills" title="About.">
      <div className={styles.layout}>

        {/* ── Left column ── */}
        <div className={styles.leftCol}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>
              <span className={styles.sectionLine} />
              Who I Am
            </span>
            <p className={styles.bodyText}>
              I'm <strong>Edber John B. Manio</strong>, a BS Information Technology student at the
              Technological Institute of the Philippines — Quezon City. I'm passionate about building
              functional, well-crafted web and mobile applications.
            </p>
            <p className={styles.bodyText}>
              I'm currently <em>interning at Ateneo Innovation Center</em> where I apply my academic knowledge,
              gain hands-on professional experience, and grow as a developer. Always eager to learn and take on new challenges.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>
              <span className={styles.sectionLine} />
              Soft Skills
            </span>
            <div className={styles.softSkills}>
              {["Teamwork", "Communication", "Problem Solving", "Adaptability", "Willingness to Learn"].map((s) => (
                <span key={s} className={styles.softTag}>{s}</span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>
              <span className={styles.sectionLine} />
              Platforms & Software
            </span>
            <div className={styles.softSkills}>
              {PLATFORMS.map((p) => (
                <span key={p} className={styles.platformTag}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className={styles.rightCol}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>
              <span className={styles.sectionLine} />
              Technical Skills
            </span>
            <div className={styles.skillsGrid}>
              {SKILLS.map(({ cat, items }) => (
                <div key={cat} className={styles.skillGroup}>
                  <span className={styles.skillCat}>{cat}</span>
                  <ul className={styles.skillList}>
                    {items.map((s) => (
                      <li key={s} className={styles.skillItem}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>
              <span className={styles.sectionLine} />
              Timeline
            </span>
            <div className={styles.timeline}>
              {TIMELINE.map((t) => (
                <div key={t.year + t.title} className={styles.timelineItem}>
                  <span className={styles.timelineYear}>{t.year}</span>
                  <div className={styles.timelineBody}>
                    <span className={styles.timelineTitle}>{t.title}</span>
                    <p className={styles.timelineDesc}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}