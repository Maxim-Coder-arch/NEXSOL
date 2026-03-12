'use client';

import "../../styles/footer/footer.scss";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socials = [
    { name: "Tg", link: "#", icon: "tg" },
    { name: "VK", link: "#", icon: "vk" },
    { name: "Inst", link: "#", icon: "inst" },
  ];

  return (
    <footer id="footer">
      <div className="footer">
        <motion.div 
          className="footer-gold-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
        
        <div className="footer-content">
          <motion.div 
            className="footer-logo"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo-icon">
              <div className="logotype-company" />
            </div>
            <span className="footer-logo-text">NEXSOL</span>
            <span className="footer-slogan">Строим системы. Растим бизнес.</span>
          </motion.div>

          <motion.div 
            className="footer-contacts"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Контакты</h3>
            <motion.a 
              href="mailto:hello@nexsol.ru"
              className="footer-contact-item"
              whileHover={{ x: 5, color: "#f2c94c" }}
              transition={{ duration: 0.2 }}
            >
              hello@nexsol.ru
            </motion.a>
            
            <motion.a 
              href="https://t.me/+vn6d9rXnOMczN2Ni"
              target="_blank"
              className="footer-contact-item"
              whileHover={{ x: 5, color: "#f2c94c" }}
              transition={{ duration: 0.2 }}
            >
              Вконтакте
            </motion.a>
          </motion.div>
          <motion.div 
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Соцсети</h3>
            <div className="footer-social-icons">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  className={`footer-social-icon ${social.icon}`}
                  whileHover={{ 
                    backgroundColor: "rgba(242, 201, 76, 0.2)"
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    if (social.link === "#") {
                      e.preventDefault();
                      alert(`${social.name} появится скоро!`);
                    }
                  }}
                >
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="footer-bonus-slogans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="slogan-tag">Визитка: NEXSOL — ваш надежный центр роста</div>
              <div className="slogan-tag">Email: Растем вместе</div>
              <div className="slogan-tag">Презентация: Стратегия. Сайты. Рост</div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <span>© {currentYear} NEXSOL. Все права защищены.</span>
          <span className="footer-made-by">Сделано с ❤️ в NEXSOL</span>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer;