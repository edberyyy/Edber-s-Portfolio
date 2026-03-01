"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import styles from "./PageLayout.module.css";
import Cursor from "./Cursor";

interface PageLayoutProps {
  children: React.ReactNode;
  label: string;
  title: string;
}

const NAV_LINKS = [
  { num: "01", label: "Work",    sub: "Projects & Builds",   href: "/work"    },
  { num: "02", label: "About",   sub: "Background & Skills", href: "/about"   },
  { num: "03", label: "Contact", sub: "Let's Connect",       href: "/contact" },
];

export default function PageLayout({ children, label, title }: PageLayoutProps) {
  const router = useRouter();
  const { dark, toggle } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Cursor />
      <div className={styles.page}>

        {/* ── Top bar ── */}
        <header className={styles.topbar}>

          {/* Left — back + home */}
          <div className={styles.topbarLeft}>
            <button onClick={() => router.back()} className={styles.backBtn}>
              ← Back
            </button>
            <span className={styles.topbarSep}>/</span>
            <a href="/" className={styles.homeLink}>Home</a>
          </div>

          {/* Center — nav links */}
          <nav className={styles.topNav}>
            <a href="/work"    className={styles.topNavLink}>Work</a>
            <a href="/about"   className={styles.topNavLink}>About</a>
            <a href="/contact" className={styles.topNavLink}>Contact</a>
          </nav>

          {/* Right — logo + toggle */}
          <div className={styles.topbarRight}>
            <a href="/" className={styles.logoWrap}>
              <span className={styles.logoMark}>EJ</span>
            </a>
            <button
              className={`${styles.toggle} ${dark ? styles.toggleDark : ""}`}
              onClick={toggle}
              aria-label="Toggle dark mode"
            >
              <span className={styles.toggleTrack}>
                <span className={styles.toggleThumb} />
              </span>
              <span className={styles.toggleLabel}>{dark ? "Dark" : "Light"}</span>
            </button>
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

        {/* ── Mobile navbar ── */}
        {mobileMenuOpen && (
          <nav className={styles.mobileMenu}>
            <ul className={styles.mobileNavList}>
              {NAV_LINKS.map(({ num, label: navLabel, href }) => (
                <li key={href} className={styles.mobileNavItem}>
                  <a
                    href={href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={styles.mobileNavNum}>{num}</span>
                    <span className={styles.mobileNavTitle}>{navLabel}</span>
                    <span className={styles.mobileNavArrow}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* ── Page heading ── */}
        <div className={styles.pageHeading}>
          <span className={styles.pageLabel}>
            <span className={styles.pageLabelLine} />
            {label}
          </span>
          <h1 className={styles.pageTitle}>{title}</h1>
        </div>

        {/* ── Content ── */}
        <main className={styles.content}>
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <div className={styles.social}>
            {[
              { label: "Instagram", href: "https://instagram.com" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/edberjohnmanio"  },
              { label: "GitHub",    href: "https://github.com/edberyyy"    },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                {label}
              </a>
            ))}
          </div>
          <span className={styles.footerEst}>BSIT · TIP-QC · 2022–Present</span>
        </footer>

      </div>
    </>
  );
}