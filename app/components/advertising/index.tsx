'use client';

import "../../styles/advertising/advertising.scss";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { data } from "@/data/advertising.data";

const Advertising = () => {

  const toggle = useRef(null);
  const show = useInView(toggle, { once: true, amount: .1 });

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  } as const;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  } as const;

  return (
    <section id="advertising">
      <div className="advertising" ref={toggle}>
        <motion.div 
          variants={titleVariants}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="advertising-title"
        >
          <span>Мы наведем <strong>порядок</strong> в вашем бизнесе</span>
        </motion.div>
        
        <div className="advertising-content-block">
          {
            data.map((item, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                initial="hidden"
                animate={show ? "visible" : "hidden"}
                transition={{
                  delay: index * 0.12,
                }}
                className="advertising-content-item"
              >
                <div className="advertising-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="advertising-card-enumerable">
                    <span>0{index + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Advertising;