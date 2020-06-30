<template>
    <div>
        这是子组件,祖先组件的color是 {{theme.color.color}}
        {{this.name}}
        <el-button @click="() => changeData()">改变子组件数据</el-button>
        <grand-child></grand-child>
    </div>
</template>
<script>
import GrandChild from './grandChild'
export default {
    components: {GrandChild},
    inject: ['theme'],
    beforeCreate(){console.log('子组件--beforeCreate')},
    created(){console.log('子组件--created')},
    beforeMount(){console.log('子组件--beforeMount')},
    mounted(){console.log('子组件--mounted')},
    beforeUpdate(){console.log('子组件--beforeUpdate')},
    updated(){console.log('子组件--updated')},
    beforeDestroy(){console.log('子组件--beforeDestroy')},
    destroyed(){console.log('子组件--destroyed')},
    data(){
        return {
            name: 'child'
        }
    },
    methods: {
        changeData(){
            this.name = 'childs'
        }
    }
}
</script>
<style scoped>

</style>