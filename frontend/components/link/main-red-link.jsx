"use client";

import Link from "next/link";

import "./main-red-link.css";

/**
 * Custom red link based next/link.
 *
 * @param {Object} props all valid next/link props
 * @param {React.ReactNode} props.children link content
 *
 * @returns {JSX.Element} a Next.js custom red link
 */
export default function MainRedLink({ children, ...props }) {
  return (
    <Link {...props} className={`main-red-link ${props.className || ""}`}>
      {children}
    </Link>
  );
}
