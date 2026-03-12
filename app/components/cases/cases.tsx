import "../../styles/cases/cases.scss";

const data = [
  {
    img: "/presentations/large-minion.png",
    title: "Монопородный питомник кошек мейн-кунов",
    before: ["Меньше 5 клиентов в месяц", "Нету сайта", "Плохая оптимизация SEO", "Нету аналитики", "Нету рекламы"],
    after: ["Больше 15 клиентов в месяц", "Сайт с админ панелью", "Хорошая сео оптимизация для сайта", "Успешная аналитика", "Реклама в разлтчных соц сетях"],
    revenue: "350 000 рублей",
    clientsInMonth: "17",
    link: "https://large-minion.vercel.app/"
  },
  {
    img: "/presentations/large-minion.png",
    title: "Монопородный питомник кошек мейн-кунов",
    before: ["Меньше 5 клиентов в месяц", "Нету сайта", "Плохая оптимизация SEO", "Нету аналитики", "Нету рекламы"],
    after: ["Больше 15 клиентов в месяц", "Сайт с админ панелью", "Хорошая сео оптимизация для сайта", "Успешная аналитика", "Реклама в разлтчных соц сетях"],
    revenue: "350 000 рублей",
    clientsInMonth: "17",
    link: "https://large-minion.vercel.app/"
  },
  {
    img: "/presentations/large-minion.png",
    title: "Монопородный питомник кошек мейн-кунов",
    before: ["Меньше 5 клиентов в месяц", "Нету сайта", "Плохая оптимизация SEO", "Нету аналитики", "Нету рекламы"],
    after: ["Больше 15 клиентов в месяц", "Сайт с админ панелью", "Хорошая сео оптимизация для сайта", "Успешная аналитика", "Реклама в разлтчных соц сетях"],
    revenue: "350 000 рублей",
    clientsInMonth: "17",
    link: "https://large-minion.vercel.app/"
  }
]

const Cases = () => {
  return (
    <section id="cases">
      <div className="cases-title">
        <span>Наши кейсы</span>
      </div>
      <div className="cases-block">
        {
          data.map((item, index) => (
            <div className="cases-item" key={index}>
              <div className="cases-item-img-effects">
                <div className="cases-item-img" style={{backgroundImage: `url(${item.img})`}}>
                <a href={item.link} target="_blank">Перейти на сайт</a>
                </div>
              </div>
              <div className="cases-item-content">
                <h3>{item.title}</h3>
                <div className="cases-item-table">
                  <div className="cases-before">
                    <h5>До</h5>
                    {
                      item.before.map((point) => (
                        <div className="cases-before-item" key={index}>-{point}</div>
                      ))
                    }
                  </div>
                  <div className="cases-after">
                    <h5>После</h5>
                    {
                      item.after.map((point) => (
                        <div className="cases-after-item" key={index}>-{point}</div>
                      ))
                    }
                  </div>
                </div>
                <div className="cases-item-footer">
                  <span>Выручка: <strong>{item.revenue}</strong></span>
                  <span>Клиентов в месяц: <strong>{item.clientsInMonth}</strong></span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Cases;