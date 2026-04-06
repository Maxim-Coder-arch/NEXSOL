'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import '../../styles/reviewPage/reviewPage.scss';

interface Review {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  status: string;
  createdAt: Date;
}

const ReviewsPage = () => {
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews?status=approved');
        const data = await response.json();
        if (data.success) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.log('Ошибка при загрузке отзывов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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
        
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 3000);
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
    <div className="reviews-page">
      <div className="reviews-page__container">
        <div className="reviews-page__header">
          <Link href="/" className="reviews-page__back-link">
            ← На главную
          </Link>
          <h1 className="reviews-page__title">Отзывы <span>наших клиентов</span></h1>
          <p className="reviews-page__subtitle">
            Реальные люди, реальные результаты. Вот что говорят о сотрудничестве с NEXSOL
          </p>
        </div>

        {/* Список отзывов */}
        <div className="reviews-page__list">
          {loading ? (
            <div className="reviews-page__loading">
              <div className="loading-spinner"></div>
              <p>Загрузка отзывов...</p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={review._id}
                className="review-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <div className="review-card__rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
                <p className="review-card__text">{review.text}</p>
                <div className="review-card__author">
                  <span className="review-card__name">{review.name}</span>
                  <span className="review-card__role">{review.role}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="reviews-page__empty">
              <p>Пока нет отзывов. Станьте первым!</p>
            </div>
          )}
        </div>

        {/* Форма добавления отзыва */}
        <div className="reviews-page__form-wrapper">
          <div className="reviews-page__form-header">
            <h2>Оставить отзыв</h2>
            <p>Ваше мнение важно для нас</p>
          </div>

          {submitStatus.type === 'success' && (
            <div className="reviews-page__success">
              <div className="success-icon">✓</div>
              <p>{submitStatus.message}</p>
            </div>
          )}

          {submitStatus.type === 'error' && (
            <div className="reviews-page__error">
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="reviews-form">
            <div className="reviews-form__field">
              <label>Ваше имя *</label>
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

            <div className="reviews-form__field">
              <label>Бизнес / деятельность *</label>
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

            <div className="reviews-form__field">
              <label>Оценка *</label>
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

            <div className="reviews-form__field">
              <label>Ваш отзыв *</label>
              <textarea
                name="text"
                placeholder="Расскажите о вашем опыте работы с нами..."
                rows={5}
                value={formData.text}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <button type="submit" className="reviews-form__submit" disabled={submitting}>
              {submitting ? 'Отправка...' : 'Отправить отзыв'}
            </button>

            <p className="reviews-form__note">
              Все отзывы проходят модерацию перед публикацией
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;