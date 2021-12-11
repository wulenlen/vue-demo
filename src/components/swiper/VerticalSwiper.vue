<template>

    <swiper class="w-swiper-container" ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, i) in data" :key="`swiper-${i}`">Slide {{i + 1}}</swiper-slide>
    </swiper>
  
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import 'swiper/css/swiper.css'

export default {
  name: "VerticalSwiper",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperOptions: {
        // pagination: {
        //   el: ".swiper-pagination",
        // },
        loop: true,
        autoplay: true,
        direction: 'vertical',
        slidesPerView: 6,
        spaceBetween: 18,
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  },
};
</script>

<style scoped>
.w-swiper-container {
  width: 400px;
  height: 400px;
  overflow: hidden;
}
</style>
