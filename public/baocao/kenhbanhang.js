function toggleDateInputs(value) {
    const dateInputs = document.getElementById('dateInputs');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    if (value === 'custom') {
        dateInputs.style.display = 'block';

        // Focus on the first date input when it's displayed
        startDate.focus();

        // Add event listeners to open the date picker when inputs are clicked
        startDate.addEventListener('click', () => startDate.showPicker());
        endDate.addEventListener('click', () => endDate.showPicker());
    } else {
        dateInputs.style.display = 'none';
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Elements for the slices
    const pieSlices = document.querySelectorAll('.pie-slice');
    const labels = document.querySelectorAll('.label');

    // Data for the slices (could be dynamically loaded from a backend)
    const data = {
        slice1: {
            value: '860k',
            percentage: 70,  // Percent for Direct Sales
            color: '#4a90e2'
        },
        slice2: {
            value: '260k',
            percentage: 30,  // Percent for Online Sales
            color: '#50e3c2'
        }
    };

    // Update the pie chart dynamically based on the data
    function updateChart() {
        const total = data.slice1.percentage + data.slice2.percentage;
        
        // Set background with conic gradient for pie chart
        const pieChart = document.querySelector('.pie-chart');
        pieChart.style.background = `conic-gradient(
            ${data.slice1.color} 0% ${data.slice1.percentage}%, 
            ${data.slice2.color} ${data.slice1.percentage}% ${total}%
        )`;
    }

    // Update the labels on the slices
    function updateLabels() {
        labels[0].textContent = data.slice1.value;
        labels[1].textContent = data.slice2.value;
    }

    // Hover event listeners for each slice
    pieSlices.forEach(slice => {
        slice.addEventListener('mouseenter', function() {
            // On hover, enlarge the slice and show the label
            slice.style.transform = "scale(1.1)";
            slice.querySelector('.label').style.opacity = 1;
        });

        slice.addEventListener('mouseleave', function() {
            // Reset the hover effect on mouse leave
            slice.style.transform = "scale(1)";
            slice.querySelector('.label').style.opacity = 0;
        });
    });

    // Initial chart setup
    updateChart();
    updateLabels();
});
