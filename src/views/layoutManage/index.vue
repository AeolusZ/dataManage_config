<template>
<div class="wrap">
    <section class="middle">
        文字居中显示
        <img src="../../../static/imgs/img1.jpg" width="100px"/>
        <aeolus-double-date-picker :model='dateModel' type="datetime"></aeolus-double-date-picker>
        <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" >
    </el-date-picker>
    </section>
    <section>
        <p>我要做一个三角形，如下：</p>
        <div class="triangle1"></div>
        <div class="triangle2"></div>
        <div class="triangle3"></div>
    </section>
    <section>
        <p>我要做一个3D效果的图图, 如下：</p>
        <div class="threeD">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </section>
    <section>
        <p>我要做一个水波纹的效果, 如下：</p>
        <div class="content">
            <div class="one"><p></p><span></span></div>
			<div class="two"><p></p><span></span></div>
			<div class="three"><p></p><span></span></div>
        </div>
    </section>
</div>
</template>
<script>
import AeolusDoubleDatePicker from '@/components/DoubleDatePicker'
export default {
    components: {AeolusDoubleDatePicker},
    data(){
        return {
            dateModel: {
                startTime: '', endTime: ''
            },
            value1: '',
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    perspective: 3000px;
}
.middle {
    text-align: center;
    border: 1px solid rgba(0, 0, 0, .3);
}
.triangle {
    display: inline-block;
    border: 20px solid red;
}
.triangle1 {
    @extend .triangle;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom: 0;
}
.triangle2 {
    @extend .triangle;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-color: transparent;
}
.triangle3 {
    @extend .triangle;
    border-bottom: 0;
    border-top-color: transparent;
    border-right-color: transparent;
    &:hover {
        transform: scale(3);
        transition: all 3s;
    }
}
.threeD {
    position: relative;
    width: 300px;
    height: 200px;
    margin: 100px auto;
    transform-style: preserve-3d;
    animation: three 10s linear infinite;
    & div {
        // display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        background: url('../../../static/imgs/img1.jpg') -400px -200px;
        width: 100%;
        height: 100%;
    }
    & div:nth-child(1){
        transform: translateZ(300px);
    }
    & div:nth-child(2){
        transform: rotateY(60deg) translateZ(300px)
    }
    & div:nth-child(3){
        transform: rotateY(120deg) translateZ(300px)
    }
    & div:nth-child(4){
        transform: rotateY(180deg) translateZ(300px)
    }
    & div:nth-child(5){
        transform: rotateY(240deg) translateZ(300px)
    }
    & div:nth-child(6){
        transform: rotateY(300deg) translateZ(300px)
    }
}
@keyframes three {
    0% {
        transform: rotateY(0)
    }
    100% {
        transform: rotateY(360deg)
    }
}
.content{
    position: relative;
    width: 700px;
    height: 600px;
    margin: 100px auto;
    & div {
        position: relative;
        width: 10px;
        height: 10px;
        border-radius:50%;
        background:#009FD9;
    }
    & p {
        position: absolute;
        top: -15px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        box-shadow: 0px 0px 1px #009FD9;
        animation: myfirst 1.5s  infinite;
    }
    & span {
        position: absolute;
        display:block;
        width: 10px;
        height: 10px;
        border-radius:50%;
        animation: myfirst 1.5s  infinite;
        box-shadow: 0px 0px 1px #009FD9; 
        animation-delay: 0.5s;
    }
}
.content .one{
    position: absolute;
    left: 100px; 
    top: 10px;
}
.content .two{
    position: absolute;
    left:250px; 
    top: 15px;
}
.content .three{
    position: absolute;
    left: 500px; 
    top: 20px;
}
@keyframes myfirst{
    20% {transform: scale(2);}
    40% {transform: scale(3);}
    60% {transform: scale(4);}
    80% {transform: scale(5);}
    100% {transform: scale(6);}
}
</style>
