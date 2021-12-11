<template>
  <div id="app">
    <!-- <scale /> -->
    <!-- <liquid-fill /> -->
    <!-- <bar-chart /> -->
    <!-- <line-chart /> -->
    <pie-chart />
    <!-- <vertical-swiper :data="new Array(10)" /> -->
  </div>
</template>

<script>
import BarChart from './components/echarts/BarChart.vue'
import LineChart from './components/echarts/LineChart.vue'
import LiquidFill from './components/echarts/LiquidFill.vue'
import PieChart from './components/echarts/PieChart.vue'
import Scale from './components/Scale.vue'
import VerticalSwiper from './components/swiper/VerticalSwiper.vue'

export default {
  name: 'App',
  components: {
    Scale,
    LiquidFill,
    VerticalSwiper,
    BarChart,
    LineChart,
    PieChart
  },
  mounted() {

  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
