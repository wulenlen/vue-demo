<template>
  <div style="width: 800px;height: 400px;background:#240046;">
    <v-chart
      :option="option"
      :init-options="initOptions"
      ref="chart"
      autoresize
    />
  </div>
</template>

<script>
import VChart from "vue-echarts";

import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  GridComponent,
} from "echarts/components";

use([
  BarChart,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  GridComponent,
]);

export default {
  name: "BarChart",
  components: {
    VChart,
  },
  data() {
    const legendData = ["入库", "借调", "归还", "移交"]

    return {
      initOptions: {
        renderer: "canvas",
      },
      option: {
        grid: {
          bottom: '10%',
        },
        legend: {
          right: 160,
          top: 20,
          data: legendData,
          textStyle: {
            color: '#fff'
          },
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              color: 'red'
            },
            data: (new Array(3)).fill(0).map((item, i) => `${i + 1}月`),
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'red'
              }
            },
            max: 1000
          },
        ],
        series: legendData.map((item, i) => ({
          name: item,
          type: 'bar',
          barGap: 0.2,
          data: [320 + i, 332 + i, 301 + i]
        })),
      },
    };
  },
};
</script>
