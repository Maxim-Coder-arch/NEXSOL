'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "../../styles/about/about.scss";
import Link from "next/link";

interface Review {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  createdAt: Date;
}

const About = () => {
  const toggle = useRef(null);
  const show = useInView(toggle, { once: true, amount: 0.3 });
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем отзывы из базы данных
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews?approved=true');
        const data = await response.json();
        if (data.success) {
          setReviews(data.reviews.slice(0, 3)); // Показываем только первые 3
        }
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <section id="about">
        <div className="about" ref={toggle}>
          <div className="about__container">
            <motion.div
              className="about__header"
              initial={{ opacity: 0, y: 30 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="about__label">О нас</span>
              <h2 className="about__title">
                nexsol — команда<br />
                <span>системных специалистов</span>
              </h2>
              <p className="about__description">
                В малом бизнесе слишком много хаоса. Вы разрываетесь между сайтом, клиентами и попытками настроить рекламу. А результат всё равно непредсказуем?
              </p>
            </motion.div>

            <div className="about__services">
              <div className="about__service-item">
                <div className="about__service-icon business" />
                <span className="about__service-text">Помощь в продвижении вашего бизнеса</span>
              </div>
              <div className="about__service-item">
                <div className="about__service-icon strategy" />
                <span className="about__service-text">Настройка рекламы и аналитики</span>
              </div>
              <div className="about__service-item">
                <div className="about__service-icon landing" />
                <span className="about__service-text">Разработка сайтов и систем управления</span>
              </div>
            </div>

            <motion.div
              className="about__reviews"
              initial={{ opacity: 0, y: 40 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="about__reviews-header">
                <h3>Нас рекомендуют</h3>
                <Link className="about__reviews-link" href="/pages/reviews">
                  Все отзывы
                  <span className="about__reviews-arrow">→</span>
                </Link>
              </div>

              <div className="about__reviews-grid">
                {loading ? (
                  // Скелетон загрузки
                  <>
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="about__review-card skeleton">
                        <div className="skeleton-rating"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-author"></div>
                      </div>
                    ))}
                  </>
                ) : reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review._id}
                      className="about__review-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={show ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="about__review-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                      <p className="about__review-text">{review.text}</p>
                      <div className="about__review-author">
                        <span className="about__review-name">{review.name}</span>
                        <span className="about__review-role">{review.role}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="about__reviews-empty">
                    <p>Пока нет отзывов. Станьте первым!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;