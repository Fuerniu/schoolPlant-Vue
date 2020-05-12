<template>
  <div class="upload">
    <div class="up-form">
      <h2>我的上传</h2>
      <el-form ref="form" :model="form" label-width="160px" :rules="rules">
        <el-form-item label="填写拍摄点名称" prop='posiName'>
          <!-- <el-input v-model="form.posiName" placeholder="请填写拍摄点名称" clearable></el-input> -->
          <el-select v-model="form.posiName" filterable placeholder="请填写拍摄点名称">
            <el-option v-for="(item) in pointsList"
            :key="item.id" :label='item.area_name'
            :value='item.area_name'>
            </el-option>
          </el-select>
        </el-form-item>
        <div class="lnglat flex">
          <el-form-item label="填写拍摄点坐标" prop='posiLoc'>
            <el-input v-model="form.posiLoc" placeholder="请填写拍摄点坐标"></el-input>
          </el-form-item>
          <div class="form-map">
            <minis-map @getPoint='showPoint'></minis-map>
          </div>
        </div>
        <el-form-item label="填写植物名称" prop='plantName'>
          <el-input v-model="form.plantName" placeholder="请填写植物名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传拍摄图片" class="form-upload">
          <el-upload
            class="upload-img"
            ref='upload'
            action="#"
            accept="image/jpeg,image/png,image/jpg"
            :on-exceed="handleExceed"
            :limit="1"
            :on-preview="handlePreview"
            :auto-upload='false'
            :before-upload="beforeUpload"
            :http-request='uploadImg'>
            <el-button size="small" type="primary">选择图片</el-button>
          </el-upload>
          <!-- :action="upload_url" -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpload">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <full-loading :show="loading"/>
  </div>
</template>

<script>
import MinisMap from '@/components/MinisMap'
import FullLoading from './FullLoading'
import { fakePoint } from '@/assets/json/fakeData'

export default {
  name: 'upload',
  data () {
    return {
      loading: false,
      form: {
        posiName: '',
        posiLoc: '',
        plantName: ''
      },
      fileUrl: '',
      rules: {
        posiName: [
          { required: true, message: '请填写拍摄点名称', trigger: 'blur' }
        ],
        posiLoc: [
          { required: true, message: '请填写拍摄点坐标', trigger: 'change' }
        ],
        plantName: [
          { required: true, message: '请填写植物名称', trigger: 'blur' }
        ],
        fileUrl: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      },
      value: '',
      options: [
        { label: '', value: '' }
      ],
      pointsList: fakePoint
    }
  },
  components: {
    MinisMap,
    FullLoading
  },
  mounted () {
    // this.getMapPoint()
  },
  methods: {
    handleExceed: function () {
      this.$message({
        message: '请先删除选择的图片，再上传',
        type: 'warning'
      })
    },
    handlePreview (file) {
      // console.log(file)
    },
    beforeUpload (file) {
      // console.log(file)
    },
    submitUpload () {
      this.$refs.form.validate(valid => {
        this.$refs.upload.submit()
        this.loading = true
      })
    },
    uploadImg (val) {
      // this.loading = true
      let fd = new FormData()
      fd.append('posiName', this.form.posiName)
      fd.append('posiLoc', this.form.posiLoc)
      fd.append('plantName', this.form.plantName)
      fd.append('file', val.file)
      this.$axios.post('/plant/upload', fd).then(res => {
        if (res.data.code === 200) {
          this.loading = false
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '上传失败'
          })
          this.loading = false
        }
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '上传失败'
        })
        this.loading = false
        // console.error(err)
      })
    },
    clearFiles () {
      this.$refs.upload.clearFiles()
    },
    showPoint (lonLat) {
      this.form.posiLoc = lonLat
    }
    // getMapPoint () {
    //   this.$axios.get('/map/list'
    //   ).then(res => {
    //     res = res.data
    //     if (res.code === 200) {
    //       let a = []
    //       res.data.forEach(item => {
    //         let lng = Number(item.center.split(',')[0])
    //         let lat = Number(item.center.split(',')[1])
    //         item.center = [lng, lat]
    //         a.push(
    //           {
    //             id: item.id,
    //             position: item.center,
    //             name: item.area_name
    //           }
    //         )
    //       })
    //       this.pointsList = a
    //     }
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // }
  }
}
</script>

<style lang="scss">
.upload {
  background-color: #e9e9e9;
  background-size: cover;
  // margin-top: 6rem;
  padding-top: 1.5rem;
  position: absolute;
  width: 100%;
  top: 6rem;
  bottom: 0;
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btnflex {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .up-form {
    width: 75%;
    height: 96%;
    background-color: #fff;
    margin: 0 auto;
    h2 {
      margin: 0;
      height: 6rem;
      line-height: 6rem;
      font-size: 2rem;
    }
    .el-form {
      width: 70%;
      margin: 0 auto;
      text-align: left;
      .el-form-item {
        margin-bottom: 2rem;
        label {
          font-size: 1.8rem;
          width: 16rem;
        }
        .el-input {
          width: 60%;
          font-size: 1.5rem;
        }
        .upload-img {
          padding: 1rem 2rem;
          border: 1px solid #DCDFE6;
          display: flex;
          .el-upload {
            text-align: left;
            width: 30%;
          }
          .el-upload-list {
            width: 70%;
            .el-upload-list__item-thumbnail {
              height: 100%;
            }
            li {
              height: 100%;
              display: flex;
              justify-content: space-between;
              img {
                width: 60%;
              }
              a {
                width: 100%;
                margin: 0;
              }
            }
          }
        }
        &.form-upload {
          .el-form-item__content {
            width: 60%;
          }
        }
        &:first-child {
          .el-input {
            width: 100%;
          }
        }
        &:last-child {
          margin-bottom: 0;
          .el-form-item__content {
            margin-left: 0!important;
            display: flex;
            justify-content: space-around;
          }
        }
      }
      .lnglat {
        margin-bottom: 2rem;
        .el-input {
          width: 90%;
        }
        .form-map {
          width: 50%;
          height: 20rem;
          position: relative;
        }
      }
    }
  }
}
</style>
