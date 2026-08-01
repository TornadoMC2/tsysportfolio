"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 rounded-sm";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // A route change can come from outside the menu (back button, skip link), so
  // collapse on navigation. Adjusting state during render rather than in an
  // effect avoids the extra commit-then-rerender pass.
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setIsOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl bg-slate-900/40 backdrop-blur-lg border border-white/10 shadow-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <Link
              href="/"
              className={`flex items-center gap-2 ${focusRing}`}
              aria-label="tsys.dev — home"
            >
              <span className="text-2xl font-bold font-mono text-white">
                tsys<span className="text-cyan-400">.dev</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors hover:text-cyan-400 ${focusRing}
                    ${isActive(link.href) ? "text-cyan-400" : "text-slate-300"}`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className={`md:hidden p-2 text-slate-300 hover:text-white ${focusRing}`}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id="mobile-navigation"
                key="mobile-navigation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden border-t border-white/10"
              >
                <div className="px-6 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`block py-2 text-sm font-medium transition-colors hover:text-cyan-400 ${focusRing}
                        ${isActive(link.href) ? "text-cyan-400" : "text-slate-300"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
