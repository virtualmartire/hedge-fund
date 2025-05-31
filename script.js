// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data
    fetch('data.json')
        .then(response => {
            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the data and create the pie chart
            createPieChart(data.quota);
            
            // Create time series chart with random data
            createTimeSeriesChart();
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            document.querySelectorAll('.chart-container').forEach(container => {
                container.innerHTML = '<p class="error">Error loading chart data. Please try again later.</p>';
            });
        });
});

// Function to create the pie chart using Chart.js
function createPieChart(quotaData) {
    // Extract nicknames, values, and colors from the data
    const labels = quotaData.map(item => item.nickname);
    const values = quotaData.map(item => item.value);
    const colors = quotaData.map(item => item.color);
    
    // Get the canvas element
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    // Create the pie chart with light luxury styling (no animation)
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 2,
                hoverOffset: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '5%',
            plugins: {
                legend: {
                    position: 'bottom',
                    onClick: null, // Disable legend item click events
                    labels: {
                        color: '#333333',
                        font: {
                            family: "'Montserrat', sans-serif",
                            size: 12,
                            weight: 600
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#8a6d3b',
                    bodyColor: '#333333',
                    bodyFont: {
                        family: "'Montserrat', sans-serif",
                        weight: 400
                    },
                    titleFont: {
                        family: "'Playfair Display', serif",
                        weight: 700
                    },
                    borderColor: '#8a6d3b',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}%`;
                        },
                        title: function(context) {
                            return 'Allocation';
                        }
                    }
                }
            },
            animation: false // Disable animations
        }
    });
}

// Function to create the time series chart using Chart.js
function createTimeSeriesChart() {
    // Generate time series data from April 2021 to past month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Generate random performance data with a general upward trend
    const generateRandomData = (count, min, max, trend = 0.5) => {
        const data = [];
        let value = min + Math.random() * (max - min) / 2;
        
        for (let i = 0; i < count; i++) {
            // Add some randomness but maintain the trend
            const randomFactor = Math.random() * 2 - 1; // Between -1 and 1
            const trendFactor = Math.random() * trend; // Positive trend
            
            value = value + (randomFactor * (max - min) * 0.05) + trendFactor;
            
            // Keep within bounds
            value = Math.max(min, Math.min(max, value));
            data.push(value);
        }
        
        return data;
    };
    
    // Calculate number of months from April 2021 to past month
    const startDate = new Date(2021, 3, 1); // April 2021 (months are 0-indexed)
    const endDate = new Date(currentYear, currentMonth - 1, 1); // Past month
    const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
    
    // Generate data for the fund
    const fundData = generateRandomData(monthDiff, 95, 115, 0.7);
    
    // Generate labels from April 2021 to past month
    const labels = [];
    for (let i = 0; i < monthDiff; i++) {
        const monthIndex = (startDate.getMonth() + i) % 12;
        const year = startDate.getFullYear() + Math.floor((startDate.getMonth() + i) / 12);
        labels.push(months[monthIndex] + ' ' + year);
    }
    
    // Get the canvas element
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');
    
    // Create the time series chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Fund Performance',
                    data: fundData,
                    borderColor: '#8a6d3b',
                    backgroundColor: 'rgba(138, 109, 59, 0.1)',
                    borderWidth: 1,
                    pointRadius: 2,
                    pointBackgroundColor: '#8a6d3b',
                    fill: true,
                    tension: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false // Disable tooltips completely
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#333333',
                        font: {
                            family: "'Montserrat', sans-serif",
                            size: 10
                        },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        display: false // Hide y-axis labels
                    },
                    min: 90,
                    max: 120
                }
            },
            animation: false // Disable animations
        }
    });
}
