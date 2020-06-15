<template>
    <section>
        <el-date-picker v-model="model.startTime" placeholder="开始日期" :type="type" :picker-options="startPickerOptions" @change="handleChangeStartTime(model.startTime, model.endTime)"></el-date-picker>
        -
        <el-date-picker v-model="model.endTime" placeholder="结束日期" :type="type" :picker-options="endPickerOptions" @change="handleChangeEndTime(model.startTime, model.endTime)"></el-date-picker>
    </section>
</template>
<script>
import { Message } from 'element-ui';
var moment = require('moment');
export default {
    name: 'aelous-double-date-picker',
    props: ['type', 'model'],
    data(){
        return {
            startPickerOptions: {},
            endPickerOptions: {}
        }
    },
    mounted(){
        let time = new Date()
        console.log('时间戳',moment(time).format('YYYY-MM-DD'))
        console.log('标准时间',moment(time).parse())
    },
    methods:{
        compareAlert(){
            if(this.model.startTime && this.model.endTime && this.model.startTime.getTime() > this.model.endTime.getTime()) {
                alert('开始日期时间不能大于结束日期时间')
            }
        },
        handleChangeStartTime(startTime, endTime){
            this.endPickerOptions = {
                disabledDate: (time) => {
                    // return time.getTime() < startTime.getTime() - (24 * 60 * 60 * 1000 - 1)
                    // 利用日期的时间戳比较
                    return moment(time).format('YYYY-MM-DD 00:00:00') < moment(startTime).format('YYYY-MM-DD 00:00:00')
                },
            }
            this.compareAlert()
        },
        handleChangeEndTime(startTime, endTime){
            this.startPickerOptions = {
                disabledDate: (time) => {
                    return moment(time).format('YYYY-MM-DD 00:00:00') > moment(endTime).format('YYYY-MM-DD 00:00:00')
                },
            }
            this.compareAlert()
        },
    }
}
</script>
<style scoped>

</style>