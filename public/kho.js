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
        image: "https://cdn-app.kiotviet.vn/sample/retail/25.jpg",
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
        image: "https://example.com/path/to/image2.jpg",
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
    `;

    // Thêm sự kiện click
    newRow.onclick = () =>
      showProductInfo(
        newRow,
        product.maHH,
        product.tenHH,
        product.maVach,
        product.nhaCC,
        product.giaBan.toLocaleString() + " VNĐ",
        product.giaNhap.toLocaleString() + " VNĐ",
        product.dvt,
        product.nh,
        product.trangThai,
        product.xuatxu
      );

    tbody.appendChild(newRow);
  });
}

function showProductInfo(
  row,
  code,
  name,
  barcode,
  brand,
  price,
  cost,
  weight,
  location,
  description,
  supplier
) {
  // Lấy hình ảnh từ thẻ <img> trong hàng sản phẩm
  const image = row.querySelector("img").src; // Lấy đường dẫn hình ảnh

  // Xóa thông tin sản phẩm cũ nếu có
  const existingDetailRow = row.nextElementSibling;
  if (
    existingDetailRow &&
    existingDetailRow.classList.contains("product-detail")
  ) {
    existingDetailRow.remove();
    return; // Nếu đã có ô mở, việc nhấn nút sẽ đóng nó
  }

  // Tạo hàng mới để hiển thị thông tin sản phẩm
  const detailRow = document.createElement("tr");
  detailRow.classList.add("product-detail");

  detailRow.innerHTML = `
    <td colspan="6">
      <div style="display: flex; align-items: center;">
        <img src="${image}" alt="Hình ảnh sản phẩm" style="width: 100px; height: auto; margin-right: 10px;">
        <div>
          <div><strong>Tên sản phẩm:</strong> ${name}</div>
          <div><strong>Mã hàng:</strong> ${code}</div>
          <div><strong>Mã vạch:</strong> ${barcode}</div>
          <div><strong>Thương hiệu:</strong> ${brand}</div>
          <div><strong>Giá bán:</strong> ${price}</div>
          <div><strong>Giá vốn:</strong> ${cost}</div>
          <div><strong>Trọng lượng:</strong> ${weight}</div>
          <div><strong>Vị trí:</strong> ${location}</div>
          <div><strong>Mô tả:</strong> ${description}</div>
          <div><strong>Nhà cung cấp:</strong> ${supplier}</div>
          <div class="button-group">
            <button class="btn-update" onclick="updateProduct('${code}')">Cập nhật</button>
            <button class="btn-print" onclick="printLabel('${barcode}')">In tem mã</button>
            <button class="btn-copy" onclick="copyProduct('${code}', '${name}', '${barcode}', '${brand}', '${price}', '${cost}', '${weight}', '${location}', '${description}', '${supplier}')">Sao chép</button>
            <button class="btn-disable" onclick="disableProduct('${code}')">Ngừng kinh doanh</button>
            <button class="btn-delete" onclick="deleteProduct('${code}')">Xóa</button>
            <button class="btn-import" onclick="importProduct()">Nhập hàng</button>
          </div>
        </div>
      </div>
    </td>
  `;

  // Chèn hàng mới vào bảng ngay dưới hàng sản phẩm
  row.parentNode.insertBefore(detailRow, row.nextSibling);
}

// Tự động ẩn thông tin khi nhấn ra ngoài
document.addEventListener("click", function (event) {
  const detailRows = document.querySelectorAll(".product-detail");
  detailRows.forEach((detailRow) => {
    const row = detailRow.previousElementSibling;
    if (!detailRow.contains(event.target) && !row.contains(event.target)) {
      detailRow.remove();
    }
  });
});

// Cập nhật hàm loadProducts để truyền tham số hình ảnh cho showProductInfo
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = ""; // Xóa nội dung cũ

  // Khởi tạo dữ liệu mẫu nếu chưa có sản phẩm
  if (products.length === 0) {
    // ... (khởi tạo dữ liệu như trước)
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
    `;

    // Thêm sự kiện click
    newRow.onclick = (event) => {
      event.stopPropagation(); // Ngăn chặn sự kiện click từ lan truyền
      showProductInfo(
        newRow,
        product.maHH,
        product.tenHH,
        product.maVach,
        product.nhaCC,
        product.giaBan.toLocaleString() + " VNĐ",
        product.giaNhap.toLocaleString() + " VNĐ",
        product.dvt,
        product.nh,
        product.trangThai,
        product.xuatxu,
        product.image // Truyền hình ảnh
      );
    };

    tbody.appendChild(newRow);
  });
}

function copyProduct(
  code,
  name,
  barcode,
  brand,
  price,
  cost,
  weight,
  location,
  description,
  supplier
) {
  const productInfo = `
    Tên sản phẩm: ${name}
    Mã hàng: ${code}
    Mã vạch: ${barcode}
    Thương hiệu: ${brand}
    Giá bán: ${price}
    Giá vốn: ${cost}
    Trọng lượng: ${weight}
    Vị trí: ${location}
    Mô tả: ${description}
    Nhà cung cấp: ${supplier}
  `;

  navigator.clipboard
    .writeText(productInfo)
    .then(() => {
      alert("Thông tin sản phẩm đã được sao chép vào clipboard.");
    })
    .catch((err) => {
      alert("Không thể sao chép thông tin sản phẩm: ", err);
    });
}

function disableProduct(code) {
  alert(`Ngừng kinh doanh sản phẩm với mã hàng: ${code}`);
  // Thêm logic ngừng kinh doanh tại đây
}

function deleteProduct(code) {
  if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm với mã hàng: ${code}?`)) {
    alert(`Đã xóa sản phẩm với mã hàng: ${code}`);
    // Thêm logic xóa sản phẩm tại đây
  }
}

function importProduct() {
  window.location.href = "kho/qlhanghoa.html"; // Chuyển đến trang Quản Lý Hàng Hóa
}

function closeDetails(button) {
  const detailRow = button.closest("tr");
  detailRow.remove();
}

// Tạo hàng mới để hiển thị thông tin sản phẩm
const detailRow = document.createElement("tr");
detailRow.classList.add("product-detail");

detailRow.innerHTML = `
    <td colspan="6">
      <div><strong>Tên sản phẩm:</strong> ${name}</div>
      <div><strong>Mã hàng:</strong> ${code}</div>
      <div><strong>Mã vạch:</strong> ${barcode}</div>
      <div><strong>Thương hiệu:</strong> ${brand}</div>
      <div><strong>Giá bán:</strong> ${price}</div>
      <div><strong>Giá vốn:</strong> ${cost}</div>
      <div><strong>Trọng lượng:</strong> ${weight}</div>
      <div><strong>Vị trí:</strong> ${location}</div>
      <div><strong>Mô tả:</strong> ${description}</div>
      <div><strong>Nhà cung cấp:</strong> ${supplier}</div>
      <div class="button-group">
        <button class="btn-update">Cập nhật</button>
        <button class="btn-print">In tem mã</button>
        <button class="btn-copy">Sao chép</button>
        <button class="btn-disable">Ngừng kinh doanh</button>
        <button class="btn-delete">Xóa</button>
        <button class="btn-import">Nhập hàng</button>
        <button class="btn-close">Đóng</button>
      </div>
    </td>
  `;

// Chèn hàng mới vào bảng ngay dưới hàng sản phẩm
row.parentNode.insertBefore(detailRow, row.nextSibling);

document.addEventListener("DOMContentLoaded", loadProducts);

window.onload = function () {
  flatpickr("#startDate", { dateFormat: "d/m/Y" });
  flatpickr("#endDate", { dateFormat: "d/m/Y" });
};

function hideProductInfo() {
  document.getElementById("productInfo").style.display = "none";
}

function searchProducts() {
  const maTenHangInput = document
    .getElementById("maTenHang")
    .value.toLowerCase();
  const ghiChuInput = document.getElementById("ghiChu").value.toLowerCase();

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const filteredProducts = products.filter(
    (product) =>
      product.maHH.toLowerCase().includes(maTenHangInput) ||
      product.tenHH.toLowerCase().includes(maTenHangInput)
  );

  renderProducts(filteredProducts);
  toggleSearchModal(); // Đóng modal sau khi tìm kiếm
}

function renderProducts(products) {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = ""; // Xóa nội dung cũ

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

  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
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

function exportToExcel() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const ws = XLSX.utils.json_to_sheet(products); // products là mảng chứa sản phẩm
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");

  // Tạo file Excel và tải về
  XLSX.writeFile(wb, "Danh_sach_san_pham.xlsx");
}

// function viewProductDetails(product) {
//   localStorage.setItem("selectedProduct", JSON.stringify(product));
//   window.location.href = "kho/thongtin.html";
// }
