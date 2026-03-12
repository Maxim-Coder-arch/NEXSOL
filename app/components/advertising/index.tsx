'use client';

import "../../styles/advertising/advertising.scss";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const data = [
  {
    title: "Что мы делаем?",
    description: "Мы не продаем сайты ради сайтов. Мы продаем рост. Наш подход — построить фундамент, надеть на него красивую упаковку и включить подачу трафика"
  },
  {
    title: "Что вы получаете?",
    description: "В итоге вы получаете не просто подрядчика, а партнера, который отвечает за цифры"
  },
  {
    title: "Наша миссия",
    description: "Превращать малый бизнес в предсказуемый и системный. Чтобы владелец мог не тушить пожары, а развиваться и зарабатывать больше"
  },
  {
    title: "Кто мы для вас?",
    description: "Вместе мы — ваш личный отдел маркетинга и разработки. Только без затрат на содержание штата и больничные"
  },
]

const Advertising = () => {

  const toggle = useRef(null);
  const show = useInView(toggle, {once: true, amount: .1});

  return (
    <section id="advertising">
      <div className="advertising" ref={toggle}>
        <motion.div 
        initial={{
          opacity: 0,
          scaleX: .2
        }}
        animate={show ? {
          opacity: 1,
          scaleX: 1
        } : {}}
        transition={{
          duration: .5
        }}
        className="advertising-title">
          <span>NEXSOL создан, чтобы <strong>навести порядок</strong></span>
        </motion.div>
        <div className="advertising-content-block">
          {
            data.map((item, index) => (
              <motion.div 
              key={index} 
              initial={{
                width: "50%",
                opacity: 0
              }}
              animate={show ? {
                width: "100%",
                opacity: 1
              } : {}}
              transition={{
                duration: .5,
                delay: .1 * index
              }}
              className="advertising-content-item">
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