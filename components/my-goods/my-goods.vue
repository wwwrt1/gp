<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <!-- 父组件传参是Goods属性下面要用props接收父组件传来的Goods -->
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.goods_price}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
          // 商品的信息对象
          goods: {
            type: Object,
            defaul: {},
          },
        }, 
    data() {
      return {
        //如果图片显示不出来默认显示的图片
        defaultPic: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.sekp0D5qUUVlvls7kOERngHaF3?w=243&h=192&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
      };
    }
  }
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>