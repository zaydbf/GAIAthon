import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // ✅ Import correct types

const CustomerReview = () => {
  const options: ApexOptions = {
    chart: {
      type: "area", // ✅ Correct type
      height: 160,
      toolbar: {
        show: false,
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
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    grid: {
      show: false,
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
      show: false,
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
      <Chart options={options} series={series} type="area" height={160} />
    </div>
  );
};

export default CustomerReview;
