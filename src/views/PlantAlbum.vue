<template>
  <div class="plant-album">
    <div class="m-onyainer">
      <water-fall :picData='picList' v-if="!isNull" @getMinePic='getAlbumPic' :col='5'></water-fall>
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
      ]
    }
  },
  inject: ['reload'],
  components: {
    WaterFall
  },
  mounted () {
    this.getAlbumPic()
    this.username = window.sessionStorage.getItem('username') || ''
  },
  methods: {
    getAlbumPic () {
      let token = window.sessionStorage.getItem('username')
      // 如果已经登录
      if (token) {
        this.isAdmin = true
        this.$axios.get('/plant/mypic'
        ).then(res => {
          res = res.data
          if (res.code === 200) {
            // let a = []
            if (!res.data.length) {
              this.isNull = true
              return
            }
            res.data.forEach((item, index) => {
              res.data[index].picpath = `/images/${item.picpath}`
              res.data[index].createtime = moment(res.data[index].createtime).format('YYYY-MM-DD')
              res.data[index].isHover = false
              if (res.data[index].likeNum > 0) {
                res.data[index].isLike = true
              } else {
                res.data[index].isLike = false
              }
              res.data[index].isWatch = false
              res.data[index].isEdit = false
            })
            this.picList = res.data
            this.picNum = res.data.length || 0
          }
        })
      }
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
          message: '退出成功!'
        })
        this.$router.push('/home')
      })
    }
  }
}

</script>

<style lang="scss">
.plant-album {
  position: absolute;
  width: 100%;
  top: 8rem;
  padding-top: 1.5rem;
  background-color: #e9e9e9;
  .m-onyainer {
    width: 90%;
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
