<template>
  <div class="endpoint-node" @click="onClick">
    <butterfly-vue-endpoint id="1" className="endpoint-1"  />
    <butterfly-vue-endpoint id="2" className="endpoint-2">
      +
    </butterfly-vue-endpoint>
  </div>
</template>

<script>

import {ButterflyVueEndpoint} from 'butterfly-vue';

export default {
  name: "endpoint-node",
  components: {
    ButterflyVueEndpoint
  },
  methods: {
      onClick(e) {
          console.log('click', e.target)
      }
  }
};
</script>

<style scoped>
  .endpoint-node {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #aaa;
    padding: 10px;
  }

  .endpoint-node .endpoint-2 {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(120%, -50%);
    border: 1px solid #ccc;
  }

  .endpoint-1 {
      border: 1px solid red;
  }
</style>