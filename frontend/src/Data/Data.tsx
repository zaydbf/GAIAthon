// Data.tsx

// Sidebar imports

import { UilFire } from "@iconscout/react-unicons";
import { UilCloud } from "@iconscout/react-unicons";
import { UilFlask } from "@iconscout/react-unicons";

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

const dataCO = [29.33, 24.15, 229.71, 249.37, 224.17, 250.26, 61.6];
const latestValueCO = dataCO[dataCO.length - 1];
const maxLimitCO = Math.max(...dataCO);
const valueCO = Math.round((latestValueCO / maxLimitCO) * 100);

const dataCO2 = [1980.27, 940.17, 1192.78, 736.37, 1887.64, 982.53, 952.73];
const latestValueCO2 = dataCO2[dataCO2.length - 1];
const maxLimitCO2 = Math.max(...dataCO2);
const valueCO2 = Math.round((latestValueCO2 / maxLimitCO2) * 100);

const dataCH4 = [702.01, 498.15, 933.22, 761.65, 718.56, 426.63, 650.42];
const latestValueCH4 = dataCH4[dataCH4.length - 1];
const maxLimitCH4 = Math.max(...dataCH4);
const valueCH4 = Math.round((latestValueCH4 / maxLimitCH4) * 100);

// Analytics Cards Data
export const cardsData: CardData[] = [
  {
    title: "CO (ppm)",
    color: {
      backGround: "linear-gradient(180deg, #ff6a6a 0%, #ffb88c 100%)",
      boxShadow: "0px 10px 20px 0px #fbbaba",
    },
    threshold: 25,
    barValue: valueCO,
    png: UilFire,
    series: [
      {
        name: "Carbon Monoxide (ppm)",
        data: [61.6, 29.33, 24.15, 229.71, 249.37, 224.17, 250.26],
      },
    ],
    value: Math.max(
      ...[61.6, 29.33, 24.15, 229.71, 249.37, 224.17, 250.26]
    ).toString(),
  },
  {
    title: "CO₂ (ppm)",
    color: {
      backGround: "linear-gradient(180deg, #56ccf2 0%, #2f80ed 100%)",
      boxShadow: "0px 10px 20px 0px #a0c4ff",
    },
    threshold: 1000,
    barValue: valueCO2,

    png: UilCloud,
    series: [
      {
        name: "Carbon Dioxide (ppm)",
        data: [1943.27, 940.17, 1192.78, 736.37, 1887.64, 982.53, 1952.73],
      },
    ],
    value: Math.max(
      ...[1943.27, 940.17, 1192.78, 736.37, 1887.64, 982.53, 1952.73]
    ).toString(),
  },
  {
    title: "CH₄ (ppm)",
    color: {
      backGround: "linear-gradient(180deg, #42e695 0%, #3bb2b8 100%)",
      boxShadow: "0px 10px 20px 0px #b2f2bb",
    },
    threshold: 1000,
    barValue: valueCH4,
    png: UilFlask,
    series: [
      {
        name: "Methane (ppm)",
        data: [702.01, 498.15, 933.22, 761.65, 718.56, 426.63, 650.42],
      },
    ],
    value: Math.max(
      ...[702.01, 498.15, 933.22, 761.65, 718.56, 426.63, 650.42]
    ).toString(),
  },
];
