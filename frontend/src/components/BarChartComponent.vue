<template>
  <canvas ref="myChart"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Attendence",
            backgroundColor: "rgba(144,238,144 , 0.9 )",
            data: this.chartData,
          },
        ],
      },
      options: {
          scales: {
            y: { 
                suggestedMin: 0,
                suggestedMax: 20
            }
          }
      }
    });
  },
};
</script>