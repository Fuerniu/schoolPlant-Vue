<template>
  <div class="container-water-fall">
    <!-- <h1 style="position: fixed;left: 0;top: 100px;font-style: 15px;color:blue;z-index: 1000;">{{loadstatus}}</h1> -->
    <waterfall :col="col" :data="picData" :gutterWidth='gutterWidth' :width='itemWidth'>
      <template>
        <div class="cell-item" v-for="(item,index) in picData" :key="index" @click='toDetail(item)'>
          <!-- <img :lazy-src="item.picpath" alt="加载错误"> -->
          <img v-lazy="item.picpath" alt="加载错误">
          <div class="item-body">
            <div class="item-desc">
              <p>{{ item.cname || item.cn_name }}</p>
              <p>{{ item.ename || item.en_name }}</p>
            </div>
            <div class="item-footer">
              <div class="address"><i class="el-icon-location-outline"></i>{{ item.address }}</div>
              <div class="fname">{{ item.fname || item.family_name }}</div>
              <!-- <div class="like" :class="item.liked?'active':''">
                <i></i>
                <div class="like-total">{{item.like}}</div>
              </div> -->
            </div>
          </div>
        </div>
      </template>
    </waterfall>
    <div class="foot-info" v-show="!isNext">
      <span>------{{ text }}------</span>
    </div>
    <loading :show="loading"/>
  </div>
</template>

<script>
/*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
import loading from './Loading'

export default {
  props: {
    picData: {
      type: Array
    },
    isNext: {
      type: Boolean
    },
    text: {
      type: String,
      default: '我也是有底线的'
    }
  },
  data () {
    return {
      data: [],
      picList: [],
      col: 5,
      loading: false,
      gitHubData: {},
      title: '白色玫瑰，美丽迷人',
      user: '富尔牛',
      curId: 0,
      currentPage: 1
    }
  },
  components: {
    loading
  },
  computed: {
    itemWidth () {
      return (130 * 0.5 * (document.documentElement.clientWidth / 375)) // rem布局 计算宽度
    },
    gutterWidth () {
      return (12 * 0.5 * (document.documentElement.clientWidth / 375)) // rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    }
  },
  mounted () {
  },
  methods: {
    // mix () {
    //   this.$waterfall.mix()
    // },
    // finish () {
    //   console.log('finish')
    // },
    toDetail (item) {
      let name = item.cname || item.cn_name
      window.open(`http://www.iplant.cn/info/${name}`, '_blank')
    },
    reset () {
      this.data = []
    },
    switchCol (col) {
      this.col = col
    },
    // scroll (scrollData) {
    //   console.log(1, 'scrollData')
    // },
    loadMore () {
      // this.loading = true
      this.currentPage++
      this.$emit('getPicData', this.currentPage)
    }
  }
}
</script>

<style  lang='scss' scoped>
* {
  margin: 0;
}
.container-water-fall {
  // padding: 0 28px;
  width: 95%;
  box-sizing: border-box;
  margin: 0 auto;
  .cell-item {
    width: 100%;
    margin-bottom: 1.8rem;
    background: #ffffff;
    border-radius: 12px 12px 12px 12px;
    overflow: hidden;
    box-sizing: border-box;
    &:hover {
      // box-shadow: rgba(34, 25, 25, 0.2) 0px 1px 6px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      // transform: scale(1.02);
      transition: box-shadow 0.15s ease;
    }
    img {
      // border-radius: 12px 12px 0 0;
      width: 100%;
      height: auto;
      display: block;
      cursor: pointer;
    }
    .item-body {
      // border: 1px solid #F0F0F0;
      padding: 1rem;
      .item-desc {
        font-size: 1.6rem;
        color: #333333;
        font-weight: bold;
        // display: flex;
        justify-content: space-evenly;
        align-items: center;
        p {
          &:last-child {
            margin-top: 1rem;
          }
        }
      }
      .item-footer {
        margin-top: 1.2rem;
        position: relative;
        font-size: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .cname {
          max-width: 15rem;
          // color: #999999;
        }
        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          &.active {
            // i {
            // }
            .like-total {
              color: #FF4479;
            }
          }
          i {
            width: 28px;
            display: block;
          }
          .like-total {
            margin-left: 10px;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
  .foot-info {
    font-size: 1.6rem;
    line-height: 3rem;
  }
}
.githubdata {
  float: right;
  margin-right: 90px;
  img {
    width: 14px;
    // height: 16px;
  }
}
</style>
