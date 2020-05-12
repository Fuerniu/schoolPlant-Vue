<template>
  <div class="school-map">
    <div id="container"></div>
    <div style="display: none">
      <info-window ref="infowindow" :pointInfo='pointInfo'></info-window>
    </div>
    <full-loading :show="loading"/>
  </div>
</template>

<script>
// import VueAMap from 'vue-amap'
import FullLoading from '@/components/FullLoading'
import AMap from 'AMap' // 引入高德地图
import { icon } from '@/assets/leaflet/mark'
import InfoWindow from '@/components/InfoWindow'
import { fakePoint } from '@/assets/json/fakeData'

// 引入折线图/柱状图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll') // 图例滚动

export default {
  name: 'plantmap',
  data () {
    return {
      // [117.393215, 31.854397]
      center: [117.393215, 22.287459],
      location: '',
      // imgNums: 0,
      pointInfo: {},
      loading: true,
      pointsList: fakePoint
    }
  },
  mounted () {
    // this.getMapPoint()
    this.init()
  },
  components: {
    InfoWindow,
    FullLoading
  },
  methods: {
    init () {
      // 初始化地图对象，加载地图
      const map = new AMap.Map('container', {
        center: [117.393472, 31.938388],
        resizeEnable: true,
        zoom: 17
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Autocomplete'], function () {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
      map.on('click', e => {
        // console.log(e.lnglat.getLng(), e.lnglat.getLat())
      })
      const infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) })
      let points = []
      this.pointsList.forEach((item, index) => {
        let labelContent = `<div class='info'>${item.area_name}</div>`
        let marker = new AMap.Marker({
          position: item.center,
          // offset: new AMap.Pixel(-10, -10),
          icon: icon, // 添加 Icon 实例,
          anchor: 'center', // 设置锚点
          offset: new AMap.Pixel(0, 0), // 设置偏移量
          label: {
            content: labelContent,
            offset: new AMap.Pixel(-18, -28)
          }
        })
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        // marker.setLabel({
        //   offset: new AMap.Pixel(-15, -30), // 设置文本标注偏移量
        //   content: `<div class='info'>${item.name}</div>`, // 设置文本标注内容
        //   direction: 'top' // 设置文本标注方位
        // })
        marker.on('click', e => {
          // this.location = item.name
          this.getPoints(item.id)
          infoWindow.setContent(this.$refs.infowindow.$el)
          infoWindow.open(map, e.target.getPosition())
        })
        points.push(marker)
      })
      map.add(points)
      this.loading = false
    },
    // 获取地图上总体点位数据
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
    //     this.loading = false
    //     console.error(err)
    //   })
    // },
    // 获取每个区域图片数量
    getPoints (id) {
      this.$axios.post('/map/point', { id: id }
      ).then(res => {
        res = res.data
        if (res.code === 200) {
          // this.imgNums = res.data[0].total
          this.pointInfo = res.data[0]
        }
      })
    }
  }
}
</script>margin-top: 6rem;

<style lang="scss">
.school-map {
  height: 100%;
  #container {
    height: 100%;
  }
  .amap-marker-label {
    // border: 1px solid rgba(102, 102, 102, .8);
    border: none;
    padding: .3rem .4rem;
    .info {
      font-size: 1.4rem;
    }
  }
}
</style>
