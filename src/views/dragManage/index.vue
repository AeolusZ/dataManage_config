<template>
    <div id="target" v-on:dragenter="dragenter" v-on:dragover="dragover" v-on:dragleave="dragleave" v-on:drop="drop">
        drop here
        <div id="dragDiv" draggable="true" v-on:dragstart="dragstart" v-on:drag="drag" v-on:dragend="dragend" :style="{left: positionX, top: positionY}">
            左边距：{{positionX}};
            上边距：{{positionY}}
        </div>
        <el-button @click="handlePopver">弹出可拖拽的框</el-button>
    </div>
</template>
<script>
let x, y;
export default {
    data() {
        return {
            positionX: 0,
            positionY: 0,
            dragDiv: '',
        }
    },
    mounted(){
        this.dragDiv = document.getElementById('dragDiv')
        console.log(this)
        localStorage.setItem('linshi', JSON.stringify({a: 1, b: 2, c: 3}))
        console.log(JSON.parse(localStorage.getItem('linshi')))
    },
    methods:{
        dragstart(e){
            console.log('开始拖动')
            x = e.clientX - this.dragDiv.offsetLeft;  //算出鼠标相对元素的位置
            y = e.clientY - this.dragDiv.offsetTop;
        },
        drag(){
            console.log('拖动中')
        },
        dragend(){
            console.log('拖动结束')
        },
        dragenter(e){
            console.log('元素进入目的地时触发')
            e.preventDefault()
        },
        dragover(e){
            console.log('元素在目的地时触发')
            e.preventDefault()
        },
        dragleave(e){
            console.log('元素离开目的地时触发')
            e.preventDefault()
        },
        drop(e){
            console.log('元素在目的地放下时触发')
            let left = e.clientX - x; //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let top = e.clientY - y;
            this.positionX = left;  //绑定元素位置到positionX和positionY上面
            this.positionY = top;
            this.dragDiv.style.left = left + 'px';  //移动当前元素
            this.dragDiv.style.top = top + 'px';
            e.preventDefault()
        },
        handlePopver(){  //弹出框
            layer.open({
                content: '通过style设置你想要的样式',
                style: 'background-color:#09C1FF; color:#fff; border:none;', // 自定风格
                moveOut: true
            })
        }
    }
}
</script>
<style scoped>
    #target {
        line-height: 500px;
        text-align: center;
        border: 1px solid gray;
        color: red;
        width: 100%;
        height: calc(100vh - 84px);
        position: relative;
    }
    #dragDiv {
        height: 100px;
        width: 300px;
        line-height: 100px;
        border: 1px solid mediumpurple;
        position: absolute;
    }
</style>