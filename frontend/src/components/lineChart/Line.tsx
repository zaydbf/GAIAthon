import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import axios from "axios";

const timeLabels = [
  "20/June", "21/June", "22/June",
  "23/June", "24/June", "25/June", "26/June",
];

type GasType = "CO" | "NO2" | "CH4" | "O3" | "SO2";

const GAS_COLORS: Record<GasType, string> = {
  CO: "hsl(4, 70%, 50%)",
  NO2: "hsl(205, 70%, 50%)",
  CH4: "hsl(39, 70%, 50%)",
  O3: "hsl(179, 70%, 50%)",
  SO2: "hsl(100, 70%, 50%)",
};

type DataPoint = { x: string; y: number };
type ChartSeries = { id: GasType; color: string; data: DataPoint[] };

const REGION = "Africa";

const Line = ({ isDahboard = false }) => {
  const theme = useTheme();
  const [data, setData] = useState<ChartSeries[]>([]);

  useEffect(() => {
    const gases: GasType[] = ["CO", "NO2", "CH4", "O3", "SO2"];

    const fetchData = async () => {
      const result = await Promise.all(
        gases.map(async (gas): Promise<ChartSeries | null> => {
          try {
            const res = await axios.get(`http://127.0.0.1:8000/api/ai-predict/${gas}/${REGION}`);
            if (!res.data || !Array.isArray(res.data.predictions)) {
              console.error(`Unexpected response for ${gas}:`, res.data);
              return null;
            }

            const predictions = res.data.predictions.slice(0, 7);
            const seriesData = predictions.map((y: number, i: number) => ({
              x: timeLabels[i] ?? `Day ${i + 1}`,
              y,
            }));

            console.log(`[${gas}] Mapped Data:`, seriesData);

            return {
              id: gas,
              color: GAS_COLORS[gas],
              data: seriesData,
            };
          } catch (err) {
            console.error(`Error fetching ${gas}`, err);
            return null;
          }
        })
      );

      const filtered = result.filter((d): d is ChartSeries => d !== null);
      setData(filtered);
    };

    fetchData();
  }, []);


  return (
    <Box sx={{ height: isDahboard ? "280px" : "75vh" }}>
      <ResponsiveLine
        theme={{
          textColor: theme.palette.text.primary,
          fontSize: 11,
          axis: {
            domain: { line: { stroke: theme.palette.divider, strokeWidth: 1 } },
            legend: { text: { fontSize: 12, fill: theme.palette.text.primary } },
            ticks: {
              line: { stroke: theme.palette.divider, strokeWidth: 1 },
              text: { fontSize: 11, fill: theme.palette.text.secondary },
            },
          },
          grid: { line: { stroke: theme.palette.divider, strokeWidth: 0 } },
          legends: {
            title: { text: { fontSize: 11, fill: theme.palette.text.primary } },
            text: { fontSize: 11, fill: theme.palette.text.primary },
            ticks: { text: { fontSize: 10, fill: theme.palette.text.primary } },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: theme.palette.text.primary,
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
          },
        }}
        data={data}
        curve="catmullRom"
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
        yFormat=" >-.10f"
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
          legend: isDahboard ? null : "Count",
          legendOffset: -45,
          legendPosition: "middle",
          format: (value) => value.toFixed(5),
         
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
