<template>
 
     <view>
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">  
          <swiper-item v-for="(item, i) in swiperList" :key="i">
            <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
              <image :src="item.image_src"></image>
            </navigator>
          </swiper-item>
        </swiper>
<!-- 分类导航 -->
        <view class="nav-list">
           <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
             <image :src="item.image_src" class="nav-img"></image>
             <view class="center"><text>{{item.name}}</text></view>
           </view>
        </view>
      </view>
      <!-- 楼层区域 -->
      
      <view class="floor-list">
        <!-- 楼层 item 项 -->
        <view class="floor-item" v-for="(item, i) in floorList" :key="i">
          <!-- 楼层标题 -->
          <view class="floor-title-box">
            <image :src="item.floor_title.image_src" class="floor-title"></image>
            <text class="floor-title-text">{{item.floor_title.name}}</text>
          </view>
              
          <!-- 楼层图片区域 -->
          <view class="floor-img-box">
            <view class="img-list">
              <navigator v-for="(item2, i2) in item.product_list" 
                  :key="i2" 
                  :url="item2.url"
                  class="product-nav">
                <image 
                  :src="item2.image_src" 
                  mode="aspectFill"
                  class="floor-product-img"
                />
              </navigator>
            </view>
          </view>
          
          
        </view>
      </view>
 
</template>

<script>
  export default {
    data() {
      return {
        // 这里写了一个轮播图的数据列表
        swiperList:[],
        //分类导航的数据列表
        navList:[],
        //楼层的数据
        floorList:[]
      };
    },
    //生命周期函数，与data平级用于在启动的时候获取轮播图的数据
    onLoad() {
      //调用方法获取轮播的数据
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
     async getSwiperList() {
       // 直接用 uni-app 自带的 request，绝对不报错
       const {data : res } = await uni.request({
         url: "https://m1.apifoxmock.com/m1/8284752-8047894-default/api/banner",
         method: "GET"
       });
        // console.log("轮播图数据", res);
      //成功
      this.swiperList = res.message
    
     },
     async getNavList() {
       const {data : res } = await uni.request({
         url: "https://m1.apifoxmock.com/m1/8284752-8047894-default/api/home/catergories",
         method: "GET"
       });
      // console.log(res)
       this.navList = res.message 
     },
     navClickHandler(item) {
      // console.log(item)
      //点击分类切换到tabbar中分类项
      if(item.name == '分类') {
        uni.switchTab({
          url:'/pages/cate/cate'
        })
      }
     },
     
       async getFloorList() {
         // 直接用 uni-app 自带的 request，绝对不报错
         const {data : res } = await uni.request({
           url: "https://m1.apifoxmock.com/m1/8284752-8047894-default/api/home/floor",
           method: "GET"
         });
          // console.log("轮播图数据", res);
        //成功
        
        //对数据进行处理
          res.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })  
          })
        this.floorList = res.message
        console.log(this.floorList)
     }
     
    }
    
  }
</script>

<style lang="scss">
swiper {
 height: 330rpx;
 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
 }
 
 .nav-list {
   display: flex;
   justify-content: space-around;
   margin: 15px 0;
 
   .nav-img {
     width: 128rpx;
     height: 140rpx;
   }
   .center{
     width: 100%;
     height: 100rpx;
     display: flex;
     justify-content: center; /* 水平居中 */
     align-items: center;     /* 垂直居中 */
   }
}

.floor-title-box {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
}

.floor-title {
  height: 60rpx;
  width: auto;
  display: block;
}

.floor-title-text {
  font-size: 32rpx;
  font-weight: bold;
  margin-left: 15rpx;
}
 
.floor-img-box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10rpx;
}

.img-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10rpx;
}

.product-nav {
  width: 100%;
  height: 320rpx;
  display: block;
}

.floor-product-img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 8rpx;
}
</style> 