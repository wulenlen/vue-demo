<template>
  <div
    class="container"
    ref="seeksRelationGraph"
    @mousedown.left.stop="onDragStart($event)"
    @mousewheel="mouseListener"
  >
    <div class="canvas" :style="canvasSizeAndPosition">
      <div class="item"></div>
    </div>
  </div>
</template>

<script>
import { startDrag } from "../utils";

export default {
  name: "Scale",
  data() {
    return {
      graphSetting: {
        canvasZoom: 100,
        viewELSize: { width: 1300, height: 800, left: 0, top: 100 },
        viewNVInfo: { width: 1300, height: 800, x: 0, y: 100 },
        canvasNVInfo: { width: 1300, height: 800, x: 0, y: 100 },
        canvasSize: {
          width: 800,
          height: 800,
        },
        canvasOffset: {
          x: 25,
          y: 27,
          zoom_buff_x: 0,
          zoom_buff_y: 0,
        },
      },
      zoomCenter_of_newSize: { x: 200, y: 200 },
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
          "translate(-200px, -200px) " +
          "scale(" +
          this.graphSetting.canvasZoom / 100 +
          "," +
          this.graphSetting.canvasZoom / 100 +
          ")",
        // 'transform-origin': (this.graphSetting.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.graphSetting.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
      };
    },
  },
  methods: {
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
      if (this.graphSetting.canvasZoom + buff < 10) {
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
      if (!this.$refs.seeksRelationGraph) {
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
      if (!this.$refs.seeksRelationGraph) {
        console.error("cannot get view size !");
        return;
      }
      // console.log('reanalysis NV info...')
      var result = {
        NMCanvasCenter: { x: 0, y: 0 },
      };
      var _view_info = this.$refs.seeksRelationGraph.getBoundingClientRect();
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
      var _view_info = this.$refs.seeksRelationGraph.getBoundingClientRect();
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

<style scoped>
.container {
  width: 400px;
  height: 400px;
  margin: 20px;
  border: 1px solid;
  overflow: hidden;
}

.canvas {
  width: 800px;
  height: 800px;
  background: #f5f5f5;
  position: relative;
  transform: translate(-800px, -800px);
}

.item {
  width: 200px;
  height: 200px;
  background: red;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
