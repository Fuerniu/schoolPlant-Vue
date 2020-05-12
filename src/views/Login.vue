<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"////////////>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div class="wrapper" ref='wrapper'>
    <div class="container">
      <h1>安中校园药植网</h1>
      <form class="form">
        <input type="text" placeholder="Username" ref='username' v-model="username" @keyup.enter="login">
        <input type="password" placeholder="Password" ref='password' v-model="password" @keyup.enter="login">
        <el-button type="button" id="login-button" :loading="loginLoad" @click="login">Login</el-button>
      </form>
    </div>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      username: '',
      password: '',
      loginLoad: false
    }
  },
  inject: ['header'],
  components: {
  },
  computed: {
    // 箭头函数可使代码更简练
    ...mapState(['bcImg'])
  },
  mounted () {
    let wrapper = this.$refs.wrapper
    if (!this.bcImg) {
      this.getImg()
    } else {
      wrapper.style.backgroundImage = `url('${this.bcImg}')`
    }
  },
  methods: {
    ...mapActions(['loginHome', 'getBcImg']),
    login () {
      // this.$axios.post('/user/login').then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.error(err)
      // })
      // return
      if (!this.username || !this.password) {
        this.$message({
          type: 'warning',
          duration: 3000,
          showClose: true,
          message: '请输入用户名或密码!'
        })
      } else {
        this.loginLoad = true
        this.$axios.post('/user/login', {
          username: this.username,
          password: this.password
        }).then(res => {
          res = res.data
          this.loginLoad = false
          if (res.code === 200) {
            this.$message({
              type: 'success',
              duration: 2000,
              message: '登录成功!'
            })
            this.$router.push('/home')
            // 刷新header组件
            this.header()
            window.sessionStorage.setItem('username', this.username)
            this.loginHome(this.username)
          } else {
            this.$message({
              type: 'error',
              message: '用户名或密码错误'
            })
          }
        }).catch(() => {
          this.loginLoad = false
          this.$message({
            type: 'error',
            message: '登录失败'
          })
          // console.error(err)
        })
      }
    },
    getImg () {
      let wrapper = this.$refs.wrapper
      this.$axios.get('/home/backimg'
      ).then(res => {
        res = res.data
        // let a = []
        if (res.code === 200) {
          if (res.data) {
            wrapper.style.backgroundImage = `url('${res.data.backImg}')`
            // 将背景图片的值存入到store中
            this.getBcImg(`${res.data.backImg}`)
          } else {
            wrapper.style.backgroundImage = `url('https://cn.bing.com/th?id=OHR.WalkingCentral_ZH-CN6818231087_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')`
          }
        }
      }).catch(() => {
        wrapper.style.backgroundImage = `url('https://cn.bing.com/th?id=OHR.CordovanCourts_ZH-CN8989880218_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')`
        // console.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);
$prim: #53e3a6;
$f: #fff;
$b: #000;
.wrapper{
    width: 100%;
    font-weight: 300;
    background: #666;
    // background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    // background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    // background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    // background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    // background-image: url('https://cn.bing.com//th?id=OHR.SiegeofCusco_ZH-CN9108219313_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    // &.form-success {
    //   .container{
    //     position: absolute;
    //     top: 45%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     h1{
    //       transform: translateY(85px);
    //     }
    //   }
    // }
  .container{
      margin: 0 auto;
      padding: 80px 0;
      h1 {
        color: $f;
        font-size: 4rem;
        font-weight: 600;
        letter-spacing: 4rem;
        text-shadow: 1px 1px 1px lightgray, -1px  -1px 1px  #aaa;
        transition-duration: 1s;
        transition-timing-function: ease-in-put;
      }
  }
}

form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
  input{
    display: block;
    appearance: none;
    outline: 0;
    // border: 1px solid fade(white, 40%);
    // background-color: fade(white, 20%);
    border: 1px solid rgba(255,255,255,.4);
    background-color: rgba(255,255,255,.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    // text-align: center;
    font-size: 2rem;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
    &:hover{
      background-color: rgba(255,255,255,.4);
    }
    &:focus{
      background-color: $f;
      width: 300px;
      color: $prim;
    }
    &:nth-child(2) {
      margin-top: 2rem;
    }
  }
  input::-webkit-input-placeholder { /* WebKit browsers */
    font-family: 'Source Sans Pro', sans-serif;
    color:white;
    font-weight: 300;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+ */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
  }
  button {
    margin-top: 1rem;
    appearance: none;
    outline: 0;
    // background-color: rgba(255,255,255,.4);
    background-color: $f;
    // border: 0;
    border: 1px solid rgba(255,255,255,.4);
    padding: 10px 15px;
    color: $b;
    border-radius: 3px;
    width: 28rem;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    transition-duration: 0.25s;
    height: 4.3rem;
    &:hover{
      // background-color: rgba(0,0,0,.2);
      // background-color: $b;
      color: $prim;
      transition: color .2s ease;
    }
  }
}

.bg-bubbles{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  li{
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255,255,255,.15);
    bottom: -160px;
    -webkit-animation: square 25s infinite;
    animation: square 25s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    &:nth-child(1){
      left: 10%;
    }

    &:nth-child(2){
      left: 20%;

      width: 80px;
      height: 80px;

      animation-delay: 2s;
      animation-duration: 17s;
    }

    &:nth-child(3){
      left: 25%;
      animation-delay: 4s;
    }

    &:nth-child(4){
      left: 40%;
      width: 60px;
      height: 60px;

      animation-duration: 22s;

      background-color: rgba(255,255,255,.25);
    }

    &:nth-child(5){
      left: 70%;
    }

    &:nth-child(6){
      left: 80%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
      background-color: rgba(255,255,255,.20);
    }

    &:nth-child(7){
      left: 32%;
      width: 160px;
      height: 160px;
      animation-delay: 7s;
    }

    &:nth-child(8){
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 15s;
      animation-duration: 40s;
    }

    &:nth-child(9){
      left: 25%;
      width: 10px;
      height: 10px;

      animation-delay: 2s;
      animation-duration: 40s;
      background-color: rgba(255,255,255,.30);
    }

    &:nth-child(10){
      left: 90%;
      width: 160px;
      height: 160px;
      animation-delay: 11s;
    }
  }
}
@-webkit-keyframes square {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-960px) rotate(600deg); }
}
@keyframes square {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-960px) rotate(600deg); }
}
</style>
