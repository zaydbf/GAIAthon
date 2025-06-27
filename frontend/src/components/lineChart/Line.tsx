import { Box, Button, Stack, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import axios from "axios";

const timeLabels = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
});

type GasType = "CO" | "NO2" | "CH4" | "O3" | "SO2";

const GAS_COLORS: Record<GasType, string> = {
  CO: "hsl(4, 70%, 50%)",
  NO2: "hsl(205, 70%, 50%)",
  CH4: "hsl(39, 70%, 50%)",
  O3: "hsl(179, 70%, 50%)",
  SO2: "hsl(100, 70%, 50%)",
};
const GAS_UNITS: Record<GasType, string> = {
  CO: "mmol/m²",
  NO2: "µmol/m²",
  CH4: "ppbv",
  O3: "µmol/m²",
  SO2: "µmol/m²",
};

type DataPoint = { x: string; y: number };
type ChartSeries = { id: GasType; color: string; data: DataPoint[] };

const REGION = "Africa";

const Line = () => {
  const theme = useTheme();
  const [data, setData] = useState<ChartSeries[]>([]);
  const [selectedGas, setSelectedGas] = useState<GasType | null>(null);

  useEffect(() => {
    const gases: GasType[] = ["CO", "NO2", "CH4", "O3", "SO2"];

    const fetchData = async () => {
      const result = await Promise.all(
        gases.map(async (gas): Promise<ChartSeries | null> => {
          try {
            const res = await axios.get(
              `http://127.0.0.1:8000/api/ai-predict/${gas}/${REGION}`
            );
            if (!res.data || !Array.isArray(res.data.predictions)) {
              console.error(`Unexpected response for ${gas}:`, res.data);
              return null;
            }

            const predictions = res.data.predictions.slice(0, 7);
            const seriesData = predictions.map((y: number, i: number) => ({
              x: timeLabels[i] ?? `Day ${i + 1}`,
              y,
            }));

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
    <Box>
      {/* Buttons */}
      <Stack direction="row" spacing={1} mb={2}>
        {(["CO", "NO2", "CH4", "O3", "SO2"] as GasType[]).map((gas) => (
          <Button
            key={gas}
            variant={selectedGas === gas ? "contained" : "outlined"}
            size="small"
            onClick={() => setSelectedGas(selectedGas === gas ? null : gas)}
          >
            {gas}
          </Button>
        ))}
        <Button
          variant={selectedGas === null ? "contained" : "outlined"}
          size="small"
          onClick={() => setSelectedGas(null)}
        >
          Show All
        </Button>
      </Stack>

      {/* Chart */}
      <Box sx={{ position: "relative", height: "75vh" }}>
        {selectedGas && (
          <Box
            sx={{
              position: "absolute",
              left: 10,
              top: 0,
              fontSize: 14,
              fontWeight: 500,
              zIndex: 1,
            }}
          >
            {GAS_UNITS[selectedGas]}
          </Box>
        )}

        <ResponsiveLine
          theme={{
            textColor: "#ffffff",
            fontSize: 11,
            axis: {
              domain: {
                line: { stroke: "#ffffff", strokeWidth: 1 },
              },
              legend: {
                text: { fontSize: 12, fill: "#ffffff" },
              },
              ticks: {
                line: { stroke: "#ffffff", strokeWidth: 1 },
                text: { fontSize: 11, fill: "#ffffff" },
              },
            },
            grid: { line: { stroke: "#ffffff", strokeWidth: 0 } },
            legends: {
              title: {
                text: { fontSize: 11, fill: "#ffffff" },
              },
              text: { fontSize: 11, fill: "#ffffff" },
              ticks: {
                text: { fontSize: 10, fill: "#ffffff" },
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
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
                fontSize: 12,
              },
            },
          }}
          data={selectedGas ? data.filter((d) => d.id === selectedGas) : data}
          curve="catmullRom"
          margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.3f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Days",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Concentration",
            legendOffset: -70,
            legendPosition: "middle",
            format: (value) => value.toFixed(2),
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
              symbolBorderColor: "rgba(255, 255, 255, 0.5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(255, 255, 255, 0.03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Line;
