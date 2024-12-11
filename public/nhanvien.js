// Hàm thêm nhân viên
document.getElementById("themNV").addEventListener("click", function () {
  const maNV = document.getElementById("maNV").value;
  const tenNV = document.getElementById("tenNV").value;
  const sdt = document.getElementById("sdt").value;
  const diaChi = document.getElementById("diaChi").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const ngaySinh = document.getElementById("ngaySinh").value;
  const luong = document.getElementById("luong").value;

  const employee = {
    maNV,
    tenNV,
    sdt,
    diaChi,
    username,
    password,
    ngaySinh,
    luong,
  };

  // Lưu nhân viên vào localStorage
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  // Cập nhật bảng hiển thị
  renderEmployeeTable();
  clearInputFields();
});

// Hàm hiển thị bảng nhân viên
function renderEmployeeTable() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const employeeTableBody = document.getElementById("employeeTableBody");
  employeeTableBody.innerHTML = ""; // Xóa bảng hiện tại

  employees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.maNV}</td>
            <td>${employee.tenNV}</td>
            <td>${employee.sdt}</td>
            <td>${employee.diaChi}</td>
            <td>${employee.username}</td>
            <td>${employee.password}</td>
            <td>${employee.ngaySinh}</td>
            <td>${employee.luong}</td>
            <td><button onclick="removeEmployee(${index})">Xóa</button></td>
        `;
    employeeTableBody.appendChild(row);
  });
}

// Hàm xóa nhân viên
function removeEmployee(index) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1); // Xóa nhân viên tại chỉ số index
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployeeTable(); // Cập nhật bảng hiển thị
}

// Hàm làm mới bảng
document.getElementById("lamMoi").addEventListener("click", function () {
  renderEmployeeTable();
});

// Hàm xóa trường nhập
function clearInputFields() {
  document.getElementById("maNV").value = "";
  document.getElementById("tenNV").value = "";
  document.getElementById("sdt").value = "";
  document.getElementById("diaChi").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("ngaySinh").value = "";
  document.getElementById("luong").value = "";
}

// Tải danh sách nhân viên khi trang được tải
window.onload = function () {
  renderEmployeeTable();
};
