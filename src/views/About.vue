<template>
  <div>
    <my-swipper swipeid="swipe" ref="swiper">
        <div v-for="top in tops" :key="top.title" class="swiper-slide" slot="swiper-con" >
            <img :src="top.image">
            <h3>{{ top.title }}</h3>
        </div>
    </my-swipper>
  </div>
</template>

<script>
import MySwipper from '@/components/MySwipper'

export default {
  name: 'about',
  data () {
    return {
      swipe: 'swipe',
      tops: [
        { image: 'https://img.alicdn.com/tfs/TB1KJs2vrj1gK0jSZFuXXcrHpXa-520-280.jpg_q90_.webp', title: '10' },
        { image: 'https://img.alicdn.com/tfs/TB1s13dvUH1gK0jSZSyXXXtlpXa-520-280.jpg', title: '0' },
        { image: 'https://aecpm.alicdn.com/simba/img/TB183NQapLM8KJjSZFBSutJHVXa.jpg', title: '2.jpg' },
        { image: 'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg', title: '1.jpg' },
        { image: 'https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg', title: '3.jpg' }
      ]
    }
  },
  components: {
    MySwipper
  },
  methods: {
  }
}

</script>

<style lang="scss">
</style>
