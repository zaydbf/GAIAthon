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
  CO: {
    title: "CO (mmol/m²)",
    threshold: 30.15,
    color: {
      backGround: "linear-gradient(180deg, #ff5858 0%, #ffc371 100%)", // red-orange
      boxShadow: "0px 10px 20px 0px #ffb199",
    },
    png: UilFire,
  },
  NO2: {
    title: "NO₂ (µmol/m²)",
    threshold: 18.3,
    color: {
      backGround:
        "linear-gradient(180deg,  #185a9d 0% ,rgb(67, 127, 206) 100%)", // green-blue
      boxShadow: "0px 10px 20px 0px #a1c4fd",
    },
    png: UilCloud,
  },
  O3: {
    title: "O₃ (mol/m²)",
    threshold: 0.13,
    color: {
      backGround: "linear-gradient(180deg, #f7971e 0%, #ffd200 100%)", // orange-yellow
      boxShadow: "0px 10px 20px 0px #ffe5a0",
    },
    png: UilTemperatureHalf,
  },
  SO2: {
    title: "SO₂ (µmol/m²)",
    threshold: 219,
    color: {
      backGround: "linear-gradient(180deg, #c471f5 0%, #fa71cd 100%)", // purple-pink
      boxShadow: "0px 10px 20px 0px #e9e4f0",
    },
    png: UilWind,
  },
  CH4: {
    title: "CH₄ (ppbv)",
    threshold: 1898,
    color: {
      backGround: "linear-gradient(180deg, #11998e 0%, #38ef7d 100%)", // teal-green
      boxShadow: "0px 10px 20px 0px #b2f2bb",
    },
    png: UilFlask,
  },
};

export const useCardsData = (region: string) => {
  const [cardsData, setCardsData] = useState<CardData[]>([]); //assign an empty array to the CardData

  useEffect(() => {
    const gases = ["CO", "NO2", "CH4", "O3", "SO2"];
    Promise.all(
      //runs multiple promises in parallel
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
              value: max.toFixed(3),
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
