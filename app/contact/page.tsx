"use client";

import { useState } from "react";
import PageLayout from "../components/PageLayout";
import SubjectDropdown from "../components/SubjectDropdown";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    customSubject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Use custom subject if "Other" was selected
    const finalSubject = formData.subject === "other" ? formData.customSubject : formData.subject;

    const submitData = {
      name: formData.name,
      email: formData.email,
      subject: finalSubject,
      message: formData.message,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", customSubject: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageLayout label="03 — Let's Connect" title="Contact.">
      <div className={styles.layout}>

        {/* ── Left — info ── */}
        <div className={styles.leftCol}>
          <div className={styles.intro}>
            <p className={styles.introText}>
              I'm currently <em>interning at Ateneo Innovation Center</em> in Information Technology.{" "}
              If you have a project, collaboration, or just want to connect — feel free to reach out.
            </p>
          </div>

          <div className={styles.details}>
            {[
              { label: "Email",    value: "ejbm1027@gmail.com",    href: "mailto:ejbm1027@gmail.com" },
              { label: "Phone",    value: "+63 966 750 3086",        href: "tel:+639667503086" },
              { label: "Location", value: "Manila, Philippines",     href: null },
              { label: "Status",   value: "Interning at Ateneo Innovation Center", href: null },
              { label: "Course",   value: "BS Information Technology", href: null },
              { label: "School",   value: "TIP — Quezon City",       href: null },
            ].map(({ label, value, href }) => (
              <div key={label} className={styles.detailItem}>
                <span className={styles.detailLabel}>{label}</span>
                {href
                  ? <a href={href} className={styles.detailValue}>{value}</a>
                  : <span className={styles.detailValue}>{value}</span>
                }
              </div>
            ))}
          </div>

          <div className={styles.socials}>
            <span className={styles.socialsLabel}>
              <span className={styles.socialsLine} />
              Find me online
            </span>
            <div className={styles.socialLinks}>
              {[
                { label: "GitHub",    href: "https://github.com/edberyyy"    },
                { label: "LinkedIn",  href: "https://www.linkedin.com/in/edberjohnmanio"  },
                { label: "Instagram", href: "https://instagram.com" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <span className={styles.socialArrow}>↗</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right — form ── */}
        <div className={styles.rightCol}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Name</label>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Subject</label>
              <SubjectDropdown
                value={formData.subject}
                onChange={(value) => setFormData({ ...formData, subject: value })}
                required
              />
              {formData.subject === "other" && (
                <input
                  className={styles.input}
                  type="text"
                  name="customSubject"
                  placeholder="What's your topic?"
                  value={formData.customSubject}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "8px" }}
                />
              )}
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea
                className={styles.textarea}
                name="message"
                rows={6}
                placeholder="Tell me more…"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            {status === "success" && <p className={styles.successMsg}>✓ Message sent! I'll get back to you soon.</p>}
            {status === "error" && <p className={styles.errorMsg}>✗ Failed to send. Try again.</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <span className={styles.submitArrow}>↗</span>
            </button>
          </form>
        </div>

      </div>
    </PageLayout>
  );
}