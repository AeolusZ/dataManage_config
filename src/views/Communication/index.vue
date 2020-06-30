<template>
    <div>
        <div :style="{color: color}">这是祖先组件</div>
        <el-button @click="() => changeColor()">改变颜色</el-button>
        {{this.name}}
        <el-button @click="() => changeData()">改变父组件数据</el-button>
        <Child></Child>
        <Child2></Child2>
        <div>{{firstName}}---{{lastName}}---{{fullName}}</div>
        <el-button @click="() => changeFullName()">改变fullName</el-button>
        <el-button @click="() => handleOpenWorker()">开启worker</el-button>
        <el-button @click="() => handleCloseWorker()">关闭worker</el-button>
        <el-menu class="menu" style="display:none;left:0;top:0" @close="closeMenu">
            <el-menu-item>新增</el-menu-item>
            <el-menu-item>删除</el-menu-item>
            <el-menu-item>修改</el-menu-item>
            <el-menu-item>查询</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import Child from './child'
import Child2 from './child2'
import Worker from './myWorker.worker'
export default {
    components: {Child, Child2},
    beforeCreate(){console.log('父组件--beforeCreate')},
    created(){console.log('父组件--created')},
    beforeMount(){console.log('父组件--beforeMount')},
    mounted(){ 
        let menu = document.querySelector('.menu')
        document.oncontextmenu = function(e){
            
            e.preventDefault()
            menu.style.display = 'block'
            console.log(e)
            menu.style.left = e.layerX + 'px'
            menu.style.top = e.layerY + 'px'
            console.log(menu)
        }
        menu.addEventListener('click', function(event) {
            var event = event || window.event;
            event.cancelBubble = true;
        })
        document.addEventListener('click', function() {
            menu.style.display = 'none';
        })
        console.log('父组件--mounted')
    },
    beforeUpdate(){console.log('父组件--beforeUpdate')},
    updated(){console.log('父组件--updated')},
    beforeDestroy(){console.log('父组件--beforeDestroy')},
    destroyed(){console.log('父组件--destroyed')},
    data(){
        return {
            color: 'blue',
            name: 'father',
            firstName: 'Foo',
            lastName: 'Bar'
        }
    },
    watch: {
        firstName: (oldVal,newVal) => {
            console.log(oldVal, newVal)
        }
    },
    computed: {
        fullName: {
            get(){//回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
                return this.firstName + ' ' + this.lastName
            },
            set(val){//监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
                //val就是fullName的最新属性值
                    const names = val.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[1];
            }
   }},
    provide() {
        return {
            theme: {
                color: this
            }
        };
    },
    methods: {
        closeMenu(){
            let menu = document.querySelector('.menu')
            menu.style.display = 'none'
        },
        changeColor(color){
            if (color) {
                this.color = color;
            } else {
                this.color = this.color === "blue" ? "red" : "blue";
            }
        },
        changeData(){
            this.name = 'parent'
        },
        changeFullName(){
            this.fullName = 'sari li'
        },
        handleOpenWorker(){
            var num = 1
            console.log('主线程的num值', num)
            if (typeof Worker !== 'undefined'){
                this.worker = new Worker()
            }
            this.worker.postMessage('myWorker')
            this.worker.onmessage = (ev) => {
                console.log('worker线程传来的值', ev.data)
            }
            this.worker.onerror = (e) => {
                console.log([
                    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
                ].join(''));
            }

            num++
            console.log('进行完加法运算的主线程的num值', num)
        },
        handleCloseWorker(){
            this.worker.terminate()
        }
    }
}
</script>
<style scoped>
.menu{
    position: absolute;
    width:100px;
    padding: 10px;
    border: 1px solid #555;
}
</style>