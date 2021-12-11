<template>
  <div style="width: 400px;height: 400px;background:#240046;">
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
import { LineChart, LinesChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
} from "echarts/components";

use([
  LineChart,
  GridComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  LinesChart,
]);

export default {
  name: "LineChart",
  components: {
    VChart,
  },
  data() {
    const legendData = ["温度", "湿度"];

    return {
      initOptions: {
        renderer: "canvas",
      },
      option: {
        grid: {
          left: "15%",
          bottom: "10%",
        },
        legend: {
          right: '10%',
          top: 20,
          itemWidth: 20,
          itemHeight: 10,
          data: legendData,
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
              onZero: false
            },
            axisLabel: {
              color: "red",
            },
            data: new Array(3).fill(0).map((item, i) => `${i + 1}月`),
          },
        ],
        yAxis: [
          {
            name: "温度(℃)/湿度(%)",
            nameTextStyle: {
              color: "#fff",
            },
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            max: 100,
          },
        ],
        series: legendData.map((item, i) => {
          return {
            name: item,
            type: "line",
            stack: "envir",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color:
                i === 0
                  ? {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(128, 255, 165)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(1, 191, 236)", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    }
                  : {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(255, 191, 0)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(224, 62, 76)", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
            },
            data: [-20 + i, 32 + i, 10 + i],
          };
        }),
      },
    };
  },
};
</script>
