'use client';

import "../../styles/stagesOfWork/stagesOfWork.scss";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { data } from "@/data/stagesOfWork.data";

const StagesOfWork = () => {
  const ref = useRef(null);
  const view = useInView(ref, {once: true, amount: .5});

  return (
    <section id="stages-of-work">
      <div className="stages-of-work" ref={ref}>
        <div className="stages-of-work-title">
          <span>Этапы нашей<strong> работы</strong></span>
        </div>
        <div className="stages-of-work-cards-block">
          {
            data.map((item, index) => (
              <motion.div 
              key={item.title} 
              initial={{ opacity: 0, x: -30 }}
              animate={view ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: .1 * index }}
              className="stages-of-work-card">
                <div className="stages-of-work-card-label">
                  <span>0{index + 1}</span>
                </div>
                <div className="stages-of-work-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default StagesOfWork;