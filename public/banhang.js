let invoiceNumber = 1;
const paymentHistory = JSON.parse(localStorage.getItem("paymentHistory")) || [];
const products = JSON.parse(localStorage.getItem("products")) || [];

document.getElementById("themSanPham").addEventListener("click", addProduct);
document.getElementById("btnScan").addEventListener("click", startScanner);

function addProduct() {
  const maSanPham = document.getElementById("maSanPham").value;
  const soLuong = parseInt(document.getElementById("soLuong").value);
  const product = products.find((p) => p.maHH === maSanPham); // Tìm sản phẩm theo mã

  if (product && product.soLuong >= soLuong) {
    const tbody = document.getElementById("productTableBody");

    // Kiểm tra xem sản phẩm đã có trong bảng chưa
    const existingRow = Array.from(tbody.children).find(
      (row) => row.cells[1].textContent === product.maHH
    );

    if (existingRow) {
      // Nếu đã có, cập nhật số lượng
      const currentQuantity = parseInt(existingRow.cells[3].textContent);
      existingRow.cells[3].textContent = currentQuantity + soLuong;
    } else {
      // Nếu chưa có, thêm mới
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td>${tbody.children.length + 1}</td>
                <td>${product.maHH}</td>
                <td>${product.tenHH}</td>
                <td>${soLuong}</td>
                <td>${product.giaBan}</td>
            `;
      tbody.appendChild(newRow);
    }

    // Cập nhật số lượng sản phẩm trong localStorage
    product.soLuong -= soLuong;
    localStorage.setItem("products", JSON.stringify(products));

    // Cập nhật tổng tiền tạm tính
    updateTotal();
  } else {
    alert("Sản phẩm không đủ số lượng hoặc không tồn tại.");
  }
}

function updateTotal() {
  const productRows = document.querySelectorAll("#productTableBody tr");
  let total = 0;

  productRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const quantity = parseInt(cells[3].textContent);
    const price = parseFloat(cells[4].textContent);
    total += quantity * price;
  });

  document.getElementById("total").value = total + " VNĐ";
}

function startScanner() {
  document.getElementById("camera").style.display = "block";
  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.getElementById("camera"),
        constraints: {
          facingMode: "environment",
        },
      },
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_13_reader",
          "code_39_reader",
        ],
      },
    },
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    }
  );

  Quagga.onDetected(function (data) {
    const code = data.codeResult.code;
    document.getElementById("maSanPham").value = code; // Điền mã sản phẩm vào input
    Quagga.stop();
    document.getElementById("camera").style.display = "none"; // Ẩn camera
    addProduct(); // Thêm sản phẩm
  });
}

document
  .getElementById("btnPrintInvoice")
  .addEventListener("click", function () {
    const productRows = document.querySelectorAll("#productTableBody tr");
    const invoiceBody = document.getElementById("invoiceTableBody");
    invoiceBody.innerHTML = "";

    let total = 0;
    productRows.forEach((row, index) => {
      const cells = row.querySelectorAll("td");
      const quantity = parseInt(cells[3].textContent);
      const price = parseFloat(cells[4].textContent);
      const amount = quantity * price;
      total += amount;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${cells[2].textContent || "N/A"}</td>
            <td>${quantity}</td>
            <td>${price} VNĐ</td>
            <td>${amount} VNĐ</td>
        `;
      invoiceBody.appendChild(newRow);
    });

    document.getElementById("invoiceTotal").textContent = total + " VNĐ";
    const moneyGiven =
      parseInt(document.getElementById("moneyGiven").value) || 0;
    const changeDue = Math.max(0, moneyGiven - total);
    document.getElementById("changeDue").textContent = changeDue + " VNĐ";

    // Tính số tiền còn nợ
    const amountDue = Math.max(0, total - moneyGiven);
    document.getElementById("amountDue").textContent = amountDue + " VNĐ";

    // Cập nhật thông tin hóa đơn
    document.getElementById("invoiceNumber").textContent = invoiceNumber;
    invoiceNumber++;

    // Lưu lịch sử thanh toán
    const paymentData = {
      invoiceNumber: invoiceNumber - 1,
      total: total,
      moneyGiven: moneyGiven,
      changeDue: changeDue,
      amountDue: amountDue,
      date: new Date().toISOString().split("T")[0], // Lưu ngày thanh toán
    };
    paymentHistory.push(paymentData);
    localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));

    // Cập nhật thông tin phiếu xuất
    createExportReceipt(paymentData);

    // Cập nhật tổng doanh thu
    updateRevenue(total);

    // Hiển thị lịch sử thanh toán
    updatePaymentHistory();

    document.getElementById("invoice").style.display = "block"; // Hiện hóa đơn
  });

function createExportReceipt(paymentData) {
  const exportReceipts =
    JSON.parse(localStorage.getItem("exportReceipts")) || [];
  const productsInInvoice = Array.from(
    document.querySelectorAll("#productTableBody tr")
  ).map((row) => {
    const cells = row.querySelectorAll("td");
    return {
      maHH: cells[1].textContent || "N/A",
      tenHH: cells[2].textContent || "N/A",
      soLuong: parseInt(cells[3].textContent) || 0,
      donGia: parseFloat(cells[4].textContent) || 0,
    };
  });

  const exportReceipt = {
    invoiceNumber: paymentData.invoiceNumber,
    products: productsInInvoice,
    total: paymentData.total,
    date: new Date().toISOString().split("T")[0], // Ngày xuất
  };

  exportReceipts.push(exportReceipt);
  localStorage.setItem("exportReceipts", JSON.stringify(exportReceipts));
}

function updateRevenue(total) {
  let currentRevenue = JSON.parse(localStorage.getItem("totalRevenue")) || 0;
  currentRevenue += total;
  localStorage.setItem("totalRevenue", JSON.stringify(currentRevenue));
}

function updatePaymentHistory() {
  const historyList = document.getElementById("paymentHistory");
  historyList.innerHTML = "";

  paymentHistory.forEach((payment) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Hóa Đơn ${payment.invoiceNumber}: Tổng ${payment.total} VNĐ, Tiền Khách Đưa ${payment.moneyGiven} VNĐ, Tiền Trả Lại ${payment.changeDue} VNĐ, Tiền Còn Nợ ${payment.amountDue} VNĐ, Ngày: ${payment.date}`;
    historyList.appendChild(listItem);
  });
}

// Cập nhật lịch sử thanh toán khi trang tải
window.onload = updatePaymentHistory;
