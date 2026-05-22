<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
  </view>
  
    
  
  
  <!-- 商品列表区域 -->
<!-- uni-swipe-action 是最外层包裹性质的容器 -->
  <uni-swipe-action>
    <block v-for="(goods, i) in cart" :key="i">
      <!-- 指定option配置项 -->
      <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
    <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
      <!--封装了goods组件，并且通过Goods进行传值 通过绑定show-radio 属性进行是否radios传值 -->
      <my-goods :goods="goods" :show-radio="true"  :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler" ></my-goods>
    </uni-swipe-action-item>
    </block>
  </uni-swipe-action>
  
  
  <view class="cart-container">
     <!-- 使用自定义的 address 组件 -->
  
     <!-- 购物车商品列表的标题区域 -->
  
     <!-- 商品列表区域 -->
  
     <!-- 结算区域 -->
     <my-settle></my-settle>
   </view>
  
  
  
</template>


<script>
  import { mapGetters,mapState,mapMutations} from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
     mixins: [badgeMix],
    data() {
      return {
        options: [{
              text: '删除', // 显示的文本内容
              style: {
                backgroundColor: '#C00000' // 按钮的背景颜色
              }
            }]
      }
    },
    computed: {
       // 将 m_cart 模块中的 total 映射为当前页面的计算属性
       ...mapGetters('m_cart', ['total']),
       ...mapState('m_cart', ['cart']),
     },
     onShow() {
        // 在页面刚展示的时候，设置数字徽标
        this.setBadge()
     },
     methods: {
        ...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsById']),
        setBadge() {
           // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
           uni.setTabBarBadge({
              index: 2, // 索引  从左到右0 ,1 ,2
              text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
           })
        },
        // 商品的勾选状态发生了变化
          radioChangeHandler(e) {
            //console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
            this.updateGoodsState(e)
          },
         // 商品的数量发生了变化
         numberChangeHandler(e) {
           console.log(e)
         } ,
        // 商品的数量发生了变化
         numberChangeHandler(e) {
           this.updateGoodsCount(e)
         },  
         // 点击了滑动操作按钮
          swipeActionClickHandler(goods) {
            this.removeGoodsById(goods.goods_id)
          }
     }
  }
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}

.cart-container {
  padding-bottom: 50px;
}
</style>