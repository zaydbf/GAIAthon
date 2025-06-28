import { ResponsivePie } from "@nivo/pie";
import { useCardsData } from "../../Data/Data2.tsx";
import { Box, useTheme } from "@mui/material";

interface PieProps {
  region?: string;
}

const Pie = ({ region = "default" }: PieProps) => {
  const theme = useTheme();
  const cardsData = useCardsData(region);

  // While loading data
  if (cardsData.length === 0) {
    return <div>Loading gas data...</div>;
  }

  const data = cardsData.map((card) => {
    let value = Number(card.value);
    const rawTitle = card.title;

    const gas = rawTitle
      .split(" ")[0]
      .replace(/₀/g, "0")
      .replace(/₁/g, "1")
      .replace(/₂/g, "2")
      .replace(/₃/g, "3")
      .replace(/₄/g, "4")
      .replace(/₅/g, "5")
      .replace(/₆/g, "6")
      .replace(/₇/g, "7")
      .replace(/₈/g, "8")
      .replace(/₉/g, "9")
      .toUpperCase();

    if (gas === "CO" || gas === "NO2") {
      value *= 10;
    } else if (gas === "CH4") {
      value /= 10;
    } else if (gas === "O3") {
      value /= 1000;
    }

    // Keep only one digit after the decimal point
    value = Number(value.toFixed(1));

    return {
      id: rawTitle,
      label: rawTitle,
      value,
      color: card.color.backGround,
    };
  });

  return (
    <Box sx={{ height: "450px" }}>
      <ResponsivePie
        data={data}
        theme={{
          textColor: "#fff",
          fontSize: 15,
          axis: {
            domain: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 5,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: theme.palette.text.primary,
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 5,
              },
              text: {
                fontSize: 20,
                fill: theme.palette.text.secondary,
              },
            },
          },
          grid: {
            line: {
              stroke: theme.palette.divider,
              strokeWidth: 1,
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: "#fff",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            link: {
              stroke: "#ffffff",
              strokeWidth: 1,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            outline: {
              stroke: "#ffffff",
              strokeWidth: 2,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            symbol: {
              fill: "#ffffff",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
          },
          tooltip: {
            container: {
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              fontSize: 12,
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={"#ffffff"}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        enableArcLabels={true}
        enableArcLinkLabels={true}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: theme.palette.text.primary,
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: theme.palette.text.primary,
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
      />
    </Box>
  );
};

export default Pie;
