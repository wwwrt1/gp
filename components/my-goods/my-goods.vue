<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <!-- 设置默认选中状态 -->
      <radio :checked="goods.goods_state" color="#42b983" v-if="showRadio"  @click="radioClickHandler"></radio> 
        
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
           <!-- 商品数量 -->
            <uni-number-box :min="1" :value="goods.goods_count"  v-if="showNum" @change="numChangeHandler"></uni-number-box>
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
          //组件同时被详情页和和购物车页面引用了，要判断何时用radio
           // 是否展示图片左侧的 radio
           //这里实在props中 通过父组件属性传值，判断是否加载radio标签
          showRadio: {
            type: Boolean,
            // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
            default: false,
          },
          // 是否展示价格右侧的 NumberBox 组件
             showNum: {
               type: Boolean,
               default: false,
             }, 
        },
         
    
    data() {
      return {
        //如果图片显示不出来默认显示的图片
        defaultPic: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.sekp0D5qUUVlvls7kOERngHaF3?w=243&h=192&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
      };
    },
    methods: {
      // radio 组件的点击事件处理函数
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      // NumberBox 组件的 change 事件处理函数
       numChangeHandler(val) {
         // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
         this.$emit('num-change', {
           // 商品的 Id
           goods_id: this.goods.goods_id,
           // 商品的最新数量
           goods_count: +val
         })
       } 
    }
  }
</script>

<style lang="scss">
.goods-item {
  // 让 goods-item 项占满整个屏幕的宽度
  width: 750rpx;
  // 设置盒模型为 border-box
  box-sizing: border-box;  
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
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
    
    .goods-info-box {
       display: flex;
       align-items: center;
       justify-content: space-between;
     }
  }
  
}

.goods-item-left {
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .goods-pic {
    width: 100px;
    height: 100px;
    display: block;
  }
  
   
}
</style> 