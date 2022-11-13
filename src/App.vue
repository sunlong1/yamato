<template>

  <div id="app">
     <!--头部导航-->
     <banner></banner>
     <router-view style="margin-top: 60px;"></router-view>
  </div>
</template>
<script>
import banner from './components/banner'
export default {
  name: 'App',
  mounted(){
	  console.log()
  },
  components:{
    banner
  }
}
</script>
<style>
body,html {
	background-color: #F6F8FE;
}
#app {
  color: #333333;
  a {
	  cursor: pointer;
  }
}
</style>
