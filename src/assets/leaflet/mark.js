import AMap from 'AMap' // 引入高德地图

export const icon = new AMap.Icon({
  size: new AMap.Size(40, 50), // 图标尺寸
  image: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png', // Icon的图像
  // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
  imageSize: new AMap.Size(16, 24) // 根据所设置的大小拉伸或压缩图片
})

export const icon2 = new AMap.Icon({
  size: new AMap.Size(40, 50), // 图标尺寸
  image: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', // Icon的图像
  // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
  imageSize: new AMap.Size(12, 18) // 根据所设置的大小拉伸或压缩图片
})
