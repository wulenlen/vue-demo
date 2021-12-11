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
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  DatasetComponent,
} from "echarts/components";

use([PieChart, GridComponent, LegendComponent, DatasetComponent]);

export default {
  name: "PieChart",
  components: {
    VChart,
  },
  data() {
    const data = [
      { value: 1048, name: "婚后" },
      { value: 735, name: "沙漏发货啦是否哈哈哈好" },
      { value: 580, name: "是多少" },
      { value: 484, name: "发可视对讲" },
      { value: 300, name: "沙漏发货啦是否" },
      { value: 580, name: "奥会计法" },
      { value: 484, name: "沙漏发货啦是" },
      { value: 300, name: "沙漏发货啦是否好" },
      { value: 580, name: "沙漏发货啦是否婚后" },
      { value: 484, name: "沙漏发货啦是否哈哈哈" },
      { value: 300, name: "Video Ads-2" },
      { value: 580, name: "Email-3" },
      { value: 484, name: "Union Ads-3" },
      { value: 300, name: "Video Ads-3" },
    ];
    return {
      initOptions: {
        renderer: "canvas",
      },
      option: {
        legend: {
          width: "40%",
          height: "60%",
          orient: "vertical",
          right: "2%",
          top: "center",
          itemWidth: 18,
          itemHeight: 18,
          itemGap: 14,
          textStyle: {
            color: "#fff",
            align: 'left',
            verticalAlign: 'middle',
            fontSize: 18,
            rich: {
                name: {
                    // color: 'rgba(255,255,255,0.5)',
                    fontSize: 18,
                },
                value: {
                  fontSize: 18,
                },
                w2: {
                  backgroundColor: 'red',
                  width: 164,
                },
                w3: {
                  backgroundColor: 'yellow',
                  width: 146,
                },
                w4: {
                  backgroundColor: 'blue',
                  width: 130,
                },
                w5: {
                  backgroundColor: 'green',
                  width: 110,
                },
                w6: {
                  backgroundColor: 'gray',
                  width: 94,
                },
                w7: {
                  backgroundColor: 'brown',
                  width: 74,
                },
                w8: {
                  backgroundColor: 'black',
                  width: 60,
                },
                w9: {
                  backgroundColor: 'pink',
                  width: 40,
                },
                w10: {
                  backgroundColor: 'purple',
                  width: 20,
                },
                w11: {
                  backgroundColor: 'purple',
                  width: 10,
                },
            },
          },
          formatter: (name) => {
            const item = data.filter((item) => item.name === name)[0];
            return  `{name|${name}}{w${name.length}|}{value${name.length}|${item.value}}`;
          },
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "50%"],
            center: ["16%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            data,
          },
        ],
      },
    };
  },
};
</script>
