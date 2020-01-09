<template>
    <div id="Service">
        <!-- <div class="container text-center">
            <h3>我们的服务</h3>
            <p style="color:#b2b2b2">The Best Service You Never See</p>
        </div> -->
        <div class="container">
            <div class="Service-container row">
                <div class="Service-item col-xs-12 col-sm-6 col-md-6 wow slideInUp" 
                v-for="(item,index) in serviceList" :key="index" @click="ServiceClick(item.id)">
                    <div class="Service-item-wrapper">
                        <div class="Service-item-img">
                            <img :src="item.img" alt="服务">
                        </div>
                        <div class="Service-item-top">
                            <h4>{{item.title}}</h4>
                            <i></i>
                            <p>{{item.eng_title}}</p>
                        </div>
                        <!-- <div class="Service-item-border"></div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { WOW } from 'wowjs';
export default {
    name: 'Dongta',
    data(){
        return{
            serviceList: [
                {
                    id: '11',
                    title: '中国首家5G电影城市│芜湖·亿品众合影视产业园盛大开园',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x1.png')
                },
                
                {
                    id: '10',
                    title: '中国国际影视节目展|“众合空间”为时下影视文化创业者服务',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x2.png')
                },

                {
                    id: '9',
                    title: '中国影视文化交流展',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x3.png')
                },
                              
                {
                    id: '8',
                    title: '中国影视文化国际交流展丨中国电影正在走向世界的快车道',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x4.png')
                },
                 
                {
                    id: '7',
                    title: '亿品众合与首都纪录片发展协会在京签约',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x5.png')
                },
                  
                {
                    id: '6',
                    title: '亿品众合一周岁啦！',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x6.png')
                },
               
                {
                    id: '5',
                    title: '谁是亿品众合',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x7.png')
                },
                 
                {
                    id: '4',
                    title: '亿品众合影视产业园在芜湖签约 联手打造全国首家5G电影城市',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x8.png')
                },
                
                {
                    id: '3',
                    title: '第22届上海国际电影节开幕，亿品众合带您一览精彩',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x9.png')
                },
               
                {
                    id: '2',
                    title: '携手芜湖合作共赢 亿品众合大动作再启航',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x10.png')
                },
                 {
                    id: '1',
                    title: '亿品众合正式挂牌“北京新四板”',
                    eng_title: 'All one',
                    img: require('@/assets/image/xw/x11.png')
                }
            ]
        }
    },
    mounted(){
        var wow = new WOW();
        wow.init();
    },
    methods:{
        ServiceClick(id){
            this.$router.push({
                name: 'news'+id,
                params: {
                    id: id
                }
            })
        }
    }
}
</script>
<style scoped>
.Service-container{
    padding: 30px 50px;
}
.Service-item{
    margin-bottom: 50px;
}
.Service-item-wrapper{
    cursor: pointer;
    background: rgba(244,244,244,1);
    overflow: hidden;
    position: relative;
}
.Service-item-top{
    width: 100%;
    height: 120px;
    padding: 30px;
    text-align: center;
}
.Service-item-top>i{
    display: inline-block;
    width: 25px;
    height: 2px;
    background: #28f;
}
.Service-item-top>p{
    color: #b2b2b2;
    opacity: 0;
    transform: translateY(10px);
    transition: all .5s ease;
}
.Service-item-img{
    width: 100%;
    height: 250px;
    overflow: hidden;
}
.Service-item-img img{
    width: 100%;
    transition: all 0.5s ease;
}
.Service-item-border{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    border: 1px solid #000;
    opacity: 0;
}
.Service-item-wrapper:hover .Service-item-top > i{
    opacity: 0;
}
.Service-item-wrapper:hover .Service-item-top > p{
    opacity: 1;
    transform: translateY(-10px);
}
.Service-item-wrapper:hover .Service-item-img > img{
    transform: scale(1.1,1.1);
}
.Service-item-wrapper:hover > .Service-item-border{
    opacity: 1;
    width: 90%;
    height: 90%;
}
</style>

