document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const mainContent = document.getElementById("mainContent");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetFile = button.getAttribute("data-tab");

      fetch(targetFile)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          mainContent.innerHTML = data;
        })
        .catch((error) => {
          console.error("Error loading the page:", error);
          mainContent.innerHTML =
            "<p>Không thể tải nội dung. Vui lòng thử lại.</p>";
        });
    });
  });
});
