<template>
    <div class="dlkj">
		<h4>关于我们</h4>
		<p>动态时序是一家商业信息及数据应用的服务提供商。基于商业系信息的基本逻辑与时间序列关系，通过对全球商事主体的海量商业信息进行整合、清洗、加工，利用时序图计算技术挖掘主体之间、信息之间的深度关系并形成衍生数据和标签，依托Daas服务平台提供多元化服务交付形式，为企业客户提供可直接应用于商业场景的数据技术服务，并对外提供标准化的SaaS产品。</p>
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
       this.$store.commit('setAboutIndex',0)
    }
}
</script>
<style lang="less" scoped>
	.dlkj {
		padding: 20px;
		h4 {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 20px;
		}
		p {
			font-size: 16px;
			margin-bottom: 12px;
			line-height: 28px;
			font-weight: 400;
			letter-spacing: 1px;
		}
	}
</style>