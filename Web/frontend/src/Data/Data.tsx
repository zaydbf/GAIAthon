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
  timestamps: string[];
}

const gasConfig: Record<
  string,
  Omit<CardData, "barValue" | "value" | "series" | "timestamps">
> = {
  CO2: {
    title: "CO2 (ppm)",
    threshold: 1000,
    color: {
      backGround: "linear-gradient(180deg, #ff5858 0%, #ffc371 100%)", // red-orange
      boxShadow: "0px 10px 20px 0px #ffb199",
    },
    png: UilFire,
  },
  Light: {
    title: "Light (lx)",
    threshold: 100,
    color: {
      backGround:
        "linear-gradient(180deg,  #185a9d 0% ,rgb(67, 127, 206) 100%)", // green-blue
      boxShadow: "0px 10px 20px 0px #a1c4fd",
    },
    png: UilCloud,
  },
  CH4: {
    title: "CH₄ (ppbv)",
    threshold: 2000,
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
    const gases = ["CO2", "Light", "CH4"];
    Promise.all(
      gases.map((gas) =>
        fetch(`http://localhost:8000/iot/get-iot-data/${gas}/`)
          .then((res) => res.json())
          .then((res) => {
            const values = res.data.map((item: { value: number }) => item.value);
            const max = values.length ? Math.max(...values) : 0;
            const latest = values.length ? values[values.length - 1] : 0;
            const config = gasConfig[res.gas];
            const threshold = config.threshold;
            const barValue = threshold
              ? Math.round((latest / threshold) * 100)
              : 0;

            return {
              ...config,
              barValue,
              value: max.toFixed(2),
              series: [{ name: config.title, data: values }],
              timestamps: res.data.map((item: { timestamp: string }) => item.timestamp)
            };
          })
      )
    ).then(setCardsData);
  }, [region]);

  return cardsData;
};
