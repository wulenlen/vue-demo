<template>
  <div class="hello">
    <ButterflyVue :baseCanvas="baseCanvas" :canvasData="mindMapData" :canvasConf="{
        disLinkable: false, // 可删除连线
        linkable: false, // 可连线
        draggable: false, // 可拖动
        zoomable: true, // 可放大
        moveable: true, // 可平移
        theme: {
          edge: {
            // arrow: true,
            // type: 'Straight',
            shapeType: 'AdvancedBezier',
          }
        },
        layout: {
          type: 'mindmap',
          isFlatNode: true,
          options: {
            direction: 'H',
            getSide(d) {
              return d.data.side || 'right';
            },
            getHeight(d) {
              return 10;
            },
            getWidth(d) {
              return 40;
            },
            getHGap(d) {
              return 50;
            },
            getVGap(d) {
              return 20;
            },
          }
        }
    }"
    />
  </div>
</template>

<script>
import { ButterflyVue } from "butterfly-vue";
import { TreeCanvas } from 'butterfly-dag';
import mockData from "./mockData.js";
import endpointNode from './CustomEndPoint'
import mindMapData from './mindMap/mockData'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    ButterflyVue,
  },
  data() {
    return {
      baseCanvas: TreeCanvas,
      mockData,
      mindMapData,
      graphData: {
        groups: [],
        nodes: [
          {
            id: '0',
            left: 300,
            top: 10,
            render: endpointNode,
            endpoints: [{
              id: '1',
              orientation: [1, 0],
              pos: [0, 0.5]
            }]
          },
          {
            id: '1',
            left: 460,
            top: 10,
            render: endpointNode,
            endpoints: [{
              id: '2',
              orientation: [1, 0],
              pos: [0, 0.5]
            }]
          }
        ],
        edges: [
          {
            id: '0-1',
            sourceNode: '0',
            targetNode: '1',
            source: '1',
            target: '2',
            type: 'endpoint'
          }
        ],
      },
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100%;
  text-align: center;
}

</style>
