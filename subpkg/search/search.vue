<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <!-- 绑定Input事件，当用户输入内容出发事件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <view class="sugg-list">
      <!-- gotoDetail()跳转到商品详情页 -->
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="eye" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 延时器的 timerId
        timer: null,
        // 搜索关键词
        kw: '',
        //根据输入框中输入的内容得到的搜索结果
        searchResults: []
        
      };
    },
    methods: {
      input(e) {
        // e.value 是最新的搜索内容
        // console.log(e)
          // 如果用户在500ms内连续点击则清除 timer 对应的延时器
            clearTimeout(this.timer) 
            // 重新启动一个延时器，并把 timerId 赋值给 this.timer
            this.timer = setTimeout(() => {
              // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
              this.kw = e
              // 当触发延时器的时候根据搜索的内容得到建议，这里调用一个方法
              this.getSearchList()
            }, 500)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {data:res} = await uni.request({
          url: 'https://m1.apifoxmock.com/m1/8284752-8047894-default/api/search/advise',
          method: 'GET',
          data: {
            query: this.kw  // GET 请求的参数
          }
        });
        this.searchResults = res.message
        
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
      
    }
  }
</script>

<style lang="scss">
.search-box {
  // 设置定位效果为吸顶
  position: sticky;
  // 吸顶的位置，固定在页面的最顶部
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
  }
  
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 16px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
</style>