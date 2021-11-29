<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Anchor /> -->

    <div onclick="onClick()">hhhh</div>
    <scale />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Anchor from './components/Anchor.vue'
import Scale from './components/Scale.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Anchor,
    Scale
  },
  mounted() {
    window.onClick = function onClick(e) {
      console.log(e, 333333333)
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
