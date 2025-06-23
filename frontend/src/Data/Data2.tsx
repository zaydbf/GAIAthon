// Data.tsx

// MainDash imports

import { useEffect, useState } from "react";
import {
  UilFire,
  UilCloud,
  UilFlask,
  UilTemperatureHalf,
  UilWind,
} from "@iconscout/react-unicons";

// Type Definitions

interface CardData {
  title: string;
  color: {
    backGround: string;
    boxShadow: string;
  };
  threshold: number;
  barValue: number;
  value: string;
  png: React.ElementType;
  series: {
    name: string;
    data: number[];
  }[];
}

const gasConfig: Record<
  string,
  Omit<CardData, "barValue" | "value" | "series">
> = {
  CO2: {
    title: "CO2 (mmol/m²)",
    threshold: 1000,
    color: {
      backGround: "linear-gradient(180deg, #ff5858 0%, #ffc371 100%)", // red-orange
      boxShadow: "0px 10px 20px 0px #ffb199",
    },
    png: UilFire,
  },
  Light: {
    title: "Light (lx)",
    threshold: 500,
    color: {
      backGround:
        "linear-gradient(180deg,  #185a9d 0% ,rgb(67, 127, 206) 100%)", // green-blue
      boxShadow: "0px 10px 20px 0px #a1c4fd",
    },
    png: UilCloud,
  },
  
  CH4: {
    title: "CH₄ (ppbv)",
    threshold: 3000,
    color: {
      backGround: "linear-gradient(180deg, #11998e 0%, #38ef7d 100%)", // teal-green
      boxShadow: "0px 10px 20px 0px #b2f2bb",
    },
    png: UilFlask,
  },
};

export const useCardsData = (region: string) => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);

  useEffect(() => {
    const gases = ["CO2","Light", "CH4"];
    Promise.all(
      gases.map((gas) =>
        fetch(`http://localhost:8000/data/get-data/${gas}/${region}/`)
          .then((res) => res.json())
          .then((res) => {
            const values = res.values;
            const max = Math.max(...values);
            const latest = values[values.length - 1];
            const config = gasConfig[res.gas];
            const threshold = config.threshold;
            const barValue = Math.round((latest / threshold) * 100);

            const card: CardData = {
              ...config,
              barValue,
              value: max.toFixed(2),
              series: [{ name: config.title, data: values }],
            };

            return card;
          })
      )
    ).then((results) => {
      setCardsData(results);
    });
  }, [region]);

  return cardsData;
};
