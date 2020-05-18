<template>
<div class="wrap">
    <div class="middle">居中显示</div>
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
/* 绝对定位 已知宽高 */
/* .middle {
    width: 200px;
    height: 200px;
    border: 1px solid rgba(0, 0, 0, .3);
    position: absolute;
    top:  50%;
    left: 50%;
    margin: -100px 0 0 -100px
} */

/* 绝对定位 未知宽高 */
/* .middle {
    border: 1px solid rgba(0, 0, 0, .3);
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */

/* flex */
.wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center
}
.middle {
    border: 1px solid rgba(0, 0, 0, .3);
}
</style>