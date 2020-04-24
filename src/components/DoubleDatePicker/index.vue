<template>
    <div>
        <el-date-picker v-model="value1" placeholder="开始日期" @change="handleChange" :picker-options="pickerOptions1"></el-date-picker>
        -
        <el-date-picker v-model="value2" placeholder="结束日期" @change="handleChange" :picker-options="pickerOptions2"></el-date-picker>
    </div>
</template>
<script>
export default {
    name: 'aelous-double-date-picker',
    props: ['data'],
    date(){
        return {
            value1: '',
            value2: '',
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            pickerOptions2: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    methods:{
        handleChange(){
            console.log('xxx')
            this.$emit('change')
        }
    }
}
</script>
<style scoped>

</style>