'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../../styles/modalWindow/modalWindow.scss";
import "../../styles/modal-reviews/modalReviews.scss";

type props = { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }

interface Review {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  status: string;
  createdAt: Date;
}

const ReviewModal = (props: props) => {
  const { isOpen, setIsOpen } = props;
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Загрузка отзывов из БД
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews?status=approved');
        const data = await response.json();
        if (data.success) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, setIsOpen]);

  // Сброс формы и статуса при открытии
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        role: '',
        text: '',
        rating: 5
      });
      setSubmitStatus({ type: null, message: '' });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Спасибо за отзыв! Он будет опубликован после модерации.'
        });
        
        // Очищаем форму
        setFormData({
          name: '',
          role: '',
          text: '',
          rating: 5
        });
        
        // Закрываем модальное окно через 2 секунды
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus({ type: null, message: '' });
        }, 2000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Произошла ошибка при отправке отзыва'
        });
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Ошибка соединения. Проверьте интернет и попробуйте снова.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Оверлей */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Модальное окно */}
          <motion.div
            className="modal-window"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button className='close-modal-btn' onClick={() => setIsOpen(false)}>×</button>
            
            <div className="modal-reviews">
              <div className="modal-reviews__list">
                <h3 className="modal-reviews__title">Отзывы клиентов</h3>
                <div className="modal-reviews__items">
                  {submitStatus.type === 'success' ? (
                    <motion.div
                      className="review-item success-message"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="success-icon">✓</div>
                      <p>{submitStatus.message}</p>
                    </motion.div>
                  ) : loading ? (
                    <div className="reviews-loading">
                      <div className="loading-spinner"></div>
                      <p>Загрузка отзывов...</p>
                    </div>
                  ) : reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <motion.div
                        key={review._id}
                        className="review-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <div className="review-item__rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                          ))}
                        </div>
                        <p className="review-item__text">{review.text}</p>
                        <div className="review-item__author">
                          <span className="review-item__name">{review.name}</span>
                          <span className="review-item__role">{review.role}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="reviews-empty">
                      <p>Пока нет отзывов. Станьте первым!</p>
                    </div>
                  )}
                </div>
              </div>

              <motion.div
                className="modal-reviews__form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h3 className="modal-reviews__form-title">Оставить отзыв</h3>
                <p className="modal-reviews__form-subtitle">Ваше мнение важно для нас</p>

                {submitStatus.type === 'error' && (
                  <div className="error-message">
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="review-form">
                  <div className="form-field">
                    <label>Ваше имя</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="form-field">
                    <label>Бизнес / деятельность</label>
                    <input
                      type="text"
                      name="role"
                      placeholder="Владелец салона красоты"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="form-field">
                    <label>Оценка</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`rating-star ${star <= formData.rating ? 'active' : ''}`}
                          onClick={() => !submitting && setFormData(prev => ({ ...prev, rating: star }))}
                          disabled={submitting}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Ваш отзыв</label>
                    <textarea
                      name="text"
                      placeholder="Расскажите о вашем опыте работы с нами..."
                      rows={4}
                      value={formData.text}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? 'Отправка...' : 'Отправить отзыв'}
                  </button>
                </form>

                <p className="form-note">Все отзывы проходят модерацию перед публикацией</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;