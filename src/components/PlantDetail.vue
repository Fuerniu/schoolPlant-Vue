<template>
  <div class="plant-detail">
    <div class="back">
      <a href="javascript:;" @click="goBack">返回</a>
    </div>
    <div class="detail-box">
      <div class="detail-title borb">
        <div class="basic-info">
          <h2>{{ plantName }}</h2>
          <p>
            玫瑰（学名：Rosa rugosa）是蔷薇科蔷薇属植物，在日常生活中是蔷薇属一系列花大艳丽的栽培品种的统称。
            玫瑰原产是中国。在古时的汉语，“玫瑰”一词原意是指红色美玉。长久以来，玫瑰就象征着美丽和爱情。
            玫瑰属落叶灌木，枝杆多针刺，奇数羽状复叶，小叶5-9片，椭圆形，有边刺。花瓣倒卵形，重瓣至半重瓣，
            花有紫红色、白色，果期8-9月，扁球形。枝条较为柔弱软垂且多密刺，每年花期只有一次，因此较少用于育种，
            近来其主要被重视的特性为抗病性与耐寒性。
            玫瑰原产我国华北以及日本和朝鲜。我国各地均有栽培。
          </p>
        </div>
        <img :src="imgUrl" alt="玫瑰">
      </div>
      <div class="detail-category borb">
        <span class="d-box"></span>
        <ul>
          <li>目录</li>
          <li v-for="(item) in categoryList" :key="item.id" @click="toView(item)">
            <a :href="anchor">{{ item.name }}</a>
            <!-- <span>{{ item.name }}</span> -->
          </li>
        </ul>
      </div>
      <div id='environment' class="detail-environment borb" ref='environment'>
        <span class="d-box"></span>
        <h2>生长环境</h2>
        <p>
          玫瑰喜阳光充足，耐寒、耐旱，喜排水良好、疏松肥沃的壤土或轻壤土，在粘壤土中生长不良，开花不佳。
          宜栽植在通风良好、离墙壁较远的地方，以防日光反射，灼伤花苞，影响开花。
        </p>
      </div>
      <div id='apperance' class="detail-apperance borb" ref='apperance'>
        <span class="d-box"></span>
        <h2>形态特征</h2>
        <p>
          直立灌木，高可达2米；茎粗壮，丛生；小枝密被绒毛，并有针刺和腺毛，有直立或弯曲、淡黄色的皮刺，皮刺外被绒毛。
          小叶5-9，连叶柄长5-13厘米；小叶片椭圆形或椭圆状倒卵形，长1.5-4.5厘米，宽1-2.5厘米，
          先端急尖或圆钝，基部圆形或宽楔形，边缘有尖锐锯齿，上面深绿色，无毛，叶脉下陷，有褶皱，下面灰绿色，
          中脉突起，网脉明显，密被绒毛和腺毛，有时腺毛不明显；叶柄和叶轴密被绒毛和腺毛；托叶大部贴生于叶柄，
          离生部分卵形，边缘有带腺锯齿，下面被绒毛。
          花单生于叶腋，或数朵簇生，苞片卵形，边缘有腺毛，外被绒毛；花梗长5 -22 5毫米，
          密被绒毛和腺毛；花直径4-5.5厘米；萼片卵状披针形，先端尾状渐尖，常有羽状裂片而扩展成叶状，
          上面有稀疏柔毛，下面密被柔毛和腺毛；花瓣倒卵形，重瓣至半重瓣，芳香，紫红色至白色；
          花柱离生，被毛，稍伸出萼筒口外，比雄蕊短很多。
          果扁球形，直径2-2.5厘米，砖红色，肉质，平滑，萼片宿存。花期5-6月，果期8-9月。
        </p>
      </div>
      <div id='medicine' class="detail-medicine borb" ref='medicine'>
        <span class="d-box"></span>
        <h2>药用价值</h2>
        <p>
          玫瑰花中含有300多种化学成份，如芳香的醇、醛、脂肪酸、酚和含香精的油和脂，
          常食玫瑰制品中以柔肝醒胃，舒气活血，美容养颜，令人神爽。玫瑰初开的花朵及根可入药，有理气、活血、收敛等作用、
          主治月经不调，跌打损伤、肝气胃痛，乳臃肿痛等症。玫瑰果的果肉，可制成果酱，
          具有特殊风味，果实含有丰富的维生素C及维生素P，可预防急、慢性传染病、冠心病、肝病和阻止产生致癌物质等。
          用玫瑰花瓣以蒸馏法提炼而得的玫瑰精油（称玫瑰露），可活化男性荷尔蒙及精子。
          玫瑰露还可以改善皮肤质地，促进血液循环及新陈代谢。
        </p>
      </div>
      <div id='enjoy' class="detail-enjoy" ref='enjoy'>
        <span class="d-box"></span>
        <h2>观赏价值</h2>
        <p>而在西方则把玫瑰花当作严守秘密的象征，做客时看到主人家桌子上方画有玫瑰，就明白在这桌上所谈的一切均不可外传，于是有了Sub rosa，“在玫瑰花底下”这个拉丁成语。 英语的under the rose则是源自德语unter der Rosen，古代德国的宴会厅、会议室以及酒店餐厅，天花板上常画有或刻有玫瑰花，用来提醒与会者守口如瓶，严守秘密，不要把玫瑰花下的言行透露出去。这是起源于罗马神话中的荷鲁斯（Horus）撞见美女——爱的女神“维纳斯”偷情的情事，她儿子丘比特为了帮自己的母亲保有名节，
          于是给了他一朵玫瑰，请他守口如瓶，荷鲁斯收了玫瑰于是缄默不语，成为“沉默之神”，这就是under the rose之所以为守口如瓶的由来。</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'about',
  data () {
    return {
      plantName: '玫瑰',
      activeLabel: 0,
      collapseList: [
        { id: 0, title: '性味: ', content: '性凉，味苦、辛。' },
        { id: 1, title: '功能主治: ', content: '清热，解毒，凉血，利尿。用于咽喉肿痛、支气管炎、肾炎水肿、痈肿；外治乳腺炎、痔疮肿痛、出血。' },
        { id: 2, title: '药理作用', content: '经验证明，蛤蟆草对感冒有奇效，吃1次见效； 对咳嗽有特效； 对咽喉肿痛、慢性支气管炎有明显效果。 蛤蟆草有祛风湿，解毒的功效，主治痢疾，风湿筋骨疼痛，瘫痪，癫痫，疮疥等疾病。' },
        { id: 3, title: '服用方法', content: '1、按照中药煎制方法服用。' }
      ],
      categoryList: [
        { id: 0, name: '生长环境', anchor: '#environment' },
        { id: 1, name: '形态特征', anchor: '#apperance' },
        { id: 2, name: '药用价值', anchor: '#medicine' },
        { id: 3, name: '观赏价值', anchor: '#enjoy' }
      ],
      imgUrl: 'https://p1.ssl.qhimg.com/dr/270_500_/t01fa8b9653b4afbdb7.jpg?size=607x659',
      anchor: ''
    }
  },
  mounted () {
  },
  components: {
  },
  methods: {
    goBack () {
      // history.go(-1)
      this.$router.push('/plantdb')
    },
    toView (item) {
      // let el = document.querySelector(`${item.anchor}`)
      // // let el = this.$refs.medicine
      // el.scrollIntoView()
      this.anchor = item.anchor
    },
    scrollIntoView () {}
  }
}

</script>

<style lang="scss">
.plant-detail {
  $c: #37ab2f;
  // background-color: #53e3a6;
  background-color: #f4f4f4;
  .back {
    line-height: 4rem;
    font-size: 2rem;
    text-align: left;
    margin: 0 auto;
    width: 75%;
    a {
      color: $c;
    }
  }
  .borb {
    border-bottom: 1px solid #ccc;
  }
  .detail-box {
    margin: 0 auto;
    width: 75%;
    text-align: left;
    background-color: #fff;
    border: 1px solid #d7d7d7;
    box-shadow: 0 0 6px #f0f0f0;
    padding: 2rem 3rem 0;
    .d-box {
      background: $c;
      display: block;
      font-size: 0;
      height: 2.4rem;
      line-height: 0;
      margin: 0 0 0 -3rem;
      padding: 0;
      position: absolute;
      width: 1rem;
    }
    h2 {
      font: 500 24px/22px 'microsoft yahei','Helvetica Neue',Helvetica,Arial,sans-serif;
    }
    p {
      line-height: 3rem;
      margin-bottom: 1.5rem;
      text-indent: 2em;
      font-size: 1.6rem;
    }
    .detail-title {
      display: flex;
      justify-content: space-between;
      text-align: left;
      margin: 0 auto;
    }
    .detail-category {
      line-height: 6rem;
      // border: 1px solid #d7d7d7;
      // box-shadow: 0 0 6px #f0f0f0;
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        li {
          margin: 0 1rem;
          &:first-child {
            margin: 0;
            font: 500 2.4rem/2.2rem 'microsoft yahei','Helvetica Neue',Helvetica,Arial,sans-serif;
          }
          &:not(:first-child) {
            font: 400 2rem / 2.2rem 'microsoft yahei','Helvetica Neue',Helvetica,Arial,sans-serif;
            cursor: pointer;
          }
          &:nth-child(2) {
            margin-left: 4rem;
          }
          a {
            text-decoration: none;
            color: #2C3E50;
            font-size: 1.8rem;
            &:hover {
              color: $c;
            }
            &:active {
              color: $c;
            }
          }
        }
      }
    }
  }
}
.el-popover {
  width: 30rem;
  p {
    text-align: left;
    letter-spacing: .2rem;
  }
  .el-collapse {
    .el-collapse-item {
      .el-collapse-item__header {
        font-size: 1.6rem;
      }
      .el-collapse-item__wrap {
        overflow: auto;
        .el-collapse-item__content {
          padding: 0;
          p {
            margin: 8px 0;
          }
        }
      }
    }
  }
}
</style>
