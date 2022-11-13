<template>
    <div class="dlkj">
		<h1>4444</h1>
		<router-view></router-view>
    </div>
</template>
<script>
export default {
    namme:'case1',
    data(){
        return{
            
        }
    },
    methods:{
       
    },
    mounted(){
       this.$store.commit('setAboutIndex',3)
    }
}
</script>
<style lang="less" scoped>
	.dlkj {
		
	}
</style>