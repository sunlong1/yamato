<template>
    <div class="charge-box">
	  <div class="dwdwd">
		  <div class="dwdwd-one">
			  <div class="iuyttr" v-if="state!=4">
				  <span>!</span>
				  <p>您当前未进行企业认证，暂时无法充值。</p>
				  <router-link to="/center/case2?name=企业认证&id=1">立即认证</router-link>
			  </div>
			  
			  <div class="tgde">
				  <p class="rtghn">充值金额：</p>
				  <div class="radios">
				    <ul>
				      <li>
				        <input type="radio"  name="radio" id="radio1" value="100" v-model="form.number" @change="changenumber">
				        <label for="radio1">
				          <h6>新用户</h6>
						  <p>连续3个月 <span>赠100次/天</span></p>
						  <span class="rtgh">赠</span>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
				        </label>
				      </li>
				      <li>
				        <input type="radio"  name="radio" id="radio2" value="500" v-model="form.number">
				        <label for="radio2">
				          <h6>500元</h6>
						  <p>充500元 <span>送50元</span></p>
						  <span class="rtgh">优惠</span>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
				        </label>
				      </li>
					  <li>
					    <input type="radio"  name="radio" id="radio3" value="2000" v-model="form.number">
					    <label for="radio3">
					      <h6>2000元</h6>
						  <p>充2000元 <span>赠200元</span></p>
						  <span class="rtgh">优惠</span>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
					    </label>
					  </li>
					  <li>
					    <input type="radio"  name="radio" id="radio4" value="5000" v-model="form.number">
					    <label for="radio4">
					      <h6>5000元</h6>
						  <p>充5000元 <span>赠1000元</span></p>
						  <span class="rtgh">优惠</span>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
					    </label>
					  </li>
					  <li>
					    <input type="radio"  name="radio" id="radio5" value="10000" v-model="form.number">
					    <label for="radio5">
					      <h6>10000元</h6>
						  <p>充10000元 <span>赠2500元</span></p>
						  <span class="rtgh">充值推荐</span>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
					    </label>
					  </li>
					  <li>
					    <input type="radio"  name="radio" id="radio6" value="20000" v-model="form.number">
					    <label for="radio6">
					      <h6>20000元</h6>
						  <p>充20000元 <span>赠5000元</span></p>
						  <span class="rtgh">优惠</span>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
					    </label>
					  </li>
				    </ul>
				  </div>
			  </div>
			  <div class="rghn">
				  <input type="number" placeholder="自定义金额" v-model="form.money"/>
				  <span>元</span>
			  </div>
			  <div class="deew">
				  <p>赠送金额：</p>
				  <span>{{form.number==='100'?'100次/天':form.number==='500'?'50 元':form.number==='2000'?'200 元':form.number==='5000'?'1000 元':form.number==='10000'?'2500 元':form.number==='20000'?'5000 元':'0 元'}}</span>
			  </div>
			  <div class="tgde ouytg">
				  <p class="rtghn">支付方式：</p>
				  <div class="radios">
					<ul>
					  <li>
						<input type="radio"  name="radio1" id="type1" value="2" v-model="form.type">
						<label for="type1">
						  <img class="wdre" src="../../assets/charge/wechat.png"/>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
						</label>
					  </li>
					  <li>
						<input type="radio"  name="radio1" id="type2" value="1" v-model="form.type">
						<label for="type2">
						  <img class="wdre vddd" src="../../assets/charge/ali.png"/>
						  <img class="oiuy" src="../../assets/charge/rrr4.png"/>
						</label>
					  </li>
					</ul>
				  </div>
			  </div>
			  <div class="efdd">
			    <el-checkbox v-model="checked">我已阅读并同意<router-link to="#">《充值服务协议》</router-link></el-checkbox>
			  </div>
			  <div class="gdewd">
				  <el-button @click="repay" type="primary">立即支付</el-button>
			  </div>
			  <div v-html="resHtml">
				  
			  </div>
		  </div>
		  <div class="dwdwd-two">
			   <div class="rdsss">
				   <h4>使用流程<span></span></h4>
				   <img src="../../assets/charge/shouhou.png"/>
			   </div>
		  </div>
	  </div>
      
	  <div class="mengban" v-if="dialogFormVisible">
		  <div class="iuhgg">
			  <img class="close" @click="dialogFormVisible=false" src="../../assets/close.png">
			  <div class="rthjs">
				  <div class="ffhs">{{form.type==='wechat'?'微信':'支付宝'}}支付</div>
				  <div class="ugtgw">
					  <div class="iuyyy">
						  <img class="qr" src="../../assets/qr.png"/>
						  <div class="ergh">
							  <img src="../../assets/saomiao.png"/>
							  <div class="rghjs">
								  <p>请用{{form.type==='wechat'?'微信':'支付宝'}}扫一扫</p>
								  <p>扫描二维码支付</p>
							  </div>
						  </div>
					  </div>
					  <div class="hhuu">
						 <p>充值金额: 充1000元送100元</p> 
						 <p>订单编号: 202209191232210000001</p>
						 <p>实付金额: <span>1000.00元</span></p>
						 <p class="vgyuik">请在<span>00:58:23</span>内完成支付</p>
					  </div>
				  </div>
			  </div>
		  </div>
	  </div>
    </div>
</template>
<script>
// import foot from '../../components/foot'
export default {
  name: 'charge',
  // components:{
  //   foot
  // },
  data(){
    return{
		form: {
			number: '',
			type: 0,
			money: ''
		},
		dialogFormVisible: false,
		checked: false,
		resHtml: '',
		state: 0
    }
  },
  methods:{
    changenumber () {
		console.log(this.form.number)
	},
	repay () {
		let user = this.$cookies.getJSON('user')
		if (user && user.token) {
			if (!this.form.number && !this.form.money) {
				this.$message.error('请选择充值金额');
				return
			}
			if (this.form.money<0) {
				this.$message.error('请输入正确金额');
				return
			}
			if (!this.form.type) {
				this.$message.error('请选择充值方式');
				return
			}
			if (!this.checked) {
				this.$message.error('请阅读并勾选下方协议');
				return
			}
			// this.dialogFormVisible = true
			this.submitMoney()
		} else {
		  this.$store.commit('setShowLogin',1)
		}
		
	},
	submitMoney() {
		let params = {
			  userId: this.$cookies.getJSON('user').userId,
			  orderId: '',
			  payType: this.form.type,
			  chargeType: 1,
			  amount: this.form.number,
			  giveAmount: 0
		  }
		  // 8025
		this.$axios.post('http://192.168.0.99:8020/pay/amount/charge',params)
		  .then((res) =>{
			  console.log(res)
			  if (res.state===200) {
				
			  } else {
				this.$message.error(res.message);
			  }
			  this.resHtml = res.data
			  const newWindow = window.open('', '_blank');  
			  newWindow.document.write(res.data);
			  newWindow.focus();
			  console.log(this.resHtml)
		  })
		  .catch(err=>{
			  this.$message.error(err);
		  })

	},
	getState() {
		if (!this.$cookies.getJSON('user').userId) return
		let params = {
			  userId: this.$cookies.getJSON('user').userId
		  }
	    // 8024
		this.$axios.get('http://192.168.0.99:8020/user/org/cert/state',params)
		  .then((res) =>{
			  console.log(res)
			  if (res.state===200) {
				
			  } else {
				this.$message.error(res.message);
			  }
			  this.state = res.data
		  })
		  .catch(err=>{
			  this.$message.error(err);
		  })
	}
  },
  mounted(){
	  this.getState()
  }
}
</script>
<style lang="less" scoped>
  .charge-box {
	  background-color: #F3F5FA;
	  padding-bottom: 80px;
	  .dwdwd {
		  width: 1200px;
		  margin: 0 auto;
		  padding: 20px;
		  .dwdwd-one {
			  padding: 20px 20px 24px;
			  background-color: #fff;
			  .iuyttr {
				  display: flex;
				  align-items: center;
				  background: #FFF7E9;
				  padding: 10px 0 10px 16px;
				  p {
					  margin-left: 4px;
					  margin-right: 6px;
				  }
				  span {
					  display: block;
					  width: 14px;
					  height: 14px;
					  line-height: 14px;
					  border-radius: 100%;
					  background: #FFAA16;
					  font-size: 10px;
					  text-align: center;
					  color: #fff;
				  }
				  a {
					  color: #1C66E5;
				  }
			  }
		  
				.tgde {
					display: flex;
					margin-top: 24px;
					.rtghn {
						width: 70px;
						font-size: 14px;
						color: #666;
					}
					.radios {
					  width: 1090px;
					  ul {
						display: flex;
						flex-wrap: wrap;
						li {
						  margin-left: 14px;
						  &:first-child {
							  margin-left: 0;
						  }
						  input {
							display: none;
						  }
						  label {
							display: block;
							width: 170px;
							height: 66px;
							padding: 8px 12px;
							box-sizing: border-box;
							border-radius: 4px;
							position: relative;
							font-size: 14px;
							border: 2px solid #E0E0E0;
							h6 {
								font-size: 16px;
								color: #333333;
								font-weight: 600;
								padding-bottom: 4px;
							}
							p {
								font-size: 14px;
								color: #999999;
								span {
									color: #FF4340;
								}
							}
							.rtgh {
								display: inline-block;
								position: absolute;
								right: -2px;
								top: -2px;
								padding: 2px;
								font-size: 12px;
								color: #FFFFFF;
								background-color: #FF4340;
								min-width: 32px;
								border-bottom-left-radius: 4px;
								border-top-right-radius: 4px;
								text-align: center;
							}
							.oiuy {
								position: absolute;
								right: 0;
								bottom: 0;
								width: 18px;
								display: none;
							}
						  }
						  input:checked+label {
							background: #F2F7FF;
							border: 2px solid #1C66E5;
							.oiuy {
								display: block;
							}
						  }
						}
					  }
					}
				}
				.rghn {
					padding-left: 70px;
					font-size: 14px;
					margin-top: 16px;
					input {
						width: 169px;
						height: 36px;
						padding-left: 12px;
						box-sizing: border-box;
						border: 1px solid #E0E0E0;
					}
					input::-webkit-outer-spin-button,
					input::-webkit-inner-spin-button {
					    -webkit-appearance: none;
					}
					input[type="number"]{
					    -moz-appearance: textfield;
					}
					span {
						padding-left: 6px;
					}
				}
				.deew {
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #666666;
					padding: 16px 0;
					p {
						width: 70px;
					}
					span {
						color: #333333;
					}
				}
				.ouytg {
					.radios {
						ul {
							li {
								label {
									line-height: 66px;
									text-align: center;
									.wdre {
										width: 100px;
									}
									.vddd {
										position: relative;
										top: 4px;
									}
								}
							}
						}
					}
				}
				.efdd {
					padding: 20px 0 40px 70px;
					.el-checkbox {
						color: #999999;
						font-weight: normal;
					}
					a {
						color: #409EFF;
					}
				}
				.gdewd {
					padding-left: 70px;
					.el-button--primary {
						width: 148px;
						height: 46px;
						font-weight: normal;
					    color: #FFF;
					    background-color: #1C66E5;
					    border-color: #1C66E5;
						cursor: pointer;
					}
					&:active {
						opacity: 0.8;
					}
				}
		  }
		  
		  .dwdwd-two {
			  padding: 20px 40px 32px 0;
			  background-color: #fff;
			  margin-top: 20px;
			  h4 {
				 font-size: 16px;
				 color: #333333;
				 padding-left: 20px;
				 position: relative;
				 span {
					 display: block;
					 width: 64px;
					 height: 5px;
					 border-radius: 3px;
					 background: #679FFF;
					 position: absolute;
					 bottom: 2px;
					 left: 20px;
					 opacity: 0.6;
				 }
			  }
			  img {
				  width: 100%;
			  }
		  }
	  }
	  
  }
  
  .mengban {
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.5);
	  position: fixed;
	  left: 0;
	  top: 0;
	  .iuhgg {
		width: 644px;
		height: 386px;
		box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		background: #FFFFFF;
		position: relative;
		margin: 200px auto;
		.rthjs {
		  	height: 264px;
			background: linear-gradient(285.85deg, #1C66E5 3.71%, #3D84FF 101.01%);
			.ffhs {
				font-size: 20px;
				color: #fff;
				text-align: center;
				padding: 20px 0;
			}
			.ugtgw {
				width: 580px;
				margin-left: 32px;
				background-color: #fff;
				display: flex;
				box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
				border-radius: 8px;
				padding: 24px 32px;
				box-sizing: border-box;
				.iuyyy {
					margin-right: 32px;
					.qr {
						width: 132px;
						height: 132px;
					}
					.ergh {
						display: flex;
						align-items: center;
						img {
							width: 19px;
							height: 19px;
							margin-right: 10px;
						}
						.rghjs {
							font-size: 12px;
							letter-spacing: 3px;
						}
					}
				}
				.hhuu {
					font-size: 14px;
					p {
						margin-bottom: 12px;
						span {
							color: #FF3B30;
						}
					}
					.vgyuik {
						margin-top: 67px;
						span {
							color: #1C66E5;
						}
					}
				}
			}
		}
		.close {
			position: absolute;
			width: 15px;
			height: 15px;
			right: 26px;
			top: 26px;
		}
	  }
  }
</style>