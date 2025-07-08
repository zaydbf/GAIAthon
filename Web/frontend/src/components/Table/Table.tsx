import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

const useCurrentTime = () => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

interface RowData {
  parameter: string;
  value: number | string;
  status: "Low" | "Moderate" | "High" | "N/A";
}

function getStatus(parameter: string, value: number | string): RowData["status"] {
  const num = Number(value);
  if (parameter === "Temperature (°C)") {
    if (num < 10) return "Low";
    if (num <= 25) return "Moderate";
    return "High";
  }
  if (parameter === "Pressure (hPa)") {
    if (num < 1000) return "Low";
    if (num <= 1020) return "Moderate";
    return "High";
  }
  if (parameter === "Humidity (%)") {
    if (num < 30) return "Low";
    if (num <= 60) return "Moderate";
    return "High";
  }
  return "N/A";
}

const makeStyle = (status: RowData["status"]) => {
  if (status === "Low") {
    return { background: "rgb(145 254 159 / 47%)", color: "green" };
  } else if (status === "High") {
    return { background: "#ffadad8f", color: "red" };
  } else if (status === "Moderate") {
    return { background: "#59bfff", color: "white" };
  } else {
    return {};
  }
};

export default function BasicTable() {
  const currentTime = useCurrentTime();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/iot/get-avg-iot-data")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  const rawRows: Omit<RowData, "status">[] = [
    { parameter: "Time (PM)", value: currentTime },
    { parameter: "Temperature (°C)", value: data.avg_temperature.toFixed(2) },
    { parameter: "Pressure (hPa)", value: data.avg_barometer.toFixed(2) },
    { parameter: "Humidity (%)", value: data.avg_humidity.toFixed(2) },
    { parameter: "Longitude (°)", value: data.avg_longitude.toFixed(5) },
    { parameter: "Latitude (°)", value: data.avg_latitude.toFixed(5) },
    { parameter: "Altitude (m)", value: data.avg_altitude.toFixed(2) },
  ];

  const rows: RowData[] = rawRows.map((row) => ({
    ...row,
    status: getStatus(row.parameter, row.value),
  }));

  return (
    <div className="Table">
      <h3>LiveSensorData – Industry location (GPS):</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="sensor table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Parameter</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.parameter}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.parameter}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
