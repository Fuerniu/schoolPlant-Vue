
<template>
  <div class="home" ref='home'>
    <div class="h-content">
      <div class="h-header">
        <div class="h-content flex">
          <div class="h-left flex2">
            <img src="../assets/slogo.png" alt="logo" width="40px" title="安中校园药植网">
            <ul v-if="isLogin">
              <li v-for="item in navList" :key="item.id">
                <a href="javascript:;" @click="navChange(item)">{{ item.name }}</a>
              </li>
            </ul>
            <ul v-else>
              <li v-for="item in navList2" :key="item.id">
                <a href="javascript:;" @click="navChange(item)">{{ item.name }}</a>
              </li>
            </ul>
          </div>
          <div class="h-btn flex" @click='toLogin' v-show="!isLogin">
            <a href="javascript:;" title='登录'>登录</a>
            <div class='user'>
              <i class="user-icon pcenter"></i>
            </div>
          </div>
          <div class="h-btn flex" v-show="isLogin">
            <div class="flex">
              <div class='user'>
                <i class="user-icon pcenter"></i>
              </div>
              <span>Hello {{ username }}!</span>
            </div>
            <a href="javascript:;" title='上传图片' class='i-plus' @click='toPlus'><i class="el-icon-plus"></i></a>
          </div>
        </div>
      </div>
      <!-- <div class="h-body">
        <div class="search-in" ref='search'>
          <input type="text" v-model='inputCont' placeholder="学名、中文名、首字母" @focus="inputFocus" @blur="inputBlur">
          <div class="search-icon" @click='searchInfo'>
            <span></span>
          </div>
        </div>
      </div> -->
      <my-swipper swipeid="swipe" ref="swiper">
        <div v-for="top in tops" :key="top.title" class="swiper-slide" slot="swiper-con">
            <div class="swiper-item">
              <img :src="top.image" width="100%">
              <h3>{{ top.title }}</h3>
            </div>
        </div>
      </my-swipper>
      <div class="h-footer">
        <div class="footer">
          <!-- <div class="showqr" v-show='isQr'>
            <p>我的二维码</p>
            <img src="../assets/code.jpg" alt="我的二维码" width="80px">
          </div> -->
          <!-- <ul>
            <li>
              <span>联系我们</span>
            </li>
            <li>
              <span>联系我们</span>
            </li>
            <li>
              <span>联系我们</span>
            </li>
          </ul> -->
          <ul>
            <li>
              <a href="javascript:;">
                <span>相关网站</span>
              </a>
            </li>
            <li v-for="item in linkList" :key="item.id">
              <a :href="item.href" target="_blank">
                <span>{{ item.name }}</span>
              </a>
            </li>
          </ul>
          <!-- <div>
            © 安徽中医药大学 版权所有
          </div> -->
        </div>
      </div>
    </div>
    <div class="bc" v-show="isFocus"></div>
  </div>
</template>

<script>
import MySwipper from '@/components/MySwipper'
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState, mapActions } from 'vuex'

export default {
  name: 'about',
  data () {
    return {
      tops: [
        { id: 1, image: 'https://actstatic.xingse.net/resource/images/main/ditu_01.jpg', title: '遇见她，就上传' },
        { id: 2, image: 'https://actstatic.xingse.net/resource/images/main/ditu_02.jpg', title: '好植物，要分享' },
        { id: 3, image: 'https://actstatic.xingse.net/resource/images/main/ditu_03.jpg', title: '有疑问，大家帮' },
        { id: 4, image: 'https://actstatic.xingse.net/resource/images/main/ditu_04.jpg', title: '好故事，一起读' }
      ],
      linkList: [
        { id: 1, name: 'PPBC', href: 'http://ppbc.iplant.cn' },
        { id: 2, name: '邱园', href: 'http://www.kew.org' },
        { id: 3, name: '植物智', href: 'http://www.iplant.cn' },
        { id: 4, name: '植物之家', href: 'https://www.zw3e.com' },
        { id: 5, name: '植物通', href: 'https://www.zhiwutong.com' },
        { id: 6, name: '形色', href: 'https://actstatic.xingse.net' }
      ],
      swipe: 'swipe',
      // 雪碧图
      spriteImg: 'https://cn.bing.com/sa/simg/hpc27.png',
      isFocus: false,
      isQr: false,
      isChange: false,
      // 判断是否登录
      isLogin: false,
      inputCont: '',
      username: ''
    }
  },
  mounted () {
    // let home = this.$refs.home
    // if (!this.bcImg) {
    //   this.getImg()
    // } else {
    //   home.style.backgroundImage = `url('${this.bcImg}')`
    // }
    let username = window.sessionStorage.getItem('username')
    if (username) {
      this.username = username
      this.isLogin = true
    }
  },
  computed: {
    // 箭头函数可使代码更简练
    ...mapState(['navList', 'navList2', 'bcImg'])
  },
  components: {
    MySwipper
  },
  methods: {
    ...mapActions(['getBcImg']),
    navChange (item) {
      this.$router.push(`${item.path}`)
    },
    inputFocus () {
      this.isFocus = true
      let search = this.$refs.search
      search.style.zIndex = 2
    },
    inputBlur () {
      this.isFocus = false
      let search = this.$refs.search
      search.style.zIndex = 1
    },
    searchInfo () {
      if (!this.inputCont) {
        return false
      } else {
        this.$router.push('/plantdetail')
      }
    },
    toLogin () {
      this.$router.push('/login')
    },
    toPlus () {
      this.$router.push('/upload')
    },
    showQr () {
      this.isQr = true
    },
    hideQr () {
      this.isQr = false
    },
    getImg () {
      let home = this.$refs.home
      this.$axios.get('/home/backimg'
      ).then(res => {
        res = res.data
        // let a = []
        if (res.code === 200) {
          if (res.data) {
            // res.data.forEach(item => {
            //   a.push({ backImg: item.backImg })
            // })
            home.style.backgroundImage = `url('${res.data.backImg}')`
            // 将背景图片的值存入到store中
            this.getBcImg(`${res.data.backImg}`)
          } else {
            home.style.backgroundImage = `url('https://cn.bing.com/th?id=OHR.WalkingCentral_ZH-CN6818231087_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')`
          }
        }
      }).catch(() => {
        home.style.backgroundImage = `url('https://cn.bing.com/th?id=OHR.CordovanCourts_ZH-CN8989880218_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')`
        // console.error(err)
      })
    },
    prevImg () {
      let home = this.$refs.home
      home.style.backgroundImage = `url('https://cn.bing.com/th?id=OHR.CarrickSpring_ZH-CN7085146237_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')`
    },
    nextImg () {
      let home = this.$refs.home
      home.style.backgroundImage = `url('https://cn.bing.com/th?id=OHR.WalkingCentral_ZH-CN6818231087_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')`
    }
  }
}

</script>

<style lang="scss" scoped>
$f: #fff;
$b: #000;
.home {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background: $f;
  // background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  // background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  // background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  // background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  // background: url('https://actstatic.xingse.net/resource/images/main/bottombg-green.jpg') no-repeat center;
  background-size: cover;
  animation-delay: 0s;
  animation-name: fadein;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  @keyframes fadein {
    // 0% { opacity: 0; }
    0% { background-color: #666; }
    100% { opacity: 1; }
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex2 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .br {
    border: 2px solid #A6C8FF;
  }
  .bc, .bc2 {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.3);
  }
  .bc2 {
    background-color: #666;
  }
  .pcenter {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);;
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    li {
      margin-right: 2rem;
      font-family: Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", STXihei, STHeiti, Heiti, SimSun, sans-serif;
    }
  }
  .swiper-slide {
    // height: 40rem!important;
    .swiper-item {
      position: relative;
      height: 100%;
      h3 {
        margin: 0;
        color: $f;
        font-size: 3rem;
        position: absolute;
        top: 30%;
        // transform: translateY(-50%);
        right: 10%;
      }
    }
  }
  .h-content {
    height: 100%;
    position: relative;
    .h-header {
      background-color: $f;
      // padding: 1rem 0;
      line-height: 8rem;
      height: 8rem;
      position: fixed;
      width: 100%;
      z-index: 3;
      .h-content {
        margin: 0 auto;
        width: 75%;
      }
      img {
        cursor: pointer;
      }
      a {
        font-size: 2rem;
        margin-left: 18px;
        margin-right: 18px;
        color: #181818;
        text-decoration: none;
        &:hover {
          transition: color .2s ease;
          color: rgba(0,223,182, 1);
        }
      }
      .h-btn {
        cursor: pointer;
        color: $b;
        a {
          color: $b;
          font-size: 1.4rem;
        }
        .i-plus {
          background: #ececec;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          line-height: 30px;
          i {
            color: #ababab;
          }
        }
        .user {
          display: inline-block;
          border-radius: 16px;
          background-color: #ececec;
          height: 3rem;
          width: 3rem;
          position: relative;
          .user-icon {
            height: 1.7rem;
            width: 1.6rem;
            background: transparent url('https://cn.bing.com/sa/simg/hpc27.png') no-repeat;
            background-position: -19px -157px;
          }
        }
        span {
          margin-left: 1rem;
        }
      }
    }
    .h-body {
      position: absolute;
      top: 15%;
      left: 10%;
      width: 100%;
      z-index: 2;
      .search-in {
        width: 50%;
        border-radius: 6px;
        background-color: #fff;
        border: 1px #ccc solid;
        padding: 0;
        position: relative;
        &:hover {
          box-shadow: 0 2px 4px rgba(0,0,0,.3);
          transition: box-shadow .2s ease;
        }
        input {
          width: 90%;
          border: 0;
          margin: 0.8rem 0;
          padding: 0 1rem 0 0;
          max-height: 30px;
          outline: none;
          -webkit-appearance: none;
          border-color: #ccc;
          box-sizing: content-box;
          position: relative;
          height: 4rem;
          font-size: 1.6rem;
        }
        .search-icon {
          position: absolute;
          right: 0%;
          top: -3%;
          cursor: pointer;
          span {
            display: inline-block;
            height: 44px;
            width: 44px;
            background: transparent url('https://cn.bing.com/sa/simg/hpc27.png') no-repeat;
            background-position: -160px -54px;
          }
        }
      }
    }
    .h-footer {
      user-select: none;
      position: absolute;
      left: 0;
      width: 100%;
      .footer {
        // position: absolute;
        // right: 0;
        margin: 2rem 0;
        ul {
          width: 75rem;
          padding: 0;
          margin: 0 auto;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        li {
          margin-right: 0;
          a {
              display: inline-block;
              text-decoration: none;
              vertical-align: top;
              margin: 0 2rem;
              img {
                width: 233px;
              }
              span {
                color: $b;
                font-size: 2rem;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          &:not(:first-child) {
            border-left: 1px solid $b;
          }
          &:first-child {
            span {
              cursor: default;
              &:hover {
                text-decoration: none;
              }
            }
          }
        }
        .showqr {
          position: absolute;
          background-color: rgba(0,0,0,.6);
          background-size: 100%;
          border: 1px solid $b;
          width: 15rem;
          bottom: 200%;
          color: $b;
          font-size: 1.6rem;
          padding: 1rem 0 2rem;
          p {
            margin: 0;
            margin-bottom: 1rem;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
