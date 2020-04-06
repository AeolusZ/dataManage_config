<template>
    <div :style="{position: 'relative'}">
        <aeolus-waterfall :data="imgList" width="300px"/>
    </div>
</template>
<script>
import aeolus_waterfall from '@/components/WaterFall'
export default {
    name: 'WaterFall',
    components: {
       'aeolus-waterfall': aeolus_waterfall
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

</style>