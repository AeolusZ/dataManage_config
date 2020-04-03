<template>
    <el-form :model="model" ref="form" :inline="inline" :label-width="labelWidth" class="demo-dynamic">
        <!-- 多项 -->
        <div v-if="model.domains">
            <el-form-item  v-for="(domain, index) in model.domains" :key="domain.key">
                <el-form-item v-for="item in list" :key="item.id" :prop="item.dataIndex" :label="item.type === 'submit-button' || item.type === 'add-button' || item.type === 'cut-button' ? null : item.label+index" :rules="item.rules">
                    <!-- 输入框 -->
                    <el-input v-if="item.type === 'input'" v-model="model[item.dataIndex]" :type="item.input_type" :placeholder="'请输入'+item.label" @change="handleChange" :style="{width: contentWidth}"></el-input>
                    <!-- 选择器 -->
                    <el-select v-if="item.type === 'select'" v-model="model[item.dataIndex]" :placeholder="'请选择'+item.label" @change="handleChange" :style="{width: contentWidth}">
                        <el-option v-for="option in item.options" :key="option.id" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                    <!-- 单选框 -->
                    <el-radio-group v-if="item.type === 'radio'" v-model="model[item.dataIndex]" @change="handleChange" :style="{width: contentWidth}">
                        <el-radio v-for="option in item.options" :key="option.id" :label="option.label">{{option.name}}</el-radio>
                    </el-radio-group>
                    <!-- 多选框 -->
                    <el-checkbox-group v-if="item.type === 'checkbox'" v-model="model[item.dataIndex]" @change="handleChange" :style="{width: contentWidth}">
                        <el-checkbox v-for="option in item.options" :key="option.id" :label="option.label" :name="option.name"></el-checkbox>
                    </el-checkbox-group>
                    <!-- 日期选择框 -->
                    <el-date-picker v-if="item.type === 'date-picker'" v-model="model[item.dataIndex]" placeholder="请选择日期" @change="handleChange" :style="{width: contentWidth}"></el-date-picker>
                    <!-- 提交按钮 -->
                    <el-button v-if="item.type === 'submit-button'" @click="handleSubmit">{{item.name}}</el-button>
                    <!-- 新增按钮 -->
                    <el-button v-if="item.type === 'add-button'" @click="handleAdd">{{item.name}}</el-button>
                    <!-- 减少按钮 -->
                    <el-button v-if="item.type === 'cut-button'" @click="handleCut(domain)">{{item.name}}</el-button>
                </el-form-item>
            </el-form-item>
        </div>
        <!-- 一项 -->
        <div v-else>
            <el-form-item v-for="item in list" :key="item.id" :prop="item.dataIndex" :label="item.type === 'submit-button' ?  null : item.label" :rules="item.rules">
                <!-- 输入框 -->
                <el-input v-if="item.type === 'input'" v-model="model[item.dataIndex]" :type="item.input_type" :placeholder="'请输入'+item.label" @change="handleChange" :style="{width: contentWidth}"></el-input>
                <!-- 选择器 -->
                <el-select v-if="item.type === 'select'" v-model="model[item.dataIndex]" :placeholder="'请选择'+item.label" @change="handleChange" :style="{width: contentWidth}">
                    <el-option v-for="option in item.options" :key="option.id" :label="option.label" :value="option.value"></el-option>
                </el-select>
                <!-- 单选框 -->
                <el-radio-group v-if="item.type === 'radio'" v-model="model[item.dataIndex]" @change="handleChange" :style="{width: contentWidth}">
                    <el-radio v-for="option in item.options" :key="option.id" :label="option.label">{{option.name}}</el-radio>
                </el-radio-group>
                <!-- 多选框 -->
                <el-checkbox-group v-if="item.type === 'checkbox'" v-model="model[item.dataIndex]" @change="handleChange" :style="{width: contentWidth}">
                    <el-checkbox v-for="option in item.options" :key="option.id" :label="option.label" :name="option.name"></el-checkbox>
                </el-checkbox-group>
                <!-- 日期选择框 -->
                <el-date-picker v-if="item.type === 'date-picker'" v-model="model[item.dataIndex]" placeholder="请选择日期" @change="handleChange" :style="{width: contentWidth}"></el-date-picker>
                <!-- 提交按钮 -->
                <el-button v-if="item.type === 'submit-button'" @click="handleSubmit">{{item.name}}</el-button>
            </el-form-item>
        </div>
        
    </el-form>
</template>
<script>
export default {
    name: 'aeolus-form',
    props: ['list', 'model', 'labelWidth', 'contentWidth', 'inline'],
    methods:{
        handleChange(){  //每个item改变时触发
            this.$emit('change')
        },
        handleSubmit() {  //验证提交
            this.$refs['form'].validate((valid)=> {
                if (valid) {
                    this.$emit('submit')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        handleAdd(){
            this.$emit('addDomain')
        },
        handleCut(item){
            this.$emit('cutDomain', item)
        }
    }
}
</script>
<style scoped>

</style>