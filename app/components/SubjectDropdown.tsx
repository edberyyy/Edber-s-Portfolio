"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./SubjectDropdown.module.css";

interface SubjectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const SUBJECTS = [
  { value: "", label: "Select a topic" },
  { value: "project", label: "Project Opportunity" },
  { value: "collaboration", label: "Collaboration / Partnership" },
  { value: "freelance", label: "Freelance Work" },
  { value: "mentorship", label: "Mentorship / Guidance" },
  { value: "feedback", label: "Feedback / Review" },
  { value: "question", label: "Question / Inquiry" },
  { value: "other", label: "Other (please specify)" },
];

export default function SubjectDropdown({ value, onChange, required = false }: SubjectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedLabel = SUBJECTS.find((s) => s.value === value)?.label || "Select a topic";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        ref={buttonRef}
        className={`${styles.dropdownButton} ${value ? styles.selected : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.dropdownLabel}>{selectedLabel}</span>
        <span className={`${styles.dropdownArrow} ${isOpen ? styles.open : ""}`}>↓</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {SUBJECTS.map((option) => (
            <button
              key={option.value}
              className={`${styles.dropdownItem} ${value === option.value ? styles.active : ""}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Hidden input for form validation */}
      <input
        type="hidden"
        name="subject"
        value={value}
        required={required}
      />
    </div>
  );
}
