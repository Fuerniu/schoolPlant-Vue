<template>
  <div class="file">
    <form name='picForm' action="javascript:;" method="post" enctype="multipart/form-data">
      <input type="text" name="name" id="name" v-model='name'>
      <input type="file" name="file" value="选择文件" ref="fileUpload">
      <input type="button" value="提交" @click="uploadImg">
    </form>
  </div>
</template>

<script>
export default {
  name: 'file',
  data () {
    return {
      files: '',
      name: ''
    }
  },
  methods: {
    uploadImg () {
      // let formData = new FormData(document.forms.namedItem('picForm'))
      const files = this.$refs.fileUpload.files
      console.log(files, 'files')
      console.log(files[0].name, 'files')
      let param = new FormData()
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      param.append('file', files[0])
      param.append('name', this.name)
      this.$axios.post('/plant/upload', param, config).then(res => {
        console.log(res.data)
      })
      // this.$axios.post('/plant/upload').then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="scss">
.file {
  margin-top: 10rem;
}
</style>
