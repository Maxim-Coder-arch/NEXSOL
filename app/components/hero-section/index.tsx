'use client';
import "../../styles/hero-section/heroSection.scss";
import { motion } from "framer-motion";


const HeroSection = () => {
  const fadeUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };
  return (
    <div className="hero-section">
      <div className="hero-content">
        <motion.div 
        initial="initial"
        animate="animate"
        variants={fadeUp}
        transition={{
          duration: .5,
          delay: 1
        }}
        className="hero-company-decorate">
          <span>solid nexus</span>
        </motion.div>
        <div className="hero-title">
          <motion.span
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{
            duration: .5,
            delay: .8
          }}
          >NEXSOL</motion.span>
          <motion.span
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{
            duration: .5,
            delay: .6
          }}
          >системы,</motion.span>
          <motion.span
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{
            duration: .5,
            delay: .4
          }}
          >приносящие клиентов</motion.span>
        </div>
        <motion.div 
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{
          duration: .5,
          delay: .2
        }}
        className="hero-subtitle">
          <span>NEXSOL — это стратегия, сайты и реклама для сферы услуг. Мы не просто делаем красивенько. Мы строим прозрачную систему, которая работает 24/7 и приносит заявки даже когда вы спите.</span>
        </motion.div>
        <motion.a 
        initial="initial"
        animate="animate"
        variants={fadeUp}
        transition={{
          duration: .5
        }}
        href="#" 
        className="button-action">Обсудить проект</motion.a>
      </div>
      <motion.div 
      initial={{
        scale: 0,
        x: "-100%"
      }}
      animate={{
        scale: 1,
        x: 0
      }}
      transition={{
        duration: 1,
        delay: 1.2
      }}
      className="hero-circle-decorate" />
      <div className="hero-grid-decoration">
        {
          Array.from({ length: 20 }, (_, i) => i).map((item, index) => (
            <div key={index} className="hero-grid-item"></div>
          ))
        }
      </div>
      <div className="hero-horizontal-grid-decoration">
        {
          Array.from({ length: 20 }, (_, i) => i).map((item, index) => (
            <div key={index} className="hero-grid-item-horizontal"></div>
          ))
        }
      </div>
    </div>
  )
}

export default HeroSection;