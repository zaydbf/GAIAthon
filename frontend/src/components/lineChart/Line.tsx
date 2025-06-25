import { Box, useTheme } from "@mui/material";

import { ResponsiveLine } from "@nivo/line";

const timeLabels = [
  "15/June",
  "16/June",
  "17/June",
  "18/June",
  "19/June",
  "20/June",
  "21/June",
  "22/June",
  "23/June",
  "24/June",
  "25/June",
  "26/June",
];

const data = [
  {
    id: "CO",
    color: "hsl(4, 70%, 50%)",
    data: [
      { x: timeLabels[0], y: 79 },
      { x: timeLabels[1], y: 28 },
      { x: timeLabels[2], y: 150 },
      { x: timeLabels[3], y: 173 },
      { x: timeLabels[4], y: 234 },
      { x: timeLabels[5], y: 98 },
      { x: timeLabels[6], y: 244 },
      { x: timeLabels[7], y: 295 },
      { x: timeLabels[8], y: 287 },
      { x: timeLabels[9], y: 157 },
      { x: timeLabels[10], y: 239 },
      { x: timeLabels[11], y: 69 },
    ],
  },
  {
    id: "NO₂",
    color: "hsl(205, 70%, 50%)",
    data: [
      { x: timeLabels[0], y: 278 },
      { x: timeLabels[1], y: 222 },
      { x: timeLabels[2], y: 65 },
      { x: timeLabels[3], y: 213 },
      { x: timeLabels[4], y: 89 },
      { x: timeLabels[5], y: 278 },
      { x: timeLabels[6], y: 231 },
      { x: timeLabels[7], y: 47 },
      { x: timeLabels[8], y: 126 },
      { x: timeLabels[9], y: 191 },
      { x: timeLabels[10], y: 95 },
      { x: timeLabels[11], y: 26 },
    ],
  },
  {
    id: "CH₄",
    color: "hsl(39, 70%, 50%)",
    data: [
      { x: timeLabels[0], y: 3 },
      { x: timeLabels[1], y: 187 },
      { x: timeLabels[2], y: 259 },
      { x: timeLabels[3], y: 294 },
      { x: timeLabels[4], y: 158 },
      { x: timeLabels[5], y: 146 },
      { x: timeLabels[6], y: 125 },
      { x: timeLabels[7], y: 253 },
      { x: timeLabels[8], y: 230 },
      { x: timeLabels[9], y: 287 },
      { x: timeLabels[10], y: 193 },
      { x: timeLabels[11], y: 12 },
    ],
  },
  {
    id: "O₃",
    color: "hsl(179, 70%, 50%)",
    data: [
      { x: timeLabels[0], y: 213 },
      { x: timeLabels[1], y: 271 },
      { x: timeLabels[2], y: 22 },
      { x: timeLabels[3], y: 270 },
      { x: timeLabels[4], y: 97 },
      { x: timeLabels[5], y: 146 },
      { x: timeLabels[6], y: 116 },
      { x: timeLabels[7], y: 159 },
      { x: timeLabels[8], y: 165 },
      { x: timeLabels[9], y: 210 },
      { x: timeLabels[10], y: 76 },
      { x: timeLabels[11], y: 126 },
    ],
  },
  {
    id: "SO₂",
    color: "hsl(333, 70.20%, 50.00%)",
    data: [
      { x: timeLabels[0], y: 0 },
      { x: timeLabels[1], y: 271 },
      { x: timeLabels[2], y: 22 },
      { x: timeLabels[3], y: null },
      { x: timeLabels[4], y: 97 },
      { x: timeLabels[5], y: 146 },
      { x: timeLabels[6], y: 116 },
      { x: timeLabels[7], y: 159 },
      { x: timeLabels[8], y: 165 },
      { x: timeLabels[9], y: 210 },
      { x: timeLabels[10], y: 76 },
      { x: timeLabels[11], y: 126 },
    ],
  },
];

const Line = ({ isDahboard = false }) => {
  const theme = useTheme();
  return (
    <Box sx={{ height: isDahboard ? "280px" : "75vh" }}>
      <ResponsiveLine
        theme={{
          textColor: "theme.palette.text.primary",
          fontSize: 11,
          axis: {
            domain: {
              line: {
                stroke: "#fff",
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#fff",
              },
            },
            ticks: {
              line: {
                stroke: "#fff",
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: "#fff",
              },
            },
          },
          grid: {
            line: {
              stroke: "#fff",
              strokeWidth: 0,
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 11,
                fill: "#fff",
              },
            },
            text: {
              fontSize: 11,
              fill: "#fff",
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill: "#fff",
              },
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: "theme.palette.text.primary",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            link: {
              stroke: "#000000",
              strokeWidth: 1,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            outline: {
              stroke: "#000000",
              strokeWidth: 2,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            symbol: {
              fill: "#000000",
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
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
          },
        }}
        data={data}
        curve="catmullRom"
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDahboard ? null : "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDahboard ? null : "Concentration",
          legendOffset: -45,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default Line;
