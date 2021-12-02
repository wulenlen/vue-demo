<template>
  <div
    class="main-content"
    ref="analysisMapContent"
    @mousedown.left.stop="onDragStart($event)"
    @mousewheel="mouseListener"
  >
    <div
      class="analysis-svg-wrapper"
      ref="analysisSvgWrapRef"
      :style="canvasSizeAndPosition"
    >
      <div class="svg-content" :id="svgId"></div>

      <div v-if="hasMoreResult" class="result-wrapper" ref="resultWrapRef">
        <div class="fish-head" :style="{ top: yOrigin + 'px' }">
          <p>{{ mapData.title }}</p>
        </div>
        <div
          class="result-item"
          v-for="{ result, x, width } in results"
          :key="result"
          :style="{ left: x + width + 'px', top: yOrigin + 'px' }"
        >
          <p>{{ result }}</p>
        </div>
      </div>
    </div>

    <scale-group
      v-model="graphSetting.canvasZoom"
      :step="scaleStep"
      :minScaleNum="minScaleNum"
      :maxScaleNum="maxScaleNum"
    />
  </div>
</template>

<script>
import { dfs, tree2Array, startDrag } from "../../utils/utils";
import SVG from "svg.js";
import ScaleGroup from "../caseInfoComp/ScaleGroup.vue";
import screenfull from "screenfull";

export default {
  components: { ScaleGroup },
  name: "AnalysisSvg",
  props: {
    svgId: String,
    hasMoreResult: {
      type: Boolean,
      default: false,
    },
    dragClass: String,
    mapData: Object,
  },
  data() {
    return {
      xOrigin: 0,
      yOrigin: 0,
      nextXOrigin: 0,
      data: null,
      svgDraw: null,
      disX: 12,
      disY: 20,
      origin: [0, 0],
      results: null,
      scaleNum: 10,
      nodes: null,
      mainContentWidth: 0,
      mainContentRect: {},
      tailX: 0,
      minScaleNum: 60,
      maxScaleNum: 180,
      scaleStep: 20,
      graphSetting: {
        canvasZoom: 100,
        viewELSize: { width: 1300, height: 800, left: 0, top: 100 },
        viewNVInfo: { width: 1300, height: 800, x: 0, y: 100 },
        canvasNVInfo: { width: 1300, height: 800, x: 0, y: 100 },
        canvasSize: {
          width: 2000,
          height: 2000,
        },
        canvasOffset: {
          x: 0,
          y: 0,
          zoom_buff_x: 0,
          zoom_buff_y: 0,
        },
      },
      zoomCenter_of_newSize: { x: 0, y: 0 },
      currentZoomSet: null,
      newZoomSet: null,
    };
  },
  computed: {
    canvasSizeAndPosition() {
      return {
        width: this.graphSetting.canvasSize.width + "px",
        height: this.graphSetting.canvasSize.height + "px",
        "margin-left": this.graphSetting.canvasOffset.x + "px",
        "margin-top": this.graphSetting.canvasOffset.y + "px",
        transform:
          //   `translate(${-2048 + this.mainContentWidth}px, ${-820}px)` +
          "scale(" +
          this.graphSetting.canvasZoom / 100 +
          "," +
          this.graphSetting.canvasZoom / 100 +
          ")",
        // 'transform-origin': (this.graphSetting.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.graphSetting.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
      };
    },
  },
  watch: {
    mapData(val) {
      this.data = val;

      if (this.hasMoreResult) {
        let newArr = [];

        this.data.children.forEach((item) => {
          const children = item.children || [],
            len = children.length;

          const arr1 = children.slice(0, Math.ceil(len / 2)),
            arr2 = children.slice(Math.ceil(len / 2));

          newArr.push(
            { ...item, children: arr1, up: true },
            { ...item, children: arr2, up: false }
          );
        });
        this.data = { ...this.data, children: newArr };
      }

      dfs(this.data, true);

      this.start();
    },
  },
  mounted() {
    const wrapperDom = this.$refs.analysisSvgWrapRef,
      { height, width } = wrapperDom.getBoundingClientRect();

    this.disabledMouseWheel();
    this.mainContentRect =
      this.$refs.analysisMapContent.getBoundingClientRect();
    this.mainContentWidth = this.mainContentRect.width;
    this.graphSetting.canvasOffset.x = -2048 + this.mainContentWidth;
    this.graphSetting.canvasOffset.y = -1000 + 550 / 2;

    this.data = this.mapData;

    this.yOrigin = Math.ceil(height / 2);
    this.nextXOrigin = this.xOrigin = width - (this.hasMoreResult ? 200 : 100);
    this.origin = [width, this.yOrigin];
    this.tailX = 2000 - this.mainContentWidth + 60;

    this.svgDraw = SVG(this.svgId).size(width, height).nested();
    this.svgDraw
      .line(this.tailX, this.yOrigin, width, this.yOrigin)
      .stroke({ width: 2, color: "#e8e8e8" });

    if (this.data) {
      if (this.hasMoreResult) {
        let newArr = [];

        this.data.children.forEach((item) => {
          const children = item.children || [],
            len = children.length;

          const arr1 = children.slice(0, Math.ceil(len / 2)),
            arr2 = children.slice(Math.ceil(len / 2));

          newArr.push(
            { ...item, children: arr1, up: true },
            { ...item, children: arr2, up: false }
          );
        });
        this.data = { ...this.data, children: newArr };
      }

      dfs(this.data, true);

      this.start();
    }
  },
  methods: {
    onFullScreen() {
      // this.fullscreen = !this.fullscreen
      screenfull.toggle(this.$refs.analysisMapContent);
    },
    disabledMouseWheel() {
      var div = this.$refs.analysisMapContent;

      if (div.addEventListener) {
        div.addEventListener("DOMMouseScroll", this.scrollFunc, false);
      }

      div.onmousewheel = div.onmousewheel = this.scrollFunc;
    },

    scrollFunc(evt) {
      evt = evt || window.event;

      if (evt.preventDefault) {
        // Firefox

        evt.preventDefault();

        evt.stopPropagation();
      } else {
        // IE

        evt.cancelBubble = true;

        evt.returnValue = false;
      }

      return false;
    },
    computeX(item, side) {
      const levelObj = dfs(item, false),
        levels = Object.keys(levelObj);

      let nextXOrigin = this.nextXOrigin;
      const xOrigin = side === "down" ? this.xOrigin : this.nextXOrigin;

      levels.forEach((key) => {
        levelObj[key].forEach((node) => {
          const nodePWidth = node.parent?.xDis || 0,
            children = node.parent.children,
            len = children.length,
            linkDis = len > 1 ? 80 : 60;

          if (node.depth === 2) {
            node.x = xOrigin - nodePWidth / 2 - node.width - linkDis;
            node.xDis = nodePWidth / 2 + node.width + linkDis;
          } else {
            node.x = xOrigin - nodePWidth - node.width - linkDis;
            node.xDis = nodePWidth + node.width + linkDis;
          }

          nextXOrigin = nextXOrigin > node.x ? node.x : nextXOrigin;
        });
      });

      this.nextXOrigin = nextXOrigin;
      nextXOrigin < this.tailX &&
        this.svgDraw
          .line(nextXOrigin - 100, this.yOrigin, this.tailX, this.yOrigin)
          .stroke({ width: 2, color: "#e8e8e8" });

      if (side === "down") {
        this.xOrigin = nextXOrigin;
      }
    },
    computeY(item, links, disY, side) {
      let nodes = [],
        disIdx = 0;

      tree2Array(item, (node) => nodes.push(node));

      const flag = side === "down" ? -1 : 1;

      nodes.reverse().forEach((node, i) => {
        const children = node.children || [],
          childLen = children.length;

        if (children.length === 1 && node.depth > 1) {
          node.y = children[0]?.y;
          disIdx += 1;
        } else if (childLen > 1) {
          const dis = Math.abs((children[0].y - children[childLen - 1].y) / 2);
          node.y = children[flag === -1 ? childLen - 1 : 0].y + dis;
          disIdx += childLen / 2;
        } else {
          node.y =
            this.yOrigin -
            ((i - disIdx) * 30 + disY + (flag === -1 ? 0 : node.height)) * flag;
        }

        if (node.depth === 1) {
          node.y =
            (children[0]?.y || this.yOrigin - (node.height + disY) * flag) -
            40 * flag;
        }

        node.depth !== 1 &&
          this.svgDraw.text(node.title).attr({ x: node.x, y: node.y });

        this.setLinks(node, children, links, side);
      });

      return nodes;
    },
    setLinks(node, children, links, side) {
      const { x: nodeX, y: nodeY, width: nodeW, height: nodeH } = node;
      const childLen = children.length;

      children.forEach((child) => {
        const { x: childX, y: childY, width: childW } = child;

        if (child.depth === 2) {
          links.push({
            x: nodeX + nodeW / 2,
            y: nodeY + (side === "down" ? 0 : nodeH),
            x1: nodeX + nodeW,
            y1: this.yOrigin,
          });
          if (side === "down") {
            links.push({
              x:
                (nodeW * (childY + 15 - nodeY)) / (2 * (this.yOrigin - nodeY)) +
                nodeX +
                nodeW / 2,
              y: childY + 15,
              x1: childX + childW + this.disX,
              y1: childY + 15,
            });
          } else {
            links.push({
              x:
                ((childY + 15 + this.yOrigin) / 2 - nodeY - nodeH) *
                  (nodeW / (this.yOrigin - nodeH - nodeY)) +
                nodeX,
              y: childY + 15,
              x1: childX + childW + this.disX,
              y1: childY + 15,
            });
          }
        } else {
          // childLen === 1 ?
          //     links.push({x: nodeX - this.disX, y: nodeY + 15, x1: childX + childW + this.disX, y1: childY + 15})
          //     :
          links.push({
            x: nodeX - this.disX,
            y: nodeY + 15,
            x1: childX + childW + this.disX,
            y1: childY + 15,
          });
        }
      });

      if (node.depth === 1 && childLen < 1) {
        links.push({
          x: nodeX + nodeW / 2,
          y: nodeY + nodeH,
          x1: nodeX + nodeW,
          y1: this.yOrigin,
        });
      }
    },
    start() {
      const links = [];
      const rootChildren = [...this.data.children];
      const nodes = [];

      rootChildren.forEach((item, i) => {
        const disY = item.resultHeight / 2 + this.disY;

        if (i % 2 === 0) {
          this.computeX(item);
          nodes.push(...this.computeY(item, links, disY));
        } else {
          this.computeX(item, "down");
          nodes.push(...this.computeY(item, links, disY, "down"));
        }
      });

      this.nodes = nodes.filter((item) => item.depth !== 1);

      links.forEach((link) => {
        this.svgDraw
          .line(link.x, link.y, link.x1, link.y1)
          .stroke({ width: 2, color: "#e8e8e8" });
      });

      rootChildren.forEach((node) => {
        this.svgDraw.rect(98, 36).attr({
          x: node.x - (98 - node.width) / 2,
          y: node.y - 2,
          fill: "#d5e1f5",
          stroke: "#2B6BCF",
          strokeWidth: 2,
        });
        this.svgDraw
          .text(node.title)
          .attr({ x: node.x, y: node.y, fill: "#2B6BCF" });
      });

      this.hasMoreResult &&
        (this.results = rootChildren.filter((item) => item.up));

      if (!this.hasMoreResult) {
        const [originX, originY] = this.origin;
        const headWidth = this.data.width + 20 || 93;
        this.svgDraw
          .polyline(
            `${originX - headWidth},${originY - 20} ${originX - 16},${
              originY - 20
            } ${originX},${originY} ${originX - 16},${originY + 20} ${
              originX - headWidth
            },${originY + 20}`
          )
          .fill("#2B6BCF");
        this.svgDraw.text(this.data.title).attr({
          x: originX - headWidth + 4,
          y: originY - this.data.height + 4,
          fill: "#fff",
        });
      }

      const tailX =
        this.nextXOrigin < this.tailX ? this.nextXOrigin - 80 : this.tailX + 20;
      this.svgDraw
        .line(tailX - 20, this.yOrigin, tailX - 40, this.yOrigin - 20)
        .stroke({ width: 2, color: "#e8e8e8" });
      this.svgDraw
        .line(tailX - 20, this.yOrigin, tailX - 40, this.yOrigin + 20)
        .stroke({ width: 2, color: "#e8e8e8" });
    },
    onDragStart(e) {
      startDrag(e, this.graphSetting.canvasOffset, this.onDragEnd);
    },
    onDragEnd() {
      this.refreshNVAnalysisInfo();
    },
    mouseListener(e) {
      try {
        e.cancelBubble = true;
        e.preventDefault();
        e.stopPropagation();
      } catch (e) {
        // xxx
      }

      var userZoomCenter = {
        x: e.clientX,
        y: e.clientY,
      };
      // console.log('---- center:', userZoomCenter.x, userZoomCenter.y)
      var _isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      var _deltaY = e.deltaY;
      if (_deltaY === undefined) {
        _deltaY = e.wheelDelta;
      }
      // console.log('mouseListenerEmpty:', _isMac, e.deltaY, e.wheelDelta, e.which, e.detail)
      var _zoomDirection = _isMac ? 1 : -1;
      if (_deltaY > 0) {
        this.zoom(5 * _zoomDirection, userZoomCenter);
      } else {
        this.zoom(-5 * _zoomDirection, userZoomCenter);
      }
    },
    zoom(buff, userZoomCenter) {
      if (
        this.graphSetting.canvasZoom + buff < this.minScaleNum ||
        this.graphSetting.canvasZoom + buff > this.maxScaleNum
      ) {
        return;
      }
      var __new_zoom_value = this.graphSetting.canvasZoom + buff;
      var zoomCenter = this.showZoomCenter(userZoomCenter, buff);

      this.graphSetting.canvasOffset.x += zoomCenter.buff_x;
      this.graphSetting.canvasOffset.y += zoomCenter.buff_y;
      this.graphSetting.canvasZoom = __new_zoom_value;
      this.refreshNVAnalysisInfo();
    },
    showZoomCenter(userZoomCenter, zoomBuff) {
      if (!this.$refs.analysisMapContent) {
        return;
      }
      var _current_zoom = this.graphSetting.canvasZoom / 100;
      var _new_zoom = (this.graphSetting.canvasZoom + zoomBuff) / 100;
      this.currentZoomSet = this.analysisByZoom(_current_zoom, userZoomCenter);
      this.newZoomSet = this.analysisByZoom(_new_zoom, userZoomCenter);
      // console.log('this.currentZoomSet:', this.currentZoomSet)
      // console.log('this.currentZoomSet:', this.newZoomSet)
      const a = _new_zoom / _current_zoom;
      const b = 0;
      const c = 0;
      const d = _new_zoom / _current_zoom;
      var e = 0;
      var f = 0;
      this.zoomCenter_of_newSize.x =
        a * this.currentZoomSet.NMViewBuff.x +
        c * this.currentZoomSet.NMViewBuff.y +
        e;
      this.zoomCenter_of_newSize.y =
        b * this.currentZoomSet.NMViewBuff.x +
        d * this.currentZoomSet.NMViewBuff.y +
        f;
      var buff_x =
        this.currentZoomSet.NMViewBuff.x - this.zoomCenter_of_newSize.x;
      var buff_y =
        this.currentZoomSet.NMViewBuff.y - this.zoomCenter_of_newSize.y;
      this.zoomCenter_of_newSize.x += this.currentZoomSet.NMCanvasCenter.x;
      this.zoomCenter_of_newSize.y += this.currentZoomSet.NMCanvasCenter.y;
      // e = this.currentZoomSet.NMViewBuff.x
      // f = this.currentZoomSet.NMViewBuff.y
      // new start
      var old_x =
        this.currentZoomSet.NMCanvasStart.x -
        this.currentZoomSet.NMCanvasCenter.x;
      var old_y =
        this.currentZoomSet.NMCanvasStart.y -
        this.currentZoomSet.NMCanvasCenter.y;
      var new_x = a * old_x + c * old_y + e;
      var new_y = b * old_x + d * old_y + f;
      this.newZoomSet.NMCanvasStart.x =
        buff_x + this.currentZoomSet.NMCanvasCenter.x + new_x;
      this.newZoomSet.NMCanvasStart.y =
        buff_x + this.currentZoomSet.NMCanvasCenter.y + new_y;
      // new end
      old_x =
        this.currentZoomSet.NMCanvasEnd.x -
        this.currentZoomSet.NMCanvasCenter.x;
      old_y =
        this.currentZoomSet.NMCanvasEnd.y -
        this.currentZoomSet.NMCanvasCenter.y;
      new_x = a * old_x + c * old_y + e;
      new_y = b * old_x + d * old_y + f;
      this.newZoomSet.NMCanvasEnd.x =
        buff_x + this.currentZoomSet.NMCanvasCenter.x + new_x;
      this.newZoomSet.NMCanvasEnd.y =
        buff_x + this.currentZoomSet.NMCanvasCenter.y + new_y;
      this.currentZoomSet.NMCanvasOffsetBuff.x = buff_x;
      this.currentZoomSet.NMCanvasOffsetBuff.y = buff_y;
      // this.isShowZoomCenter = true
      return {
        buff_x,
        buff_y,
      };
    },
    refreshNVAnalysisInfo() {
      if (!this.$refs.analysisMapContent) {
        console.error("cannot get view size !");
        return;
      }
      // console.log('reanalysis NV info...')
      var result = {
        NMCanvasCenter: { x: 0, y: 0 },
      };
      var _view_info = this.$refs.analysisMapContent.getBoundingClientRect();
      this.graphSetting.viewNVInfo.x = _view_info.left;
      this.graphSetting.viewNVInfo.y = _view_info.top;
      this.graphSetting.viewNVInfo.width = _view_info.width;
      this.graphSetting.viewNVInfo.height = _view_info.height;
      var _NM_canvas_width =
        this.graphSetting.canvasSize.width *
        (this.graphSetting.canvasZoom / 100);
      var _NM_canvas_height =
        this.graphSetting.canvasSize.height *
        (this.graphSetting.canvasZoom / 100);
      result.NMCanvasCenter.x =
        this.graphSetting.canvasOffset.x +
        this.graphSetting.canvasSize.width / 2;
      result.NMCanvasCenter.y =
        this.graphSetting.canvasOffset.y +
        this.graphSetting.canvasSize.height / 2;
      this.graphSetting.canvasNVInfo.x =
        result.NMCanvasCenter.x - _NM_canvas_width / 2;
      this.graphSetting.canvasNVInfo.y =
        result.NMCanvasCenter.y - _NM_canvas_height / 2;
      this.graphSetting.canvasNVInfo.width = _NM_canvas_width;
      this.graphSetting.canvasNVInfo.height = _NM_canvas_height;
      this.graphSetting.viewELSize.width = _view_info.width;
      this.graphSetting.viewELSize.height = _view_info.height;
      this.graphSetting.viewELSize.left = _view_info.left;
      this.graphSetting.viewELSize.top = _view_info.top;
    },
    analysisByZoom(zoom, userZoomCenter) {
      var result = {
        NMViewPosition: { x: 0, y: 0 },
        NMViewCenter: { x: 0, y: 0 },
        NMCanvasCenter: { x: 0, y: 0 },
        NMCanvasStart: { x: 0, y: 0 },
        NMCanvasEnd: { x: 0, y: 0 },
        NMZoomCenter: { x: 0, y: 0 },
        NMViewBuff: { x: 0, y: 0 },
        NMCanvasOffsetBuff: { x: 0, y: 0 },
        NMCanvasSize: { width: 0, height: 0 },
      };
      const windowWidth = this.getWindowWidth();
      const windowHeight = this.getWindowHeight();

      var _view_info = this.$refs.analysisMapContent.getBoundingClientRect();
      result.NMViewPosition.x = _view_info.left;
      result.NMViewPosition.y = _view_info.top;
      if (_view_info.width + result.NMViewPosition.x > windowWidth) {
        result.NMViewCenter.x = (windowWidth - _view_info.left) / 2;
      } else {
        result.NMViewCenter.x = _view_info.width / 2;
      }
      if (_view_info.height + result.NMViewPosition.y > windowHeight) {
        result.NMViewCenter.y = (windowHeight - _view_info.top) / 2;
      } else {
        result.NMViewCenter.y = _view_info.height / 2;
      }
      var _NM_canvas_width = this.graphSetting.canvasSize.width * zoom;
      var _NM_canvas_height = this.graphSetting.canvasSize.height * zoom;
      result.NMCanvasCenter.x =
        this.graphSetting.canvasOffset.x +
        this.graphSetting.canvasSize.width / 2; // + (this.graphSetting.canvasOffset.zoom_buff_x * _NM_canvas_width)
      result.NMCanvasCenter.y =
        this.graphSetting.canvasOffset.y +
        this.graphSetting.canvasSize.height / 2; // + (this.graphSetting.canvasOffset.zoom_buff_y * _NM_canvas_height)
      result.NMCanvasStart.x = result.NMCanvasCenter.x - _NM_canvas_width / 2;
      result.NMCanvasStart.y = result.NMCanvasCenter.y - _NM_canvas_height / 2;
      result.NMCanvasEnd.x = result.NMCanvasCenter.x + _NM_canvas_width / 2;
      result.NMCanvasEnd.y = result.NMCanvasCenter.y + _NM_canvas_height / 2;
      result.NMZoomCenter.x = result.NMViewCenter.x;
      result.NMZoomCenter.y = result.NMViewCenter.y;
      if (userZoomCenter) {
        result.NMZoomCenter.x = userZoomCenter.x - result.NMViewPosition.x;
        result.NMZoomCenter.y = userZoomCenter.y - result.NMViewPosition.y;
      }
      var _NM_buff_x = result.NMViewCenter.x - result.NMCanvasCenter.x;
      var _NM_buff_y = result.NMViewCenter.y - result.NMCanvasCenter.y;
      if (userZoomCenter) {
        _NM_buff_x = result.NMZoomCenter.x - result.NMCanvasCenter.x;
        _NM_buff_y = result.NMZoomCenter.y - result.NMCanvasCenter.y;
      }
      result.NMViewBuff.x = _NM_buff_x;
      result.NMViewBuff.y = _NM_buff_y;
      result.NMCanvasSize.width = _NM_canvas_width;
      result.NMCanvasSize.height = _NM_canvas_height;
      return result;
    },
    getWindowWidth() {
      return window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
    },
    getWindowHeight() {
      return window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;
    },
  },
};
</script>

<style lang="less" scoped>
.main-content {
  height: 550px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #fff !important;
  cursor: move;
  cursor: grab;
  cursor: -webkit-grab;
  cursor: -moz-grab;
}
.analysis-svg-wrapper {
  width: 2000px;
  height: 2000px;
  position: relative;
  // overflow: hidden;
  font-size: 14px !important;

  .map-main {
    position: relative;
  }

  touch-action: none;
  user-select: none;

  .node {
    position: absolute;
  }

  .result-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .fish-head {
      position: absolute;
      right: 0;
      transform: translate(0, -50%);
      max-width: 140px;
      color: #2b6bcf;
      padding: 13px 18px 13px 8px;
      background: currentColor;
      word-break: break-all;
      text-align: justify;

      &::after {
        content: "";
        width: 20px;
        height: calc(100% + 6px);
        background-image: linear-gradient(
            to left bottom,
            #fff 49%,
            transparent 50%
          ),
          linear-gradient(to left top, #fff 49%, transparent 50%);
        position: absolute;
        right: -2px;
        top: -3px;
      }

      p {
        color: #fff;
      }
    }

    .result-item {
      position: absolute;
      width: 98px;
      color: #2b6bcf;
      padding: 3px 6px;
      background: #d5e1f5;
      border: 1px solid;
      transform: translate(-50%, -50%);
      word-break: break-all;
      font-size: 12px;

      p {
        line-height: 1.5;
      }
    }
  }
}
</style>
