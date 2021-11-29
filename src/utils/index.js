var __tmp_basePosition = { x: 0, y: 0 };
var __tmp_positionModel = { x: 0, y: 0 };
var __ondraged;
var __start_info = { x: 0, y: 0 };

function onNodeMove(e) {
  // console.log('move', __tmp_basePosition, e.clientX, e.clientY)
  __tmp_positionModel.x = e.clientX + __tmp_basePosition.x;
  __tmp_positionModel.y = e.clientY + __tmp_basePosition.y;
}
function onNodeDragend() {
  // console.log('onNodeDragend', __tmp_positionModel.x - __start_info.x, __tmp_positionModel.y - __start_info.y)
  document.body.removeEventListener("mousemove", onNodeMove);
  document.body.removeEventListener("mouseup", onNodeDragend);
  if (__ondraged) {
    __ondraged(
      __tmp_positionModel.x - __start_info.x,
      __tmp_positionModel.y - __start_info.y
    );
  }
}

export function startDrag(e, positionModel, ondraged) {
  __ondraged = ondraged;
  // console.log('startDrag:', __tmp_basePosition, e.clientX, e.clientY)
  __tmp_positionModel = positionModel;
  __start_info.x = __tmp_positionModel.x;
  __start_info.y = __tmp_positionModel.y;
  __tmp_basePosition.x = parseInt(__tmp_positionModel.x) - e.clientX;
  __tmp_basePosition.y = parseInt(__tmp_positionModel.y) - e.clientY;
  document.body.addEventListener("mousemove", onNodeMove);
  document.body.addEventListener("mouseup", onNodeDragend);
}
