
// 引入mockjs
import Mock from 'mockjs'
// 使用mockjs模拟数据
export default Mock.mock('/api/users', (req, res) => {
  return Mock.mock({
    'data|50-100': [{
      'name': '@cname',
      'id|+1': 1,
      'age|10-60': 0, // 10-60以内的随机数，0用来确定类型
      'birthday': '@date("yyyy-MM-dd")', // 年月日
      'city': '@city(true)', // 中国城市
      // 测试数据htllo里面的
      'title': '@first',
      'author_name': '@name',
      'date': '@date',
      'thumbnail_pic_s': "Random.dataImage('200x100')"
    }]
  })
})