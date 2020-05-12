export default {
  namesapced: true,
  state: {
    username: ''
  },
  mutations: {
    loginHome (state, name) {
      state.username = name
    }
  },
  actions: {
    loginHome (ctx, name) {
      ctx.commit('loginHome', name)
    }
  },
  modules: {
  }
}
