import { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

import { ApexOptions } from "apexcharts";

export interface CardProps {
  title: string;
  color: {
    backGround: string;
    boxShadow: string;
  };
  threshold: number;
  barValue: number;
  png: React.ElementType;
  series: {
    name: string;
    data: number[];
  }[];
  value: string;
}

// parent Card
const Card = (props: CardProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

function CompactCard({
  param,
  setExpanded,
}: {
  param: CardProps;
  setExpanded: () => void;
}) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
        <span>Live 🔴</span>
      </div>
    </motion.div>
  );
}

function ExpandedCard({
  param,
  setExpanded,
}: {
  param: CardProps;
  setExpanded: () => void;
}) {
  const options: ApexOptions = {
    chart: { type: "area", height: "auto" },
    fill: { colors: ["#fff"], type: "gradient" },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", colors: ["white"] },
    tooltip: {
      x: { format: "dd/MM/yy HH:mm" },
      fillSeriesColor: true,
      cssClass: "custom-tooltip",
    },
    grid: { show: true },
    xaxis: {
      type: "datetime",
      categories: [
        "2025-06-23",
        "2025-06-24",
        "2025-06-25",
        "2025-06-26",
        "2025-06-27",
        "2025-06-28",
        "2025-06-29",
      ],
    },
    annotations: {
      yaxis: [
        {
          y: param.threshold,
          borderColor: "#FF0000",
          borderWidth: 2,
          label: {
            borderColor: "#FF0000",
            style: {
              color: "#fff",
              background: "#FF0000",
              fontWeight: 700,
              fontSize: "14px",
            },
            text: `Threshold (${param.threshold})`,
          },
        },
      ],
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={options} series={param.series} type="area" />
      </div>
      <span>Live 🔴</span>
    </motion.div>
  );
}

export default Card;
