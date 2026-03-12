'use client';

import { motion, useInView } from "framer-motion";
import "../../styles/about/about.scss";
import { useRef } from "react";

const reviews = [
  {
    name: "Екатерина",
    role: "Владелец салона красоты «Богиня»",
    text: "Сделали сайт и настроили рекламу за 1 неделю. Клиентов стало так много, что пришлось нанимать дополнительного мастера!",
    rating: 5,
    avatar: "/avatars/avatar1.png"
  },
  {
    name: "Алексей",
    role: "Основатель фитнес-клуба «SportUp»",
    text: "Долго искал подрядчика, который реально понимает, как привлекать клиентов. Большое спасибо!",
    rating: 5,
    avatar: "/avatars/avatar2.png"
  },
  {
    name: "Марина",
    role: "Руководитель клининговой компании",
    text: "Первая неделя поддержки бесплатно — это подкупило. Ребята помогли разобраться с админкой, настроили всё под нас. Теперь работаем на абонементе.",
    rating: 5,
    avatar: "/avatars/avatar3.png"
  }
];

const About = () => {
  const toggle = useRef(null);
  const show = useInView(toggle, {once: true, amount: .3});

  return (
    <section id="about">
      <div className="about" ref={toggle}>
        <div className="about-content">
          <motion.div
            initial={{y: 50, opacity: 0}}
            animate={show ? {y: 0, opacity: 1} : {}}
            transition={{duration: .5, delay: 1.2}}
            className="about-block-title"
          >
            <span>О нас</span>
          </motion.div>
          
          <div className="about-content-title">
            <motion.span
              initial={{y: 50, opacity: 0}}
              animate={show ? {y: 0, opacity: 1} : {}}
              transition={{duration: .5, delay: 1}}
            >Мы не волшебники, </motion.span>
            <motion.span
              initial={{y: 50, opacity: 0}}
              animate={show ? {y: 0, opacity: 1} : {}}
              transition={{duration: .5, delay: .8}}
            >мы системные инженеры</motion.span>
          </div>
          
          <motion.div 
            initial={{y: 50, opacity: 0}}
            animate={show ? {y: 0, opacity: 1} : {}}
            transition={{duration: .5, delay: .6}}
            className="about-description"
          >
            <span>В малом бизнесе слишком много хаоса. Вы разрываетесь между сайтом, клиентами и попытками настроить рекламу. А результат всё равно непредсказуем?</span>
          </motion.div>
          
          <div className="about-our-actions">
            <motion.div 
              initial={{y: 50, opacity: 0}}
              animate={show ? {y: 0, opacity: 1} : {}}
              transition={{duration: .5, delay: .4}}
              className="about-our-action-block"
            >
              <div className="about-our-icon business" />
              <span className="highlight">Продвижение вашего бизнеса</span>
            </motion.div>
            <motion.div 
              initial={{y: 50, opacity: 0}}
              animate={show ? {y: 0, opacity: 1} : {}}
              transition={{duration: .5, delay: .2}}
              className="about-our-action-block"
            >
              <div className="about-our-icon strategy" />
              <span>Индивидуальные стратегии</span>
            </motion.div>
            <motion.div 
              initial={{y: 50, opacity: 0}}
              animate={show ? {y: 0, opacity: 1} : {}}
              transition={{duration: .5}}
              className="about-our-action-block"
            >
              <div className="about-our-icon landing"/>
              <span>Разработка лендингов</span>
            </motion.div>
          </div>
        </div>

        {/* БЛОК С ОТЗЫВАМИ ВМЕСТО ГРАФИКА */}
        <motion.div 
          className="about-reviews"
          initial={{ opacity: 0, x: 50 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="about-reviews-title">
            <h3>Нас рекомендуют</h3>
            <div className="about-reviews-stats">
              <span>более 20 клиентов</span>
              <span>⭐ 5.0 средняя оценка</span>
            </div>
          </div>

          <div className="about-reviews-grid">
            {reviews.map((review, index) => (
              <motion.div 
                key={index}
                className="review-card"
                initial={{ opacity: 0, y: 30 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  borderColor: "rgba(242, 201, 76, 0.3)"
                }}
              >
                <div className="review-card-header">
                  <div className="review-card-avatar">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.name} />
                    ) : (
                      <span>{review.name[0]}</span>
                    )}
                  </div>
                  <div className="review-card-info">
                    <span className="review-card-name">{review.name}</span>
                    <span className="review-card-role">{review.role}</span>
                  </div>
                </div>
                
                <p className="review-card-text">{review.text}</p>
                
                <div className="review-card-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                </div>

                <div className="review-card-quote">"</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About;