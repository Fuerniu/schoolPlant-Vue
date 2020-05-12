// 导入自己需要的组件
import { Select, Option, OptionGroup, Input, Row, Col,
  Button, Popover, Collapse, CollapseItem, Icon, Form, FormItem,
  Upload, Dialog, Message, MessageBox, Loading, Drawer, Backtop } from 'element-ui'
import Vue from 'vue'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Popover)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Icon)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Upload)
    Vue.use(Dialog)
    Vue.use(Loading)
    Vue.use(Drawer)
    Vue.use(Backtop)
  }
}
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

export default element
