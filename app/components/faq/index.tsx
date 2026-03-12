'use client';

import "../../styles/faq/faq.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { data } from "@/data/faq.data";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq">
      <div className="faq-block">
        <motion.div 
          className="faq"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="faq-title">
            <span>FAQ</span>
            <span>Ответы на частые вопросы</span>
          </div>
          
          {data.map((item, index) => (
            <motion.div 
              key={index}
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="faq-item-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span>{item.question}</span>
                <motion.div 
                  className="faq-item-icon"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>+</span>
                </motion.div>
              </motion.div>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    className="faq-item-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {item.answer}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Faq;