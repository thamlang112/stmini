document.getElementById("dangKy").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const tenNV = document.getElementById("tenNV").value;
  const notification = document.getElementById("notification");

  if (username === "" || password === "" || tenNV === "") {
    notification.textContent = "Vui lòng điền đầy đủ thông tin.";
    return;
  }

  // Lưu thông tin tài khoản vào localStorage
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const existingAccount = accounts.find((acc) => acc.username === username);

  if (existingAccount) {
    notification.textContent =
      "Username đã tồn tại. Vui lòng chọn username khác.";
  } else {
    accounts.push({ username, password, tenNV });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    notification.textContent = "Đăng ký thành công!";
    clearInputFields();
  }
});

// Hàm xóa trường nhập
function clearInputFields() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("tenNV").value = "";
}
