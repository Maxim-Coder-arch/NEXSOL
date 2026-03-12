import "../../styles/all/all.scss";
import { data } from "@/data/all.data";

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