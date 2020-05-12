<template>
  <div class="maplist">
    <el-backtop :right='0' :bottom='30'>
      <i class="el-icon-top"></i>
    </el-backtop>
    <full-loading :show="fullloading"/>
    <loading :show="loading"/>
    <water-fall :picData='picList' :isNext='isNext' :text='text'></water-fall>
  </div>
</template>

<script>
import WaterFall from '@/components/Waterfall'
import FullLoading from '@/components/FullLoading'
import Loading from '@/components/Loading'
import { throttle } from '@/util/index'

export default {
  name: 'maplist',
  data () {
    return {
      picList: [],
      fullloading: false,
      loading: false,
      isNext: true,
      currentPage: 1,
      pageSize: 15,
      plantName: '',
      text: ''
    }
  },
  components: {
    WaterFall,
    FullLoading,
    Loading
  },
  created () {
  },
  mounted () {
    let _self = this
    this.plantName = this.$route.query.name
    this.getList()
    // 节流处理
    this.throttleLoad = throttle(() => {
      _self.scrollChange()
    }, 200)
    window.addEventListener('scroll', this.throttleLoad)
    // window.addEventListener('scroll', this.scrollChange)
  },
  methods: {
    getList () {
      if (this.isNext) {
        if (this.currentPage === 1) {
          this.fullloading = true
          this.loading = false
        } else {
          this.loading = true
          this.fullloading = false
        }
        this.$axios.post('/map/poimg', { name: this.plantName, page: this.currentPage, size: this.pageSize }
        ).then(res => {
          res = res.data
          if (res.code === 200) {
            this.picList = this.picList.concat(res.data)
            if ((this.picList.length < this.pageSize) || (!res.data.length)) {
              this.isNext = false
              this.currentPage = 1
            }
            if (!this.picList.length) {
              this.text = '暂无收录图片'
            }
            this.text = (!this.picList.length) ? '暂无收录图片' : '------我也是有底线的------'
            setTimeout(() => {
              if (this.fullloading) {
                this.fullloading = false
              } else {
                this.loading = false
              }
            }, 1000)
          }
        }).catch(() => {
          this.fullloading = false
          this.loading = false
          // console.error(err)
        })
      }
    },
    scrollChange () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // scrollHeight 滚动条的总高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        this.currentPage++
        // 加载数据
        this.getList()
      }
    }
  },
  beforeDestroyed () {
    (document.documentElement.scrollTop = 0) || (document.body.scrollTop = 0)
  },
  destroyed () {
    window.removeEventListener('scroll', this.throttleLoad)
  }
  // beforeRouterLeave (to, from, next) {
  //   window.removeEventListener('scroll', this.scrollChange)
  //   // this.currentPage = 1
  //   next()
  // }
}
</script>

<style lang="scss">
.maplist {
  background-color: #e9e9e9;
  position: relative;
  padding-top: 1.5rem;
  top: 8rem;
}
</style>
