<template>
    <div>
        <div :style="{color: color}">这是祖先组件</div>
        <el-button @click="() => changeColor()">改变颜色</el-button>
        <Child></Child>
    </div>
</template>
<script>
import Child from './child'
export default {
    components: {Child},
    data(){
        return {
            color: 'blue'
        }
    },
    provide() {
        return {
            theme: {
                color: this
            }
        };
    },
    methods: {
        changeColor(color){
            if (color) {
                this.color = color;
            } else {
                this.color = this.color === "blue" ? "red" : "blue";
            }
        }
    }
}
</script>
<style scoped>

</style>