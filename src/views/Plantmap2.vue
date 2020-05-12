<template>
  <div>
    <div class="map-wrapper">
      <el-amap ref='map' class="amap-box" :amap-manager="amapManager" :zoom="zoom"
      :center="center"
      :plugin='plugin'>
        <el-amap-marker v-for="marker in markers" :position="marker.position" :key="marker.name" :events="marker.events"></el-amap-marker>
        <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content" :offset="window.offset"></el-amap-info-window>
      </el-amap>
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import { fakePoint } from '@/assets/json/fakeData'
VueAMap.initAMapApiLoader({
  key: 'bc1f1df9e8d87cf5d61beae1438b34b6',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})
const amapManager = new VueAMap.AMapManager()

// function handler () {
//   alert('haha')
// }
export default {
  name: 'plantdb',
  data () {
    return {
      amapManager: amapManager,
      center: [117.393472, 31.938388],
      zoom: 16,
      mapStyle: 'amap://styles/8b6be8ec497009e17a708205348b899a', // 设置地图样式
      markers: [],
      windows: [],
      window: '',
      plugin: [{ pName: 'ToolBar' }, { pName: 'Scale' }]
    }
  },
  mounted () {
    this.addMarker()
  },
  methods: {
    addMarker () {
      let markers = []
      let windows = []
      let self = this
      // const BtnComponent = {
      //   props: ['text'],
      //   template: `<button>{{text}}</button>`
      // }
      fakePoint.forEach((item, index) => {
        // debugger
        markers.push({
          position: item.position,
          events: {
            click () {
              self.windows.forEach(window => {
                window.visible = false
              })

              self.window = self.windows[index]
              self.$nextTick(() => {
                self.window.visible = true
              })
            }
          }
        })
        windows.push({
          position: item.position,
          // content: '<div>' + item.name + '</div>', // 内容
          // template: `<button @click="handler('hello')">{{ item.name }}</button>`,
          content: `
            <div onclick='handler'>uiii</div>
          `,
          offset: [0, -30], // 窗体偏移
          visible: false // 初始是否显示
        })
      })
      //  加点
      this.markers = markers
      // 加弹窗
      this.windows = windows
    }
  }
}

</script>

<style scoped lang="scss">
.amap-demo {
  height: 300px;
}
.map-wrapper {
  width: 75%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 60px;
  bottom: 0;
}
</style>
