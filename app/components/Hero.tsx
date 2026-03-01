"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import styles from "./Hero.module.css";

interface NavItem {
  label: string;
  italic: boolean;
  num: string;
  sub: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "WORK",    italic: false, num: "01", sub: "Projects & Builds",   href: "/work"    },
  { label: "ABOUT",   italic: true,  num: "02", sub: "Background & Skills", href: "/about"   },
  { label: "CONTACT", italic: false, num: "03", sub: "Let's Connect",       href: "/contact" },
];

const TICKER_ITEMS = [
  "Web Development",
  "React & Next.js",
  "UI Implementation",
  "JavaScript",
  "Oracle Certified AI",
  "Full-Stack Development",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function useScramble(finalText: string, delay = 0) {
  const [display, setDisplay] = useState(finalText);
  useEffect(() => {
    let frame = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(
          finalText.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < frame / 2) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        frame++;
        if (frame > finalText.length * 2) { clearInterval(interval); setDisplay(finalText); }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [finalText, delay]);
  return display;
}

function DarkModeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button className={`${styles.toggle} ${dark ? styles.toggleDark : ""}`} onClick={onToggle} aria-label="Toggle dark mode">
      <span className={styles.toggleTrack}>
        <span className={styles.toggleIcon}>{dark ? "☾" : "○"}</span>
        <span className={styles.toggleThumb} />
      </span>
      <span className={styles.toggleLabel}>{dark ? "Dark" : "Light"}</span>
    </button>
  );
}

function MagneticNavItem({ item, index, onHover }: { item: NavItem; index: number; onHover: (label: string | null) => void }) {
  const ref     = useRef<HTMLLIElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !linkRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    linkRef.current.style.transform = `translate(${x * 0.08}px, ${y * 0.18}px)`;
  };

  const handleMouseLeave = () => {
    if (linkRef.current) linkRef.current.style.transform = "";
    onHover(null);
  };

  const scrambled = useScramble(item.label, 300 + index * 150);

  return (
    <li ref={ref} className={styles.navItem} onMouseMove={handleMouseMove} onMouseEnter={() => onHover(item.label)} onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${0.3 + index * 0.14}s` } as React.CSSProperties}>
      <a ref={linkRef} href={item.href} className={styles.navLink}>
        <span className={`${styles.navWord} ${item.italic ? styles.italic : ""}`}>{scrambled}</span>
        <span className={styles.navMeta}>
          <span className={styles.navNum}>{item.num} — {item.sub}</span>
          <span className={styles.navArrow}>↗</span>
        </span>
      </a>
      <span className={styles.navLineAccent} aria-hidden />
    </li>
  );
}

export default function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);
  const { dark, toggle } = useTheme();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className={styles.hero}>

      <div className={styles.orbWrap} aria-hidden>
        <div ref={orbRef} className={styles.orb} />
      </div>

      <svg className={styles.svgLines} aria-hidden viewBox="0 0 800 800" fill="none">
        <line x1="0" y1="800" x2="800" y2="0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="-100" y1="800" x2="700" y2="0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="400" cy="400" r="260" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="400" cy="400" r="180" stroke="currentColor" strokeWidth="0.4" />
      </svg>

      <span className={`${styles.bgLetter} ${hoveredNav !== null ? styles.bgLetterVisible : ""}`} aria-hidden>EJ</span>

      <div className={styles.divider} aria-hidden>
        <span className={styles.dividerDot} />
        <span className={styles.dividerDot} style={{ top: "50%" }} />
        <span className={styles.dividerDot} style={{ bottom: "10%" }} />
      </div>

      {/* ── Top bar ── */}
      <header className={styles.topbar}>
        <a href="/" className={styles.logoWrap}>
          <span className={styles.logoMark}>EJ</span>
          <span className={styles.logoDivider} />
          <span className={styles.logo}>Edber John — Portfolio</span>
        </a>
        <div className={styles.topbarCenter}>
          <span className={styles.topbarLabel}>Developer · Student · Builder</span>
        </div>
        <div className={styles.topbarRight}>
          <span className={styles.label}>Manila, PH</span>
          <div className={styles.availability}>
            <span className={styles.dot} />
            <span className={styles.label}>Actively Interning</span>
          </div>
          <DarkModeToggle dark={dark} onToggle={toggle} />
          <button
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      {/* ── Left — bio ── */}
      <section className={styles.left} aria-label="Introduction">
        {/* <span className={styles.vertLabelLeft} aria-hidden>Edber John B. Manio — BSIT Portfolio MMXXV</span> */}

        <div className={styles.leftTop}>
          <p className={styles.index}>
            <span className={styles.indexLine} />
            BS Information Technology · TIP Quezon City
          </p>
          <p className={styles.bio}>
            I build <em>web applications</em> and digital experiences using modern tools and frameworks.
            Currently interning at <strong>Ateneo Innovation Center</strong>, applying my skills and growing as a developer.
          </p>
        </div>

        {/* Featured project card */}
        <div className={styles.featuredCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Featured Project</span>
            <span className={styles.cardYear}>2024</span>
          </div>
          <div className={styles.cardImagePlaceholder} aria-hidden>
            <img
              src="/images/pawtrol.png"
              alt="PAWTROL"
              className={styles.cardImage}
            />
            <span className={styles.cardImageText}>PAWTROL</span>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.cardCategory}>Mobile & Web · React · Supabase</span>
            <a href="/work" className={styles.cardLink}>View →</a>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {[["2+", "Yrs Dev"], ["React", "Dev"], ["Problem", "Solver"], ["Ateneo", "Intern"]].map(([n, l]) => (
            <div key={l} className={styles.stat}>
              <span className={styles.statNum}>{n}</span>
              <span className={styles.statLabel}>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Right — navigation ── */}
      <nav className={styles.right} aria-label="Main navigation">
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item, i) => (
            <MagneticNavItem key={item.label} item={item} index={i} onHover={setHoveredNav} />
          ))}
        </ul>
        {/* <span className={styles.vertLabelRight} aria-hidden>Navigate</span> */}
      </nav>

      {/* ── Marquee ticker ── */}
      <div className={styles.ticker} aria-hidden>
        <div className={styles.tickerTrack}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item}<span className={styles.tickerSep}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <footer className={styles.bottombar}>
        <div className={styles.social}>
          {[
            { label: "Instagram", href: "https://instagram.com" },
            { label: "LinkedIn",  href: "https://www.linkedin.com/in/edberjohnmanio"  },
            { label: "GitHub",    href: "https://github.com/edberyyy"    },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.socialLink}>{label}</a>
          ))}
        </div>
        <span className={styles.est}>
          <span className={styles.estDash} />
          BSIT · TIP-QC · 2022–Present
        </span>
      </footer>

      {/* ── Mobile navbar ── */}
      {mobileMenuOpen && (
        <nav className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={styles.mobileNavItem}>
                <a
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className={styles.mobileNavNum}>{item.num}</span>
                  <span className={styles.mobileNavTitle}>{item.label}</span>
                  <span className={styles.mobileNavArrow}>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

    </main>
  );
}