<template>
    <div id="traffic-light" :style="trafficStyle"></div>
</template>
<script>
export default {
    name: 'trafficLight',
    data(){
        return {
            trafficStyle: {}
        }
    },
    async mounted(){
       this.loop()
    },
    beforeDestroy(){
        clearInterval(this.timer)
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