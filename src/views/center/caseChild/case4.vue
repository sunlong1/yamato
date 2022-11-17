<template>
    <div class="dlkj">
        <secret @orderId="getOrderId"></secret>
		<div class="bujss" v-loading="tableLoading">
			<div v-if="!detail">
				<h6 class="joid">接口列表</h6>
				<div class="juidj">
					<el-date-picker
					  v-model="date"
					  type="daterange"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期">
					</el-date-picker>
					<div @click="getQuery" :class="['rtgh',{'rtgh-diabled': !date}]" :disabled="!date">查询</div>
				</div>
			</div>
			<div class="tgns" v-if="detail">
				<el-input
					placeholder="请输入接口名称"
					clearable
					v-model="input1">
					<i @click="getSearch" slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</div>
			<div class="ryyh" v-if="!detail">
				<el-table
				    :data="tableData"
				    style="width: 100%">
				    <el-table-column
				      label="调用月份"
				      width="140">
					  <template slot-scope="scope">
						{{ scope.row.date }}
					  </template>
				    </el-table-column>
				    <el-table-column
				      label="调用次数（次）"
				      width="200">
				      <template slot-scope="scope">
						{{ scope.row.company }}
				      </template>
				    </el-table-column>
					<el-table-column
					  label="实际付费次数（次）"
					  width="200">
					  <template slot-scope="scope">
							{{ scope.row.price }}
					  </template>
					</el-table-column>
					<el-table-column
					  label="实际扣费金额（元）"
					  width="180">
					  <template slot-scope="scope">
						{{ scope.row.numbers }}
					  </template>
					</el-table-column>
				    <el-table-column label="操作" width="280">
				      <template slot-scope="scope">
				        <span class="guuus" @click="handleEdit(scope.$index, scope.row)">查看详情</span>
				      </template>
				    </el-table-column>
				  </el-table>
			  <div class="wdwds" v-if="tableData.length===0">
			  	<img src="../../../assets/kong/kong_.png"/>
			  	<p>暂无搜索结果</p>
			  </div>
			</div>
			
			<div class="ryyh" v-if="detail">
				<el-table
				    :data="tableData"
				    style="width: 100%">
					<el-table-column
					  label="接口名称"
					  width="140">
					  <template slot-scope="scope">
						{{ scope.row.api }}
					  </template>
					</el-table-column>
				    <el-table-column
				      label="调用月份"
				      width="140">
					  <template slot-scope="scope">
						{{ scope.row.date }}
					  </template>
				    </el-table-column>
				    <el-table-column
				      label="调用次数（次）"
				      width="200">
				      <template slot-scope="scope">
						{{ scope.row.company }}
				      </template>
				    </el-table-column>
					<el-table-column
					  label="实际付费次数（次）"
					  width="200">
					  <template slot-scope="scope">
							{{ scope.row.price }}
					  </template>
					</el-table-column>
					<el-table-column
					  label="实际扣费金额（元）"
					  width="180">
					  <template slot-scope="scope">
						{{ scope.row.numbers }}
					  </template>
					</el-table-column>
				  </el-table>
			  <div class="wdwds" v-if="tableData.length===0">
			  	<img src="../../../assets/kong/kong_.png"/>
			  	<p>暂无搜索结果</p>
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
            // list:[],
            // caseId:'',
			// ifSee: true,
			input1: '',
			tableLoading: false,
			date: '',
			detail: false,
			orderId: '',
			// img1: require('../../../assets/common/ddd.png'),
			// img2: require('../../../assets/common/ddd_.png'),
			// options01: [{
			//   value: 1,
			//   label: '套餐1'
			// }, {
			//   value: 2,
			//   label: '套餐2'
			// }],
			// filters01: '',
			// filters02: '',
			tableData: [{
			  date: '2022-09',
			  company: '1223',
			  price: '888',
			  numbers: 1000.90,
			  api:'企业基本信息'
			}]
        }
    },
    methods:{
		getOrderId(val) {
			if(!val) return
			this.orderId = val
			this.getCase()
		},
		getCase:function(){
			console.log(this.date)
		    let params = {
				  orderId: this.orderId,
				  name: this.input1,
				  date: this.date
			  }
			this.tableLoading = true
			// 8023
		    this.$axios.get('http://192.168.0.99:8020/order/interface/api',params)
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
		handleEdit(index, row) {
			this.loading = true
			// 切换后初始化数据
			this.date = ''
			this.input1 = ''
			let _this = this
			setTimeout(function(){
				_this.loading = false	
				_this.detail = true
			},1000)
			console.log(index, row);
		  },
		  handleDelete(index, row) {
			console.log(index, row);
		  },
		  getQuery() {
			this.getCase()
		  },
		  getSearch() {
			this.getCase()
		  }
    },
    mounted() {
    	this.$store.commit('setCenterIndex',3)
    }
}
</script>
<style lang="less" scoped>
	.dlkj {
		.vhdd {
			.obhh {
				padding: 20px;
				background-color: #fff;
				display: flex;
				align-items: center;
				color: #666666;
				font-size: 14px;
				margin-bottom: 16px;
				p {
					width: 70px;
				}
				.el-select {
					padding-right: 20px;
				}
				span {
					margin-right: 10px;
				}
				img {
					width: 14px;
				}
			}
			
		}
		
		.bujss {
			background-color: #fff;
			margin-top: 16px;
			padding: 16px 20px;
			box-sizing: border-box;
			.tgns {
				width: 203px;
				margin-bottom: 16px;
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
			.juidj {
				display: flex;
				align-items: center;
				margin-top: 20px;
				margin-bottom: 16px;
				.el-input {
					width: 203px;
				}
				.rtgh {
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					color: #fff;
					background-color: #1C66E5;
					margin-left: 12px;
					border-radius: 2px;
					cursor: pointer;
					&:active {
						opacity: 0.8;
					}
				}
				.rtgh-diabled {
					background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), #FFFFFF;
					border: 1px solid #E0E0E0;
				}
			}
			
			.ryyh {
				.guuus {
					color: #1C66E5;
					cursor: pointer;
				}
			}
		}
	}
</style>