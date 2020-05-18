<template>
    <div id="traffic-light" :style="trafficStyle"></div>
</template>
<script>
import { Message } from 'element-ui'
export default {
    name: 'trafficLight',
    data(){
        return {
            trafficStyle: {}
        }
    },
    async mounted(){
       this.loop()
       let eg = this.eg()
       console.log(eg)
    },
    methods: {
        async changeColor(duration, color){
            this.trafficStyle = {
                'background-color': color
            }
            await this.sleep(duration)
        },
        sleep(duration){
            return new Promise(function(reslove){
                setTimeout(reslove, duration)
            })
        },
        async loop(){
            await this.changeColor(3000, "green");
            await this.changeColor(1000, "yellow");
            await this.changeColor(2000, "red");
            this.loop() 
        },
        eg(){
            outer: while(true){
                inner: while(true){
                    console.log('no')
                    break outer;  //不加outer造成死循环
                }
            }
            console.log('finished')
        }
    }
}
</script>
<style scoped>
#traffic-light {
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    background-color: green;
    margin: 50px
}
</style>