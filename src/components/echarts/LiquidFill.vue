<template>
  <div style="width: 400px;height: 400px;background:#240046;">
    <v-chart
      :option="option"
      :init-options="initOptions"
      ref="chart"
      autoresize
    />
    <!-- theme="ovilia-green" -->
    <!-- @zr:click="handleZrClick"
      @click="handleClick" -->
    <!-- :loading="barLoading"
      :loadingOptions="barLoadingOptions" -->
  </div>
</template>

<script>
import "echarts-liquidfill";
import VChart from "vue-echarts";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

import {
  use,
} from "echarts/core";

import {
  TitleComponent,
} from "echarts/components";

use([
  TitleComponent,
  SVGRenderer
]);

export default {
  name: "LiquidFill",
  components: {
    VChart,
  },
  data() {
    return {
      initOptions: {
        renderer: "svg",
      },
      option: {
        title: {
          text: "基本水球图",
          textStyle: {
            color: '#fff',
            fontSize: '16px'
          },
          left: 'center',
          bottom: '0'
        },

        series: [
          {
            type: "liquidFill",
            data: [0.6, {value: 0.6, 
              direction: 'left',
              itemStyle: {
              color: 'rgba(145,204,117,0.5)'
            }}],
            // animationDurationUpdate: 100,
            // animationDuration: 800,
            // center: ["50%", "50%"],
            color: ["#91cc75"],
            waveLength: '110%',
            outline: {
              show: true,
              borderDistance: 10,
              itemStyle: {
                borderWidth: 5,
                borderColor: "#91cc75",
                shadowBlur: 10,
                shadowColor: "#fff",
              },
            },
            backgroundStyle: {
              shadowColor: "rgba(0, 0, 0, 0)",
              opacity: 0,
            },

            label: {
              textStyle: {
                color: "#fff",
                fontSize: 28,
              },
            },
          },
        ],
      },
    };
  },
};
</script>
