document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("doanhthuChart").getContext("2d");

  const doanhThuData = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Doanh Thu",
        data: [0, 160000, 70000, 360000, 1500000, 0, 0, 1493016, 0, 0, 0],
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const doanhThuChart = new Chart(ctx, {
    type: "line",
    data: doanhThuData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Doanh Thu (VNĐ)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Tháng",
          },
        },
      },
    },
  });
});
