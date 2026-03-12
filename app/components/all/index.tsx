import "../../styles/all/all.scss";

const data = [
  {
    title: "Более 20",
    description: "Успешных клиентов"
  },
  {
    title: "7 специалистов",
    description: "В нашей команде"
  },
  {
    title: "Stack",
    description: "У нас профессионалы своего дела"
  },
  {
    title: "+30 клиентов",
    description: "Принесли одному бизнесу"
  },
]

const All = () => {
  return (
    <section id="all">
      <div className="all-block">
        {
          data.map((item, index) => (
            <div className="all-item" key={index}>
              <div className={`all-item-picturte all-item-picturte-${index}`}></div>
              <div className="all-item-title">{item.title}</div>
              <div className="all-item-description">{item.description}</div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default All;