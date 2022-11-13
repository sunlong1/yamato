<template>
    <div class="index-box">
	  <div class="banner">
		  <h1 class="top-wedw">动态时序</h1>
		  <h1 class="bot-ddw"><span>——</span>全球企业 商业信息及数据应用的服务提供商</h1>
		  <div class="img"><img src="../../assets/index&api/content.png"/></div>
	  </div>
	  <div class="our-service">
		  <h1>我们的服务</h1>
		  <p class="english">Our service</p>
		  <ul class="tabs">
			  <li @click="index=1" v-bind:class="{'active': index===1}">数据服务</li>
			  <li @click="index=2" v-bind:class="{'active': index===2}">监控服务</li>
		  </ul>
		  <div v-show="index===1" class="tab-one">
			  <img src="../../assets/index&api/service.png">
		  </div>
		  <div v-show="index===2" class="tab-two">
			  <ul>
				  <li>
					  <img src="../../assets/index&api/one.png"/>
					  <div class="texts">
						  <h6>监控策略不同</h6>
						  <p>每日新增数百万的企业商业信息，针对信息量级不同的小企业和大企业配置不同的数据更新和信息监测策略</p>
					  </div>
				  </li>
				  <li>
					  <img src="../../assets/index&api/two.png"/>
					  <div class="texts">
						  <h6>单体监控</h6>
						  <p>对单个主体或主体集合的全面信息（可配置）进行主动监控，并通过API接口实时推送给客户的应用程序</p>
					  </div>
				  </li>
				  <li>
					  <img src="../../assets/index&api/three.png"/>
					  <div class="texts">
						  <h6>集合监控</h6>
						  <p>监控自变主体集合，非人工干预的情况下，支持主体集合本身的增减变化策略</p>
					  </div>
				  </li>
				  <li>
					  <img src="../../assets/index&api/four.png"/>
					  <div class="texts">
						  <h6>更多服务</h6>
						  <p>更多服务持续开发中，敬请期待...</p>
					  </div>
				  </li>
			  </ul>
		  </div>
	  </div>
	 
	 <div class="our-advan">
		<h1>我们的优势</h1>
		<p class="english">Our advantages</p>
		<ul>
			<li>
				<img class="spec-one" src="../../assets/index&api/111.png"/>
				<h6>合规的数据获取</h6>
				<p>全部数据均为公开信息，五年的基础数据资源能力储备和业务合规经验</p>
			</li>
			<li>
				<img class="spec-two" src="../../assets/index&api/222.png"/>
				<h6>先进的技术体系</h6>
				<p>自主研发，包含数据获取、清洗、衍生、融合、算法的全链条技术体系</p>
			</li>
			<li>
				<img src="../../assets/index&api/333.png"/>
				<h6>成群的服务客群</h6>
				<p>团队曾为腾讯、字节、上交所、广发证券、农业银行等数千家企业提供数据应用服务</p>
			</li>
			<li>
				<img src="../../assets/index&api/444.png"/>
				<h6>可行的解决方案</h6>
				<p>可实施解决方案包括：企业主数据整理和填充、客商风险监控、税源发现、寻客画像等</p>
			</li>
		</ul>
	</div>
	
	<div class="company-app">
		<h1>企业应用前景</h1>
		<p class="english">Enterprise application panorama</p>
		<ul>
			<li>
				<h6>工商基础信息</h6>
				<p>股东信息、董监高人员、工商变更记录、工商年报</p>
			</li>
			<li>
				<h6>上市公司信息</h6>
				<p>证券简介、招股说明书、上市公告、财务数据</p>
			</li>
			<li>
				<h6>经营发展信息</h6>
				<p>产品与服务、股权质押、新闻舆情、招聘信息、招投标、投融资信息、微博官网信息</p>
			</li>
			<li>
				<h6>司法诉讼信息</h6>
				<p>开庭公告、法律诉讼、终本案件、被执行人、失信被执行人、司法拍卖、破产重组</p>
			</li>
			<li>
				<h6>政府行政信息</h6>
				<p>行政许可、资质证书、网站备案、税务评级、进出口信用、工商抽检、行政处罚、税务处罚、经营异常</p>
			</li>
			<li>
				<h6>知识产权商标信息</h6>
				<p>商标信息、专利信息、软著信息</p>
			</li>
		</ul>
	</div>
      <foot></foot>
    </div>
</template>
<script>
import foot from '../../components/foot'
export default {
  name: 'index',
  components:{
    foot
  },
  data(){
    return{
       index: 1
    }
  },
  methods:{
    
  },
  mounted(){
   
  }
}
</script>
<style lang="less" scoped>
  .index-box {
	  .banner {
		  height: 548px;
		  background: url('../../assets/index&api/banner.png') no-repeat center top;
		  background-size: 1920px 548px;
		  .img {
			  width: 945px;
			  margin: 8px auto;
			  img {
				  width: 100%;
			  }
		  }
		  h1 {
			  width: 912px;
			  margin: 0 auto;
			  font-size: 36px;
			  font-weight: bold;
		  }
		  .top-wedw {
			  text-align: left;
			  padding-top: 50px;
		  }
		  .bot-ddw {
			  text-align: right;
			  // padding-top: 10px;
			  span {
				  color: #999999;
				  padding-right: 10px;
				  font-size: 26px;
			  }
		  }
	  }
	  
	  .our-service {
		  height: 712px;
		  background: #F6F8FE;
		  text-align: center;
		  h1 {
			font-size: 28px;
			padding: 44px 0 8px;
			font-weight: bold;
		  }
		  .english {
			 color: #666666;
			 font-size: 20px;
			 padding-bottom: 44px;
		  }
		  .tabs {
			  width: 250px;
			  margin: 0 auto 44px auto;
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			  li {
				  color: #666666;
				  font-size: 18px;
				  padding-bottom: 8px;
			  }
			  .active {
				  color: #1C66E5;
				  border-bottom: 2px solid #1C66E5;
			  }
		  }
		  .tab-one {
			  text-align: center;
			  img {
				  height: 384px;
			  }
		  }
		  .tab-two {
			  width: 1200px;
			  margin: 0 auto;
			  ul {
				  display: flex;
				  justify-content: space-between;
				  flex-wrap: wrap;
				  li {
					  width: 592px;
					  height: 166px;
					  padding: 36px 32px;
					  box-sizing: border-box;
					  display: flex;
					  background-color: #fff;
					  margin-bottom: 16px;
					  img {
						 width: 40px; 
						 height: 40px; 
						 margin-right: 30px;
					  }
					  .texts {
						  text-align: left;
						  h6 {
							 font-size: 20px;
							 margin-bottom: 10px;
							 font-weight: bold;
						  }
						  p {
							 font-size: 16px; 
						  }
					  }
				  }
			  }
		  }
	  }
	  
	  .our-advan {
		  height: 438px;
		  background: #fff;
		  text-align: center;
		  h1 {
			font-size: 28px;
			padding: 44px 0 8px;
			font-weight: bold;
		  }
		  .english {
			 color: #666666;
			 font-size: 20px;
			 padding-bottom: 44px;
		  }
		  ul {
			  width: 1200px;
			  margin: 0 auto;
			  display: flex;
			  justify-content: space-around;
			  li {
				  width: 200px;
				  img {
					  width: 40px;
					  margin-bottom: 24px;
				  }
				  .spec-one {
					  width: 44px;
				  }
				  .spec-two {
					  width: 38px;
				  }
				  h6 {
					  font-size: 18px;
					  font-weight: bold;
					  margin-bottom: 14px;
				  }
				  p {
					  font-size: 14px;
					  text-align: left;
				  }
			  }
		  }
	  }
	  
	  .company-app {
		  height: 647px;
		  background: url('../../assets/index&api/banner2.png') no-repeat center top;
		  background-size: 1920px 647px;
		  text-align: center;
		  h1 {
			font-size: 28px;
			padding: 44px 0 8px;
			font-weight: bold;
			color: #fff;
		  }
		  .english {
			 color: #fff;
			 font-size: 20px;
			 padding-bottom: 44px;
		  }
		  ul {
			  width: 1200px;
			  margin: 0 auto;
			  display: flex;
			  justify-content: space-between;
			  flex-wrap: wrap;
			  li {
				  width: 390px;
				  height: 188px;
				  padding: 32px;
				  box-sizing: border-box;
				  background-color: #fff;
				  margin-bottom: 16px;
				  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
				  border-radius: 4px;
				  text-align: left;
				  h6 {
				    font-size: 24px; 
					margin-bottom: 16px;
				  }
				  p {
					font-size: 16px;
					color: #666666;
				  }
			  }
		  }
	  }
  }
</style>