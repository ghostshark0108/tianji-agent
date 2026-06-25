"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "功能介绍", href: "#capabilities" },
  { label: "关于我们", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a574] to-[#b8885a] flex items-center justify-center text-[#0a0a0f] font-bold text-sm">
            天
          </div>
          <span className="text-lg font-semibold tracking-wide font-[family-name:var(--font-heading)]">
            天机 <span className="text-[#d4a574]">Agent</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Login button */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="border-[#d4a574]/30 text-[#d4a574] hover:bg-[#d4a574]/10 hover:text-[#e8c9a0] hover:border-[#d4a574]/50 transition-all duration-200"
          >
            登录
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5 px-6 pb-6"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/70 hover:text-white transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="outline"
              className="border-[#d4a574]/30 text-[#d4a574] hover:bg-[#d4a574]/10 w-full mt-2"
            >
              登录
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
