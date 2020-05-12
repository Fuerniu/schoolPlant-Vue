<template>
  <div class="map">
    <div class="map-container">
      <school-map></school-map>
    </div>
    <div class="right-box">
      <transition-group :name='slideName' tag='div' style="height: 100%">
        <ul key='btn' class="chart-btn" v-show="isChart">
          <li v-for="item in btnList" :key="item.id" @click="changChart(item)" :class="{'bc': item.id === curChartId}">{{ item.name }}</li>
        </ul>
        <div key='arrow' class="arrow" @click="slideChart" :class="{ 'arrow2': isChart }">
          <i class="el-icon-arrow-left" v-show="!isChart"></i>
          <i class="el-icon-arrow-right" v-show="isChart"></i>
        </div>
        <div key='chart' class="chart" v-show="isChart">
          <div ref='chart' class="mychart">
          </div>
        </div>
      </transition-group>
      <!-- <el-drawer
        title="植物图表"
        :modal='false'
        :with-header="false"
        :visible.sync="isChart"
        :direction="direction"
        :before-close="handleClose">
        <div key='chart' class="chart">
          <div ref='chart' class="mychart">
          </div>
        </div>
      </el-drawer> -->
    </div>
  </div>
</template>

<script>
import SchoolMap from '@/components/SchoolMap'
import { option1, option2 } from '@/echarts/index'
// 引入折线图/柱状图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// require('echarts/lib/chart/radar')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/component/legendScroll') // 图例滚动

export default {
  name: 'plantmap',
  data () {
    return {
      // [117.393215, 31.854397]
      center: [117.393215, 22.287459],
      btnList: [
        { id: 1, name: '排名' },
        { id: 2, name: '占比' }
      ],
      // 判断右侧图表是否展开
      isChart: false,
      drawer: false,
      direction: 'rtl',
      chartData: '',
      curChartId: 1,
      slideName: 'move',
      chart: null
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   })
    this.getAreaPoint()
  },
  components: {
    // InfoWindow,
    SchoolMap
  },
  methods: {
    slideChart () {
      this.isChart = !this.isChart
      // this.
      setTimeout(() => {
        if (this.curChartId === 1) {
          this.initChart()
        } else {
          this.initPie()
        }
      }, 100)
    },
    initChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.chart)
      myChart.clear()
      option1.yAxis[0].data = this.chartData.name
      option1.series[0].data = this.chartData.num
      myChart.setOption(option1)
    },
    initPie () {
      let myChart = this.$echarts.init(this.$refs.chart)
      myChart.clear()
      option2.series[0].data = this.chartData.pie.sort((a, b) => {
        return a.value - b.value
      })
      myChart.setOption(option2)
    },
    changChart (item) {
      this.curChartId = item.id
      if (item.id === 1) {
        this.initChart()
      } else {
        this.initPie()
      }
    },
    // 获取各个区域内点位的数量
    getAreaPoint () {
      this.$axios.get('/map/areapoints'
      ).then(res => {
        res = res.data
        let a = []
        let num = []
        let pie = []
        if (res.code === 200) {
          res.data.forEach(item => {
            a.push(item.area_name)
            num.push(item.num)
            pie.push({ value: item.num, name: item.area_name })
          })
          this.chartData = { name: a, num: num, pie: pie }
          // this.initChart()
        }
      })
    },
    handleClose (done) {

    }
  }
}
</script>

<style lang="scss" scoped>
// 炫酷黑
$b: #343544;
.map {
  background-color: #e9e9e9;
  width: 100%;
  position: absolute;
  top: 8rem;
  bottom: 0;
  .map-container {
    width: 95%;
    height: 100%;
    margin: 0 auto;
  }
  .right-box {
    position: absolute;
    right: 0%;
    top: 20%;
    bottom: 20%;
    width: 30rem;
    border-radius: 2rem;
    .chart {
      height: 100%;
      .mychart {
        height: 100%;
        border-radius: 1rem;
        // background-color: rgba(0,0,0,.7);
        background-color: #2c343c;
      }
    }
    .chart-btn {
      z-index: 2;
      width: 100%;
      padding: 0;
      margin: 0;
      position: absolute;
      top: 4%;
      left: 50%;
      transform: translateX(-50%);
      list-style: none;
      display: flex;
      justify-content: space-around;
      li {
        color: #fff;
        font-size: 1.6rem;
        padding: .4rem 2rem;
        border-radius: 1.4rem;
        cursor: pointer;
        &.bc {
          background-color: coral;
        }
        &:hover {
          background-color: coral;
          transition: background-color .3s linear;
        }
      }
    }
    .arrow {
      position: absolute;
      top: 50%;
      left: 80%;
      // right: 1rem;
      padding: 0.6rem;
      transform: translateY(-50%);
      background-color: rgba(44,52,60,.2);
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: rgba(44,52,60,1);
        transition: background-color .3s ease;
      }
      i {
        color: #fff;
        font-size: 4.2rem;
      }
    }
    .arrow2 {
      left: -20%;
      // transition: position .6s linear;
    }
  }
}
// .move-enter-active, .move-leave-active {
//   transition: left .6s linear;
// }
</style>
