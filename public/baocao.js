const ctxSales = document.getElementById("salesChart").getContext("2d");
const salesChart = new Chart(ctxSales, {
  type: "doughnut",
  data: {
    labels: ["Nước Yến Vico", "Sữa", "Bánh quy Cosy", "Kẹo Phát Tài"],
    datasets: [
      {
        label: "Sản Phẩm Bán Chạy",
        data: [25, 35, 20, 20],
        backgroundColor: ["#36a2eb", "#ff6384", "#ffce56", "#4bc0c0"],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

const ctxEmployee = document.getElementById("employeeChart").getContext("2d");
const employeeChart = new Chart(ctxEmployee, {
  type: "pie",
  data: {
    labels: ["Nhân Viên", "Quản Lý", "Thủ Kho"],
    datasets: [
      {
        label: "Thống Kê Nhân Viên",
        data: [30, 45, 25],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true,
  },
});
