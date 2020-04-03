<template>
    <div id="cache-manage" class="flex center">
        <el-card class="box-card" v-for="item in cacheList" :key="item.cacheName">
            <div slot="header" class="flex space-between card-header">
                <span>{{item.displayName}}缓存状态</span>
                <div>
                    <aeolus-tooltop-button content="刷新" placement="top" effect="dark" icon="el-icon-refresh-right" shape="circle-no-button-content" v-on:click="handleRefresh"></aeolus-tooltop-button>
                    <aeolus-tooltop-button content="清理" placement="top" effect="dark" icon="el-icon-refresh" shape="circle-no-button-content" v-on:click="handleClear"></aeolus-tooltop-button>
                    <aeolus-tooltop-button content="配置" placement="top" effect="dark" icon="el-icon-edit-outline" shape="circle-no-button-content" v-on:click="handleConfig(item)"></aeolus-tooltop-button>
                    <aeolus-tooltop-button content="查看日志" placement="top" effect="dark" icon="el-icon-tickets" shape="circle-no-button-content" v-on:click="handleCheckLog"></aeolus-tooltop-button>
                </div>
            </div>
            <aeolus-pie :id="item.cacheName" :data="item.cacheData"></aeolus-pie>
            <aeolus-progress :data="processData"></aeolus-progress>  
        </el-card>
        <!-- 新增一项配置 -->
        <el-button class="box-add" @click="handleConfig({})" icon="el-icon-plus"></el-button>
        <!-- 总体配置信息 -->
        <el-dialog title="配置信息" :visible.sync="configDialogVisible" top="20px">
            <el-card header="配置磁盘信息">
                <aeolus-form ref="disk" :list="configBasicFormList" :model="configBasicModel" v-on:submit="submitForm" labelWidth="100px" contentWidth="250px" :inline="true"></aeolus-form>
                <el-button style="float: right; margin-bottom: 10px" type="primary" @click="handleSubmitDisk">提交</el-button>
            </el-card>
            <el-card header="配置各类缓存数据信息" :style="{'margin-top': '10px'}">
                <el-button @click="cacheDataVisible=true">新增一条缓存数据配置信息</el-button>
                <el-table :data="cacheData" :style="{'margin-top': '10px'}" border>
                    <el-table-column v-for="item in cacheDataFormList" :key="item.id" :prop="item.dataIndex" :label="item.label"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <span slot="footer" class="dialog-footer" top="40px">
                <el-button @click="configDialogVisible = false">取消</el-button>
            </span>
        </el-dialog>
        <!-- 各缓存数据配置信息 -->
        <el-dialog title="缓存数据配置信息" :visible.sync="cacheDataVisible">
            <aeolus-form ref="cacheData" :list="cacheDataFormList" :model="cacheDataModel" labelWidth="150px" contentWidth="200px" :inline="true" v-on:submit="submitCacheData"></aeolus-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="configDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmitCacheData">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import echarts from 'echarts'
import aeolus_progress from '../../components/Progress'   //进度条组件
import aeolus_tooltip_button from '../../components/TooltipButton'   //带提示的按钮组件
import aeolus_form from '../../components/Form'    //form表单组件
import aeolus_pie from '../../components/Pie'   //饼图组件
import { available, dataCleanStrategy, priority } from '../../utils/publicObj'
import { getSelect, getRadio } from '../../utils/publicFunc'
export default {
    name: 'cache-manage',
    components: {
        'aeolus-progress': aeolus_progress,  
        'aeolus-tooltop-button': aeolus_tooltip_button,  
        'aeolus-form': aeolus_form,   
        'aeolus-pie': aeolus_pie,
    },
    data() {
        return {
            cacheList: [
                {cacheName: '这是', displayName: '缓存1', cacheData: [
                    {id: 1, name: "格式化数据", value: 10, color: '#c23531'}, 
                    {id: 2, name: "产品数据", value: 10, color: '#2f4554'}, 
                    {id: 3, name: "基础数据", value: 10, color: '#61a0a8'}, 
                    {id: 4, name: "辅助数据", value: 10, color: '#d48265'}, 
                    {id: 5, name: "中间结果", value: 10, color: '#91c7ae'}, 
                    {id: 6, name: "其他", value: 20, color: '#749f83'}, 
                    {id: 7, name: "空间", value: 30, color: '#ca8622'}, 
                ],},
                {cacheName: '一个', displayName: '缓存2', cacheData: [
                    {id: 1, name: "格式化数据", value: 20, color: '#c23531'}, 
                    {id: 2, name: "产品数据", value: 10, color: '#2f4554'}, 
                    {id: 3, name: "基础数据", value: 10, color: '#61a0a8'}, 
                    {id: 4, name: "辅助数据", value: 10, color: '#d48265'}, 
                    {id: 5, name: "中间结果", value: 10, color: '#91c7ae'}, 
                    {id: 6, name: "其他", value: 10, color: '#749f83'}, 
                    {id: 7, name: "空间", value: 30, color: '#ca8622'}, 
                ],}
            ],
            configDialogVisible: false,
            cacheDataVisible: false,
            processData: [
                {id: 0, label: "总空间:", color: '#c23531', baseline: '90%', content: '4.4T/16T', children: [
                    {id: 1, value: '1%', color: '#c23531'}, 
                    {id: 2, value: '2%', color: '#2f4554'}, 
                    {id: 3, value: '3.5%', color: '#61a0a8'}, 
                    {id: 4, value: '1.5%', color: '#d48265'}, 
                    {id: 5, value: '1%', color: '#91c7ae'}, 
                    {id: 6, value: '0.5%', color: '#749f83'}, 
                    {id: 7, value: '0.5%', color: '#ca8622'}, 
                ]},
                {id: 1, label: "格式化数据:", value: '10%', color: '#c23531', baseline: '80%'}, 
                {id: 2, label: "产品数据:", value: '20%', color: '#2f4554', baseline: '80%'}, 
                {id: 3, label: "基础数据:", value: '35%', color: '#61a0a8', baseline: '85%'}, 
                {id: 4, label: "辅助数据:", value: '15%', color: '#d48265', baseline: '70%'}, 
                {id: 5, label: "中间结果:", value: '10%', color: '#91c7ae', baseline: '90%'}, 
            ],
            configBasicFormList: [  //总配置
                {id: 1, label: '缓存名称', type: 'input', dataIndex: 'cacheName', rules: [
                    { required: true, message: '请输入缓存名称', trigger: 'blur' },
                ]},
                {id: 2, label: '显示名称', type: 'input', dataIndex: 'displayName', rules: [
                    { required: true, message: '请输入显示名称', trigger: 'blur' },
                ]},
                {id: 3, label: '清理周期' , type: 'input', dataIndex: 'cleanTime', rules: [
                    { required: true, message: '请输入清理周期', trigger: 'blur' },
                ]},
                {id: 4, label: '挂载点', type: 'input', dataIndex: 'mountPoint', rules: [
                    { required: true, message: '请输入挂载点', trigger: 'blur' },
                ]},
                {id: 5, label: '清理流程名', type: 'input', dataIndex: 'cleanProcessName', rules: [
                    { required: true, message: '请输入清理流程名', trigger: 'blur' },
                ]},
                {id: 6, label: '创建时间', type: 'date-picker', dataIndex: 'creationTime', rules: [
                    { required: true, message: '请输入创建时间', trigger: 'blur' },
                ]},
                {id: 7, label: '是否可用', type: 'radio', dataIndex: 'available', options: getRadio(available), rules: [
                    { required: true, message: '请选择是否可用', trigger: ['change'] },
                ]},
            ],
            configBasicModel: { cacheName: '', displayName: '', cleanTime: '', mountPoint: '', cleanProcessName: '', creationTime: '', available: ''},
            cacheDataFormList: [  //各类缓存配置
                {id: 1, label: '数据类型', type: 'input', dataIndex: 'dataType', rules: [
                    { required: true, message: '请输入数据类型', trigger: 'blur' },
                ]},
                {id: 2, label: '容量', type: 'input', dataIndex: 'quota', rules: [
                    { required: true, message: '请输入容量', trigger: 'blur' },
                ]},
                {id: 3, label: '清理水线', type: 'input', dataIndex: 'waterLine', rules: [
                    { required: true, message: '请输入清理水线', trigger: 'blur' },
                ]},
                {id: 4, label: '截止清理水线', type: 'input', dataIndex: 'stopWaterLine', rules: [
                    { required: true, message: '请输入截止清理水线', trigger: 'blur' },
                ]},
                {id: 5, label: '清理优先级', type: 'input', dataIndex: 'priority', rules: [
                    { required: true, message: '请输入清理优先级', trigger: 'blur' },
                    { validator: function(rule,value,callback){
                            //校验1-9数字的正则
                            if(/^[1-9]{1}$/.test(value) == false){
                                callback(new Error("请输入1-9之间的数字"));
                            }else{
                                //校验通过
                                callback();
                            }
                        }, trigger: ['blur', 'change']
                    },
                ]},
                {id: 6, label: '清理策略', type: 'select', dataIndex: 'dataCleanStrategy', options: getSelect(dataCleanStrategy), rules: [
                    { required: true, message: '请选择清理策略', trigger: ['blur', 'change'] },
                ]},
                {id: 7, label: '驻留时间', type: 'input', dataIndex: 'stayHours', rules: [
                    { required: true, message: '请输入驻留时间', trigger: 'blur' },
                ]},
                {id: 8, label: '访问次数', type: 'input', dataIndex: 'accessTimes', rules: [
                    { required: true, message: '请输入访问次数', trigger: 'blur' },
                ]},
                {id: 9, label: '是否可用', type: 'radio', dataIndex: 'available', options: getRadio(available), rules: [
                    { required: true, message: '请选择是否可用', trigger: ['change'] },
                ]},
                {id: 10, label: '清理插件名称', type: 'input', dataIndex: 'cleanPlugin', rules: [
                    { required: true, message: '请输入清理插件名称', trigger: 'blur' },
                ]},
                {id: 11, label: '清理插件的参数', type: 'input', dataIndex: 'pluginConfig', rules: [
                    { required: true, message: '请输入清理插件的参数', trigger: 'blur' },
                ]},
                {id: 12, label: '数据类型描述', type: 'input', input_type: 'textarea', dataIndex: 'description'},
            ],
            cacheDataModel: { dataType: '', quota: '', waterLine: '', stopWaterLine: '', priority: '', dataCleanStrategy: '',
                stayHours: '', accessTimes: '', available: '', cleanPlugin: '', pluginConfig: '', description: '' },
            cacheData: []
        }
    },
    mounted(){
    },
    methods: {
        handleChangeItem (){
            console.log('改变model值', this.configBasicModel)
            
        },
        submitForm () {
            console.log('提交')
        },
        submitCacheData(){
            console.log('要提交的缓存数据参数：', this.cacheDataModel)
            this.cacheData.push(this.cacheDataModel)
            this.cacheDataVisible = false
        },
        handleRefresh () {  //刷新
            console.log('刷新')
        },
        handleClear () {  //清理
            console.log('清理')
        },
        handleConfig(item) {  //配置(新增或修改)
            this.configBasicModel  = item
            this.configDialogVisible = true
        },
        handleCheckLog () {  //查看日志
            console.log('查看日志')
        },
        handleSubmitCacheData(){  //确实提交缓存数据
            this.$refs['cacheData'].handleSubmit()
        },
        handleSubmitDisk(){   //确定提交一块盘的数据
            this.$refs['disk'].handleSubmit()
        }
    }
    

}
</script>
<style scoped>
#cache-manage {
    width: 100%
}
#progress-total {
    display: inline-block;
    height: 20px;
    width: 100%;
    background-color: darkgray;
    margin-bottom: 10px;
}
.box-card{
    margin: 10px;
    width: 30%
}
.card-header {
    height: 40px;
    line-height: 40px;
}
.box-add {
    margin: 10px;
    width: 30%;
    /* height: 600px; */
    border: 3px dashed;
    text-align: center;
    line-height: 600px;
    font-size: 100px;
    color: #eeeeee;
}
</style>
