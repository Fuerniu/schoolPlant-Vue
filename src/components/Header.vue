<template>
  <header ref='header'>
    <ul id="nav" v-if='isLogin'>
      <li>
        <span>
          <img src="../assets/slogo.png" alt="logo" width="40px" >
        </span>
      </li>
      <li v-for="item in navList" :key='item.id'>
        <span :class="{ 'active': item.path === curPath }" @click="navChange(item)">{{ item.name }}</span>
      </li>
    </ul>
    <ul id="nav" v-else>
      <li>
        <img src="../assets/slogo.png" alt="logo" width="40px" >
      </li>
      <li v-for="item in navList2" :key='item.id' >
        <span :class="{ 'active': item.path === curPath }" @click="navChange(item)">{{ item.name }}</span>
      </li>
    </ul>
  </header>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
export default {
  name: 'mainheader',
  data () {
    return {
      // curId: 0,
      curPath: '/home',
      isLogin: false
    }
  },
  computed: {
    // 箭头函数可使代码更简练
    // ...mapState({
    //   navList: state => state.navList,
    //   navList2: state => state.navList2
    // }),
    ...mapState(['navList', 'navList2'])
  },
  mounted () {
    // console.log(this.navList)
    let token = window.sessionStorage.getItem('username')
    if (!token) {
      this.isLogin = false
    } else {
      this.isLogin = true
    }
  },
  methods: {
    navChange (item) {
      // this.curId = item.id
      this.curPath = item.path
      this.$router.push(item.path).catch(err => err)
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // 当路由变化的时候重新渲染header组件
        this.curPath = val.path
        let header = this.$refs.header
        if (val.path === '/plantdetail' || val.path === '/home' || val.path === '/login') {
          header.style.display = 'none'
          // header.style.zIndex = '-1'
        } else {
          header.style.display = 'block'
          header.style.zIndex = '2'
        }
      },
      // 立刻监听
      immeditate: true
    }
  }
}

</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);

// * {
//   box-sizing: border-box;
//   margin: 0;
//   padding: 0;
// }
header {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  ul {
    // line-height: 8rem;
    height: 8rem;
    display: flex;
    margin: 0;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    li {
      span {
        color: #8590a6;
        font-weight: 500;
        font-size: 1.8rem;
        letter-spacing: .2rem;
        &:hover {
          cursor: pointer;
          color: #000;
        }
        &.active {
          color: #000;
        }
      }
    }
  }
  a {
    font-weight: bold;
    font-size: 2rem;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #fff;
    }
  }
}
</style>
