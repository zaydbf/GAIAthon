import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./CustomerReview.css";

const CustomerReview = () => {
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 160,
      toolbar: {
        show: true,
      },
    },
    fill: {
      colors: ["#fff"],
      type: "gradient",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#ff929f"],
    },
    tooltip: {
      x: { format: "dd/MM/yy HH:mm" },
      fillSeriesColor: true,
      cssClass: "custom-tooltip",
    },
    grid: {
      show: true,
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    yaxis: {
      show: true,
    },
  };

  const series = [
    {
      name: "Review",
      data: [10, 50, 30, 90, 40, 120, 100],
    },
  ];

  return (
    <div className="CustomerReview">
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 1rem 0",
          letterSpacing: "1px",
        }}
      >
        Pollution Levels 🌫️
      </h3>
      <Chart options={options} series={series} type="area" height={160} />
      <p style={{ color: "#fff", textAlign: "center", marginTop: "1rem" }}>
        Live 🔴
      </p>
    </div>
  );
};

export default CustomerReview;
