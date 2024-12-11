document.addEventListener("DOMContentLoaded", function () {
  loadData();
  loadHistory();

  document.getElementById("saveBtn").addEventListener("click", function () {
    saveData();
  });

  document.getElementById("cancelBtn").addEventListener("click", function () {
    if (confirm("Bạn có chắc chắn muốn hủy không?")) {
      document.getElementById("importForm").reset();
      resetTable();
    }
  });

  document.getElementById("addRowBtn").addEventListener("click", function () {
    addNewRow(); // Thêm sản phẩm mới
  });
});

function updateTotal(row) {
  const quantity =
    parseInt(document.getElementById(`soLuong${row}`).value) || 0;
  const unitPrice =
    parseFloat(document.getElementById(`donGia${row}`).value) || 0;
  const total = quantity * unitPrice;

  document.getElementById(`tongGia${row}`).value = total.toFixed(2);
  calculateGrandTotal();
}

function calculateGrandTotal() {
  const rows = document.querySelectorAll("#productTableBody tr");
  let grandTotal = 0;

  rows.forEach((row) => {
    const totalPrice =
      parseFloat(row.querySelector("input[id^='tongGia']").value) || 0;
    grandTotal += totalPrice;
  });

  document.getElementById("tongCong").value = grandTotal.toFixed(2);
}

function addNewRow() {
  const rows = document.querySelectorAll("#productTableBody tr").length;
  const newRow = document.createElement("tr");
  const currentRow = rows + 1;

  newRow.innerHTML = `
          <td>${currentRow}</td>
          <td><input type="text" id="tenNguyenLieu${currentRow}" placeholder="Tên nguyên liệu" required></td>
          <td><input type="text" id="dvt${currentRow}" placeholder="ĐVT" required></td>
          <td><input type="number" id="soLuong${currentRow}" value="0" min="0" onchange="updateTotal(${currentRow});" required></td>
          <td><input type="text" id="donGia${currentRow}" placeholder="Đơn giá" onchange="updateTotal(${currentRow});" required></td>
          <td><input type="text" id="tongGia${currentRow}" value="0" readonly></td>
      `;

  document.getElementById("productTableBody").appendChild(newRow);
}

function saveData() {
  const nhaCC = document.getElementById("nhaCC").value;
  const khoHang = document.getElementById("khoHang").value;
  const ngayNhap = document.getElementById("ngayNhap").value;
  const nguoiNhap = document.getElementById("nguoiNhap").value;
  const ghiChu = document.getElementById("ghiChu").value;
  const total = document.getElementById("tongCong").value;

  const productDetails = [];
  const rows = document.querySelectorAll("#productTableBody tr");

  rows.forEach((row, index) => {
    const tenNguyenLieu = row.querySelector(`input[id^='tenNguyenLieu']`).value;
    const dvt = row.querySelector(`input[id^='dvt']`).value;
    const soLuong =
      parseInt(row.querySelector(`input[id^='soLuong']`).value) || 0;
    const donGia =
      parseFloat(row.querySelector(`input[id^='donGia']`).value) || 0;
    const tongGia =
      parseFloat(row.querySelector(`input[id^='tongGia']`).value) || 0;

    productDetails.push({
      tenNguyenLieu,
      dvt,
      soLuong,
      donGia,
      tongGia,
    });
  });

  const history = JSON.parse(localStorage.getItem("importHistory")) || [];
  history.push({
    nhaCC,
    khoHang,
    ngayNhap,
    nguoiNhap,
    ghiChu,
    total,
    productDetails,
  });
  localStorage.setItem("importHistory", JSON.stringify(history));

  alert("Dữ liệu đã được lưu thành công!");
  loadHistory();
  document.getElementById("importForm").reset(); // Reset form sau khi lưu
  resetTable(); // Reset bảng chi tiết hàng hóa
}

function resetTable() {
  const tableBody = document.getElementById("productTableBody");
  tableBody.innerHTML = `
          <tr>
              <td>1</td>
              <td><input type="text" id="tenNguyenLieu1" placeholder="Tên nguyên liệu" required></td>
              <td><input type="text" id="dvt1" placeholder="ĐVT" required></td>
              <td><input type="number" id="soLuong1" value="0" min="0" onchange="updateTotal(1);" required></td>
              <td><input type="text" id="donGia1" placeholder="Đơn giá" onchange="updateTotal(1);" required></td>
              <td><input type="text" id="tongGia1" value="0" readonly></td>
          </tr>
      `;
}

function loadData() {
  const history = JSON.parse(localStorage.getItem("importHistory")) || [];
  if (history.length > 0) {
    const lastEntry = history[history.length - 1];
    document.getElementById("nhaCC").value = lastEntry.nhaCC;
    document.getElementById("khoHang").value = lastEntry.khoHang;
    document.getElementById("ngayNhap").value = lastEntry.ngayNhap;
    document.getElementById("nguoiNhap").value = lastEntry.nguoiNhap;
    document.getElementById("ghiChu").value = lastEntry.ghiChu;
    document.getElementById("tongCong").value = lastEntry.total;

    // Cập nhật thông tin sản phẩm đầu tiên
    lastEntry.productDetails.forEach((product, index) => {
      if (index === 0) {
        document.getElementById("tenNguyenLieu1").value = product.tenNguyenLieu;
        document.getElementById("dvt1").value = product.dvt;
        document.getElementById("soLuong1").value = product.soLuong;
        document.getElementById("donGia1").value = product.donGia.toFixed(2);
        updateTotal(1); // Cập nhật tổng giá cho sản phẩm đầu tiên
      } else {
        addNewRow(); // Thêm các sản phẩm còn lại
        const currentRow = index + 2; // Dòng mới vừa thêm
        document.getElementById(`tenNguyenLieu${currentRow}`).value =
          product.tenNguyenLieu;
        document.getElementById(`dvt${currentRow}`).value = product.dvt;
        document.getElementById(`soLuong${currentRow}`).value = product.soLuong;
        document.getElementById(`donGia${currentRow}`).value =
          product.donGia.toFixed(2);
        updateTotal(currentRow); // Cập nhật tổng giá cho sản phẩm mới
      }
    });
  }
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("importHistory")) || [];
  const historyContainer = document.getElementById("history");
  historyContainer.innerHTML = ""; // Xóa nội dung cũ

  history.forEach((entry, index) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.innerHTML = `
              <strong>Nhà CC:</strong> ${entry.nhaCC}<br>
              <strong>Kho hàng:</strong> ${entry.khoHang}<br>
              <strong>Ngày nhập:</strong> ${entry.ngayNhap}<br>
              <strong>Người nhập:</strong> ${entry.nguoiNhap}<br>
              <strong>Ghi chú:</strong> ${entry.ghiChu}<br>
              <strong>Tổng cộng:</strong> ${entry.total}<br>
              <strong>Chi tiết:</strong><br>
              ${entry.productDetails
                .map(
                  (prod) => `
                  - ${prod.tenNguyenLieu} (${prod.dvt}), Số lượng: ${prod.soLuong}, Đơn giá: ${prod.donGia}, Tổng giá: ${prod.tongGia}<br>
              `
                )
                .join("")}
          `;
    historyContainer.appendChild(historyItem);
  });
}
