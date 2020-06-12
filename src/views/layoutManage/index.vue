<template>
<div class="wrap">
    <section class="middle">
        文字居中显示
    </section>
    <section>
        <p>我要做一个三角形，如下：</p>
        <div class="triangle triangle1"></div>
        <div class="triangle triangle2"></div>
        <div class="triangle triangle3"></div>
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
</div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    perspective: 1000px;
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
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom: 0;
}
.triangle2 {
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-color: transparent;
}
.triangle3 {
    border-bottom: 0;
    border-top-color: transparent;
    border-right-color: transparent;
    &:hover {
        animation: move 3s linear infinite;
    }
}
@keyframes move {
    0% {

    }
    100% {
        transform: scale(2)
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
</style>
