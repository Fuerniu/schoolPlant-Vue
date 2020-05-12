<template>
  <div class="plantdb">
    <div class="search-group">
      <div class="search-div">
        <div class="cn-input">
          <el-input placeholder="请输入关键字" v-model="saerchVal" class="input-with-select"
          @keyup.enter.native="listSearch" clearable>
            <el-select v-model="selValue" slot="prepend" placeholder="请选择查询条件">
              <el-option
                v-for="item in selOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click.native="listSearch"></el-button>
          </el-input>
        </div>
        <!-- <div class="cn-group">
          <el-button size='mini' @click="cnSearch(item)" v-for='(item) in cnList' :key="item.id" :class="{ 'light': item.id === curId }">{{ item.name }}</el-button>
        </div>
        <div class="en-group"></div> -->
      </div>
    </div>
    <full-loading :show="fullloading"/>
    <loading :show="loading"/>
    <div class="water-fall">
      <el-backtop :right='0' :bottom='30'>
        <i class="el-icon-top"></i>
        <!-- <div>hahahah</div> -->
      </el-backtop>
      <div class="info-text" v-show="isNull">
        <h2>找不到图片</h2>
      </div>
      <water-fall :picData='picList' :isNext='isNext'></water-fall>
      <!-- <template>
      </template> -->
    </div>
  </div>
</template>

<script>
import WaterFall from '@/components/Waterfall'
import FullLoading from '@/components/FullLoading'
import Loading from '@/components/Loading'
import { generateBig, throttle } from '@/util/index'

const cnList = generateBig()
export default {
  name: 'plantdb',
  data () {
    return {
      data: [],
      col: 5,
      curId: 0,
      isNull: false,
      // familyLetter: '',
      picList: [],
      loading: false,
      fullloading: false,
      // 分类列表
      cnList: cnList,
      saerchVal: '',
      selOptions: [
        { label: '中文学名首字母', value: 1 },
        { label: '英文学名首字母', value: 2 },
        { label: '科名首字母', value: 3 }
      ],
      currentPage: 1,
      pageSize: 15,
      // 判断是否还能进行下一次请求
      isNext: true,
      // 判断是否是先进行搜索查询过
      isSearch: false,
      // 选择框中的值
      selValue: ''
    }
  },
  created () {
    // scroll = 0
  },
  mounted () {
    let _self = this
    this.getPicData()
    this.throttleLoad = throttle(() => {
      _self.scrollChange()
    }, 200)
    window.addEventListener('scroll', this.throttleLoad)
  },
  computed: {
    // picList: {
    //   // 回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
    //   get () {
    //     console.log(this.getPicData()[0], 'hahah')
    //     return this.getPicData()
    //   }
    // }
  },
  components: {
    WaterFall,
    FullLoading,
    Loading
  },
  methods: {
    handleCl () {
      alert('haha')
    },
    // 获取每一种分类的信息
    cnSearch (item) {
      this.curId = item.id
    },
    listSearch () {
      // 如果input输入框中没有值
      if (!this.saerchVal) {
        this.getPicData()
        return
      }
      this.fullloading = true
      this.infoSearch()
    },
    handleUrl () {
      let key = this.selValue
      let url = ''
      switch (key) {
        // 1 中文学名
        case 1:
          url = '/plant/cname'
          break
        // 2 英文学名
        case 2:
          url = '/plant/ename'
          break
        // 3 科名首字母
        case 3:
          url = '/plant/family'
          break
        default:
          url = '/plant/cname'
      }
      return url
    },
    // 按照不同查询条件查询
    infoSearch () {
      let url = this.handleUrl()
      this.$axios.post(
        url,
        { key: this.saerchVal.trim() || '' }
      ).then(res => {
        res = res.data
        if (res.code === 200) {
          let a = []
          if (res.data.length) {
            this.isNull = false
            res.data.forEach(v => {
              a.push(
                {
                  id: v.id,
                  picpath: v.picpath,
                  cname: v.cn_name,
                  ename: v.en_name,
                  fname: v.family_name,
                  address: v.address
                }
              )
            })
          } else {
            this.isNull = true
          }
          this.isSearch = true
          this.picList = a
          setTimeout(() => {
            this.fullloading = false
          }, 1000)
        }
      })
    },
    // 点击获取每一种植物的详细信息
    toDetail (item) {
      // window.open('http://ww.baidu.com', '_blank')
      this.$router.push(
        { path: '/plantdetail', query: { title: item.title } }
      )
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
        this.getPicData(this.currentPage)
      }
    },
    // 获取图片数据
    getPicData (val) {
      // debugger
      if (!val) {
        val = 1
      }
      if (this.isNext) {
        if (this.currentPage === 1) {
          this.fullloading = true
          this.loading = false
        } else {
          this.loading = true
          this.fullloading = false
        }
        this.$axios.get(
          '/plant/list',
          { params:
            { page: val }
          }
        ).then(res => {
          res = res.data
          if (res.code === 200) {
            let a = []
            res.data.forEach(v => {
              a.push(
                {
                  id: v.id,
                  picpath: v.picpath,
                  cname: v.cn_name,
                  ename: v.en_name,
                  fname: v.family_name,
                  address: v.address
                }
              )
            })
            if (a.length < this.pageSize) {
              this.isNext = false
              this.currentPage = 1
            }
            // 如果先进行了搜索
            if (this.isSearch) {
              this.picList = a
            } else {
              this.picList = this.picList.concat(a)
            }
            this.isSearch = false
            setTimeout(() => {
              if (this.loading) {
                this.loading = false
              }
              if (this.fullloading) {
                this.fullloading = false
              }
            }, 1500)
          }
        }).catch(() => {
          this.loading = false
          this.fullloading = false
          // console.error(err)
        })
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.throttleLoad)
  }
  // beforeRouterLeave (to, from, next) {
  //   window.removeEventListener('scroll', this.scrollChange, true)
  //   // this.currentPage = 1
  //   next()
  // }
}

</script>

<style lang="scss">
.plantdb {
  background-color: #e9e9e9;
  padding-top: 1.5rem;
  top: 8rem;
  position: relative;
  width: 100%;
  .search-group {
    border-radius: 3px 3px 3px 3px;
    box-shadow: 0 1px 3px rgba(34, 25, 25, 0.2);
    background-color: #fff;
    width: 95%;
    font-size: 1.8rem;
    margin: 0 auto 1.5rem;
    .search-div {
        padding: 10px 10px 10px 24px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .search-label {
          .el-select {
            margin-left: 1rem;
            .el-option {
              .el-input {
                width: 75%;
              }
            }
          }
        }
        .cn-group {
          width: 75%;
          // margin: 0 auto;
          button {
            background-color: #fff;
            color: #24292e;
            border: 1px solid rgba(27, 31, 35, 0.2);
            border-radius: 0.25em;
            width: 4rem;
            font-size: 1.6rem;
            margin: 4px 0;
            margin-right: 2rem;
            cursor: pointer;
            outline: none;
            &.light {
              background-color: #66ccff;
            }
            &:hover {
              // border: 1px solid #66ccff;
              background-color:#66ccff;
              transition: background-color 0.2s ease;
            }
          }
        }
        .cn-input {
          width: 60%;
          .input-with-select {
            .el-input-group__prepend {
              width: 25%;
              .el-select .el-input {
                width: 100%;
              }
            }
            .el-input-group__append {
              width: 10%;
            }
          }
        }
    }
  }
  .water-fall {
    position: relative;
    .info-text {
      h2 {
        font-size: 2rem;
      }
    }
  }
}
</style>
