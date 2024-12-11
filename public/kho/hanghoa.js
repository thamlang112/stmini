// Hàm thêm sản phẩm vào localStorage
document.getElementById("themHH").addEventListener("click", function () {
  const maHH = document.getElementById("maHH").value;
  const xuatxu = document.getElementById("xuatxu").value;
  const dvt = document.getElementById("dvt").value;
  const tenHH = document.getElementById("tenHH").value;
  const giaNhap = parseFloat(document.getElementById("giaNhap").value);
  const nhaCC = document.getElementById("nhaCC").value;
  const soLuong = parseInt(document.getElementById("soLuong").value);
  const nh = document.getElementById("nh").value;
  const giaBan = parseFloat(document.getElementById("giaBan").value);
  const maVach = document.getElementById("maVach").value;
  const trangThai = document.getElementById("trangThai").value;
  const thueVAT = document.getElementById("thueVAT").value;

  // Kiểm tra và thêm sản phẩm vào localStorage
  if (maHH && tenHH && soLuong > 0) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
      maHH,
      xuatxu,
      dvt,
      tenHH,
      giaNhap,
      nhaCC,
      soLuong,
      nh,
      giaBan,
      maVach,
      trangThai,
      thueVAT,
    });
    localStorage.setItem("products", JSON.stringify(products));
    alert("Sản phẩm đã được thêm thành công!");
    loadProducts();
  } else {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
  }
});

// Hàm tải và hiển thị hàng hóa từ localStorage
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = ""; // Xóa nội dung cũ

  products.forEach((product, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.maHH}</td>
            <td>${product.xuatxu}</td>
            <td>${product.dvt}</td>
            <td>${product.tenHH}</td>
            <td>${product.giaNhap}</td>
            <td>${product.nhaCC}</td>
            <td>${product.soLuong}</td>
            <td>${product.nh}</td>
            <td>${product.giaBan}</td>
            <td>${product.maVach}</td>
            <td>${product.trangThai}</td>
            <td>${product.thueVAT}</td>
        `;
    tbody.appendChild(newRow);
  });
  addSellButtonListeners(); // Thêm sự kiện cho nút bán
}

// Thêm sự kiện cho các nút bán
function addSellButtonListeners() {
  const sellButtons = document.querySelectorAll(".sell-btn");
  sellButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      sellProduct(index);
    });
  });
}

// Hàm bán sản phẩm và giảm số lượng
function sellProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (products[index].soLuong > 0) {
    products[index].soLuong -= 1; // Giảm số lượng trong kho
    if (products[index].soLuong < 0) {
      products[index].soLuong = 0; // Đảm bảo không có số lượng âm
    }
    localStorage.setItem("products", JSON.stringify(products));
    alert(`Bán thành công sản phẩm: ${products[index].tenHH}`);
    loadProducts(); // Cập nhật bảng
  } else {
    alert("Sản phẩm đã hết hàng!");
  }
}

// Tải sản phẩm khi trang được tải
window.onload = loadProducts;
