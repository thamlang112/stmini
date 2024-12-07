const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Đọc dữ liệu từ các file JSON
const dataPath = (file) => path.join(__dirname, "data", file);

// API để lấy danh sách sản phẩm
app.get("/api/products", (req, res) => {
  fs.readFile(dataPath("products.json"), "utf8", (err, data) => {
    if (err)
      return res.status(500).send({ error: "Không thể đọc dữ liệu sản phẩm" });
    res.json(JSON.parse(data));
  });
});

// API để lấy danh sách nhân viên
app.get("/api/employees", (req, res) => {
  fs.readFile(dataPath("employees.json"), "utf8", (err, data) => {
    if (err)
      return res.status(500).send({ error: "Không thể đọc dữ liệu nhân viên" });
    res.json(JSON.parse(data));
  });
});

// API để thêm đơn hàng
app.post("/api/sales", (req, res) => {
  const newSale = req.body;
  fs.readFile(dataPath("sales.json"), "utf8", (err, data) => {
    if (err)
      return res.status(500).send({ error: "Không thể đọc dữ liệu đơn hàng" });
    const sales = JSON.parse(data);
    sales.push(newSale);
    fs.writeFile(dataPath("sales.json"), JSON.stringify(sales), (err) => {
      if (err)
        return res
          .status(500)
          .send({ error: "Không thể ghi dữ liệu đơn hàng" });
      res.status(201).send(newSale);
    });
  });
});

// API để thêm nhân viên
app.post("/api/employees", (req, res) => {
  const newEmployee = req.body;
  fs.readFile(dataPath("employees.json"), "utf8", (err, data) => {
    if (err)
      return res.status(500).send({ error: "Không thể đọc dữ liệu nhân viên" });
    const employees = JSON.parse(data);
    employees.push(newEmployee);
    fs.writeFile(
      dataPath("employees.json"),
      JSON.stringify(employees),
      (err) => {
        if (err)
          return res
            .status(500)
            .send({ error: "Không thể ghi dữ liệu nhân viên" });
        res.status(201).send(newEmployee);
      }
    );
  });
});

// API để thêm hàng hóa vào kho
app.post("/api/inventory", (req, res) => {
  const newItem = req.body;
  // Tương tự như cách thêm nhân viên hoặc đơn hàng
  fs.readFile(dataPath("inventory.json"), "utf8", (err, data) => {
    if (err)
      return res.status(500).send({ error: "Không thể đọc dữ liệu kho" });
    const inventory = JSON.parse(data);
    inventory.push(newItem);
    fs.writeFile(
      dataPath("inventory.json"),
      JSON.stringify(inventory),
      (err) => {
        if (err)
          return res.status(500).send({ error: "Không thể ghi dữ liệu kho" });
        res.status(201).send(newItem);
      }
    );
  });
});

// API để tính lương
app.post("/api/salary", (req, res) => {
  const { employeeId, workingDays } = req.body;

  // Giả định lương cơ bản
  const salaryPerDay = 100; // Lương cơ bản mỗi ngày
  const salary = salaryPerDay * workingDays;

  res.send({ employeeId, salary });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
