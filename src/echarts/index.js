const myColor = ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea']
let data = [78, 60, 60, 70, 69]
let titlename = ['一级手术', '二级手术', '三级手术', '四级手术', '五级手术']
// let valdata = [683, 234, 234, 523, 345]
// backgroundColor: '#2c343c',
export const option1 = {
  tooltip: {
    type: 'axios',
    formatter: '{b}: {c}张'
  },
  grid: {
    top: '18%',
    left: '35%',
    right: '15%',
    bottom: '5%'
  },
  xAxis: {
    show: false
  },
  yAxis: [
    {
      show: true,
      data: titlename,
      inverse: true,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: (value, index) => {
            var num = myColor.length
            return myColor[index % num]
          }
        },
        fontSize: 14,
        formatter: (value, index) => {
          return [
            '{title|' + (index + 1) + '  ' + value + '} '
          ].join('\n')
        },
        rich: {}
      }
    },
    {
      show: true,
      inverse: true,
      data: [],
      axisLabel: {
        textStyle: {
          color: (value, index) => {
            var num = myColor.length
            return myColor[index % num]
          }
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }
  ],
  series: [{
    // name: '株',
    type: 'bar',
    yAxisIndex: 0,
    data: data,
    barWidth: 20,
    itemStyle: {
      normal: {
        barBorderRadius: 10,
        color: (params) => {
          var num = myColor.length
          return myColor[params.dataIndex % num]
        }
      }
    },
    label: {
      normal: {
        show: true,
        position: 'right',
        formatter: '{c}'
      },
      fontSize: 14
    }
  }]
}

export const option2 = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}张'
  },
  series: [
    {
      name: '各区域植物占比图',
      type: 'pie',
      radius: ['0', '60%'],
      center: ['50%', '55%'],
      // '#FF9A22',
      color: ['rgb(131,249,103)', '#FE5050', '#1DB7E5', '#FF9A22'],
      data: [],
      // roseType: 'radius',
      label: {
        normal: {
          // ({d}%)
          align: 'cecnter',
          // position: 'inside',
          formatter: ['{d|{d}%}'].join('\n'),
          fontSize: 14,
          rich: {
            c: {
              color: 'rgb(255, 255, 255)',
              fontSize: 16,
              fontWeight: 'bold',
              lineHeight: 5
            },
            b: {
              // color: 'rgb(98,137,169)',
              color: 'rgb(255, 255, 255)',
              fontSize: 14,
              height: 40
            }
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgb(98,137,169)'
          },
          smooth: 0.2,
          length: 5,
          length2: 10
        }
      },
      itemStyle: {
        normal: {
          // shadowColor: 'rgba(0, 0, 0, 0.8)',
          // shadowBlur: 50
        }
      }
    }
  ]
}
