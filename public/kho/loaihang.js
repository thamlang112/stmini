document.addEventListener("DOMContentLoaded", () => {
  const loaiHangTableBody = document.getElementById("loaiHangTableBody");
  const nccTableBody = document.getElementById("nccTableBody");

  // Dữ liệu mẫu cho loại hàng
  const loaiHangData = [
    {
      stt: 1,
      maNCC: "NCC01",
      tenHang: "Sản Phẩm A",
      xuatXu: "Việt Nam",
      soLuong: 100,
    },
    {
      stt: 2,
      maNCC: "NCC02",
      tenHang: "Sản Phẩm B",
      xuatXu: "Hàn Quốc",
      soLuong: 50,
    },
    {
      stt: 3,
      maNCC: "NCC03",
      tenHang: "Sản Phẩm C",
      xuatXu: "Nhật Bản",
      soLuong: 200,
    },
  ];

  // Dữ liệu mẫu cho nhà cung cấp
  const nccData = [
    {
      maNCC: "NCC01",
      tenNCC: "Công Ty A",
      diaChi: "Hà Nội",
      sdt: "0123456789",
    },
    {
      maNCC: "NCC02",
      tenNCC: "Công Ty B",
      diaChi: "Đà Nẵng",
      sdt: "0987654321",
    },
    {
      maNCC: "NCC03",
      tenNCC: "Công Ty C",
      diaChi: "TP.HCM",
      sdt: "0912345678",
    },
  ];

  // Hiển thị dữ liệu loại hàng lên bảng
  function renderLoaiHangTable() {
    loaiHangTableBody.innerHTML = "";
    loaiHangData.forEach((item) => {
      const row = `<tr>
                  <td>${item.stt}</td>
                  <td>${item.maNCC}</td>
                  <td>${item.tenHang}</td>
                  <td>${item.xuatXu}</td>
                  <td>${item.soLuong}</td>
              </tr>`;
      loaiHangTableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Hiển thị dữ liệu nhà cung cấp lên bảng
  function renderNCCTable() {
    nccTableBody.innerHTML = "";
    nccData.forEach((ncc) => {
      const row = `<tr>
                  <td>${ncc.maNCC}</td>
                  <td>${ncc.tenNCC}</td>
                  <td>${ncc.diaChi}</td>
                  <td>${ncc.sdt}</td>
              </tr>`;
      nccTableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Khởi tạo bảng khi trang được tải
  renderLoaiHangTable();
  renderNCCTable();

  // Thêm sự kiện cho nút thêm
  document.getElementById("them").addEventListener("click", () => {
    const newItem = {
      stt: loaiHangData.length + 1,
      maNCC: prompt("Nhập Mã NCC:"),
      tenHang: prompt("Nhập Tên Hàng Hóa:"),
      xuatXu: prompt("Nhập Xuất Xứ:"),
      soLuong: parseInt(prompt("Nhập Số Lượng:")),
    };
    loaiHangData.push(newItem);
    renderLoaiHangTable();
  });

  // Thêm các chức năng cho nút sửa và xóa tương tự
});
