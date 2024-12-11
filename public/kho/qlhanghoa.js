document.addEventListener("DOMContentLoaded", () => {
  const nhapHangTableBody = document.getElementById("nhapHangTableBody");
  const nhapHangForm = document.getElementById("nhapHangForm");

  // Dữ liệu mẫu cho phiếu nhập hàng
  const nhapHangData = [
    {
      stt: 1,
      maHang: "HH01",
      tenHang: "Kẹo Ngọt",
      xuatXu: "Việt Nam",
      soLuong: 3,
    },
    {
      stt: 2,
      maHang: "HH02",
      tenHang: "Bánh Quy",
      xuatXu: "Nhật Bản",
      soLuong: 5,
    },
    {
      stt: 3,
      maHang: "HH03",
      tenHang: "Nước Ngọt",
      xuatXu: "Hàn Quốc",
      soLuong: 10,
    },
  ];

  // Hiển thị dữ liệu phiếu nhập hàng
  function renderNhapHangTable() {
    nhapHangTableBody.innerHTML = ""; // Xóa bảng hiện tại
    nhapHangData.forEach((item) => {
      const row = `<tr>
                  <td>${item.stt}</td>
                  <td>${item.maHang}</td>
                  <td>${item.tenHang}</td>
                  <td>${item.xuatXu}</td>
                  <td>${item.soLuong}</td>
              </tr>`;
      nhapHangTableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Hàm thêm sản phẩm vào bảng
  nhapHangForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn gửi form

    const maHang = document.getElementById("maHang").value.trim();
    const tenHang = document.getElementById("tenHang").value.trim();
    const xuatXu = document.getElementById("xuatXu").value.trim();
    const soLuong = parseInt(
      document.getElementById("soLuong").value.trim(),
      10
    );

    // Kiểm tra tính hợp lệ
    if (!maHang || !tenHang || !xuatXu || isNaN(soLuong) || soLuong <= 0) {
      alert("Vui lòng nhập đầy đủ thông tin hàng hóa!");
      return;
    }

    // Tạo đối tượng hàng hóa mới
    const newProduct = {
      stt: nhapHangData.length + 1,
      maHang: maHang,
      tenHang: tenHang,
      xuatXu: xuatXu,
      soLuong: soLuong,
    };

    // Thêm sản phẩm vào dữ liệu
    nhapHangData.push(newProduct);
    renderNhapHangTable(); // Cập nhật bảng hiển thị

    // Xóa dữ liệu trong form
    nhapHangForm.reset();
  });

  // Hiển thị sản phẩm khi tải trang
  renderNhapHangTable();
});
