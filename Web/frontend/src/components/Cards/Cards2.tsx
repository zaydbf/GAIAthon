import "./Cards.css";
import { useCardsData } from "../../Data/Data2.tsx";
import Card2 from "../Card/Card2";

const Cards = () => {
  const cardsData = useCardsData("Africa"); // Change africa later

  if (cardsData.length === 0) {
    return <p>Loading cards...</p>;
  }

  return (
    <div className="Cards">
      {cardsData.map((card, id) => (
        <div className="parentContainer" key={id}>
          <Card2
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
