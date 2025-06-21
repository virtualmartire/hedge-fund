<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  quota: {
    type: Array,
    required: true
  }
});

const canvas = ref(null);
let chartInstance = null;

function renderChart() {
  if (chartInstance) {
    chartInstance.destroy();
  }
  if (!props.quota.length) return;
  chartInstance = new Chart(canvas.value, {
    type: 'pie',
    data: {
      labels: props.quota.map(q => q.nickname),
      datasets: [{
        data: props.quota.map(q => q.value),
        backgroundColor: props.quota.map(q => q.color),
        borderWidth: 1
      }]
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          onClick: null,
          labels: { color: '#222', boxWidth: 16 }
        },
        tooltip: { enabled: false }
      }
    }
  });
}

onMounted(() => {
  nextTick(renderChart);
});

watch(() => props.quota, renderChart, { deep: true });
</script>

<style scoped>
canvas {
  max-width: 400px;
  margin: 2rem auto;
  display: block;
}
</style>
