import "../../styles/cases/cases.scss";
import { data } from "@/data/cases.data";

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
                        <div className="cases-before-item" key={point}>-{point}</div>
                      ))
                    }
                  </div>
                  <div className="cases-after">
                    <h5>После</h5>
                    {
                      item.after.map((point) => (
                        <div className="cases-after-item" key={point}>-{point}</div>
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