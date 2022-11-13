<template>
    <div class="oiuh">
		<div class="rhjss" @click="applyApi=false" v-if="applyApi">我的接口/<span>申请接口</span></div>
		<secret @orderId="getOrderId"></secret>
		<div class="bujss" v-if="!applyApi">
			<h6 class="joid">接口列表</h6>
			<div class="juidj">
				<!-- <el-input
					placeholder=""
					suffix-icon="el-icon-search"
					clearable
					v-model="input1"></el-input> -->
				<el-input placeholder="请输入接口名称" v-model="input1" clearable class="input-with-select">
				    <el-button slot="append" icon="el-icon-search" @click="getTable"></el-button>
				</el-input>
				<div @click="shenqing" class="rtgh">申请接口</div>
			</div>
			<div class="ryyh" :loading="tableLoading">
				<el-table
				    :data="tableData"
				    style="width: 100%">
				    <el-table-column
				      label="接口ID"
				      width="140">
					  <template slot-scope="scope">
						{{ scope.row.intfId }}
					  </template>
				    </el-table-column>
				    <el-table-column
				      label="接口名称"
				      width="280">
				      <template slot-scope="scope">
						{{ scope.row.intfName }}
				      </template>
				    </el-table-column>
					<el-table-column
					  label="价格（元/次）"
					  width="140">
					  <template slot-scope="scope">
							{{ scope.row.intfPrice }}
					  </template>
					</el-table-column>
					<el-table-column
					  label="每分最大调用次数（次）"
					  width="180">
					  <template slot-scope="scope">
						{{ scope.row.maxInvokeCountPerMin }}
					  </template>
					</el-table-column>
				    <el-table-column label="操作" width="280">
				      <template slot-scope="scope">
				        <span class="bhuu" @click="handleEdit(scope.$index, scope.row)">测试接口</span>
				        <span class="bhussu" @click="handleDelete(scope.$index, scope.row)">删除</span>
				      </template>
				    </el-table-column>
				  </el-table>
				  <div v-if="tableData.length===0" class="njiis">
					  <img src="../../../assets/kong/kong.png"/>
					  <p>{{true?'暂未申请接口':'暂无搜索结果'}}</p>
				  </div>
			</div>
		</div>
		
		<div v-if="applyApi" class="fghhs">
			<h6 class="joid">申请接口</h6>
			<div class="rhhjs">
				<div class="hsss">
					<el-input
					    placeholder="请输入接口名称"
						clearable
					    v-model="searchData">
					    <i @click="goSearch" slot="suffix" class="el-input__icon el-icon-search"></i>
					  </el-input>
					  <el-tree
					    :data="treeData"
					    show-checkbox
						empty-text="暂无搜索结果"
					    node-key="id"
						ref="tree"
						@check-change="getCheckedKeys"
					    :default-expanded-keys="[2]">
					  </el-tree>
					  <!-- <div class="buttons">
					    <el-button @click="getCheckedNodes">通过 node 获取</el-button>
					    <el-button @click="getCheckedKeys">通过 key 获取</el-button>
					    <el-button @click="setCheckedNodes">通过 node 设置</el-button>
					    <el-button @click="setCheckedKeys">通过 key 设置</el-button>
					    <el-button @click="resetChecked">清空</el-button>
					  </div> -->
				</div>
				<div class="dfgg">
					<div class="ghuss">
						<p>已选接口 <span>{{chooseArr.length}}</span></p>
						<div class="fgss">
							<button class="one" @click="apply">立即申请</button>
							<button class="two" @click="resetChecked">全部删除</button>
						</div>
					</div>
					<div class="yius">
						<el-tag size="big" v-for="(item,index) in chooseArr" :key="item.id" @close="handleClose(index)" closable>{{item.label}}</el-tag>
					</div>
				</div>
			</div>
		</div>
		
        <router-view></router-view>
    </div>
</template>
<script>
import secret from '../../../components/secret.vue'
export default {
    namme:'case3',
	components:{
	  secret
	},
    data(){
        return{
			input1: '',
			searchData: '',
			tableLoading: false,
			applyApi: false,
			tableData: [],
			orderId: '',
			treeData: [{
			  id: 1,
			  label: '一级 2',
			  children: [{
				id: 11,
				label: '二级 1-1'
			  }, {
				id: 12,
				label: '二级 1-2',
				disabled: true
			  },{
				id: 13,
				label: '三级 1-3',
				disabled: true
			  }]
			},{
			  id: 2,
			  label: '一级 2',
			  children: [{
				id: 21,
				label: '二级 2-1'
			  }, {
				id: 22,
				label: '二级 2-2',
				disabled: false
			  },{
				id: 23,
				label: '三级 2-3',
				disabled: false
			  }]
			}],
			chooseArr: []
        }
    },
    methods:{
	  getCheckedNodes() {
		console.log(this.$refs.tree.getCheckedNodes());
	  },
	  getCheckedKeys() {
		console.log(this.$refs.tree.getCheckedKeys());
		console.log(this.$refs.tree.getCheckedNodes());
		this.chooseArr = this.$refs.tree.getCheckedNodes()
		// this.chooseArrKeys = this.$refs.tree.getCheckedKeys()
	  },
	  getOrderId(val) {
	  	if(!val) return
	  	this.orderId = val
	  	this.getCase()
	  },
	  getTable() {
		  this.getCase()
	  },
	  getCase:function(){
	      let params = {
	  		  userId: this.$cookies.getJSON('user').userId,
	  		  orderId: this.orderId,
			  name: this.input1
	  	  }
		  this.tableLoading = true
	      this.$axios.get('http://192.168.0.99:8023/order/interface/api',params)
	  	  .then((res) =>{
	  		  console.log(res)
	  		  if (res.state===200) {
	  			
	  		  } else {
	  			this.$message.error(res.message);
	  		  }
	  		  try{
	  		  	this.tableData = res.data.records
	  		  }catch(e){
	  		  	//TODO handle the exception
	  		  }
			  this.tableLoading = false
	  	  })
	  	  .catch(err=>{
			  this.tableLoading = false
	  		  alert(err);
	  	  })
	  },
	  handleClose(index) {
		this.$confirm('确定删除选中的接口吗',{type: 'warning'})
		  .then(_ => {
			this.chooseArr.splice(index, 1);
			let _this = this
			this.$refs.tree.setCheckedNodes(_this.chooseArr)
			done();
		  })
		  .catch(_ => {});
	  },
	  resetChecked() {
		  if (this.chooseArr.length===0) return
		  this.$confirm('确定清除全部选择的接口吗',{type: 'warning'})
		    .then(_ => {
		  	this.$refs.tree.setCheckedKeys([]);
		  	done();
		    })
		    .catch(_ => {});
		
	  },
	  goSearch() {
		this.treeData = []
	  },
	  apply() {
		  if (this.chooseArr.length===0) {
			  this.$message.warning('还没有选中的接口');
			  return
		  }
		  this.$confirm('确定申请选中的接口吗',{type: 'warning'})
		    .then(_ => {
			// http://192.168.0.99:8023/order/interface/api/apply
			let params = {
				  orderId: this.orderId,
				  intfIds: this.chooseArr
			  }
			this.$axios.post(`${this.host_url}/user/captcha/get`,params)
			  .then((res) =>{
				  console.log(res)
				  if (res.state===200) {
					
				  } else {
					this.$message.error(res.message);
				  }
			  })
			  .catch(err=>{
				  this.$message.error(err);
			  })
		  	this.$refs.tree.setCheckedKeys([]);
		  	done();
		    })
		    .catch(_ => {});
	  },
	  handleEdit(index, row) {
		console.log(index, row);
		this.$router.push('/apiTest')
	  },
	  handleDelete(index, row) {
		console.log(index, row);
		this.$confirm('确定删除选中的订单吗',{type: 'warning'})
		  .then(_ => {
			done();
		  })
		  .catch(_ => {});
	  },
	  delApi() {
		let params = {
		  intfId: '',
		  orderId: this.orderId
		}
		this.$axios.get('http://192.168.0.99:8023/order/interface/api/applied/delete',params)
		  .then((res) =>{
			  console.log(res)
			  if (res.state===200) {
				
			  } else {
				this.$message.error(res.message);
			  }
			  try{
			  	this.tableData = res.data.records
			  }catch(e){
			  	//TODO handle the exception
			  }
		  })
		  .catch(err=>{
			  this.$message.error(err);
		  })	
	  },
	  shenqing() {
		  this.applyApi = true
		  this.getSelects()
	  },
	  getSelects() {
		  let params = {
		  	  orderId: this.orderId,
		  	  pageNum: 1
		    }
		  this.$axios.get('http://192.168.0.99:8023/order/interface/api/applied',params)
		    .then((res) =>{
		  	  console.log(res)
		  	  if (res.state===200) {
		  		
		  	  } else {
		  		this.$message.error(res.message);
		  	  }
		    })
		    .catch(err=>{
		  	  this.$message.error(err);
		    })
		  
	  }
    },
    mounted(){
		this.$store.commit('setCenterIndex',2)
    }
}
</script>
<style lang="less" scoped>
	.oiuh {
		.rhjss {
			font-size: 14px;
			color: #8F959E;
			margin-bottom: 14px;
			cursor: pointer;
			span {
				color: #1F2329;
			}
		}
		
		.bujss {
			background-color: #fff;
			margin-top: 16px;
			padding: 16px 20px;
			box-sizing: border-box;
			.juidj {
				display: flex;
				align-items: center;
				margin-top: 20px;
				margin-bottom: 16px;
				.el-input {
					width: 260px;
				}
				.rtgh {
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					color: #fff;
					background-color: #1C66E5;
					cursor: pointer;
					margin-left: 20px;
					border-radius: 2px;
					&:active {
						opacity: 0.8;
					}
				}
			}
			.ryyh {
				.njiis {
					min-height: 500px;
					text-align: center;
					img {
						width: 148px;
						margin-top: 70px;
					}
					p {
						margin-bottom: 16px;
						font-size: 14px;
						color: #666666;
					}
				}
				.bhuu {
					padding-right: 6px;
					border-right: 1px solid #ECEEF1;
					color: #1C66E5;
					cursor: pointer;
				}
				.bhussu {
					padding-left: 6px;
					color: #1C66E5;
					cursor: pointer;
				}
			}
		}
		
		.fghhs {
			.rhhjs {
				display: flex;
				justify-content: space-between;
				margin-top: 16px;
				.hsss {
					width: 232px;
					background-color: #fff;
					padding: 12px 16px;
					box-sizing: border-box;
					min-height: 400px;
					.el-input--suffix .el-input__inner {
						height: 37px;
					}
					.el-tree {
						margin-top: 20px;
					}
				}
				.dfgg {
					width: 712px;
					background-color: #fff;
					min-height: 400px;
					.ghuss {
						height: 48px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 20px;
						border-bottom: 1px solid #f3f3f3;
						p {
							font-size: 14px;
							span {
								color: #1C66E5;
							}
						}
						.fgss {
							button {
								width: 80px;
								height: 30px;
								font-size: 12px;
								border-radius: 2px;
								cursor: pointer;
							}
							.one {
								background-color: #1C66E5;
								color: #fff;
								outline: none;	
								box-shadow: none;
								border: none;
							}
							.two {
								background-color: #fff;
								color: #1C66E5;
								border: 1px solid #1C66E5;
							}
							button:active {
								opacity: 0.8;
							}
						}
					}
					
					.yius {
						padding: 20px;
						font-size: 14px;
						.el-tag {
							margin-right: 8px;
						}
					}
				}
			}
		}
		
		.joid {
			font-size: 16px;
			font-weight: 500;
			position: relative;
			&::after {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				bottom: 2px;
				width: 64px;
				height: 6px;
				background-color: #329DFF;
				border-radius: 4px;
				opacity: 0.5;
			}
		}
	}
</style>