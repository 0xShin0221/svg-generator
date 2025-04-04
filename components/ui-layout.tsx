"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UILayoutProps {
  children: ReactNode;
  className?: string;
}

interface NavItem {
  labelKey: string;
  sectionId: string;
}

export function UILayout({ children, className }: UILayoutProps) {
  const locale = useLocale();
  const t = useTranslations("Home");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const navItems: NavItem[] = [
    { labelKey: "features", sectionId: "features" },
    { labelKey: "steps", sectionId: "steps" },
    { labelKey: "pricing", sectionId: "pricing" },
    { labelKey: "testimonials", sectionId: "testimonials" },
    { labelKey: "faq", sectionId: "faq" },
  ];

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);

      // Calculate scroll percentage
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;
      const scrollDistance = scrollHeight - clientHeight;

      if (scrollDistance > 0) {
        const percentage = (scrollTop / scrollDistance) * 100;
        setScrollPercentage(Math.min(percentage, 100));
      }

      // Find active section
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: item.sectionId,
              top: rect.top,
              bottom: rect.bottom,
            };
          }
          return null;
        })
        .filter(Boolean);

      const scrollPosition = window.scrollY + 200;

      let foundActive = false;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.top + window.scrollY) {
          setActiveSection(section.id);
          foundActive = true;
          break;
        }
      }

      if (!foundActive) {
        setActiveSection(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Scroll indicator - Only render client-side */}
      {isMounted && (
        <div className="fixed left-0 top-0 bottom-0 w-1 z-50 hidden lg:block">
          <div className="h-full bg-gray-800/30" />
          <motion.div
            className="absolute top-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500"
            style={{ height: `${scrollPercentage}%` }}
            animate={{ height: `${scrollPercentage}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* Back to top button - Only render client-side */}
      <AnimatePresence>
        {isMounted && showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:from-blue-500 hover:to-purple-500 transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <header
        className={cn(
          "relative z-40 transition-all duration-300", // Changed from sticky to relative
          scrolled && isMounted
            ? "bg-black/80 backdrop-blur-lg shadow-lg shadow-blue-900/10"
            : ""
        )}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">@</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                SVG generator
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={cn(
                    "text-gray-200 hover:text-blue-400 transition-colors duration-200",
                    activeSection === item.sectionId && "text-blue-400"
                  )}
                >
                  {t(item.labelKey)}
                </button>
              ))}
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium"
                onClick={() => scrollToSection("start")}
              >
                {t("getStarted")}
              </Button>
            </nav>

            <button
              type="button"
              className="md:hidden text-gray-200 hover:text-blue-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-lg border-b border-white/5"
            >
              <div className="container mx-auto py-4 px-4">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      type="button"
                      key={item.sectionId}
                      onClick={() => scrollToSection(item.sectionId)}
                      className={cn(
                        "block py-2 text-gray-200 hover:text-blue-400 transition-colors text-left",
                        activeSection === item.sectionId && "text-blue-400"
                      )}
                    >
                      {t(item.labelKey)}
                    </button>
                  ))}
                  <Button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium">
                    {t("getStarted")}
                  </Button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl" />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
              <div className="absolute -top-[40%] -left-[10%] w-[50%] h-[80%] rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -top-[40%] -right-[10%] w-[50%] h-[80%] rounded-full bg-purple-500/10 blur-3xl" />

              {isMounted &&
                [...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-400"
                    style={{
                      width: Math.random() * 6 + 2,
                      height: Math.random() * 6 + 2,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0.1 }}
                    animate={{
                      y: [0, Math.random() * -100 - 50],
                      x: [0, (Math.random() - 0.5) * 100],
                      opacity: [0.1, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "linear",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
            </div>
          </div>

          <div className="container mx-auto py-16 px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              >
                {t("title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto"
              >
                {t("subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
              >
                <Button
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all duration-300"
                  onClick={() => scrollToSection("start")}
                >
                  {t("getStarted")}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Section nav only shown when scrolled and mounted */}
        {isMounted && scrolled && (
          <div className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-8 py-3">
                  {navItems.map((item) => (
                    <button
                      key={item.sectionId}
                      type="button"
                      onClick={() => scrollToSection(item.sectionId)}
                      className={cn(
                        "text-sm font-medium whitespace-nowrap transition-colors",
                        activeSection === item.sectionId
                          ? "text-blue-400"
                          : "text-gray-400 hover:text-white"
                      )}
                    >
                      {t(item.labelKey)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main
        className={cn("container mx-auto py-6 px-4 relative z-10", className)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
      </div>
    </div>
  );
}
