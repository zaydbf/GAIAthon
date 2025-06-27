import { ResponsiveBar } from "@nivo/bar";
import { Box, useTheme } from "@mui/material";

const data = [
  {
    year: 2019,
    "CH₄": 186.6, // 1.866 × 100
    "CO₂": 410.1,
    "O₃": 340, // 0.034 × 10,000
  },
  {
    year: 2020,
    "CH₄": 189.0, // 1.890 × 100
    "CO₂": 412.4,
    "O₃": 330, // 0.033 × 10,000
  },
  {
    year: 2021,
    "CH₄": 190.9, // 1.909 × 100
    "CO₂": 414.7,
    "O₃": 350, // 0.035 × 10,000
  },
  {
    year: 2022,
    "CH₄": 192.1, // 1.921 × 100
    "CO₂": 417.1,
    "O₃": 360, // 0.036 × 10,000
  },
  {
    year: 2023,
    "CH₄": 192.4, // 1.924 × 100
    "CO₂": 419.3,
    "O₃": 365, // 0.0365 × 10,000
  },
];
const Bar = () => {
  const theme = useTheme();
  return (
    <Box sx={{ height: "400px", marginBottom: "50px" }}>
      {" "}
      <ResponsiveBar
        data={data}
        keys={["CH₄", "CO₂", "O₃"]}
        indexBy="year"
        theme={{
          textColor: "#ffffff",
          fontSize: 11,
          axis: {
            domain: {
              line: {
                stroke: "#ffffff",
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#ffffff",
              },
            },
            ticks: {
              line: {
                stroke: "#ffffff",
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: "#ffffff",
              },
            },
          },
          grid: {
            line: {
              stroke: theme.palette.divider,
              strokeWidth: 1,
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 11,
                fill: "#ffffff",
              },
            },
            text: {
              fontSize: 17,
              fill: "#ffffff",
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill: "#ffffff",
              },
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: "#ffffff",
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
              background: "#ffffff",
              color: theme.palette.text.primary,
              fontSize: 12,
            },
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
          },
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Year",
          legendPosition: "middle",
          legendOffset: 35,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Concentration (ppm)",
          legendPosition: "middle",
          legendOffset: -55,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </Box>
  );
};

export default Bar;
