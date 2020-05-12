<template>
  <div class="mine">
    <div v-if='isAdmin' class="m-onyainer">
      <div class="m-info flex">
        <div class="flex2">
          <img src="../assets/user.png" alt="user" width="100px">
          <div class="desc">
            <span>{{ username }}</span><br>
            <!-- <span>{{ username }}</span><br> -->
          </div>
        </div>
        <el-popover placement='bottom'>
          <div v-for="item in opeList" :key="item.id">
            <el-button :icon='item.icon' type="text" @click.native="myOperate(item.id)">
              {{ item.name }}
            </el-button>
          </div>
          <el-button slot="reference" icon="el-icon-menu" circle plain></el-button>
        </el-popover>
      </div>
      <div class="usercount">
        <ul class="flex2">
          <li><a href="javascript:;">{{ picNum }}</a><br><a href="javascript:;">照片</a></li>
          <li><a href="javascript:;">{{ watchNum }}</a><br><a href="javascript:;">关注</a></li>
          <!-- <li v-for='item in mineInfo' :key="item.text"><a href="javascript:;">{{ item.num }}</a><br><a href="javascript:;">{{ item.text }}</a></li> -->
        </ul>
      </div>
      <div>
        <water-fall :picData='picList' v-if="!isNull" @getMinePic='getMinePic' :col='4'></water-fall>
        <div class="info-text" v-else>
          <h2>您还未上传任何图片,<a href="javascript:;" @click="myOperate(1)">去上传</a></h2>
        </div>
      </div>
    </div>
    <div v-else class="unadmin-info">
      <span>您还未登录,<a href="javascript:;" @click="toLogin">去登录</a></span>
    </div>
  </div>
</template>

<script>
import WaterFall from '@/components/Waterfall2'
const moment = require('moment')

export default {
  name: 'about',
  data () {
    return {
      username: '',
      isAdmin: false,
      isNull: false,
      watchNum: 0,
      picNum: 0,
      picList: [
        {
          img:
            'https://image.watsons.com.cn//upload/083767f0.JPG?w=828&h=620&x-oss-process=image/resize,w_1080',
          avatar:
            'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
          title: '150元搞定全套护肤品，这些护肤好物必须交出来！',
          user: '迷人的小妖精迷人的小妖精',
          like: '952'
        }
      ],
      opeList: [
        { id: 1, name: '上传照片', icon: 'el-icon-upload' },
        { id: 2, name: '我的图库', icon: 'el-icon-picture' },
        { id: 3, name: '退出登录', icon: 'el-icon-s-home' }
      ],
      mineInfo: [
        { id: 1, text: '照片', num: 0 },
        { id: 2, text: '喜欢', num: 0 },
        { id: 3, text: '关注', num: 0 }
      ]
    }
  },
  inject: ['reload', 'header'],
  components: {
    WaterFall
  },
  mounted () {
    this.username = window.sessionStorage.getItem('username') || ''
    this.getMinePic()
  },
  methods: {
    getMinePic () {
      let token = window.sessionStorage.getItem('username')
      // 如果已经登录
      if (token) {
        this.isAdmin = true
        this.$axios.get('/plant/mypic',
          { params: { author: token } }
        ).then(res => {
          res = res.data
          if (res.code === 200) {
            // let a = []
            if (!res.data.length) {
              this.isNull = true
              return
            }
            this.getWatchMe()
            res.data.forEach((item, index) => {
              // res.data[index].picpath = `data:image/jpeg;base64,${item.picpath}`
              res.data[index].picpath = `/images/${item.picpath}`
              // http://121.199.15.196/images/code.jpg
              res.data[index].createtime = moment(res.data[index].createtime).format('YYYY-MM-DD')
              res.data[index].isHover = false
              res.data[index].isLike = false
              res.data[index].isWatch = false
              res.data[index].isEdit = false
            })
            this.picList = res.data
            this.picNum = res.data.length || 0
          }
        })
      }
    },
    // 获取关注我的数量
    getWatchMe () {
      this.$axios.post('/user/watchme', {
        username: this.username
      }).then(res => {
        res = res.data
        if (res.code === 200) {
          this.watchNum = res.data.watchNum || 0
        }
      })
    },
    myOperate (id) {
      switch (id) {
        case 1:
          this.$router.push('/upload')
          break
        case 2:
          this.reload()
          break
        default:
          this.exit()
          break
      }
    },
    toLogin () {
      this.$router.push('/login')
    },
    exit () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.$message({
          type: 'success',
          duration: 2000,
          message: '退出成功!'
        })
        this.$router.push('/home')
        this.header()
      })
    }
  }
}

</script>

<style lang="scss">
.mine {
  position: absolute;
  width: 100%;
  padding-top: 1.5rem;
  top: 8rem;
  background-color: #e9e9e9;
  .m-onyainer {
    width: 75%;
    margin: 0 auto;
  }
  .unadmin-info {
    font-size: 1.6rem;
    line-height: 25rem;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      padding: 1rem 3rem;
      a {
        display: block;
        text-decoration: none;
        color: #4c4c4c;
        font-size: 1.8rem;
      }
      &:not(:first-child) {
        border-left: 1px solid #efefef;
      }
      &:hover {
        background-color: #caecfc;
      }
    }
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
  .m-info {
    background-color: #fff;
    padding: 0 1.2rem;
    .plus {
      cursor: pointer;
    }
    .desc {
      span {
        &:first-child {
          font-size: 2.6rem;
          font-weight: 600;
        }
      }
    }
    & > span {
      margin-left: 5rem;
    }
  }
  .usercount {
    border-top: 1px solid #efefef;
    background-color: #fafafa;
    // text-align: center;
  }
  .pcenter {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);;
  }
  .user-icon {
    display: block;
    height: 3rem;
    width: 2.8rem;
    background: transparent url('https://cn.bing.com/sa/simg/hpc27.png') no-repeat;
    background-position: -19px -157px;
  }
}
.el-popover {
  width: 12rem;
}
.el-button--text {
  color: #606266;
  .el-button {
    &:hover {
      text-decoration: underline;
      background: none;
      border: none;
    }
  }
}
</style>
