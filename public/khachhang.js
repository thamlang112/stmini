// Hàm thêm khách hàng
document.getElementById("themKH").addEventListener("click", function () {
  const maKH = document.getElementById("maKH").value;
  const tenKH = document.getElementById("tenKH").value;
  const sdt = document.getElementById("sdt").value;
  const diaChi = document.getElementById("diaChi").value;
  const ngayTao = document.getElementById("ngayTao").value;

  const customer = { maKH, tenKH, sdt, diaChi, ngayTao };

  // Lưu khách hàng vào localStorage
  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));

  // Cập nhật bảng hiển thị
  renderCustomerTable();
  clearInputFields();
});

// Hàm hiển thị bảng khách hàng
function renderCustomerTable() {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const customerTableBody = document.getElementById("customerTableBody");
  customerTableBody.innerHTML = ""; // Xóa bảng hiện tại

  customers.forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.maKH}</td>
            <td>${customer.tenKH}</td>
            <td>${customer.diaChi}</td>
            <td>${customer.sdt}</td>
            <td><button onclick="removeCustomer(${index})">Xóa</button></td>
            <td>${customer.ngayTao}</td>
        `;
    customerTableBody.appendChild(row);
  });
}

// Hàm xóa khách hàng
function removeCustomer(index) {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.splice(index, 1); // Xóa khách hàng tại chỉ số index
  localStorage.setItem("customers", JSON.stringify(customers));
  renderCustomerTable(); // Cập nhật bảng hiển thị
}

// Hàm làm mới bảng
document.getElementById("lamMoi").addEventListener("click", function () {
  renderCustomerTable();
});

// Hàm xóa trường nhập
function clearInputFields() {
  document.getElementById("maKH").value = "";
  document.getElementById("tenKH").value = "";
  document.getElementById("sdt").value = "";
  document.getElementById("diaChi").value = "";
  document.getElementById("ngayTao").value = "";
}

// Tải danh sách khách hàng khi trang được tải
window.onload = function () {
  renderCustomerTable();
};
