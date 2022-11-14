<template>
    <div class="dlkj">
		<h4>关于我们</h4>
		<p>天眼查基于政府公开数据，结合独家图数据库技术和世界领先的计算机语言学习能力，在线提供全国1.8亿+家社会实体、90余种数据维度的信息，涵盖企业背景、实际控制人、对外投资、融资历史、股权结构、法律诉讼等角度，还可以实时监控所关注的企业变更。 天眼查，用公开数据，以开放的方式，解决广泛的商业安全需求。</p>
		<p>天眼查基于政府公开数据，结合独家图数据库技术和世界领先的计算机语言学习能力，在线提供全国1.8亿+家社会实体、90余种数据维度的信息，涵盖企业背景、实际控制人、对外投资、融资历史、股权结构、法律诉讼等角度，还可以实时监控所关注的企业变更。 天眼查，用公开数据，以开放的方式，解决广泛的商业安全需求，让每个人公平地看清这个世界！天眼查致力于成为行业领先的企业级数据服务商，为广大的企业用户提供基于互联网形态的专业化数据服务。</p>
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
			font-size: 15px;
			margin-bottom: 12px;
			line-height: 24px;
			font-weight: 400;
		}
	}
</style>