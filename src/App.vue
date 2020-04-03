<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.flex {
  display: flex;
}
.space-between {
  justify-content: space-between;
}
.space-around {
  justify-content: space-around
}
.center{
  justify-content: center;
}
.el-card__header{
    padding: 8px 20px;
}
</style>
