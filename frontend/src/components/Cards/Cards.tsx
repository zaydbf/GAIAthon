import "./Cards.css";
import { useCardsData } from "../../Data/Data.tsx";
import Card from "../Card/Card";

const Cards = () => {
  const cardsData = useCardsData("Africa"); // Change africa later

  if (cardsData.length === 0) {
    return <p>Loading cards...</p>;
  }

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

