<template>
    <div>
        这是子组件,祖先组件的color是 {{theme.color.color}}
        <grand-child></grand-child>
    </div>
</template>
<script>
import GrandChild from './grandChild'
export default {
    components: {GrandChild},
    inject: ['theme'],
    mounted(){
        console.log(this.theme)
    }
}
</script>
<style scoped>

</style>