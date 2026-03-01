import PageLayout from "../components/PageLayout";
import styles from "./work.module.css";

const PROJECTS = [
  {
    num: "01",
    title: "PAWTROL",
    category: "Mobile & Web Application",
    year: "2024",
    tags: ["React", "Supabase", "Firebase", "Android"],
    desc: "A community-based animal reporting app enabling residents and Animal Control Officers to report stray or lost animals. Features AI-powered image health assessment (Healthy / Unhealthy), adoption listings, lost-and-found, and an analytics web dashboard.",
    image: "/images/pawtrol.png",
    link: "https://www.pawtrolph.com",
    highlight: true,
  },
  {
    num: "02",
    title: "Nutrient-Sensor-Monitoring",
    category: "IoT & Hardware",
    year: "2024",
    tags: ["Arduino", "Sensors", "Data Monitoring"],
    desc: "An IoT project for monitoring nutrient levels in soil and water using various sensors. Real-time data collection and logging system for agricultural and environmental applications.",
    image: "https://github-readme-stats.vercel.app/api/pin/?username=edberyyy&repo=Nutrient-Sensor-Monitoring&theme=light",
    link: "https://github.com/edberyyy/Nutrient-Sensor-Monitoring",
    highlight: false,
  },
  {
    num: "03",
    title: "Treasurer-App",
    category: "Web Application",
    year: "2025",
    tags: ["TypeScript", "React", "Financial Management"],
    desc: "A treasurer application for managing finances, budgets, and transactions. Built with TypeScript for type-safe financial operations.",
    image: "https://github-readme-stats.vercel.app/api/pin/?username=edberyyy&repo=Treasurer-App&theme=light",
    link: "https://treasurerapp.vercel.app",
    highlight: false,
  },
  {
    num: "04",
    title: "Fun-Projects",
    category: "Experimental & Learning",
    year: "2024",
    tags: ["Various", "Exploration", "Prototypes"],
    desc: "A collection of fun and experimental projects exploring different technologies and ideas. Great for learning and trying out new concepts.",
    image: "https://github-readme-stats.vercel.app/api/pin/?username=edberyyy&repo=Fun-Projects&theme=light",
    link: "https://github.com/edberyyy/Fun-Projects",
    highlight: false,
  },
  {
    num: "05",
    title: "Exam-Motivation",
    category: "Web Application",
    year: "2024",
    tags: ["Motivation", "Education", "Tools"],
    desc: "An app designed to keep students motivated during exam season with reminders, progress tracking, and motivational features.",
    image: "https://github-readme-stats.vercel.app/api/pin/?username=edberyyy&repo=Exam-Motivation&theme=light",
    link: "https://github.com/edberyyy/Exam-Motivation",
    highlight: false,
  },
  {
    num: "06",
    title: "Valentines-for-everyone-2026",
    category: "Web Application",
    year: "2025",
    tags: ["Creative", "HTML", "Interactive"],
    desc: "A Spotify Wrapped themed Valentine's experience for everyone who didn't receive a valentines gift. A fun, celebratory web application.",
    image: "https://github-readme-stats.vercel.app/api/pin/?username=edberyyy&repo=Valentines-for-everyone-2026&theme=light",
    link: "https://happy-valentines-everyone.netlify.app",
    highlight: false,
  },
];

export default function WorkPage() {
  return (
    <PageLayout label="01 — Projects & Builds" title="Work.">
      <div className={styles.grid}>
        {PROJECTS.map((p) => (
          <article key={p.num} className={`${styles.card} ${p.highlight ? styles.cardHighlight : ""}`}>
            <div className={styles.cardTop}>
              <span className={styles.cardNum}>{p.num}</span>
              <span className={styles.cardYear}>{p.year}</span>
            </div>
            <div className={styles.cardImage} aria-hidden>
              <img 
                src={p.image}
                alt={p.title}
                className={styles.cardImageInner}
              />
              <span className={styles.cardImageTitle}>{p.title}</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>{p.category}</span>
                <div className={styles.tags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
              <h2 className={styles.cardTitle}>{p.title}</h2>
              <p className={styles.cardDesc}>{p.desc}</p>
            </div>
            <div className={styles.cardFooter}>
              <a href={p.link} target="_blank" rel="noreferrer" className={styles.cardLink}>
                View Project
                <span className={styles.cardArrow}>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}