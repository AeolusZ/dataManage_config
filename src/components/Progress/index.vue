<template>
    <!-- 进度条组件 created by ruxiu.zheng  -->
    <!-- label: 进度条的名称 -->
    <!-- content: 进度条中显示的文字 -->
    <!-- children: 进度条由几部分组成 -->
    <!-- color: 进度条的不同进度颜色 -->
    <!-- baseline: 进度条的警戒线 -->
    <!-- value: 进度条的不同进度占比值 -->
    <div id="progress">
            <div v-for="item in data" v-bind:key="item.id" class="flex">
                <div class="progress-label">{{item.label}}</div>
                <div class="progress-total" v-if="item.children">
                    {{item.content}}
                    <div 
                        v-for="childItem in item.children"
                        :key="childItem.id"
                        :style="{float: 'left', 'background-color': childItem.color, width: childItem.value, height: '100%'}"
                    >{{childItem.content}}</div>
                    <div :style="{position: 'absolute', top: 0, left: item.baseline, height: '100%', 'border-right': '5px solid #AA0000'}"></div>
                </div>
                <div class="progress-total" v-else>
                    <div 
                        :key="item.id"
                        :style="{float: 'left', 'background-color': item.color, width: item.value, height: '100%'}"
                    >{{item.content}}</div>
                    <div :style="{position: 'absolute', top: 0, left: item.baseline, height: '100%', 'border-right': '5px solid #AA0000'}"></div>
                </div>
            </div>
        </div> 
</template>
<script>
export default {
    name: 'aeolus-progress',
    props: ['data']
}
</script>
<style scoped>
.flex {
    display: flex;
}
.flex-column {
    flex-direction: column;
}
.progress-label{
    width: 150px;
    padding: 0 10px;
    text-align: right;
}
.progress-total {
    display: inline-block;
    height: 20px;
    width: 100%;
    text-align: center;
    position: relative;
    background-color: darkgray;
    margin-bottom: 10px;
}
</style>