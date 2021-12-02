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


export function throttle(func, delay) {
  let prev = Date.now();

  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

export const deepClone = function(obj) {
  // 先检测是不是数组和Object
  // let isArr = Object.prototype.toString.call(obj) === '[object Array]';
  let isArr = Array.isArray(obj);
  let isJson = Object.prototype.toString.call(obj) === '[object Object]';
  if (isArr) {
    // 克隆数组
    let newObj = [];
    for (let i = 0; i < obj.length; i++) {
      newObj[i] = deepClone(obj[i]);
    }
    return newObj;
  } else if (isJson) {
    // 克隆Object
    let newObj = {};
    for (let i in obj) {
      newObj[i] = deepClone(obj[i]);
    }
    return newObj;
  }
  // 不是引用类型直接返回
  return obj;
};


export function downloadImg(url, name) {
  getImgUrlBase64(url).then(base64 => {
    if (window.navigator.msSaveOrOpenBlob) {

      let bstr = atob(url.split(",")[1]);

      let n = bstr.length;

      let u8arr = new Uint8Array(n);

      while (n--) {

        u8arr[n] = bstr.charCodeAt(n);

      }

      let blob = new Blob([u8arr]);

      window.navigator.msSaveOrOpenBlob(blob, name);

    }else {

      let link = document.createElement('a')
      link.href = base64
      link.download = name
      link.click()
    }
  })
}

function getImgUrlBase64(url) {
  return new Promise(resolve => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.crossOrigin = 'Anonymous' //允许跨域
    img.src = url
    img.onload = function() {
      canvas.height = img.width
      canvas.width = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let dataURL = canvas.toDataURL('image/png')
      canvas = null
      resolve(dataURL)
    }
  })
}

export const tree2Array = (root,fVisit) => {
  let queue = Array.isArray(root) ? [...root] : [root];

  queue.forEach(node => {
      fVisit && fVisit(node);
      let children = node.children;

      if(children && children.length){
        tree2Array(children, fVisit)
      }
  })  
}

export const dfs = (tree, init) => {
  const obj = {}

  if(init) {
    const {width, height} = createElementForWidth(tree.title)

    tree.depth = 0
    tree.width = width
    tree.height = height
  }

  obj[0] = [tree]
  const walk = (tree, depth = 1) => {
      // ope(tree, depth)
      if(tree.children) {
          tree.children.forEach((node) => {
              if(init) {
                node.title += `${depth > 1 && node.status === 2 ? '(未填写)' : ''}`
                const {width, height} = createElementForWidth(node.title)
                
                node.depth = depth
                node.parent = tree
                node.width = width,
                node.height = height
                node.resultHeight = node.result ? createElementForResult(node.result) : 0
              }

              obj[depth] = obj[depth] || []
              obj[depth].push(node)
              
              walk(node, depth + 1)
          })
      }
  }
  walk(tree);

  return obj;
}

export const mindMapDfs = (tree) => {
  const walk = (tree, depth = 1) => {
      
      if(tree.children) {
          tree.children.forEach((node) => {

              node.depth = depth
              node.questions = (node.questions || []).map(item => ({...item, showResult: false}))
            
              walk(node, depth + 1)
          })
      }
  }
  walk(tree);
}

const createElementForWidth = (name) => {
  let oSpan = document.querySelector('.js_span_width')

  if(!oSpan) {
    oSpan = document.createElement('span')
    oSpan.className = 'js_span_width'
    oSpan.style.position = 'fixed'
    oSpan.style.visibility = 'hidden'
    oSpan.style.zIndex = -1
    document.body.appendChild(oSpan)
  }

  oSpan.innerHTML = name

  return oSpan.getBoundingClientRect()
}

const createElementForResult = (result) => {
  let oDiv = document.querySelector('.js_result_height')

  if(!oDiv) {
    oDiv = document.createElement('div')
    oDiv.className = 'js_result_height'
    oDiv.style.position = 'fixed'
    oDiv.style.visibility = 'hidden'
    oDiv.style.zIndex = -1
    oDiv.style.width = '98px'
    document.body.appendChild(oDiv)
  }

  oDiv.innerHTML = result

  return oDiv.getBoundingClientRect().height
}






