import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navList: [
      { id: 0, name: '首页', path: '/home', show: true },
      { id: 1, name: '植物图库', path: '/plantdb', show: true },
      { id: 3, name: '植物地图', path: '/plantmap', show: true },
      { id: 2, name: '校园相册', path: '/plantalbum', show: true },
      { id: 4, name: '我的图库', path: '/mine', show: true }
    ],
    navList2: [
      { id: 0, name: '首页', path: '/home', show: true },
      { id: 1, name: '植物图库', path: '/plantdb', show: true },
      { id: 3, name: '植物地图', path: '/plantmap', show: true },
      { id: 4, name: '我的图库', path: '/mine', show: true }
    ],
    iList: [
      { id: 1, class: 'el-icon-star-on', info: '喜欢' }
      // { id: 2, class: 'el-icon-view', info: '关注' }
    ],
    myIList: [
      { id: 3, class: 'el-icon-delete', info: '删除' },
      { id: 4, class: 'el-icon-edit', info: '编辑' }
    ],
    username: '',
    bcImg: ''
  },
  mutations: {
    loginHome (state, name) {
      state.username = name
    },
    getBcImg (state, url) {
      state.bcImg = url
    }
  },
  actions: {
    loginHome (ctx, name) {
      ctx.commit('loginHome', name)
    },
    getBcImg (ctx, url) {
      // console.log(url, 'url')
      ctx.commit('getBcImg', url)
    }
  }
})
