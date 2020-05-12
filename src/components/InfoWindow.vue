<template>
  <div class="box">
    <div class="info-window">
      <p>中心点坐标: {{ pointInfo.center }}</p>
      <p>覆盖范围: {{ pointInfo.cover }}</p>
      <p @click="toImgDb(pointInfo.area_name)">图片数量: {{ pointInfo.total }}张</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mainheader',
  props: ['imgNums', 'pointInfo'],
  data () {
    return {

    }
  },
  methods: {
    toImgDb (name) {
      this.$router.push(
        { path: '/plantmap/list', query: { name: name } }
      )
    }
  }
}

</script>

<style lang="scss">
$c: #000;

.info-window {
  width: 25rem;
  p {
    font-size: 1.4rem;
    color: $c;
    margin: 0.8rem 0.4rem;
    &:last-child {
      color: #666;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: $c;
        transition: text-decoration 0.2s ease, color 0.2s ease;
      }
    }
  }
}
</style>
