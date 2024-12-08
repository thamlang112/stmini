document.addEventListener("DOMContentLoaded", function () {
  const nccTableBody = document.getElementById("nccTableBody");

  // Thêm dữ liệu mẫu
  // const sampleData = [
  //   {
  //     maNCC: "NC0004",
  //     tenNCC: "Công ty Hồng Phúc",
  //     sdt: "0123456789",
  //     email: "hongphuc@example.com",
  //     noHienTai: 5000,
  //     tongMua: 100000,
  //   },
  //   {
  //     maNCC: "NC0005",
  //     tenNCC: "Công ty Đại Việt",
  //     sdt: "0987654321",
  //     email: "daiviet@example.com",
  //     noHienTai: 3000,
  //     tongMua: 75000,
  //   },
  //   {
  //     maNCC: "NC0003",
  //     tenNCC: "Công ty Pharmedic",
  //     sdt: "0112233445",
  //     email: "pharmedic@example.com",
  //     noHienTai: 7000,
  //     tongMua: 150000,
  //   },
  //   {
  //     maNCC: "NC0001",
  //     tenNCC: "Công ty TNHH Chigo",
  //     sdt: "0123456789",
  //     email: "chigo@example.com",
  //     noHienTai: 2000,
  //     tongMua: 50000,
  //   },
  //   {
  //     maNCC: "NC0002",
  //     tenNCC: "Công ty Hòa Giang",
  //     sdt: "0987654321",
  //     email: "hoagiang@example.com",
  //     noHienTai: 10000,
  //     tongMua: 200000,
  //   },
  // ];

  // Hiển thị dữ liệu mẫu
  sampleData.forEach((data) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td><input type="checkbox" /></td>
          <td>${data.maNCC}</td>
          <td>${data.tenNCC}</td>
          <td>${data.sdt}</td>
          <td>${data.email}</td>
          <td>${data.noHienTai}</td>
          <td>${data.tongMua}</td>
      `;
    nccTableBody.appendChild(row);
  });

  // Checkbox chọn tất cả
  document.getElementById("selectAll").addEventListener("change", function () {
    const checkboxes = nccTableBody.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
  });

  // Mở modal khi nhấn nút "Nhà cung cấp"
  document.getElementById("nhapNCC").onclick = function () {
    // Mở modal
    document.querySelector(".modal").style.display = "flex";
  };
  document.getElementById("nhapNCC").onclick = function () {
    window.location.href = "nhacungcap1.html"; // Chuyển đến nhacungcap1.html
  };

  // Đóng modal khi nhấn nút "Đóng"
  document.querySelector(".btn.cancel").onclick = function () {
    document.querySelector(".modal").style.display = "none";
  };
});
