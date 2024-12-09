function navigateTo(page) {
  window.location.href = page + ".html";
}

function toggleDatePickers() {
  const selectElement = document.getElementById("timeSelect");
  const datePickers = document.getElementById("timePickers");
  datePickers.style.display =
    selectElement.value === "custom" ? "block" : "none";
}

function toggleExpiryDatePickers() {
  const selectElement = document.getElementById("expirySelect");
  const expiryPickers = document.getElementById("expiryPickers");
  expiryPickers.style.display =
    selectElement.value === "custom" ? "block" : "none";
}

function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = ""; // Xóa nội dung cũ

  // Khởi tạo dữ liệu mẫu nếu chưa có sản phẩm
  if (products.length === 0) {
    const defaultProducts = [
      {
        maHH: "HH001",
        xuatxu: "Việt Nam",
        dvt: "Cái",
        tenHH: "Sữa",
        giaNhap: 8000,
        nhaCC: "Vinamill",
        soLuong: 100,
        nh: "NH1",
        giaBan: 12000,
        maVach: "1234567890123",
        trangThai: "Còn hàng",
        thueVAT: "10%",
        image: "https://cdn-app.kiotviet.vn/sample/retail/25.jpg", // Đường dẫn hình ảnh mới
      },
      {
        maHH: "HH002",
        xuatxu: "Hàn Quốc",
        dvt: "Hộp",
        tenHH: "Cafe",
        giaNhap: 15000,
        nhaCC: "Minh Chiến",
        soLuong: 50,
        nh: "NH2",
        giaBan: 25000,
        maVach: "1234567890124",
        trangThai: "Còn hàng",
        thueVAT: "10%",
        image: "https://example.com/path/to/image2.jpg", // Đường dẫn hình ảnh mới
      },
      // Thêm các sản phẩm còn lại...
    ];

    localStorage.setItem("products", JSON.stringify(defaultProducts));
    products = defaultProducts; // Cập nhật lại danh sách sản phẩm
  }

  // Hiển thị sản phẩm lên bảng
  products.forEach((product) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
          <td><img src="${
            product.image
          }" alt="Hình ảnh sản phẩm" style="width: 50px; height: auto;"></td>
          <td>${product.maHH}</td>
          <td>${product.tenHH}</td>
          <td>${product.giaBan.toLocaleString()} VNĐ</td>
          <td>${product.giaNhap.toLocaleString()} VNĐ</td>
          <td>${product.soLuong}</td>
          <td>${product.nhaCC}</td>
          <td>${product.trangThai}</td>
          <td>${product.thueVAT}</td>
      `;
    tbody.appendChild(newRow);
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);

window.onload = function () {
  flatpickr("#startDate", { dateFormat: "d/m/Y" });
  flatpickr("#endDate", { dateFormat: "d/m/Y" });
  loadProducts();
};

function searchProducts() {
  const maTenHangInput = document
    .getElementById("maTenHang")
    .value.toLowerCase();
  const ghiChuInput = document.getElementById("ghiChu").value.toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.itemCode.toLowerCase().includes(maTenHangInput) ||
      product.itemName.toLowerCase().includes(maTenHangInput)
  );

  renderProducts(filteredProducts);
  toggleSearchModal(); // Đóng modal sau khi tìm kiếm
}

function showDropdown() {
  const dropdown = document.getElementById("addDropdown");
  dropdown.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function navigateToAddPage(page) {
  navigateTo(page);
  showDropdown(); // Đóng dropdown sau khi chọn
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function importFromExcel() {
  closeModal();
  document.getElementById("fileInput").click(); // Mở hộp thoại chọn file
}

function handleFile(event) {
  const file = event.target.files[0];
  if (file) {
    alert("Đã chọn file: " + file.name);
    // Thực hiện logic xử lý file Excel ở đây
  }
}

function showSuggestedList() {
  closeModal();
  const products = [
    { name: "Gạo", image: "link_to_image" },
    { name: "Đường", image: "link_to_image" },
    { name: "Muối", image: "link_to_image" },
    { name: "Dầu ăn", image: "link_to_image" },
    { name: "Bột mì", image: "link_to_image" },
  ];

  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Xóa danh sách hiện tại
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = product.name;
    li.onclick = () => selectProduct(product); // Chọn sản phẩm
    productList.appendChild(li);
  });

  document.getElementById("suggestionList").style.display = "block"; // Hiện danh sách gợi ý
}

function selectProduct(product) {
  alert("Bạn đã chọn sản phẩm: " + product.name);
  // Thực hiện logic để thêm sản phẩm vào danh sách hàng hóa
}

// Đóng modal khi nhấn ra ngoài
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
};

function exportToExcel() {
  const ws = XLSX.utils.json_to_sheet(products); // products là mảng chứa sản phẩm
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");

  // Tạo file Excel và tải về
  XLSX.writeFile(wb, "Danh_sach_san_pham.xlsx");
}
