<template>
    <div id="Service">
        <!-- <div class="container text-center">
            <h3>我们的服务</h3>
            <p style="color:#b2b2b2">The Best Service You Never See</p>
        </div> -->
        <div class="container">
            <div class="Service-container row">
                <div class="Service-item col-xs-6 col-sm-6 col-md-6 wow slideInUp" 
                v-for="(item,index) in serviceList" :key="index" @click="ServiceClick(item.id)">
                    <div class="Service-item-wrapper">
                        <div class="Service-item-top">
                            <h4>{{item.title}}</h4>
                            <i></i>
                            <p>{{item.eng_title}}</p>
                        </div>
                        <div class="Service-item-img">
                            <img :src="item.img" alt="服务">
                        </div>
                        <div class="Service-item-border"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { WOW } from 'wowjs';
export default {
    name: 'Service',
    data(){
        return{
            serviceList: [
                {
                    id: 'section-1',
                    title: '政策指引',
                    eng_title: 'Policy Guidelines',
                    img: require('@/assets/img/service1.jpg')
                },{
                    id: 'section-2',
                    title: '服务政策',
                    eng_title: 'Service Policy',
                    img: require('@/assets/img/service2.jpg')
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
            // this.$router.push({
            //     name: 'servicedetail',
            //     params: {
            //         id: id
            //     }
            // })
            console.log(111)
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
    height: 525px;
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

