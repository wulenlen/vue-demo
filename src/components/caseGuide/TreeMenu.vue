<template>
    <div class="mind-tree-menu">
      <div class="anchor-ink">
        <span class="slider" :style="{transform: `translateY(${100 * curActive}%) translateY(${8 * (curActive + 1)}px)`}"></span>
      </div>
      <a-tree class="tree-menu" 
        :tree-data="treeData" 
        show-icon 
        :expandedKeys="expandedKeys"
        :default-selected-keys="['0']"
        :selectedKeys="[curActive + '']"
        @select="onSelect"
        @expand="onExpand"
      >
          <i slot="switcherIcon">
              <i class="iconfont icon-xia"></i>
          </i>

          <!-- <span class="node-title" slot="custom" slot-scope="{title}">{{title}}</span> -->
      </a-tree>
    </div>
</template>

<script>
import { elementScrollIntoView } from 'seamless-scroll-polyfill';
import {tree2Array} from '../../utils/utils'
const treeData = [
  {
    title: '婚姻状况',
    key: '0-0',
    children: [
      { title: '重点听取内容', key: '0-0-0'},
      { title: '是否现役军人离婚', key: '0-0-1'},
      { title: '特定时期内对离婚诉权的限制', key: '0-0-1'},
    ],
  },
  {
    title: '子女抚养情况',
    key: '0-0',
    children: [
      { title: '子女基本情况', key: '0-0-0'},
      { title: '父母的抚养条件情况', key: '0-0-1'},
      { title: '父母与子女关系情况', key: '0-0-1'},
    ],
  },
  {
    title: '抚养费相关',
    key: '0-0',
  },
  {
    title: '夫妻共同财产',
    key: '0-0',
    children: [
      { title: '共同财产的状况', key: '0-0-0'},
      { title: '影响财产分割的因素', key: '0-0-1'},
      { title: '共同财产的分割', key: '0-0-1', children: [
        { title: '房屋', key: '0', children: [ { title: '房屋基本情况', children: [{title: '付款方式及房款支付情况'}] }, {title: '其他影响房屋权属的确认及分割的因素'} ] },
        {title: '车辆'},
        {title: '股票、债券、投资基金'},
        {title: '非上市公司'},
        {title: '有限公司'},
        {title: '合伙企业'},
        {title: '独资企业'},
        {title: '保险'}
      ]},
    ],
  },
  {
    title: '共同债务',
    key: '0-0',
    children: [
      { title: '债务基本情况', key: '0-0-0'},
    ],
  },
  {
    title: '共同债权',
    key: '0-0',
    children: [
      { title: '借款的基本情况', key: '0-0-0'},
    ],
  },
  {
    title: '过错赔偿',
    key: '0-0',
  },
  {
    title: '经济补偿',
    key: '0-0',
  },
];


export default {
  name: 'TreeMenu',
  props: {
    curActive: Number,
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      treeData: [],
      expandedKeys: [],
      anchorDom: null,
    };
  },
  watch: {
    data(val) {
      let a1 = [];

      tree2Array(val,node => a1.push(node));
      a1.forEach((item, i) => item.key = i + '');

      this.expandedKeys = a1.map(item => item.key)
      this.treeData = val
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info);
      if(!this.anchorDom) {
        this.anchorDom = document.querySelectorAll('.js_anchor')
      }
      if(!selectedKeys.length) return
      this.$emit('change', Number(selectedKeys))
      elementScrollIntoView(this.anchorDom[Number(selectedKeys)], {behavior: 'smooth', block: 'start', inline: 'start'})
    },
  },
};
</script>

<style scoped lang="less">
.mind-tree-menu {
  position: relative;

  .anchor-ink {
    position: absolute;
    left: -16px;
    height: 100%;

    &::before {
        content: '';
        position: relative;
        display: block;
        height: 100%;
        width: 2px;
        background: #e8e8e8;
    }

    .slider {
        position: absolute;
        left: 0px;
        top: 0;
        width: 2px;
        height: 24px;
        background: #2B6BCF;
        transition: transform .3s ease-in-out;
    }
  }

  .tree-menu {
      color: #2B4258;

      & /deep/ .ant-tree-switcher_close {

          .iconfont {
              transform: rotate(-90deg);
          }
      }

      & /deep/ li .ant-tree-node-content-wrapper.ant-tree-node-selected {
          background: none;
          color: #2B6BCF;
      }

      .iconfont {
          display: inline-block;
          font-size: 16px;
      }
          
  }
}
</style>