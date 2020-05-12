/* eslint-disable no-unused-vars */
<template>
    <div class="swiper-container" :class="swipeid">
        <div class="swiper-wrapper">
            <!-- 存放具体的轮播内容 -->
            <slot name ="swiper-con"></slot>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  name: 'swipper',
  props: {
    swipeid: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initSwapper()
  },
  data () {
    return {
      mySwiper: ''
    }
  },
  methods: {
    initSwapper () {
      let that = this
      this.mySwiper = new Swiper('.' + that.swipeid, {
        loop: true,
        // mousewheel: true,
        delay: 5000,
        autoplay: true,
        autoHeight: true, // 高度随内容变化
        height: 600,
        direction: 'vertical',
        speed: 1000
        // slidesPerView: 1,
        // spaceBetween: 20,
        // effect: 'fade',
        // fadeEffect: {
        //   crossFade: true
        // }
        // 分页器
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        //   type: 'bullets'
        // }
      })
    }
  }
}

</script>

<style lang='scss'>
.swiper-pagination-bullet-active {
  background: #000;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 1rem;
  width: 95%;
  text-align: center;
}
</style>
