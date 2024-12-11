document.addEventListener("DOMContentLoaded", function () {
  const contentDiv = document.getElementById("content");
  const reportDate = document.getElementById("reportDate");

  // Cập nhật ngày báo cáo
  const today = new Date().toLocaleDateString("vi-VN");
  reportDate.textContent = today;

  // Hàm để tải nội dung
  function loadContent(file) {
    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        contentDiv.innerHTML = data;
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }

  // Các sự kiện click cho các nút
  document.getElementById("salesBtn").addEventListener("click", function () {
    loadContent("banhang.html");
  });

  document.getElementById("productsBtn").addEventListener("click", function () {
    loadContent("hanghoa.html");
  });

  document
    .getElementById("customersBtn")
    .addEventListener("click", function () {
      loadContent("khachhang.html");
    });

  document
    .getElementById("suppliersBtn")
    .addEventListener("click", function () {
      loadContent("nhacungcap.html");
    });

  document
    .getElementById("employeesBtn")
    .addEventListener("click", function () {
      loadContent("nhanvien.html");
    });

  document.getElementById("channelsBtn").addEventListener("click", function () {
    loadContent("kanhbanhang.html");
  });

  document.getElementById("financeBtn").addEventListener("click", function () {
    loadContent("taichinh.html");
  });

  document.getElementById("reportBtn").addEventListener("click", function () {
    loadContent("cuoingay.html");
  });

  document.getElementById("overviewBtn").addEventListener("click", function () {
    loadContent("tonghop.html");
  });

  // Tải nội dung đầu tiên
  loadContent("cuoingay.html");
});
