<template>
  <view>
    <template>
      <view>
        <view class="goods-list">
          <block v-for="(item, i) in goodsList" :key="i">
            <!-- 复用my-goods组件 -->
            <!-- 通过绑定goods属性值进行传参 -->
            <my-goods :goods="item"></my-goods>
          </block>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      // 请求参数对象，商品列表中api
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 23
        },
          // 商品列表的数据
          goodsList: [],
          // 总数量，用来实现分页
          total: 0 ,
          isloading: false
         
      }
    },
    onLoad(options) {
      // 将页面跳转时携带的参数，转存到 queryObj 对象中
      //console.log(options)
      this.queryObj.query = options.query || ''   
      this.queryObj.cid = options.cid || ''
       this.getGoodsList()
      
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(sp) {
        // 发起请求
        this.isloading = true  //打开节流阀
        const { data: res } = await uni.request({
          url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
          method: 'GET',
          data: this.queryObj
        }) 
        this.isloading = false //关闭节流阀
        sp && sp()  //判断sp是否存在，如果存在就调用sp()
        // 为数据赋值
        // this.goodsList = res.message.goods  这里是吧数据重新赋值了
        //如果要实现加载更多的效果这里做拼接处理
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      }
    },
    // 触底的事件
    //在 goods_list 页面中，和 methods 节点平级，声明 onReachBottom 事件处理函数，用来监听页面的上拉触底行为
    onReachBottom() {
      //判断是否在请求其他数据，如果是的话退出
      if (this.isloading) return
      // 让页码值自增 +1
      this.queryObj.pagenum += 1
      // 重新获取列表数据
      this.getGoodsList()
    },
    // 下拉刷新的事件
    //监听页面的处理函数
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pagenum = 1 //页码重置为1
      this.total = 0 
      this.isloading = false//关闭节流阀
      this.goodsList = [] //商品列表数据变成空数组
    
      //重新发起请求获取商品列表数据，在获取数据完成后要关闭下拉，这里在方法里传一个参数
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">




</style>