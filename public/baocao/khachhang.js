// Hàm để thay đổi giữa Biểu đồ và Báo cáo
function toggleDisplay(type) {
    var chartContent = document.getElementById('chart-content');
    var reportContent = document.getElementById('report-content');

    if (type === 'chart') {
        chartContent.style.display = 'block';
        reportContent.style.display = 'none';
    } else if (type === 'report') {
        chartContent.style.display = 'none';
        reportContent.style.display = 'block';
    }
}
// Hiển thị giá trị của mỗi thanh cột khi hover
document.querySelectorAll('.bar').forEach(function(bar) {
    bar.addEventListener('mouseenter', function() {
        var value = bar.getAttribute('data-value');
        var tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerText = value;
        bar.appendChild(tooltip);
    });

    bar.addEventListener('mouseleave', function() {
        var tooltip = bar.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});
// Hàm để tính toán chiều rộng cột dựa trên giá trị data-value
window.onload = function() {
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        const numericValue = parseInt(value.replace('k', '')) * 1000;  // Chuyển đổi 'k' thành giá trị số
        const maxValue = 500000;  // Giá trị tối đa (có thể thay đổi tùy theo dữ liệu của bạn)
        
        // Tính toán chiều rộng dựa trên giá trị dữ liệu
        const width = (numericValue / maxValue) * 100;  // Đo chiều rộng theo phần trăm

        // Cập nhật chiều rộng của cột
        bar.style.width = width + '%';
    });
};