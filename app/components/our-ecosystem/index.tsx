'use client';

import "../../styles/ecosystem/ecosystem.scss";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "@/data/ecosystem.data";


const OurEcosystem = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="our-ecosystem">
      <div className="our-ecosystem">
        <div className="our-ecosystem-title">
          <span>Наша <strong>экосистема</strong></span>
        </div>
        
        <div className="our-ecosystem-card-block">
          {data.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={item.title}
                className="our-ecosystem-item"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                initial={false}
                animate={{ 
                  scale: isOpen ? 1.02 : 1,
                  y: isOpen ? -10 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="our-ecosystem-card">
                  <div className="our-ecosystem-card-header">
                    <div className={`our-ecosystem-card-icon our-ecosystem-card-icon-${index + 1}`} />
                    <div className="our-ecosystem-card-label">0{index + 1}</div>
                  </div>
                  
                  <div className="our-ecosystem-card-content">
                    <motion.span 
                      
                    >
                      {item.subTitle}
                    </motion.span>
                    <span>{item.result}</span>
                  </div>
                  
                  <div className="our-ecosystem-card-footer">
                    <span>{item.label}</span>
                  </div>
                </div>
                <span className="our-ecosystem-item-title">{item.title}</span>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="out-ecosystem-items"
                    >
                      {item.items.map((point, i) => (
                        <motion.div 
                          key={point}
                          className="out-ecosystem-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <span>{point}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurEcosystem;