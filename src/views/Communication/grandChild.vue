<template>
    <div>
        这是孙子组件，祖先组件的color是 {{theme.color.color}}
    </div>
</template>
<script>
export default {
    inject: ['theme']
}
</script>
<style scoped>

</style>