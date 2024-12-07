document.addEventListener("DOMContentLoaded", () => {
  const nccTableBody = document.getElementById("nccTableBody");

  // Dữ liệu mẫu
  const data = [
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

  // Hiển thị dữ liệu lên bảng
  function renderTable() {
    nccTableBody.innerHTML = "";
    data.forEach((ncc) => {
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
  renderTable();

  // Các hàm thêm, sửa, xóa sẽ được thêm vào sau
  document.getElementById("them").addEventListener("click", () => {
    const newNCC = {
      maNCC: prompt("Nhập Mã NCC:"),
      tenNCC: prompt("Nhập Tên NCC:"),
      diaChi: prompt("Nhập Địa Chỉ:"),
      sdt: prompt("Nhập Số Điện Thoại:"),
    };
    data.push(newNCC);
    renderTable();
  });

  // Thêm các chức năng cho nút sửa và xóa tương tự
});
