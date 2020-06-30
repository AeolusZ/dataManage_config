<template>
    <div>
        {{this.name}}
        <el-button @click="() => changeData()">改变子组件2数据</el-button>
    </div>
</template>
<script>
export default {
    beforeCreate(){console.log('子组件2--beforeCreate')},
    created(){console.log('子组件2--created')},
    beforeMount(){console.log('子组件2--beforeMount')},
    mounted(){console.log('子组件2--mounted')},
    beforeUpdate(){console.log('子组件2--beforeUpdate')},
    updated(){console.log('子组件2--updated')},
    beforeDestroy(){console.log('子组件2--beforeDestroy')},
    destroyed(){console.log('子组件2--destroyed')},
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