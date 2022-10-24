<template>

  <div id="app">
     <!--头部导航-->
     <banner></banner>
     <router-view></router-view>
  </div>
</template>
<script>
import banner from './components/banner'
export default {
  name: 'App',
  components:{
    banner
  }
}
</script>
<style>
#app {
  color: #333333;
}
</style>
