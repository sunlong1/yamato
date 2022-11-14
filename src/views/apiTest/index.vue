<template>
    <div class="more-api">
        <div class="more-api-box">
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
						<template slot="title"><img class="sokj" :src="item.dimPicture"/>{{item.dimName}}</template>
						<el-menu-item-group>
						  <el-menu-item v-for="demo in item.intfList" :index="item.dimId+ '-' + demo.id" :key="demo.id">{{demo.name}}</el-menu-item>
						</el-menu-item-group>
					  </el-submenu>
					</el-menu>
				</div>
			</div>
			<div class="router_box">
			    <div class="ewdss">
					<div class="rghss">
						<div class="idwwwd">
							<el-select v-model="editForm.miyao" placeholder="请选择密钥">
								<el-option
								  v-for="item in options01"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>
							<p v-if="editForm.miyao">密钥：433c02a3-1842-4251-b385-b059</p>
							<p v-if="editForm.miyao">剩余次数：2000次</p>
						</div>
						<div class="edff">
							<span>接口名称：</span>
							<p>{{detailObj.name}}</p>
						</div>
						<div class="edff">
							<span>接口ID：</span>
							<p>{{detailObj.showId}}</p>
						</div>
						<div class="edff">
							<span>请求方式：</span>
							<p>{{detailObj.reqMethod}}</p>
						</div>
						<div class="edff">
							<span>返回格式：</span>
							<p>{{detailObj.respFormat}}</p>
						</div>
						<div class="edff">
							<span class="ojhb">请求参数（Query）：</span>
							<p>{{detailObj.reqParam}}</p>
						</div>
						<div class="edff">
							<span>keyword：</span>
							<el-input v-model="editForm.keyword" placeholder="请输入关键字（企业id/企业名称/统一信用代码" auto-complete="off"></el-input>
						</div>
						<div class="edff">
							<span>pageNum：</span>
							<el-input v-model="editForm.pageNum" placeholder="当前页面（默认第一页）" auto-complete="off"></el-input>
						</div>
						<div class="edff">
							<span>pageSize：</span>
							<el-input v-model="editForm.pageSize" placeholder="每条页数（默认10条，最大20条）" auto-complete="off"></el-input>
						</div>
						<div class="oiud" @click="editSubmit()">立即测试</div>
					</div>
					<div class="oiuyd">
						<div class="edsff">请求信息</div>
						<div class="efgbs">
							<p>请求方式：{{detailObj.reqMethod}}</p>
							<p>请求地址：<br/>{{detailObj.url}}</p>
							<p>请求参数：<br/>{{detailObj.reqParam || '---'}}</p>
							<p>请求token：<br/>{{detailObj.reqMethod}}</p>
						</div>
						<div class="dfghn">
							<p>返回内容</p>
							<span @click="copy">复制</span>
						</div>
						<div class="cdssa"></div>
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
			dimList: [],
			// dimListDetail:{},
			showLeft: false,
			leftLoading: false,
			total: 0,
			detailObj: {},
			options01: [],
			rightIndex: 1,
			activeName: 'first',
			tableData: [{
				date1: 'keyword',
				date2: 'string',
				date3: '是',
				date4: '企业id/企业名称/统一信用代码/注册号'
			  }],
			  editForm: {
			  	keyword: '',
			  	pageNum: '',
			  	pageSize: '',
			  	miyao: ''
			  },
			  options02: [{
			    value: 1,
			    label: '密钥1'
			  }, {
			    value: 2,
			    label: '密钥2'
			  }],
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
			// editFormRules: {
			// 	// informChannel: [
			// 	// 	{ required: true, message: '不能为空', trigger: 'blur' }
			// 	// ],
			// 	// planName: [
			// 	// 	{ required: true, message: '不能为空', trigger: 'blur' }
			// 	// ],
			// 	// editForm: [
			// 	// 	{ required: true, message: '不能为空', trigger: 'blur' }
			// 	// ]
			// },
			editLoading: false
		}
    },
    methods:{
		copy() {
			
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
	    },
	    handleClose(key, keyPath) {
		 console.log(key, keyPath);
	    },
		handleSelect(key, keyPath) {
			let selectId = parseInt(keyPath[1].split('-')[1])
			this.shows = parseInt(key)
			this.selectId = selectId
			this.getDetail(selectId)
	    },
		selectChange () {
			console.log(111)
		},
		editSubmit() {
			let user = this.$cookies.getJSON('user')
			if (user && user.userId) {
				if(!this.editForm.miyao) {
				   this.$message.error('请选择密钥');
				   return
				}
				if (!this.editForm.keyword) {
					this.$message.error('请输入关键字');
					return
				}
				if (!this.editForm.pageNum) {
					this.$message.error('请输入页码');
					return
				}
				if (!this.editForm.pageSize) {
					this.$message.error('请输入每页条数');
					return
				}
			} else {
				this.$store.commit('setShowLogin',1)
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
				  this.afterLeft()
				  this.total = res.data.total
				  // this.resolveDimList(this.dimList)
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
		// resolveDimList(dimList) {
		// 	dimList.forEach((item,index)=>{
		// 		// this.getDrop(item.id,'',1,dimList.length)
		// 		this.dimListDetail[item.dimId] = item.intfList
		// 		// if (dimList.length===index+1) {
		// 		// 	this.leftLoading=false
		// 		// 	this.showLeft = true
		// 		// }
		// 	})
		// },
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
			})
			this.selectId = id
		},
		solveArr(arr) {
			let arro= []
			arr.forEach(item=>{
				let obj = {}
				obj['value'] = item.orderId
				obj['label'] = item.secret
				arro.push(obj)
			})
			this.options02 = arro
		},
		getScrets() {
			let params = {
				  userId: this.$cookies.getJSON('user').userId,
				  billingMode: ''
			  }
			this.$axios.get('http://192.168.0.99:8023/order/secret',params)
			  .then((res) =>{
				  console.log(res)
				  if (res.state===200) {
					
				  } else {
					this.$message.error(res.message);
				  }
				  this.solveArr(res.data)
			  })
			  .catch(err=>{
				  this.$message.error(err);
			  })
		},
		afterLeft() {
			this.shows = this.$route.query.dimId || this.dimList[0].dimId
			this.selectId = this.$route.query.id || this.dimList[0].intfList[0].id
			this.getDetail(this.selectId)
		}
    },
    mounted(){
		this.getLeft()
		if (this.$cookies.getJSON('user').userId) {
			this.getScrets()
		}
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
				height: 100%;
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
				.ewdss {
					display: flex;
					justify-content: space-between;
					height: 100%;
					.rghss {
						width: 384px;
						background-color: #fff;
						height: 100%;
						padding: 16px;
						box-sizing: border-box;
						.idwwwd {
							background: #F5F5F5;
							border: 1px solid #EEEEEE;
							border-radius: 2px;
							font-size: 14px;
							color: #000000;
							padding: 12px 16px;
							p {
								margin-top: 10px;
							}
						}
						.edff {
							display: flex;
							align-items: center;
							font-size: 14px;
							margin-top: 24px;
							span {
								display: block;
								width: 74px;
								text-align: right;
								color: #666666;
							}
							.ojhb {
								width: 139px;
							}
							.el-input {
								width: 276px;
							}
						}
						.oiud {
							background: #1C66E5;
							width: 116px;
							height: 36px;
							line-height: 36px;
							text-align: center;
							border-radius: 2px;
							color: #fff;
							margin: 24px auto;
							cursor: pointer;
						}
						.oiud:active {
							opacity: 0.6;
						}
					}
					.oiuyd {
						width: 560px;
						background-color: #fff;
						height: 100%;
						padding: 12px 16px;
						box-sizing: border-box;
						font-size: 14px;
						.efgbs {
							height: 234px;
							background: #F5F5F5;
							border: 1px solid #EEEEEE;
							border-radius: 2px;
							margin-top: 12px;
							padding: 16px;
							box-sizing: border-box;
							p {line-height: 28px;}
						}
						.dfghn {
							margin-top: 12px;
							display: flex;
							justify-content: space-between;
							align-items: center;
							p {
								font-weight: 500;
								cursor: pointer;
							}
							span {
								width: 67px;
								height: 28px;
								line-height: 28px;
								text-align: center;
								display: block;
								border: 1px solid #E0E0E0;
								border-radius: 4px;
								cursor: pointer;
							}
							span:active {
								opacity: 0.8;
							}
						}
						.cdssa {
							height: 602px;
							background: #F5F5F5;
							border: 1px solid #EEEEEE;
							border-radius: 2px;
							margin-top: 12px;
						}
					}
				}
			}

		}
	}
</style>