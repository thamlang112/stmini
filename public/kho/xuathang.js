document.addEventListener("DOMContentLoaded", () => {
  const xuatHangTableBody = document.getElementById("xuatHangTableBody");

  // Dữ liệu mẫu cho phiếu xuất hàng
  const xuatHangData = [
    {
      stt: 1,
      maHang: "HH04",
      tenHang: "Bánh Mì",
      xuatXu: "Việt Nam",
      soLuong: 5,
    },
    { stt: 2, maHang: "HH05", tenHang: "Kẹo Dẻo", xuatXu: "Mỹ", soLuong: 2 },
    {
      stt: 3,
      maHang: "HH06",
      tenHang: "Nước Soda",
      xuatXu: "Hàn Quốc",
      soLuong: 8,
    },
  ];

  // Hiển thị dữ liệu phiếu xuất hàng
  function renderXuatHangTable() {
    xuatHangTableBody.innerHTML = "";
    xuatHangData.forEach((item) => {
      const row = `<tr>
                  <td>${item.stt}</td>
                  <td>${item.maHang}</td>
                  <td>${item.tenHang}</td>
                  <td>${item.xuatXu}</td>
                  <td>${item.soLuong}</td>
              </tr>`;
      xuatHangTableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Khởi tạo bảng khi trang được tải
  renderXuatHangTable();
});
