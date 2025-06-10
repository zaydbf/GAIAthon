import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

// Define row type
interface RowData {
  parameter: string;
  value: number | string;
  status: "Low" | "Moderate" | "High" | "N/A";
}

// Helper to determine status based on parameter and value
function getStatus(
  parameter: string,
  value: number | string
): RowData["status"] {
  const num = Number(value);
  if (parameter === "Temperature (°C)") {
    if (num < 10) return "Low";
    if (num <= 30) return "Moderate";
    return "High";
  }
  if (parameter === "Pressure (hPa)") {
    if (num < 1000) return "Low";
    if (num <= 1020) return "Moderate";
    return "High";
  }
  if (parameter === "Hmidity (%)") {
    if (num < 30) return "Low";
    if (num <= 60) return "Moderate";
    return "High";
  }
  return "N/A";
}

// Raw data without status
const rawRows: Omit<RowData, "status">[] = [
  { parameter: "Time (PM)", value: "12:56:54 " },
  { parameter: "Temperature (°C)", value: 50.67 },
  { parameter: "Pressure (hPa)", value: 0.11 },
  { parameter: "Hmidity (%)", value: 57.13 },
  { parameter: "Longitude (°)", value: 3.054025 },
  { parameter: "Latitude (°)", value: 36.740354 },
  { parameter: "Altitude (m)", value: 97.85 },
];

// Generate rows with status
const Rows: RowData[] = rawRows.map((row) => ({
  ...row,
  status: getStatus(row.parameter, row.value),
}));

const makeStyle = (status: RowData["status"]) => {
  if (status === "Low") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "High") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else if (status === "Moderate") {
    return {
      background: "#59bfff",
      color: "white",
    };
  } else {
    return {};
  }
};

export default function BasicTable() {
  return (
    <div className="Table">
      <h3>LiveSensorData – Industry location (GPS):</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Parameter</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {Rows.map((Row) => (
              <TableRow
                key={Row.parameter}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {Row.parameter}
                </TableCell>
                <TableCell align="left">{Row.value}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(Row.status)}>
                    {Row.status}
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
