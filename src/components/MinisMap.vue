<template>
  <div class="mini-map">
    <el-button size='mini' @click.native="removeMarkers">清除</el-button>
    <div id="container"></div>
    <div class="loading" v-show="!isMap">
      <!-- <span>地图加载中</span> -->
      <i class="el-icon-loading p-center"></i>
    </div>
  </div>
</template>

<script>
// import VueAMap from 'vue-amap'
import AMap from 'AMap' // 引入高德地图
import { icon, icon2 } from '@/assets/leaflet/mark'
import { fakePoint } from '@/assets/json/fakeData'
// import InfoWindow from '@/components/InfoWindow'
// 引入折线图/柱状图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll') // 图例滚动
let map

export default {
  name: 'plantmap',
  data () {
    return {
      isMap: false,
      // [117.393215, 31.854397]
      center: [117.393215, 22.287459],
      cont: 'hahahha',
      location: '教学楼',
      imgNums: 5,
      points: [],
      pointsList: fakePoint
    }
  },
  mounted () {
    // this.getMapPoint()
    this.init()
    // setTimeout(() => {
    // }, 1000)
  },
  components: {
    // InfoWindow
  },
  methods: {
    init () {
      // 初始化地图对象，加载地图
      map = new AMap.Map('container', {
        center: [117.393472, 31.938388],
        resizeEnable: true,
        zoom: 16
      })
      let _self = this
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function (e) {
        // map.remove(this.points)
        if (_self.points) {
          _self.removeMarkers()
        }
        let marker
        marker = new AMap.Marker({
          icon: icon2,
          position: [e.lnglat.getLng(), e.lnglat.getLat()],
          offset: new AMap.Pixel(-13, -30)
        })
        let lngLat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        marker.setMap(map)
        _self.points.push(marker)
        _self.$emit('getPoint', lngLat)
      })
      let points = []
      this.pointsList.forEach((item, index) => {
        let labelContent = `<div class='info'>${item.area_name}</div>`
        let marker = new AMap.Marker({
          position: item.center,
          // offset: new AMap.Pixel(-10, -10),
          icon: icon, // 添加 Icon 实例,
          anchor: 'top-center', // 设置锚点
          offset: new AMap.Pixel(0, 0), // 设置偏移量
          label: {
            content: labelContent,
            offset: new AMap.Pixel(-20, -20)
          }
        })
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        // marker.setLabel({
        //   offset: new AMap.Pixel(-15, -30), // 设置文本标注偏移量
        //   content: `<div class='info'>${item.name}</div>`, // 设置文本标注内容
        //   direction: 'top' // 设置文本标注方位
        // })
        points.push(marker)
      })
      this.isMap = true
      map.add(points)
    },
    removeMarkers () {
      map.remove(this.points)
      this.$emit('getPoint', '')
    }
    // getMapPoint () {
    //   this.$axios.get('/map/list'
    //   ).then(res => {
    //     res = res.data
    //     if (res.code === 200) {
    //       let a = []
    //       res.data.forEach(item => {
    //         let lng = Number(item.center.split(',')[0])
    //         let lat = Number(item.center.split(',')[1])
    //         item.center = [lng, lat]
    //         a.push(
    //           {
    //             id: item.id,
    //             position: item.center,
    //             name: item.area_name
    //           }
    //         )
    //       })
    //       this.pointsList = a
    //       this.init()
    //     }
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // }
  }
}
</script>

<style lang="scss">
.mini-map {
  height: 100%;
  position: relative;
  .el-button {
    z-index: 999;
    position: absolute;
    top: 2%;
    right: 2%;
  }
  .p-center {
    position: relative;
    left: 50%;
    top: 50%;
    margin-top: -25px;
    margin-left: -25px;
  }
  #container {
    height: 100%;
    .amap-marker-label {
      // border: 1px solid rgba(102, 102, 102, .8);
      border: none;
      padding: .15rem .2rem;
      .info {
        font-size: 1.2rem;
      }
    }
  }
  .loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // z-index: 100;
    // background: rgba(0,0,0,.2);
    i {
      color: #000;
      font-size: 5rem;
    }
  }
}
</style>
