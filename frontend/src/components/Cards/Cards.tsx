import "./Cards.css";
import { cardsData } from "../../Data/Data.tsx"; //here we are sharing code between files
import Card from "../Card/Card"; //but here we're calling a component to use it and call it

const Cards = () => {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => (
        <div className="parentContainer" key={id}>
          <Card
            title={card.title}
            color={card.color}
            threshold={card.threshold}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
