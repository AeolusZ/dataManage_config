<template>
    <div class="box">
        <img v-for="item in imgList" :key="item.id" src='' :data-src="item.src">
    </div>
</template>
<script>
export default {
    name: 'WaterFall',
    components: {
    },
    mounted(){
        let box = document.querySelector('.box')
        let imgs =  document.querySelectorAll('img')
        let width = imgs[0].clientWidth
        const observer = new IntersectionObserver(entries => {
            // 发生交叉目标元素集合
            entries.forEach(item => {
                // 判断是否发生交叉
                if (item.isIntersecting) {
                    console.log('要替换的交叉图片', item)
                    // 替换目标元素Url
                    item.target.src = item.target.dataset.src;
                    // 取消监听此目标元素
                    observer.unobserve(item.target);
                }
            });
        }, {
            root: box, // 父级元素
            // rootMargin: '20px 0px 100px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
        });

        imgs.forEach(item => {
            // 监听目标元素
            observer.observe(item);
        });
    },
    data(){
        return {
            imgList: [
                {id: 1, src: require('../../../static/imgs/img1.jpg'), style: {}},
                {id: 2, src: require('../../../static/imgs/img2.jpg'), style: {}},
                {id: 3, src: require('../../../static/imgs/img3.jpg'), style: {}},
                {id: 4, src: require('../../../static/imgs/img4.jpg'), style: {}},
                {id: 5, src: require('../../../static/imgs/img5.jpeg'), style: {}},
                {id: 6, src: require('../../../static/imgs/img6.jpeg'), style: {}},
                {id: 7, src: require('../../../static/imgs/img7.jpeg'), style: {}},
                {id: 8, src: require('../../../static/imgs/img8.jpeg'), style: {}},
                {id: 9, src: require('../../../static/imgs/img9.jpg'), style: {}},
                {id: 10, src: require('../../../static/imgs/img10.jpg'), style: {}},
                {id: 11, src: require('../../../static/imgs/img11.jpg'), style: {}},
                {id: 12, src: require('../../../static/imgs/img12.jpg'), style: {}},
                {id: 13, src: require('../../../static/imgs/img13.jpg'), style: {}},
                {id: 14, src: require('../../../static/imgs/img14.jpg'), style: {}},
                {id: 15, src: require('../../../static/imgs/img15.jpg'), style: {}},
                {id: 16, src: require('../../../static/imgs/img16.jpeg'), style: {}},
                {id: 17, src: require('../../../static/imgs/img17.jpeg'), style: {}},
                {id: 18, src: require('../../../static/imgs/img18.jpeg'), style: {}},
                {id: 19, src: require('../../../static/imgs/img19.jpeg'), style: {}},
            ],
        }
    },
}
</script>
<style scoped>
.box {
    width: 800px;
    height: 600px;
    border: 1px solid;
    overflow: auto;
}

img {
    height: 300px;
    border: 1px solid;
    display: block;
    margin: 40px;
}
</style>