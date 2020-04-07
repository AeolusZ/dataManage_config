<template>
    <div>
        <img class="imgStyle" v-for="item in data" :key="item.id" v-bind:src="item.src" :style="{width: width, ...item.style}" @load="initImg"/>
    </div>
</template>
<script>
export default {
    name: 'aeolus-waterfall',
    props: ['data', 'width'],
    mounted(){
        this.initImg()
        // const _this = this
        // this.timer = setInterval(function(){
        //     _this.initImg()
        // }, 0)
    },
    beforeDestroy(){
        // clearInterval(this.timer)
    },
    methods: {
        initImg(){
            const imgWidth = document.getElementsByClassName('imgStyle')[0].clientWidth  //图片宽度
            const totalWidth = document.body.clientWidth  //屏幕宽度
            const column = Math.floor(totalWidth/imgWidth)  //一共有几列
            const imgArr = []  //用来存每行图列高度的数组
            let style = {}
            const newImgList = []
            this.data.forEach((val, index) => {
                let imgHeight = document.getElementsByClassName('imgStyle')[index].clientHeight
                if (index < column) {
                    style = {
                    position: 'absolute',
                    top: 0 + 'px',
                    left: index * imgWidth  + 'px',
                    padding: '5px'
                }
                    imgArr.push(imgHeight)
                } else {
                    const minHeight = Math.min(...imgArr)
                    const minIndex = imgArr.indexOf(Math.min(...imgArr))
                    style = {
                        position: 'absolute',
                        top: minHeight + 'px',
                        left: minIndex * imgWidth + 'px',
                        padding: '5px'
                    }
                    imgArr.splice(minIndex, 1, imgArr[minIndex] + imgHeight)
                }
                this.data.splice(index, 1, {...this.data[index], style})
            })
        }
    }
}
</script>
<style scoped>

</style>