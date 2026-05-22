<template>
  <view>
    <!-- 使用自定义组件search -->
    <!-- 与components中的组件互相通信 -->
    <my-search @click="gotoSearch"></my-search>
    <view>
        <view class="scroll-view-container">
          <!-- 左侧的滚动视图区域 -->
          <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
             <block v-for="(item, i) in cateList" :key="i">
               <!-- 循环渲染左侧分类 -->
                <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
              </block>
          </scroll-view>
          <!-- 右侧的滚动视图区域 --> 
          <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
              <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
                <!-- 二级分类 -->
                <view class="cate-lv2-title">-----{{item2.cat_name}}-----</view>
                <!-- 在二级分类的盒子下动态渲染三级分类 -->
                
                <view class="cate-lv3-list">
                      <!-- 三级分类 Item 项 -->
                      <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                        <image :src="item3.cat_icon"></image>
                        <text>{{item3.cat_name}}</text>
                      </view>
                    </view> 
              </view>
          </scroll-view>
        </view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    
     mixins: [badgeMix],
     data() {
        
       return {
         // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
         wh: 0,
         cateList:[],
         active:0,//拿active的值与当前的选中的view比较，相等则渲染active样式
         cateLevel2:[] ,//二级分类的页的列表
         // 解决每次点击一级分类的时候，滚动条不在顶部的bug
         // 滚动条距离顶部的距离
         scrollTop: 0
       };
     },
     onLoad() {
       // 获取当前系统的信息
       const sysInfo = uni.getSystemInfoSync()
       // 为 wh 窗口可用高度动态赋值
       this.wh = sysInfo.windowHeight - 50
       
       this.getCateList()
     },
     methods: {
       //获取分类列表的数据
       async getCateList() {
         // 直接用 uni-app 自带的 request，绝对不报错
         const {data : res } = await uni.request({
           url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
           method: "GET"
         });
          // console.log("轮播图数据", res);
        //成功
        this.cateList = res.message  //给一级分类赋值
        
        //给二级分类赋值
        this.cateLevel2 = res.message[0].children
           
       },
       activeChanged(i) {
           this.active = i //将页面渲染的i赋值给data中的i
            
            //给二级分类重新赋值
            this.cateLevel2 = this.cateList[i].children
            
            //每当点击二级分类的时候右侧滑动区域的scrolltop就会重置
            // 让 scrollTop 的值在 0 与 1 之间切换
            this.scrollTop = this.scrollTop ? 0 : 1
         },
         //点击三级分类跳转到商品列表详情
        gotoGoodsList(item)  {
          uni.navigateTo({
              url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
            }) 
        },
         // 跳转到分包中的搜索页面
           gotoSearch() {
             uni.navigateTo({
               url: '/subpkg/search/search'
             })
           }
               
     }
   }
</script>
 
<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式，既包含上一个也包含active
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #42b983;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
//三级分类样式
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;  //存不下自动换行

  .cate-lv3-item {
    width: 33.33%;  //一行放三个
    margin-bottom: 10px;
    display: flex; //纵向布局
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>