<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
      <!-- 点击调用Preview方法实现图片预览 -->
        <image :src="item.pics_big"  @click="preview(i)"></image>
      </swiper-item>
    </swiper>
  </view>
  
  <!-- 商品信息区域 -->
  <view class="goods-info-box">
    <!-- 商品价格 -->
    <view class="price">￥{{goods_info.goods_price}}</view>
    <!-- 信息主体区域 -->
    <view class="goods-info-body">
      <!-- 商品名称 -->
      <view class="goods-name">{{goods_info.goods_name}}</view>
      <!-- 收藏 -->
      <view class="favi">
        <uni-icons type="star" size="18" color="gray"></uni-icons>
        <text>收藏</text>
      </view>
    </view>
    <!-- 运费 -->
    <!-- cart调用仓库中的数据 -->
    <view class="yf">快递：免运费 </view>
  </view>
  <!-- 运用小程序自带的rich-text来渲染请求到的html -->
  <rich-text :nodes="goods_info.goods_introduce"></rich-text>
  <!-- 利用uni-goods-nav进行导航栏渲染 -->
  <view class="goods_nav">
    <!-- fill 控制右侧按钮的样式 -->
    <!-- options 左侧按钮的配置项 -->
    <!-- buttonGroup 右侧按钮的配置项 -->
    <!-- click 左侧按钮的点击事件处理函数 -->
    <!-- buttonClick 右侧按钮的点击事件处理函数 -->
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
  </view>
  
</template>

<script>
  import { mapState,mapMutations,mapGetters } from 'vuex'
  export default {
    computed: {
        // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
        // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
        //下面就可以在页面中使用cart这个数组了
        ...mapState('m_cart', []),
        //映射m_cart中的的total到goods_detail中
        ...mapGetters('m_cart', ['total']),
        

      },
      //动态监听total值的变化为options中的的属性info重新赋值
     // watch: {
     //    //newVal形参得到新值
     //    total(newVal) {
     //      //寻找图标是购物车的按钮
     //      const findResult = this.options.find((x) => x.text === '购物车')
     //      // console.log(findResult)
     //      //如果findresult值存在，则为info属性赋值
     //      if (findResult) {
     //        // 动态为购物车按钮的 info 属性赋值
     //        findResult.info = newVal
     //      }
     //    },
     //  },
     //动态监听total值的变化为options中的的属性info重新赋值
     watch: {
        total: {
           handler(newVal) {
              const findResult = this.options.find(x => x.text === '购物车')
              if (findResult) {
                 findResult.info = newVal
              }
           },
           // immediate声明在页面初始加载完毕后调用
           immediate: true
        }
     },
     
     
    data() {
      return {
      // 商品详情对象
        goods_info: {},
         // 商品详情对象
        goods_info: {},
        // 左侧按钮组的配置对象
        options: [{
					icon: 'chat',
					text: '客服'
				},{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0  //最终渲染为图标上的的数字
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          }, 
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
     
        }  
      },
      //生命周期函数获得options
    onLoad(options) {
      //console.log(options)
      // 获取商品 Id
      const goods_id = options.goods_id
      // 调用请求商品详情数据的方法
      this.getGoodsDetail(goods_id)
    },
    methods: {
      // 定义请求商品详情数据的方法
      async getGoodsDetail(goods_id) {
        const { data: res } = await uni.request({
          url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
          method: "GET",
          data: { goods_id }
        }); 
        // 为 data 中的数据赋值
        this.goods_info = res.message
      },
      // 实现轮播图的预览效果
      preview(i) {
        // 调用 内置的uni.previewImage() 方法预览图片
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current: i,
          // map方法修改数组
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      
      
     
      //点击购物车按钮后跳转到购物车页面
      onClick(e) {
        console.log(e)
        if (e.content.text === '购物车') {
          // 切换到购物车页面
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      //把m_cart模块中的方法导入当前分包中使用
      ...mapMutations('m_cart', ['addToCart']),
      
      // 右侧按钮的点击事件处理函数
      buttonClick(e) {
         // console.log(e)
         if (e.content.text === '加入购物车') {
           //添加一个新的对象
            const goods = {
               goods_id: this.goods_info.goods_id,     
               goods_name: this.goods_info.goods_name,  
               goods_price: this.goods_info.goods_price, 
               goods_count: 1,                        
               goods_small_logo: this.goods_info.goods_small_logo, 
               goods_state: true                        
            }
      
            //调用方法放在cart中
            this.addToCart(goods)
      
         }
      }
      
  }
}
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}

  //底部导航栏样式
  .goods-detail-container {
    // 给页面外层的容器，添加 50px 的内padding，
    // 防止页面内容被底部的商品导航组件遮盖
    padding-bottom: 50px;
  }
  
  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>