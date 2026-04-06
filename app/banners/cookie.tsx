'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/cookie-banner/cookieBanner.scss"

const BannerCookie = () => {
  const [isOpenModalCookie, setIsOpenModalCookie] = useState(false);

  useEffect(() => {
    // Проверяем, видел ли пользователь уже баннер
    const hasSeen = localStorage.getItem('cookieBannerSeen');
    if (!hasSeen) {
      const timeout = setTimeout(() => {
        setIsOpenModalCookie(true);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, []);

  const closeModal = () => {
    setIsOpenModalCookie(false);
    // Сохраняем в localStorage, чтобы баннер больше не показывался
    localStorage.setItem('cookieBannerSeen', 'true');
  }

  return (
    <AnimatePresence>
      {isOpenModalCookie && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            ease: "easeOut",
            duration: 0.3
          }}
          className="banner-cookie"
        >
          <div className="banner-block">
            <p>🍪 Мы используем файлы cookie для улучшения работы сайта 
              и сбора аналитики. Продолжая использовать сайт, вы соглашаетесь 
              с этим.</p>
            <button onClick={closeModal}>Понятно</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BannerCookie;