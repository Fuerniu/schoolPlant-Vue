<template>
  <div id="app">
    <my-header v-if="isHeaderAlive"></my-header>
    <div class="view">
      <router-view v-if="isRouterAlive"/>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/Header'
export default {
  name: 'about',
  provide () {
    return {
      reload: this.reload,
      header: this.header
    }
  },
  data () {
    return {
      isRouterAlive: true,
      isHeaderAlive: true,
      key: new Date().getTime(),
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
  computed: {
    // key () {
    //   return new Date().getTime()
    // }
  },
  methods: {
    header () {
      this.isHeaderAlive = false
      this.$nextTick(function () {
        this.isHeaderAlive = true
      })
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  components: {
    MyHeader
  }
}

</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);

#app {
  font-family: 'Source Sans Pro','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: 300;
}
.view {
  width: 100%;
  // position: relative;
  // top: 8rem;
  // left: 0;
  // right: 0;
}
</style>
