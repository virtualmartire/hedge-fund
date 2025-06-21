<template>
  <div class="timeseries-chart-wrapper">
    <canvas ref="canvas" class="timeseries-canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import Chart from 'chart.js/auto';

const canvas = ref(null);
let chartInstance = null;

function randomData(len, min, max) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function renderChart() {
  const chartColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-1').trim();

  if (!chartColor) {
    setTimeout(renderChart, 50);
    return;
  }

  if (chartInstance) chartInstance.destroy();
  const labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
  chartInstance = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Fund',
          data: randomData(12, 90, 120),
          borderColor: chartColor,
          fill: false
        }
      ]
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: { enabled: false }
      }
    }
  });
} 

onMounted(() => {
  nextTick(renderChart);
});
</script>

<style scoped>
.timeseries-chart-wrapper {
  width: 100%;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeseries-canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
