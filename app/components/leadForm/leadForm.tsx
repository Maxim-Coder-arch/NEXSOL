'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../../styles/lead-form/leadForm.scss";

export default function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: '', email: '', contact: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, contact, message })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSubmittedData({ name, email, contact, message });
        setStatus('success');
        setShowModal(true);
        setName('');
        setEmail('');
        setContact('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorText(data.error || 'Что-то пошло не так');
      }
    } catch (err) {
      setStatus('error');
      setErrorText('Ошибка отправки');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus('idle');
  };

  return (
    <>
    <section id='lead-form'>
        <div className="lead-form">
          <div className="lead-form__header">
            <h3>Свяжитесь с нами</h3>
            <p>Выберите удобный способ связи</p>
          </div>

          {/* Быстрые контакты */}
          <div className="lead-form__quick">
            <a 
              href="https://t.me/..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="lead-form__quick-btn lead-form__quick-btn--tg"
            >
              Telegram
            </a>
            <a 
              href="https://vk.com/..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="lead-form__quick-btn lead-form__quick-btn--vk"
            >
              VKontakte
            </a>
          </div>

          <div className="lead-form__divider">
            <span>или</span>
          </div>

          <div className="lead-form__header">
            <h3>Оставьте заявку</h3>
            <p>Мы свяжемся с вами в ближайшее время</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ваше имя *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            
            <input
              type="email"
              placeholder="Ваш email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            
            <input
              type="text"
              placeholder="Ссылка на соцсеть *"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            
            <textarea
              placeholder="Сообщение (необязательно)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              disabled={status === 'loading'}
            />
            
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className={status === 'loading' ? 'loading' : ''}
            >
              {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
            </button>
            
            <AnimatePresence>
              {status === 'error' && (
                <motion.div 
                  className="lead-form__error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errorText}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Модальное окно после отправки */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div 
                className="lead-form__modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              >

                <motion.div 
                  className="lead-form__modal"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="lead-form__modal-close" onClick={closeModal}>×</button>
                  
                  <div className="lead-form__modal-content">
                    <h2>Заявка принята</h2>
                    
                    <div className="lead-form__modal-data">
                      <div className="lead-form__modal-row">
                        <span className="lead-form__modal-label">Имя:</span>
                        <span className="lead-form__modal-value">{submittedData.name}</span>
                      </div>
                      <div className="lead-form__modal-row">
                        <span className="lead-form__modal-label">Email:</span>
                        <span className="lead-form__modal-value">{submittedData.email}</span>
                      </div>
                      <div className="lead-form__modal-row">
                        <span className="lead-form__modal-label">Контакт:</span>
                        <span className="lead-form__modal-value">{submittedData.contact}</span>
                      </div>
                      {submittedData.message && (
                        <div className="lead-form__modal-row">
                          <span className="lead-form__modal-label">Сообщение:</span>
                          <span className="lead-form__modal-value">{submittedData.message}</span>
                        </div>
                      )}
                    </div>

                    <p className="lead-form__modal-message">
                      Мы свяжемся с вами в течение рабочего дня.
                    </p>

                    <p className="lead-form__modal-note">
                      Если вам нужно связаться с нами прямо сейчас, напишите нам в 
                      <a href="https://t.me/..." target="_blank" rel="noopener noreferrer"> Telegram </a> 
                      или 
                      <a href="https://vk.com/..." target="_blank" rel="noopener noreferrer"> VKontakte</a>.
                    </p>

                    <button className="lead-form__modal-btn" onClick={closeModal}>
                      Закрыть
                    </button>
                  </div>
                </motion.div>
              </motion.div>
              
            </>
          )}
        </AnimatePresence>
    </section>
    </>
  );
}