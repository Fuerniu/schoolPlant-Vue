<template>
  <div class="container-water-fall">
    <waterfall :col="col" :data="picData" :gutterWidth='gutterWidth' :width='itemWidth'>
      <template>
        <div class="cell-item" v-for="(item,index) in picData" :key="index"
        @click='toDetail(item, $event)'
        @mouseover="mouseOver(index)"
        @mouseleave="mouseLeave(index)"
        ref='cell'>
          <div class="item-pic">
            <img v-lazy="item.picpath" alt="加载错误">
            <div v-if="item.isHover" class="ope-icon">
              <span ref='icon' v-for="(list, ind) in iconList" :key='list.id' :class="[ list.class, { like: list.id === 1 && item.isLike }, { watch: list.id === 2 && item.isWatch } ]" @click.stop='handleIcon(item, ind, list, $event)'>
                <i v-show='list.id === 1'>{{ item.likeNum }}</i>
                <i v-show='list.id !== 1'>{{ list.info }}</i>
              </span>
            </div>
          </div>
          <div class="item-body">
            <div class="item-desc">
              <span v-show="!item.isEdit">{{ item.name }}</span>
              <el-input v-model="item.name" v-show="item.isEdit" ref='myinput' size='small' @focus.stop='' @keyup.enter.native="editImg(item)"></el-input>
            </div>
            <div class="item-footer">
              <div class="address">{{ item.author }}<i class="el-icon-location-outline"></i>{{ item.address || '拍摄地点为空' }}</div>
              <div class="fname">{{ item.createtime }}</div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
    <loading :show="loading"/>
  </div>
</template>

<script>
/*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
import loading from './FullLoading'
import { mapState } from 'vuex'
// import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  props: ['picData', 'isNext', 'col'],
  data () {
    return {
      data: [],
      iconList: [],
      picList: [],
      // col: 5,
      loading: false,
      gitHubData: {},
      title: '白色玫瑰，美丽迷人',
      user: '富尔牛',
      curId: 0,
      currentPage: 1,
      username: ''
    }
  },
  directives: { // 自定义的v-focus指令
    focus: {
      inserted: function (el, { value }) {
        if (value) {
          $(el).find('input').focus() // 聚焦输入框
          // el.focus();
          // el.children[0].focus()
        }
      }
    }
  },
  components: {
    loading
    // vueWaterfallEasy
  },
  computed: {
    itemWidth () {
      return (125 * 0.5 * (document.documentElement.clientWidth / 375)) // rem布局 计算宽度
    },
    gutterWidth () {
      return (10 * 0.5 * (document.documentElement.clientWidth / 375)) // rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    },
    ...mapState(['iList', 'myIList'])
  },
  mounted () {
    this.username = window.sessionStorage.getItem('username')
    let path = this.$route.path
    // if (path === '/mine') {
    //   this.iconList = this.iList
    // } else {
    //   this.iconList = this.myIList
    // }
    this.iconList = (path === '/mine') ? this.myIList : this.iList
  },
  methods: {
    toDetail (item, $el) {
      // 如果点击的位置不是div，就无法跳转页面
      let dom = $el.target.tagName.toLowerCase()
      if (dom === 'div') {
        let name = item.name
        window.open(`http://www.iplant.cn/info/${name}`, '_blank')
      }
    },
    // 点击图标触发事件
    handleIcon (item, ind, list, $el) {
      let iconId = list.id
      switch (iconId) {
        case 1:
          this.likeImg(item)
          break
        case 2:
          this.watchImg(item)
          break
        case 3:
          this.delImg(item.id)
          break
        case 4:
          // alert('编辑')
          this.handleEdit(item, $el)
          break
      }
    },
    mouseOver (index) {
      // if ()
      this.picData[index].isHover = true
      this.curId = index
    },
    mouseLeave (index) {
      this.picData[index].isHover = false
    },
    getCursor () {
      // .$el.querySelector('.el-input')
      // this.$refs.input.$el.querySelector('input').focus()
    },
    handleEdit (item, $el) {
      // console.log($el.target.tagName.toLowerCase(), 'target')
      item.isEdit = true
    },
    // likeImg
    likeImg (item) {
      // if (item.likeNum > 0) {
      //   }
      item.isLike = true
      this.$axios.post('/plant/likeit', {
        id: item.id,
        author: item.author,
        status: item.isLike
      }).then(res => {
        res = res.data
        if (res.code === 200) {
          item.likeNum++
        } else {
          return false
        }
      })
    },
    watchImg (item) {
      item.isWatch = !item.isWatch
      this.$axios.post('/user/watchother', {
        author: item.author
      }).then(res => {
        res = res.data
        if (res.code === 200) {
          // console.log(res.data)
          return true
        }
      })
    },
    editImg (item) {
      this.loading = true
      this.$axios.post('/plant/update', {
        id: item.id,
        title: item.name
      }).then(res => {
        res = res.data
        if (res.code === 200) {
          // this.isEdit = false
          item.isEdit = false
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'error',
          message: '修改失败'
        })
        // console.error(err)
      })
    },
    delImg (id) {
      this.$confirm('是否删除该图片?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios.post('/plant/delete',
          {
            id: id,
            author: this.username
          }
        ).then(res => {
          res = res.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$emit('getMinePic')
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style  lang='scss' scoped>
* {
  margin: 0;
}
$f: #fff;
$p: #FF4479;
.container-water-fall {
  // padding: 0 28px;
  // width: 95%;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 1.5rem;
  .cell-item {
    width: 100%;
    margin-bottom: 1.8rem;
    background: #ffffff;
    border-radius: 12px 12px 12px 12px;
    overflow: hidden;
    box-sizing: border-box;
    &:hover {
      // box-shadow: rgba(34, 25, 25, 0.2) 0px 1px 6px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      // transform: scale(1.05);
      transition: box-shadow 0.15s ease;
    }
    .item-pic {
      position: relative;
      img {
        // border-radius: 12px 12px 0 0;
        width: 100%;
        height: auto;
        display: block;
        cursor: pointer;
      }
      .ope-icon {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        span {
          position: absolute;
          color: $f;
          // color: #000;
          font-size: 1.8rem;
          background-color: #888;
          padding: 3px 8px;
          cursor: pointer;
          // &:nth-child(1) {
          //   left: 4%;
          //   top: 3%;
          //   // color: #FF4479;
          // }
          // &:nth-child(2) {
          //   right: 4%;
          //   top: 3%;
          // }
          &:nth-child(1) {
            left: 4%;
            bottom: 3%;
          }
          &:nth-child(2) {
            right: 4%;
            bottom: 3%;
          }
        }
        i {
          color: $f;
          font-size: 1.5rem;
        }
        .like {
          color: $p;
        }
        .watch {
          color: $p;
        }
      }
    }
    .item-body {
      // border: 1px solid #F0F0F0;
      padding: 1rem;
      .item-desc {
        font-size: 1.6rem;
        color: #333333;
        font-weight: bold;
        // display: flex;
        // justify-content: space-evenly;
        // align-items: center;
        // i {
        //   position: absolute;
        //   right: 0;
        //   cursor: pointer;
        // }
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
