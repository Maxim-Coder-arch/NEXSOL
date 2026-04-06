// app/privacy/page.tsx
import Link from 'next/link';
import '../../styles/privacy/privacy.scss';

const Privacy = () => {
  return (
    <div className="privacy">
      <div className="privacy__container">
        <div className="privacy__header">
          <span className="privacy__label">Юридическая информация</span>
          <h1 className="privacy__title">Политика <span>конфиденциальности</span></h1>
          <p className="privacy__date">Актуально на 2026 год</p>
        </div>

        <div className="privacy__content">
          <section className="privacy__section">
            <h2>1. Какие данные мы собираем</h2>
            <p>
              При заполнении формы обратной связи на нашем сайте мы можем получить следующую информацию:
            </p>
            <ul>
              <li>Ваше имя</li>
              <li>Адрес электронной почты (email)</li>
              <li>Номер телефона или ссылку на страницу в социальной сети</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>2. Цель сбора данных</h2>
            <p>
              Собранные данные используются исключительно для связи с вами: ответа на заявку, 
              обсуждения проекта, уточнения деталей сотрудничества.
            </p>
          </section>

          <section className="privacy__section">
            <h2>3. Обработка и хранение данных</h2>
            <ul>
              <li>Все данные хранятся в зашифрованном виде в нашей собственной системе (CRM).</li>
              <li>Данные сохраняются только на период оказания наших услуг.</li>
              <li>Мы не передаём ваши данные третьим лицам.</li>
              <li>После завершения оказания услуг мы удаляем ваши данные — для вашего спокойствия и безопасности.</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>4. Права пользователя</h2>
            <p>
              Вы можете запросить удаление своих данных в любой момент, если на тот момент 
              ваши данные всё ещё находятся в нашей системе и не были удалены автоматически.
            </p>
          </section>

          <section className="privacy__section">
            <h2>5. Контакты для вопросов</h2>
            <p>
              Если у вас есть вопросы, связанные с обработкой персональных данных, 
              или вы хотите удалить свои данные — напишите нам:
            </p>
            <div className="privacy__contact">
              <a 
                href="https://vk.com/im/convo/-237371792?entrypoint=community_page&tab=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="privacy__link"
              >
                Сообщение в VK (официальное сообщество NEXSOL)
              </a>
            </div>
          </section>

          <section className="privacy__section">
            <h2>6. Изменение политики</h2>
            <p>
              Мы можем обновлять политику конфиденциальности. Все изменения публикуются на этой странице 
              с указанием новой даты.
            </p>
          </section>
        </div>

        <div className="privacy__footer">
          <Link href="/" className="privacy__back-link">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;