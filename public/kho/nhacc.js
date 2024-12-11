// JavaScript để mở và đóng modal
document.getElementById("nhapNCC").onclick = function () {
  document.getElementById("modal").style.display = "block"; // Hiện modal
};

document.getElementById("import").onclick = function () {
  document.getElementById("importModal").style.display = "block"; // Hiện modal import
};

document.getElementById("closeModal").onclick = function () {
  document.getElementById("modal").style.display = "none"; // Ẩn modal thêm nhà cung cấp
};

document.getElementById("closeImportModal").onclick = function () {
  document.getElementById("importModal").style.display = "none"; // Ẩn modal import
};

document.getElementById("saveButton").onclick = function () {
  alert("Thông tin nhà cung cấp đã được lưu!");
  document.getElementById("modal").style.display = "none"; // Đóng modal sau khi lưu
};

document.getElementById("importSubmit").onclick = function () {
  alert("Dữ liệu đã được nhập từ file!");
  document.getElementById("importModal").style.display = "none"; // Đóng modal sau khi nhập
};

document.getElementById("nhapNCC").onclick = function () {
  window.location.href = "nhacungcap1.html"; // Chuyển đến nhacungcap1.html
};

document.getElementById("xuatFile").onclick = function () {
  const confirmation = confirm("Bạn có muốn tải xuống file không?");
  if (confirmation) {
    // Giả định rằng bạn có một file để tải về, thay đổi đường dẫn đến file thực tế
    window.location.href = "path/to/your/file.xlsx"; // Thay đổi đường dẫn file tại đây
  }
};

window.onclick = function (event) {
  if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
  if (event.target == document.getElementById("importModal")) {
    document.getElementById("importModal").style.display = "none";
  }
};

// Tìm kiếm nhà cung cấp
document
  .querySelector('.search-bar input[type="text"]')
  .addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll("#nccTableBody tr");

    rows.forEach((row) => {
      const code = row.getAttribute("data-code").toLowerCase();
      const name = row.getAttribute("data-name").toLowerCase();
      if (code.includes(searchTerm) || name.includes(searchTerm)) {
        row.style.display = ""; // Hiện hàng
      } else {
        row.style.display = "none"; // Ẩn hàng
      }
    });
  });

// Ngăn chặn click ra ngoài modal để đóng modal
window.onclick = function (event) {
  if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
  if (event.target == document.getElementById("importModal")) {
    document.getElementById("importModal").style.display = "none";
  }
};

// // Cập nhật hiển thị các cột dựa trên checkbox
// document.querySelectorAll(".column-toggle").forEach((checkbox) => {
//   checkbox.addEventListener("change", function () {
//     const columnIndex = this.getAttribute("data-column");
//     const tableRows = document.querySelectorAll("#nccTableBody tr");

//     tableRows.forEach((row) => {
//       const cell = row.cells[columnIndex];
//       if (this.checked) {
//         cell.classList.remove("hidden"); // Hiện cell
//       } else {
//         cell.classList.add("hidden"); // Ẩn cell
//       }
//     });
//     // Cập nhật tiêu đề cột
//     const headerCell =
//       document.querySelectorAll("#nccTable thead th")[columnIndex];
//     if (this.checked) {
//       headerCell.classList.remove("hidden");
//     } else {
//       headerCell.classList.add("hidden");
//     }
//   });
// });

// Cập nhật hiển thị các cột dựa trên checkbox
document.querySelectorAll(".column-toggle").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const columnIndex = this.getAttribute("data-column");
    const tableRows = document.querySelectorAll("#nccTableBody tr");

    tableRows.forEach((row) => {
      const cell = row.cells[columnIndex];
      if (this.checked) {
        cell.classList.remove("hidden"); // Hiện cell
      } else {
        cell.classList.add("hidden"); // Ẩn cell
      }
    });

    // Cập nhật tiêu đề cột
    const headerCell = document.querySelectorAll("thead th")[columnIndex];
    if (this.checked) {
      headerCell.classList.remove("hidden");
    } else {
      headerCell.classList.add("hidden");
    }
  });
});

// Chọn tất cả checkbox
document.getElementById("selectAll").addEventListener("change", function () {
  const checkboxes = document.querySelectorAll(
    '#nccTableBody input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = this.checked;
  });
});

// Xử lý sự kiện khi nhấn nút Xuất File
document.getElementById("xuatFile").addEventListener("click", function () {
  const confirmation = confirm("Bạn có đồng ý tải file Excel không?");
  if (confirmation) {
    // Thay thế URL bên dưới bằng đường dẫn đến file Excel của bạn
    const fileUrl = "path/to/your/file.xlsx"; // Đường dẫn đến file Excel
    window.location.href = fileUrl; // Chuyển hướng để tải file
  } else {
    alert("Hủy tải file.");
  }
});
