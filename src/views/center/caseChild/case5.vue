<template>
    <div class="bjjswe">
		<div v-if="!showDetail" class="iusjjs">
		    <secret @orderId="getOrderId"></secret>
			<div class="bujss">
				<h6 class="joid">订单列表</h6>
				<div class="juidj">
					<el-input
						placeholder="订单编号"
						v-model="input1">
					</el-input>
					<el-date-picker
					  v-model="date"
					  type="daterange"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期">
					</el-date-picker>
					<el-select v-model="repayType" placeholder="支付方式">
						<el-option
						  v-for="item in options01"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					</el-select>
					<el-select v-model="repayStatus" placeholder="支付状态">
						<el-option
						  v-for="item in options02"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					</el-select>
					<el-select v-model="fapiao" placeholder="开票状态">
						<el-option
						  v-for="item in options03"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					</el-select>
					<div class="rtgh" @click="getCase">查询</div>
				</div>
				<div class="ryyh">
					<el-table
					    :data="tableData"
					    style="width: 100%">
					    <el-table-column
					      label="订单编号"
					      width="180">
						  <template slot-scope="scope">
							{{ scope.row.id }}
						  </template>
					    </el-table-column>
					    <el-table-column
					      label="订单金额（元）"
					      width="140">
					      <template slot-scope="scope">
							{{ scope.row.company }}
					      </template>
					    </el-table-column>
						<el-table-column
						  label="订单时间"
						  width="170">
						  <template slot-scope="scope">
							{{ scope.row.date }}
						  </template>
						</el-table-column>
						<el-table-column
						  label="支付方式"
						  width="100">
						  <template slot-scope="scope">
							{{ scope.row.repayType==0?'微信':'支付宝' }}
						  </template>
						</el-table-column>
						<el-table-column
						  label="支付状态"
						  width="100">
						  <template slot-scope="scope">
							<span v-bind:class="['ghuj',{'color0':scope.row.repayStatus===0,'color1':scope.row.repayStatus===1,'color2':scope.row.repayStatus===2}]"></span> {{ scope.row.repayStatus===0?'待支付':scope.row.repayStatus===1?'已支付':scope.row.repayStatus===2?'已过期':'' }}
						  </template>
					    </el-table-column>
						<el-table-column
						  label="开票状态"
						  align="center"
						  width="100">
						  <template slot-scope="scope">
							<span v-bind:class="['ghuj',{'color0':scope.row.billStatus===0,'color1':scope.row.billStatus===1,'color2':scope.row.billStatus===2}]"></span> {{ scope.row.billStatus===0?'待开票':scope.row.billStatus===1?'已提交':scope.row.billStatus===2?'已开票':'-' }}
						  </template>
						</el-table-column>
						  
						</el-table-column>
					    <el-table-column label="操作" width="160">
					      <template slot-scope="scope">
					        <span class="guuus" @click="handleEdit(getText(scope.row.repayStatus,scope.row.billStatus))">
								{{getText(scope.row.repayStatus,scope.row.billStatus)}}
							</span>
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
		<div v-if="showDetail" class="gdejf">
			<div class="rthss">
				<i @click="showDetail=false">我的订单</i><a @click="editPop=true">/开发票/</a><span class="deew">发票详情</span>
			</div>
			<div class="nyr6s">
				<h5>订单信息</h5>
				<ul>
					<li>订单编号：S20190710101804503023</li>
					<li>订单金额：2000.00元</li>
					<li>订单时间：2022-09-09  12:00:34</li>
					<li>支付方式：支付宝</li>
					<li>支付时间：2022-09-09  12:20:34</li>
				</ul>
			</div>
			<div class="nyr6s">
				<h5>发票信息</h5>
				<ul>
					<li>发票类型：增值税专用发票</li>
					<li>发票内容：*信息技术服务*信息技术服务费</li>
					<li>公司名称：百度在线网络技术（北京）有限公司</li>
					<li>纳税人识别号：902277389392922227383</li>
					<li>开户行：北京银行大兴支行</li>
					<li>账号：1223334455*****363663</li>
					<li>联系人：张三</li>
					<li>联系电话：155*****3636</li>
					<li>公司地址：北京市海淀区上地十街10号楼</li>
				</ul>
			</div>
			<div class="nyr6s dww">
				<h5>物流信息</h5>
				<ul>
					<li>物流公司：顺丰快递</li>
					<li>物流单号：SF7373732994927</li>
				</ul>
			</div>
		</div>
		
		<el-dialog :visible.sync="editPop" title="发票信息" width="520px">
			<div class="otehs" v-loading="loading">
				<el-form :model="editForm" ref="editForm" :rules="rules" label-width="100px">
				  <h6 class="pphss">发票信息</h6>
				  <div class="rsaas">
					  <el-form-item label="发票类型" prop="resource">
					      <el-radio-group v-model="editForm.resource">
					        <el-radio label="0">增值税专用发票</el-radio>
					        <el-radio label="1">增值税普通发票</el-radio>
					      </el-radio-group>
					    </el-form-item>
					  <el-form-item label="发票金额">
					    <p style="text-align: left;">2000元</p>
					  </el-form-item>
					  <el-form-item label="发票内容">
					    <p style="text-align: left;">*信息技术服务*信息技术服务费</p>
					  </el-form-item>
					  <el-form-item label="公司名称">
					    <p style="text-align: left;">百度在线网络技术（北京）有限公司</p>
					  </el-form-item>
				  </div>
				  <el-form-item prop="id" label="纳税人识别号">
					<el-input placeholder="请输入用户名（50个汉字、字母、数字组合）" v-model="editForm.id" autocomplete="off" clearable></el-input>
				  </el-form-item>
				  
				  <el-form-item v-if="editForm.resource==='0'" prop="bankAdress" label="开户行">
					<el-input placeholder="请输入开户行" v-model="editForm.bankAdress" autocomplete="off" clearable></el-input>
				  </el-form-item>
				  
				  <el-form-item v-if="editForm.resource==='0'" prop="bankAccount" label="账号">
					<el-input placeholder="请输入账号" v-model="editForm.bankAccount" autocomplete="off" clearable></el-input>
				  </el-form-item>
				  <h6 class="pphss">收件信息</h6>
				  <el-form-item prop="adress" label="邮寄地址">
					<el-input placeholder="请输入邮寄地址" v-model="editForm.adress" autocomplete="off" clearable></el-input>
				  </el-form-item>
				  <el-form-item prop="contact" label="联系人">
					<el-input placeholder="请输入联系人" v-model="editForm.contact" autocomplete="off" clearable></el-input>
				  </el-form-item>
				  <el-form-item prop="phone" label="联系电话">
					<el-input placeholder="请输入联系电话" v-model="editForm.phone" autocomplete="off" clearable></el-input>
				  </el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
				  <el-button @click="centerDialogVisible = false">取 消</el-button>
				  <el-button type="primary" @click="submit('editForm')">确 定</el-button>
				</div>
				<div class="byus">
					<h6>温馨提示：</h6>
					<p>1.开票金额超过1万元，包邮费；开票金额低于1万元，从账户余额中扣除<span>20元</span>邮费。</p>
					<P>2.用户在提交开票申请后，增值税专用发票会在<span>10</span>个工作日内审核开具；普通发票会在<span>5</span>个工作日内开具。</p>
					<p>3.请仔细核对以上填写的信息准确无误。</p>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import secret from '../../../components/secret.vue'
export default {
    namme:'case5',
	components:{
	  secret
	},
    data(){
		var validatePhone = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入手机号'));
			}
			if(!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)) {
				callback(new Error('请输入正确手机号'));
			}
			callback();
		};
		
		var validateID = (rule, value, callback) => {
		  if (!value) {
			callback(new Error('纳税人识别号不能为空'));
		  }
		  callback()
		};
		
		var validateBankAdress = (rule, value, callback) => {
		  if (this.editForm.resource==='0' && !value) {
			callback(new Error('请输入开户行'));
		  }
		  callback()
		};
		
		var validateBankAccount =(rule, value, callback)=> {
			if (this.editForm.resource==='0' && !value) {
				callback(new Error('请输入银行账号'));
			}
			callback()
		}
		
		var validateAdress = (rule, value, callback)=> {
			if (!value) {
				callback(new Error('请输入邮寄地址'));
			}
			callback()
		}
		
		var validateContact = (rule, value, callback)=> {
			if (!value) {
				callback(new Error('请输入联系人'));
			}
			callback()
		}
        return{
   //          list:[],
   //          caseId:'',
			// ifSee: true,
			input1: '',
			date:'',
			repayType: '',
			repayStatus: '',
			fapiao: '',
			// img1: require('../../../assets/common/ddd.png'),
			// img2: require('../../../assets/common/ddd_.png'),
			options01: [{
			  value: 0,
			  label: '全部'
			},{
			  value: 1,
			  label: '微信支付'
			}, {
			  value: 2,
			  label: '支付宝支付'
			}],
			options02: [{
			  value: 1,
			  label: '全部'
			}, {
			  value: 2,
			  label: '待支付'
			}, {
			  value: 3,
			  label: '已支付'
			}, {
			  value: 4,
			  label: '已过期'
			}],
			options03: [{
			  value: 1,
			  label: '全部'
			},{
			  value: 2,
			  label: '待开票'
			},{
			  value: 3,
			  label: '已提交'
			}, {
			  value: 4,
			  label: '已开票'
			}],
			// filters01: '',
			// filters02: '',
			editPop: false,
			tableData: [{
			  id: '202209302020280002',
			  company: '2000.00',
			  date: '2022-09-22  20:20:23',
			  repayType: 1,
			  repayStatus: 0,
			  billStatus: 4
			}],
			editForm: {
			  resource: '0',
			  id: '',
			  bankAdress: '',
			  bankAccount: '',
			  adress: '',
			  contact: '',
			  phone: ''
			},
			rules: {
			  id: [
				{ validator: validateID, trigger: 'blur' }
			  ],
			  bankAdress: [
				{ validator: validateBankAdress, trigger: 'blur' }
			  ],
			  bankAccount: [
			  	{ validator: validateBankAccount, trigger: 'blur' }
			  ],
			  adress: [
			  	{ validator: validateAdress, trigger: 'blur' }
			  ],
			  contact: [
			  	{ validator: validateContact, trigger: 'blur' }
			  ],
			  phone: [
				  { validator: validatePhone, trigger: 'blur' }
			  ]
			},
			loading: false,
			showDetail: false
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
				  date: this.date,
				  repayType: this.repayType,
				  repayStatus: this.repayStatus,
				  fapiao: this.fapiao
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
		handleEdit(text) {
			if (text==='删除') {
				this.$confirm('确定删除选中的订单吗',{type: 'warning'})
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
			} else if (text==='去支付') {
				this.$router.push('/charge')
			} else if (text==='开发票') {
				this.editPop = true
			} else if (text==='查看详情') {
				this.showDetail = true
			}
		  },
		  submit(form) {
		    this.$refs[form].validate((valid) => {
		  	if (valid) {
		  		this.loading = true
		  		this.$axios.post('',this.editForm)
		  		  .then((res) =>{
		  			  
		  		  })
		  		  .catch(err=>{
		  			  this.loading = false
		  			  this.$message.error(err);
		  		  })
		  	} else {
		  	  console.log('error submit!!');
		  	  return false;
		  	}
		    });
		  },
		  // getQuery() {
			 //  this.tableData = []
		  // },
		  getText(repayStatus,billStatus) {
			  if (repayStatus===0) {
				  return '去支付'
			  } else if(repayStatus===1) {
				  if (billStatus===0) {
					  return '开发票'
				  } else if (billStatus===1) {
					  return '查看详情'
				  } else if (billStatus===2) {
					  return '查看详情'
				  }
			  } else if(repayStatus===2) {
				  return '删除'
			  }
		  }
    },
    mounted() {
    	this.$store.commit('setCenterIndex',4)
    }
}
</script>
<style lang="less" scoped>
	.iusjjs {
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
				justify-content: space-between;
				margin-top: 20px;
				margin-bottom: 16px;
				font-size: 14px;
				.el-input {
					width: 203px;
				}
				.el-select {
					width: 104px;
				}
				.el-date-editor {
					width: 232px;
				}
				.rtgh {
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					color: #fff;
					border-radius: 2px;
					background-color: #1C66E5;
					cursor: pointer;
					margin-left: 12px;
					&:active {
						opacity: 0.8;
					}
				}
			}
			
			.ryyh {
				.guuus {
					color: #1C66E5;
				}
				.ghuj {
					display: none;
					width: 6px;
					height: 6px;
					border-radius: 100%;
					position: relative;
					top: -2px;
				}
				.color0 {
					display: inline-block;
					background: #FF4340;
				}
				.color1 {
					display: inline-block;
					background: #01AF43;
				}
				.color2 {
					display: inline-block;
					background: #FFAA16;
				}
				.color3 {
					display: inline-block;
					background: #1C66E5
				}
			}
		}
	}
	
	.gdejf {
		.rthss {
			cursor: pointer;
			font-size: 14px;
			color: #8F959E;
			margin-bottom: 14px;
			.deew {
				color: #333;
			}
		}
		.nyr6s {
			padding: 20px;
			color: #333;
			background-color: #fff;
			h5 {
				font-size: 16px;
				font-weight: bold;
				margin-bottom: 16px;
			}
			ul {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				border-bottom: 1px solid #F3F3F3;
				li {
					width: 50%;
					font-size: 14px;
					margin-bottom: 12px;
				}
			}
		}
		.dww {
			ul {border: none;}
		}
	}
	
	// 弹框
	.otehs {
		.pphss{
			width: 88px;
			font-size: 14px;
			color: #333333;
			margin-bottom: 16px;
			position: relative;
			&::after {
				content: '';
				display: block;
				width: 415px;
				height: 1px;
				background-color: #F3F3F3;
				position: absolute;
				right: -395px;
				top: 10px;
			}
		}
		.rsaas {
			margin-bottom: 10px;
		}
		.byus {
			font-size: 12px;
			padding-left: 10px;
			h6 {
				color: #FF4340;
				margin-bottom: 8px;
			}
		}
		.dialog-footer {
			margin: 0 auto;
			text-align: center;
		}
	}
</style>