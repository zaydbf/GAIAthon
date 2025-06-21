// Data.tsx

// MainDash imports

import { useEffect, useState } from "react";
import { UilFire, UilCloud, UilFlask } from "@iconscout/react-unicons";

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

const gasConfig: Record<string, Omit<CardData, "barValue" | "value" | "series">> = {
  CO: {
    title: "CO (ppm)",
    threshold: 1000,
    color: {
      backGround: "linear-gradient(180deg, #ff6a6a 0%, #ffb88c 100%)",
      boxShadow: "0px 10px 20px 0px #fbbaba",
    },
    png: UilFire,
  },
  NO2: {
    title: "NO₂ (ppm)",
    threshold: 500,
    color: {
      backGround: "linear-gradient(180deg, #a1c4fd 0%, #c2e9fb 100%)",
      boxShadow: "0px 10px 20px 0px #add8e6",
    },
    png: UilCloud,
  },
  CH4: {
    title: "CH₄ (ppm)",
    threshold: 800,
    color: {
      backGround: "linear-gradient(180deg, #42e695 0%, #3bb2b8 100%)",
      boxShadow: "0px 10px 20px 0px #b2f2bb",
    },
    png: UilFlask,
  },
};

export const useCardsData = (region: string) => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);

  useEffect(() => {
    const gases = ["CO", "NO2", "CH4"];
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
              value: max.toString(),
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
