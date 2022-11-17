<template>
    <div class="index-box">
	  <div class="item-one-inner">
		  <div class="item-one">
			  <div class="item-dwdew" :loading="startLoading">
				  <div class="rtghn" @mouseleave="leaveHover">
					  <ul class="ulwdw">
						  <li v-for="(item,index) in result" @mouseover="goHover(item.dimId)">
							  <div>
								  <img class="one" :src="item.dimDefPicture"/>
								  <span>{{item.dimName}}</span>
								  <span class="wdewd ddew">|</span>
								  <span class="wdewd" @click="goDetail(item.dimId,item.intfList[0].id)">{{item.intfList[0].name.slice(0,4)}}</span>
							  </div>
							  <img  class="two"  src="../../assets/jiantou/right_small.png"/>
						  </li>
						  <!-- <li @mouseover="goHover(2)">
							  <div>
								  <img class="one" src="../../assets/leftAside/666_.png"/>
								  <span>经营信息</span>
								  <span class="wdewd ddew">|</span>
								  <span  class="wdewd" @click="goDetail(987)">招投标</span>
							  </div>
							  <img  class="two"  src="../../assets/jiantou/right_small.png"/>
						 </li>
						 <li  @mouseover="goHover(3)">
							  <div>
								  <img class="one" src="../../assets/leftAside/555_.png"/>
								  <span>经营风险</span>
								  <span class="wdewd ddew">|</span>
								  <span  class="wdewd" @click="goDetail(321)">经营异常</span>
							  </div>
							  <img  class="two"  src="../../assets/jiantou/right_small.png"/>
						 </li>
						 <li @mouseover="goHover(4)">
							  <div>
								  <img class="one" src="../../assets/leftAside/iii_.png"/>
								  <span>知识产权</span>
								  <span class="wdewd ddew">|</span>
								  <span  class="wdewd" @click="goDetail(333)">司法风险</span>
							  </div>
							  <img  class="two"  src="../../assets/jiantou/right_small.png"/>
						 </li>
						 <li @mouseover="goHover(5)">
							  <div>
								  <img class="one" src="../../assets/leftAside/ddd_.png"/>
								  <span>司法风险</span>
								  <span class="wdewd ddew">|</span>
								  <span  class="wdewd" @click="goDetail(98)">法律诉讼</span>
							  </div>
							  <img  class="two"  src="../../assets/jiantou/right_small.png"/>
						 </li>
						 <li @mouseover="goHover(6)">
							  <div>
								  <img class="one" src="../../assets/leftAside/jjj_.png"/>
								  <span>建筑资质</span>
								  <span class="wdewd ddew">|</span>
								  <span  class="wdewd">不良行为</span>
							  </div>
							  <img  class="two"  src="../../assets/jiantou/right_small.png"/>
						 </li> -->
					  </ul>
					  <div class="efgbn" v-show="hoverShow>0">
						  <ul>
							  <li v-for="item in array1" @click="goDetail(item.dimId,item.id)">
								  <h6>{{item.name}}</h6>
								  <p>{{item.descr}}</p>
							  </li>
						  </ul>
					  </div>
				  </div>
				  <div class="dewee">
					  <router-link to="allApi">查看更多</router-link>
				  </div>
				  
			  </div>
			  <div class="item-dwde">
				  <h1>企业级产品</h1>
				  <p>利用金融、商业等专业领域知识，将「实体」与「时间」的关系进一步<br/>标签化，形成风险标签、产业标签、画像标签、评分标签</p>
			  </div>
		  </div>
	  </div>
	  <div class="item-two">
		  <h1>数据生产线</h1>
		  <p class="english">Data  product line</p>
		  <ul>
			  <li>
				  <img src="../../assets/index&api/aaa4.png"/>
				  <p>自动化访问获取数据</p>
			  </li>
			  <li>
				  <img src="../../assets/index&api/aaa1.png"/>
				  <p>数据抽取与数据解析</p>
			  </li>
			  <li>
				  <img src="../../assets/index&api/aaa3.png"/>
				  <p>数据连接与多源融合</p>
			  </li>
			  <li>
				  <img src="../../assets/index&api/aaa2.png"/>
				  <p>数据实时计算体系</p>
			  </li>
		  </ul>
	  </div>
	  <div class="item-two item-three">
		  <h1>可行的解决方案</h1>
		  <p class="english">Possible solutions</p>
		  <ul>
			  <li>
				  <img src="../../assets/index&api/ccc1.png"/>
				  <p>企业主数据整理和填充</p>
			  </li>
			  <li>
				  <img src="../../assets/index&api/ccc2.png"/>
				  <p>客商风险监控</p>
			  </li>
			  <li>
				  <img src="../../assets/index&api/ccc3.png"/>
				  <p>税源发现</p>
			  </li>
			  <li>
				  <img src="../../assets/index&api/ccc4.png"/>
				  <p>寻客画像</p>
			  </li>
		  </ul>
	  </div>
	  <div class="item-four">
		  <h1>业务场景</h1>
		  <p class="english">Business scenario</p>
		  <ul>
			  <li>
				  <img class="pos-icon" src="../../assets/index&api/eee1.png"/>
				  <span class="hgyu">01 TRADITION</span>
				  <h5>传统行业</h5>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>招投标供应商资质审核及关系排查</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>企业资质核实</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>供应商/客户审查</span></p>
			  </li>
			  <li class="poiu">
				  <img class="pos-icon" src="../../assets/index&api/eee2.png"/>
				  <span class="hgyu">02 BANK</span>
				  <h5>银行、保险</h5>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>货前信息核验、背景调查</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>贷中贷款额度、信用评估</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>贷后企业风险监控、防止围标串标</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>智能填单、智能录入、智能审核</span></p>
			  </li>
			  <li class="poiu">
				  <img class="pos-icon" src="../../assets/index&api/eee3.png"/>
				  <span class="hgyu">03 IT NET</span>
				  <h5>IT互联网</h5>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>数据分析</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>自主研发</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>数据支撑</span></p>
			  </li>
			  <li class="poiu spec">
				  <img class="pos-icon" src="../../assets/index&api/eee4.png"/>
				  <span class="hgyu">04 ONLINE</span>
				  <h5>电商、物流</h5>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>供应商入库信息核验</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>核实进出口信用评级</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>供应商关联关系</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>风险评估、监控</span></p>
			  </li>
			  <li class="poiu">
				  <img class="pos-icon" src="../../assets/index&api/eee5.png"/>
				  <span class="hgyu">05 LAWYER</span>
				  <h5>律师、会计事务所</h5>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>拓展案源</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>确认企业过往涉诉情况</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>案例分析</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>审计尽调、审计报告</span></p>
			  </li>
			  <li>
				  <img class="pos-icon" src="../../assets/index&api/eee6.png"/>
				  <span class="hgyu">06 QUALIFICATIONS</span>
				  <h5>资质许可</h5>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>行政许可</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>建筑资质</span></p>
				  <p><img src="../../assets/index&api/duigou.png"/> <span>电信许可</span></p>
			  </li>
			  <li class="lsff">更多业务场景、敬请期待~</li>
		  </ul>
	  </div>
      <foot></foot>
    </div>
</template>
<script>
	
let timer = null
let timer2 = null
import foot from '../../components/foot'
export default {
  name: 'api',
  components:{
    foot
  },
  data(){
    return{
	  hoverShow: 0,
	  result: [],
	  itemList: {},
	  startLoading: false
	  // array1: [
		 //  {
			//   title: '企业基本信息',
			//   content: '获取包括：统一社会信用代码、注册资本、法定代表人、经营范围、经营状态等信息',
			//   id: 567
		 //  }
	  // ]
    }
  },
  computed: {
	  array1:function () {
		  console.log(this.itemList[this.hoverShow])
		  return this.itemList[this.hoverShow]
	  }
  },
  methods:{
    goHover(id) {
	  this.hoverShow = id
	  console.log(this.hoverShow)
	  console.log(typeof this.hoverShow)
	},
	leaveHover() {
	  this.hoverShow = 0
	},
	goDetail(dimId,id) {
		this.$router.push(`/apiDetail?dimId=${dimId}&id=${id}`)
	},
	resolveData() {
		this.result.forEach(item=>{
			this.itemList[item.dimId] = item.intfList
		})
	}
  },
  mounted(){
	  this.startLoading = true
	  let params = {
		  dimIntfNum: 8
	  }
	  // 8027
	  this.$axios.get('http://192.168.0.99:8020/portal/api/dim/interface/home',params)
	  .then((res) =>{
		  console.log(res)
		  if (res.state===200) {
			
		  } else {
			this.$message.error(res.message);
		  }
		  this.result = res.data.slice(0,6)
		  this.resolveData()
		  this.startLoading = false
	  })
	  .catch(err=>{
		  this.startLoading = false
		  this.$message.error(err);
	  })
  }
}
</script>
<style lang="less" scoped>
  .index-box {
	  .item-one-inner {
		  height: 358px;
		  box-sizing: border-box;
		  padding: 20px 0;
		  background: linear-gradient(180deg, #F3F7FE 0%, #D6E8FD 100%);
	  }
  	  .item-one {
  		  width: 1200px;
  		  margin: 0 auto;
  		  display: flex;
  		  justify-content: space-between;
  		  .item-dwdew {
			  width: 254px;
			  height: 318px;
			  padding-bottom: 20px;
			  box-sizing: border-box;
			  border-radius: 4px;
			  background-color: #fff;
			  .rtghn{
				 padding: 20px 20px 0;
				 box-sizing: border-box;
				 border-radius: 4px;
				 position: relative; 
				 // height: 254px;
				 // overflow: hidden;
			  }
			  .ulwdw {
				  li {
					  font-size: 14px;
					  display: flex;
					  justify-content: space-between;
					  align-items: center;
					  margin-bottom: 18px;
					  .one {
						 width: 13px;
						 height: 14px;
						 margin-right: 9px;
					  }
					  span {
						  cursor: pointer;
					  }
					  .two {
						 width: 9px;
					  }
					  .wdewd {
						  color: #999;
						  margin-left: 8px;
					  }
					  .wdewd:hover {
						  color: #1C66E5;
					  }
					  .ddew {
						  color: #E0E0E0;
					  }
				  }
			  }
			  .dewee {
				  width: 214px;
				  height: 36px;
				  margin: 0 auto;
				  background: #F3F5FA;
				  border-radius: 2px;
				  text-align: center;
				  line-height: 36px;
				  a {
					  color: #666666;
					  font-weight: 400;
				  }
			  }
			  .efgbn {
				  width: 946px;
				  height: 318px;
				  padding: 28px 0 28px 20px;
				  box-sizing: border-box;
				  position: absolute;
				  top:0;
				  right: -946px;
				  background-color: #fff;
				  box-shadow: -4px 4px 12px rgba(0, 0, 0, 0.04);
				  border-radius: 4px;
				  ul {
					  display: flex;
					  flex-wrap: wrap;
					  li {
						  width: 284px;
						  height: 99px;
						  padding-right: 27px;
						  box-sizing: border-box;
						  h6 {
							  color: #333333;
							  font-size: 14px;
							  padding-bottom: 8px;
							  cursor: pointer;
						  }
						  p {
							  font-size: 12px;
							  color: #999999;
							  cursor: pointer;
							  overflow:hidden;
							  text-overflow:ellipsis;
							  display:-webkit-box;
							  -webkit-box-orient:vertical;
							  -webkit-line-clamp:2;
						  }
					  }
					  li:hover {
						  h6 {
							  color: #1C66E5;
						  }
						  p {
							  color: #1C66E5;
						  }
					  }
				  }
			  }
		  }
  		  .item-dwde {
  			  width: 930px;
  			  height: 318px;
  			  background: url('../../assets/index&api/banner3.png') no-repeat center top;
  			  background-size: 930px 318px;
			  color: #fff;
			  h1 {
				  font-size: 36px;
				  margin: 80px 0 14px 48px;
			  }
			  p {
				 margin-left: 48px;
				 font-size: 18px; 
			  }
  		  }
  	  }
  
	  .item-two {
		  text-align: center;
		  background: #F6F8FE;
		  h1 {
			font-size: 28px;
			padding: 60px 0 8px;
			font-weight: bold;
		  }
		  .english {
			 color: #666;
			 font-size: 20px;
			 padding-bottom: 44px;
		  }
		  ul {
			  display: flex;
			  justify-content: space-between;
			  font-size: 18px;
			  text-align: center;
			  width: 1100px;
			  margin: 0 auto;
			  li {
				  img {
					  width: 128px;
				  }
				  p {
					  padding: 20px 0 64px;
				  }
			  }
		  }
	  }
  
	  .item-three {
		background: #FFFFFF;
		ul{
			width: 1200px;
			li {
				img {
				  width: 300px;
				}
				p {
					padding: 0;
					position: relative;
					top: -40px
				}
			}
		}	
	  }
	  .item-four {
		  text-align: center;
		  background: #F6F8FE;
		  height: 759px;
		  h1 {
			font-size: 28px;
			padding: 60px 0 8px;
			font-weight: bold;
		  }
		  .english {
			 color: #666;
			 font-size: 20px;
			 padding-bottom: 44px;
		  }
		  ul {
			  width: 1200px;
			  margin: 0 auto;
			  // display: flex;
			  // justify-content: space-between;
			  // flex-wrap: wrap;
			  
			  li {
				  width: 288px;
				  height: 242px;
				  background: rgba(251, 252, 255, 0.8);
				  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
				  border-radius: 4px;
				  float: left;
				  margin-right: 15px;
				  position: relative;
				  text-align: left;
				  padding: 24px;
				  box-sizing: border-box;
				  &:first-child {
					  height: 503px;
				  }
				  &:last-child {
					  margin-right: 0;
				  }
				  .pos-icon {
					  width: 36px;
					  position: absolute;
					  right: 24px;
					  top: 20px;
				  }
				  .hgyu {
					display: block;
					font-size: 14px;
					color: #999999;	
					margin-bottom: 20px;
					font-family: 'Bebas Neue';
				  }
				  h5 {
				    font-size: 22px;
					margin-bottom: 14px;
				  }
				  p {
					  margin-bottom: 6px;
					  img {
						 width: 12px; 
						 margin-right: 2px;
					  }
					  span {
						  font-size: 14px;
					  }
				  }
			  }
			  .spec {
				   margin-right: 0;
			  }
			  .poiu {
				  margin-bottom: 19px;
			  }
			  .lsff {
				  color: #999999;
				  font-size: 14px;
				  text-align: center;
				  line-height: 194px;
			  }
		  }
	  }
  }
</style>