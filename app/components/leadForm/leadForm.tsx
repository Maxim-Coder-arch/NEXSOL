'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
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
  const [consent, setConsent] = useState(true);

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
    } catch {
      setStatus('error');
      setErrorText('Ошибка отправки');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus('idle');
  };

  return (
    <section id="lead-form" className="lead-form-section">
      <div className="lead-form-container">
        <div className="lead-form__image">
          <Image 
            src="/images/business.jpg" 
            alt="Свяжитесь с нами"
            width={600}
            height={500}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="lead-form">
          <div className="lead-form__header">
            <h3>Свяжитесь с нами</h3>
            <p>Мы быстро ответим😊</p>
          </div>

          <div className="lead-form__quick">
            <a 
              href="https://vk.com/im/convo/-237371792?entrypoint=community_page&tab=all" 
              target="_blank" 
              rel="noopener noreferrer"
              className="lead-form__quick-btn lead-form__quick-btn--vk"
            >
              ВКонтакте
            </a>
            <a 
              href="https://t.me/solid_nexus?direct" 
              target="_blank" 
              rel="noopener noreferrer"
              className="lead-form__quick-btn lead-form__quick-btn--vk"
            >
              Телеграм
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
              placeholder="Ваша почта *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            
            <input
              type="text"
              placeholder="Телефон или ссылка на соцсеть *"
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
              disabled={status === 'loading' || !consent}
              className={status === 'loading' ? 'loading' : ''}
              title={!consent ? "Чтобы отправить форму подтвердите ваше согласие на обработку персональных данных ниже" : "Отправить форму"}
            >
              {status === 'loading' ? 'Отправка...' : 'Отправить'}
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

            <div className="lead-form__consent">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                <span>
                  Нажимая «Отправить», вы соглашаетесь с {' '}
                  <a href="/pages/privacy">политикой обработки персональных данных</a>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>

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
                    <a href="https://t.me/solid_nexus?direct" target="_blank" rel="noopener noreferrer">Телеграм</a> 
                    или 
                    <a href="https://vk.com/im/convo/-237371792" target="_blank" rel="noopener noreferrer">ВКонтакте</a>.
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
  );
}