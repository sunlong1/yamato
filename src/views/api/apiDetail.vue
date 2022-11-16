<template>
    <div class="more-api">
        <div class="more-api-box" @scroll="handleScroll" ref="apiDetail">
			<!--banner -->
			<div class="khhd" :loading="leftLoading">
				<div class="gfdd">
					<div class="iuhg">
						<img src="../../assets/leftAside/888_.png"/>
						<p>接口列表</p>
					</div>
					<span>({{total}})</span>
				</div>
				<div v-if="showLeft">
					<el-menu
					:default-openeds="[shows.toString()]" 
					:default-active="shows + '-' + selectId"
					:unique-opened="true"
					@select="handleSelect"
					@open="handleOpen"
					@close="handleClose">
					  <el-submenu v-for="item in dimList" :index="item.dimId.toString()" :key="item.dimId">
						<template slot="title"><img class="sokj" :src="item.dimDefPicture"/>{{item.dimName}}</template>
						<el-menu-item-group>
						  <el-menu-item v-for="demo in item.intfList" :index="item.dimId+ '-' + demo.id" :key="demo.id">{{demo.name}}</el-menu-item>
						</el-menu-item-group>
					  </el-submenu>
					</el-menu>
				</div>
			</div>
			<div class="router_box">
			    <div class="tyhj">
			    	<div class="rtgh">
			    		<img src="../../assets/index&api/hongxin.png"/>
			    	</div>
			    	<div class="ijhb">
			    		<h6>{{detailObj.name}}</h6>
			    		<p class="tyhn">{{detailObj.descr}}</p>
			    		<div class="gtrr">
			    			<div class="vffd">
			    				<p>接口ID：<span class="wdwe">{{detailObj.showId}}</span></p>
			    				<p>价格：<span class="gddss">￥{{detailObj.price}}</span></p>
			    			</div>
			    			<div class="fdds" @click="apply">申请接口</div>
			    		</div>
			    	</div>
			    </div>
				
				<div class="wetdfw" id="topHeight">
					<ul v-bind:class="['uyfe',{'pojhs': fixed}]">
						<li v-bind:class="{'active':rightIndex===1}" @click="rightIndex=1"><a @click="goMsg()">接口信息</a></li>
						<li v-bind:class="{'active':rightIndex===2}" @click="rightIndex=2"><a @click="goWrong()">错误代码</a></li>
						<li v-bind:class="{'active':rightIndex===3}" @click="rightIndex=3"><a @click="goExample()">示例代码</a></li>
					</ul>
					<div class="fbnss">
						<div class="iuyt">
							<p><span>接口地址：</span>{{detailObj.url}}</p>
							<p><span>请求方式：</span>{{detailObj.reqMethod}}</p>
							<p><span>请求参数：</span>{{detailObj.reqParam || '---'}}</p>
							<p><span>返回参数格式：</span>{{detailObj.respFormat}}</p>
							<p class="spec"><span>请求示例：</span>{{detailObj.reqExample || '---'}}</p>
							<div class="rghds" @click="testApi">
								测试接口
							</div>
						</div>
						<div class="iuyt rfghj">
							<p><span>授权认证方式：</span>{{detailObj.authorizationWay}}</p>
							<p><span>授权认证示例：</span>{{detailObj.authorizationExample}}</p>
						</div>
					</div>
					
					<div class="rtyhe">
						<div class="ewdf">
							<div class="vfths">
								<span></span>
								<p>请求参数(Query)</p>
							</div>
							<img src="../../assets/jiantou/right_big.png"/>
						</div>
						<div class="vghs">
							<el-table
							  :data="tableData"
							  style="width: 100%">
							  <el-table-column
								prop="name"
								label="参数名"
								width="180">
							  </el-table-column>
							  <el-table-column
								prop="type"
								label="类型"
								width="120">
							  </el-table-column>
							  <el-table-column
								:prop="fill?'是':'否'"
								width="120"
								label="是否必填">
								</el-table-column>
							  <el-table-column
								prop="desc"
								label="说明">
							  </el-table-column>
							</el-table>
						</div>
					</div>
					
					<div class="rtyhe ohgdss">
						<div class="ewdf">
							<div class="vfths">
								<span></span>
								<p>返回结果JSON示例</p>
							</div>
							<img src="../../assets/jiantou/right_big.png"/>
						</div>
						<div class="oiugf">
							<pre>{{ JSON.stringify(JSON.parse(detailObj.respExample), null, 4)  }}</pre>
						</div>
					</div>
					
					<div class="rtyhe ohgdss">
						<div class="ewdf">
							<div class="vfths">
								<span></span>
								<p>返回字段说明</p>
							</div>
							<img src="../../assets/jiantou/right_big.png"/>
						</div>
						<div class="yhnww">
							<el-table
							  :data="quaryData"
							  style="width: 100%">
							  <el-table-column
								prop="name"
								label="参数名"
								width="180">
							  </el-table-column>
							  <el-table-column
								prop="type"
								label="字段类型"
								width="120">
							  </el-table-column>
							  <el-table-column
								prop="length"
								width="120"
								label="长度">
								</el-table-column>
							  <el-table-column
								prop="desc"
								label="备注">
							  </el-table-column>
							</el-table>
						</div>
					</div>
					
				</div>
			
				<div class="wetdfw edffd">
					<div class="rtyhe" id="wrongcode">
						<div class="ewdf">
							<div class="vfths">
								<span></span>
								<p>错误代码</p>
							</div>
							<img src="../../assets/jiantou/right_big.png"/>
						</div>
						<div class="vghs">
							<el-table
							  :data="codeData"
							  style="width: 100%">
							  <el-table-column
								prop="code"
								label="代码"
								width="450">
							  </el-table-column>
							  <el-table-column
								prop="typeDesc"
								label="说明"
								width="450">
							  </el-table-column>
							</el-table>
						</div>
					</div>
				</div>
				
				<div class="wetdfw edffd">
					<div class="rtyhe" id="example">
						<div class="ewdf">
							<div class="vfths">
								<span></span>
								<p>示例代码</p>
							</div>
							<img src="../../assets/jiantou/right_big.png"/>
						</div>
						<div class="edfgh">
							<ul>
								<li @click="showIndex=1" v-bind:class="{'active': showIndex===1}">JAVA</li>
								<li @click="showIndex=2" v-bind:class="{'active': showIndex===2}">PHP</li>
								<li @click="showIndex=3" v-bind:class="{'active': showIndex===3}">GO</li>
								<li @click="showIndex=4" v-bind:class="{'active': showIndex===4}">PYTHON</li>
								<li @click="showIndex=5" v-bind:class="{'active': showIndex===5}">Node.js</li>
							</ul>
						</div>
						<div class="ftyuj">
							<pre>
								package com.example.demo.http;
								
								import org.apache.http.client.methods.CloseableHttpResponse;
								import org.apache.http.client.methods.HttpGet;
								import org.apache.http.impl.client.CloseableHttpClient;
								import org.apache.http.impl.client.HttpClients;
								import org.apache.http.util.EntityUtils;
								
								import java.io.IOException;
								
								public class HttpDemo {
								
								    public static void main(String[] args) {
								        String secretkey = "您的secretkey";
								        String url = "http://api.workatdata.com/open/dataxy/gongshang/base/info/query?keyword=万科企业股份有限公司";
								
								        HttpGet httpGet = new HttpGet(url);
								        httpGet.setHeader("secretkey", secretkey);
								
								        CloseableHttpClient httpClient = HttpClients.createDefault();
								        CloseableHttpResponse httpResponse;
								        String result = null;
								        try {
								            httpResponse = httpClient.execute(httpGet);
								            if (httpResponse.getStatusLine().getStatusCode() == 200) {
								                result = EntityUtils.toString(httpResponse.getEntity(), "utf-8");
								            }
								        } catch (IOException e) {
								            e.printStackTrace();
								        } finally {
								            try {
								                httpClient.close();
								            } catch (IOException e) {
								                e.printStackTrace();
								            }
								        }
								        System.out.println(result);
								    }
								}
							</pre>
						</div>
					</div>
				</div>
				
			</div>
		</div>
    </div>
</template>
<script>
export default {
	name: 'apiDetail',
    data(){
        return{
            shows:0,
			selectId: 0,
			rightIndex: 1,
			showIndex: 1,
			activeName: 'first',
			fixed: false,
			dimList: [],
			dimListDetail:{},
			showLeft: false,
			tableData: [{
				date1: 'keyword',
				date2: 'string',
				date3: '是',
				date4: '企业id/企业名称/统一信用代码/注册号'
			  }],
			leftLoading: false,
			result: {
				tmList: [
					{
						"regNo": "60618100",
						"tmName": "百度问一问",
						"tmPic": "https://tm-image.tianyancha.com/tm/822a4e0560502dd161421611dc5208ed.jpg",
						"appDate": "2021-11-16",
						"tmClass": "38",
						"id": '230424694',
						"intCls": "38-通讯服务",
						"applicantCn": "北京百度网讯科技有限公司",
						"category": "商标注册申请---申请收文",
					}]
				},
			quaryData: [{
				date1: 'keyword',
				date2: 'string',
				date3: '255',
				date4: '企业id/企业名称/统一信用代码/注册号'
			  },{
				date1: 'keyword',
				date2: 'string',
				date3: '255',
				date4: '企业id/企业名称/统一信用代码/注册号'
			  }],
			codeData: [
				{
					date1: '300000',
					date2: '无数据',  
				},
				{
					date1: '300001',
					date2: '请求失败',  
				},
				{
					date1: '300002',
					date2: '账号失效',  
				}
			],
			total: 0,
			detailObj: {}
		}
    },
    methods:{
		goMsg() {
			document.documentElement.scrollTop = 150
		},
		goWrong() {
			let targetbox= document.getElementById('topHeight');
			// // this.target= ;  
			console.log(targetbox.offsetHeight)
			// document.body.scrollTop  = targetbox.offsetTop
			// this.$refs['apiDetail'].scrollTo(0,200);
			document.documentElement.scrollTop = targetbox.offsetHeight+120;
		},
		goExample() {
			let targetbox= document.getElementById('topHeight');
			let targetbox1= document.getElementById('wrongcode');
			document.documentElement.scrollTop = targetbox.offsetHeight+targetbox1.offsetHeight+200
		},
		// listChange(index) {
		// 	console.log(index)
		// 	this.shows = index
			
		// },
		apply() {
			let user = this.$cookies.getJSON('user')
			if (user && user.userId) {
				this.$router.push('/center/case3')
			} else {
				this.$store.commit('setShowLogin',1)
			}
		},
		testApi() {
			let user = this.$cookies.getJSON('user')
			if (user && user.userId) {
				this.$router.push(`/apiTest?dimId=${this.shows}&id=${this.selectId}`)
			} else {
				this.$store.commit('setShowLogin',1)
			}
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
			this.shows = key
			// this.getDrop()
			// this.getRight(key,'',1)
	    },
	    handleClose(key, keyPath) {
		 console.log(key, keyPath);
	    },
		handleSelect(key, keyPath) {
		 console.log(key, keyPath);
		 let id = parseInt(key.split('-')[1])
		 this.getDetail(id)
	    },
		debounce(fn,wait){
		  var timer = null;
		  return function(){
		    if(timer !== null){
		      clearTimeout(timer);
		    }
		    timer = setTimeout(fn,wait);
		  }
		},
		handleScroll() {
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
			if (scrollTop>150) {
				this.fixed = true
			} else {
				this.fixed = false
			}
		},
		getLeft() {
			this.leftLoading = true
			this.$axios.get('http://192.168.0.99:8027/portal/api/dim/interface/detail')
			  .then((res) =>{
				  console.log(res)
				  if (res.state===200) {
					
				  } else {
					this.$message.error(res.message);
				  }
				  this.dimList = res.data.item
				  this.total = res.data.total
				  this.resolveDimList(this.dimList)
				  this.showLeft = true
				  this.leftLoading = false
			  })
			  .catch(err=>{
				  this.$message.error(err);
				  this.leftLoading = false
			  })
		},
		// getDimList() {
		// 	this.leftLoading = true
		// 	this.$axios.get(`http://192.168.0.99:8027/portal/api/interface/dim`)
		// 	  .then((res) =>{
		// 		  console.log(res)
		// 		  if (res.state===200) {
					
		// 		  } else {
		// 		    this.leftLoading = false
		// 			this.$message.error(res.message);
		// 		  }
		// 		  this.dimList = res.data.items
		// 		  this.total = res.data.total
		// 		  this.resolveDimList(this.dimList)
		// 		  // this.getDrop()
		// 		  // this.shows = this.caselist[0].id
		// 		  // this.getRight(this.caselist[0].name,1)
		// 		  // this.getRight(this.shows,'',1)
		// 	  })
		// 	  .catch(err=>{
		// 		  this.leftLoading = false
		// 		  this.$message.error(err);
		// 	  })
		// },
		resolveDimList(dimList) {
			dimList.forEach((item,index)=>{
				// this.getDrop(item.id,'',1,dimList.length)
				this.dimListDetail[item.dimId] = item.intfList
				// if (dimList.length===index+1) {
				// 	this.leftLoading=false
				// 	this.showLeft = true
				// }
			})
		},
		// getDrop(dimId,name,page,last) {
		// 	let params = {
		// 		  dimId: dimId,
		// 		  name: '',
		// 		  pageNum: page || 1
		// 	  }
		// 	this.$axios.get(`http://192.168.0.99:8027/portal/api/interface`,params)
		// 	  .then((res) =>{
		// 		  console.log(res)
		// 		  if (res.state===200) {
					
		// 		  } else {
		// 			this.$message.error(res.message);
		// 		  }
		// 		  this.dimListDetail[dimId] = res.data.item.records[0].intfList
		// 		  if (Object.getOwnPropertyNames(this.dimListDetail).length === last) {
		// 			this.leftLoading=false
		// 			this.showLeft = true
		// 		  }
		// 	  })
		// 	  .catch(err=>{
		// 		  this.$message.error(err);
		// 	  })
		// },
		getDetail(id) {
			this.$axios.get('http://192.168.0.99:8027/portal/api/interface/details',{id: id})
			.then((res) =>{
			    console.log(res)
				this.detailObj = res.data
				this.tableData = JSON.parse(res.data.reqParamPretty)
				this.quaryData = JSON.parse(res.data.respFiledDesc)
				this.codeData = res.data.respCodes
			})
			this.selectId = id
		}
    },
    mounted(){
		this.shows = this.$route.query.dimId
		this.selectId = this.$route.query.id
		this.getLeft()
		// this.getDimList()
		this.getDetail(this.selectId)
		this.handleScroll()
		window.addEventListener('scroll',this.debounce(this.handleScroll, 50))
		// http://192.168.0.99:8027/portal/api/dim/interface/detail
		// let params = {
		// 	  name: '工商基本信息'
		//   }
		

    }
}
</script>
<style lang="less" scoped>
	.more-api {
		background: #F6F8FE;
		padding-bottom: 55px;
		.more-api-box {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.khhd {
				width: 224px;
				background-color: #fff;
				margin-top: 20px;
				.gfdd {
					display: flex;
					align-items: center;
					justify-content: space-between;
					background: #FBFBFB;
					height: 48px;
					padding: 0 20px;
					box-sizing: border-box;
					.iuhg {
						display: flex;
						align-items: center;
						img {
							width: 14px;
							font-size: 14px;
							color: #333333;
							padding-right: 8px;
						}
					}
				}
				.el-menu {
					border-right: none;
					.sokj {
						width: 14px;
						padding-right: 8px;
						position: relative;
						top: -3px;
					}
				}
			}
			.router_box {
				width: 956px;
				margin-top: 20px;
				.tyhj {
					display: flex;
					align-items: center;
					padding: 16px;
					background-color: #fff;
					.rtgh {
						width: 110px;
						height: 110px;
						background: linear-gradient(319.68deg, #E3EDFF 6.07%, #F5F9FF 92.78%);
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 20px;
						img {
							width: 42px;
							height: 48px;
						}
					}
					.ijhb {
						width: 786px;
						h6 {
						  font-size: 18px;
						  margin-bottom: 4px;
						}
						.tyhn {
						  font-size: 14px;
						  color: #666666;
						  margin-bottom: 8px;
						}
						.gtrr {
							display: flex;
							align-items: center;
							justify-content: space-between;
							.vffd {
								p {
									font-size: 14px;
									.wdwe {
										color: #666666;
									}
									.gddss {
										color: #FF4340;
									}
								}
							}
							
							.fdds {
								width: 116px;
								height: 36px;
								line-height: 36px;
								text-align: center;
								font-size: 14px;
								color: #fff;
								background-color: #1C66E5;
								margin-top: 8px;
								border-radius: 2px;
								cursor: pointer;
							}
						}
					}
				}
			}
			
			.wetdfw {
				margin-top: 16px;
				background-color: #fff;
				padding-bottom: 16px;
				position: relative;
				.uyfe {
					width: 956px;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #1C66E5;
					li {
						height: 39px;
						width: 116px;
						line-height: 39px;
						text-align: center;
						font-size: 14px;
						a {
							display: block;
							color: #333;
						}
					}
					li.active {
						background-color: #1C66E5;
						color: #fff;
						a {
							color: #fff;
						}
					}
				}
				.pojhs {
					position: fixed;
					top: 60px;
					background-color: #fff;
					z-index: 9;
				}
				.fbnss {
					padding: 16px 20px 24px;
					.iuyt {
						border-bottom: 1px solid #E0E0E0;
						p {
							font-size: 14px;
							padding-bottom: 6px;
							color: #333;
							span {
								font-weight: 500;
							}
						}
						.spec {
							color: #0084FF;
							span {
								color: #333;
							}
						}
						.rghds {
							width: 116px;
							height: 36px;
							line-height: 36px;
							text-align: center;
							font-size: 14px;
							color: #fff;
							background-color: #1C66E5;
							margin-top: 8px;
							margin-bottom: 16px;
							border-radius: 2px;
						}
					}
					.rfghj {
						padding: 16px 0;
					}
				}
				
				.rtyhe {
					padding: 0 20px;
					.ewdf {
						display: flex;
						justify-content: space-between;
						margin-bottom: 16px;
						.vfths {
							display: flex;
							align-items: center;
							span {
								display: block;
								width: 4px;
								height: 14px;
								background-color: #1C66E5;
								margin-right: 8px;
							}
						}
						img {
							width: 8px;
							height: 14px;
						}
					}
					.edfgh {
						background: #FCFCFC;
						border: 1px solid #EEEEEE;
						padding: 3px;
						width: 341px;
						margin: 16px 0 12px;
						border-radius: 2px;
						ul {
							display: flex;
							align-items: center;
							li {
								width: 68px;
								line-height: 30px;
								height: 30px;
								text-align: center;
								color: #666666;
								font-size: 12px;
								border-radius: 2px;
							}
							.active {
								background: #1C66E5;
								color: #fff;
							}
						}
					}
					colgroup {
						background: #F8F9FA;
					}
				}
				
				.ohgdss {
					margin-top: 16px;
					.oiugf {
						height: 300px;
						background: #F5F5F5;
						overflow: scroll;
						margin-top: 12px;
						padding: 16px;
						box-sizing: border-box;
					}
				}
				.ftyuj {
					height: 300px;
					background: #F5F5F5;
					overflow: scroll;
					margin-top: 12px;
					padding: 16px;
					box-sizing: border-box;
					position: relative;
					pre {
						width: 100%;
						height: 100%;
						position: absolute;
						left: -542px;
						top:0
					}
				}
				
			}
			.edffd {
				padding-top: 16px;
			}
		}
	}
</style>