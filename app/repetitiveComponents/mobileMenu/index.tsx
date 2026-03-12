'use client';

import "../../styles/mobileMenu/mobileMenu.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { data } from "@/data/menu.data";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="mobile-menu">
      <motion.button 
        className="mobile-menu-burger"
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span 
          className="burger-line"
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span 
          className="burger-line"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span 
          className="burger-line"
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.4
            }}
          >
            <div className="mobile-menu-header">
              <div className="mobile-menu-logo">
                <div className="logotype-company" />
                <span>NEXSOL</span>
              </div>
              <motion.button 
                className="mobile-menu-close"
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="mobile-menu-nav">
              {data.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: 0.1 + index * 0.05
                  }}
                >
                  <Link 
                    href={item.link} 
                    className="mobile-menu-link"
                    onClick={toggleMenu}
                  >
                    <span className="mobile-menu-link-label">{item.label}</span>
                    <span className="mobile-menu-link-arrow">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mobile-menu-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="mobile-menu-contacts">
                <a href="mailto:hello@nexsol.ru" className="mobile-menu-contact">
                  <span>hello@nexsol.ru</span>
                </a>
                <a href="https://t.me/..." className="mobile-menu-contact">
                  <span>Telegram</span>
                </a>
              </div>
              <div className="mobile-menu-slogan">
                Строим системы. Растим бизнес.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default MobileMenu;