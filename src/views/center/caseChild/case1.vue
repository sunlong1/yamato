<template>
    <div class="pkjh">
        <div class="vhdd">
			<secret @orderId="getOrderId"></secret>
			<div class="oiuhgh">
				<ul>
					<li class="lione">
						<div class="tgss">
							<p><img src="../../../assets/leftAside/dsww2.png"/></p>
							<h6>账户余额</h6>
						</div>
						<div class="efgbn">{{userInfo.accountBalance}} <span>元</span></div>
						<div class="cgyu"><router-link to="/charge">充值</router-link></div>
					</li>
					<li class="litwo">
						<div class="tgss">
							<p><img src="../../../assets/leftAside/dsww.png"/></p>
							<h6>我的接口</h6>
						</div>
						<div class="efgbn">{{userInfo.intfNum}} <span>条</span></div>
						<div class="cgyu"><router-link to="/center/case3">查看</router-link></div>
					</li>
					<li class="lithree">
						<div class="tgss">
							<p><img src="../../../assets/leftAside/dsww1.png"/></p>
							<h6>我的订单</h6>
						</div>
						<div class="efgbn">{{userInfo.orderNum}} <span>条</span></div>
						<div class="cgyu"><router-link to="/center/case5">查看</router-link></div>
					</li>
				</ul>
			</div>
			<div class="bhuj">
				<h6>账户信息</h6>
				<ul>
					<li>
						<p>账号：</p>
						<span>{{userInfo.accountNum}}</span>
					</li>
					<li>
						<p>用户名：</p>
						<span>{{userInfo.username}}</span>
						<img @click="type='editName';editPop=true" src="../../../assets/common/edit.png"/>
					</li>
					<li>
						<p>用户类型：</p>
						<span>{{userInfo.type===1?'个人':userInfo.type===1?'企业':'-'}}</span>
					</li>
					<li>
						<p>手机号：</p>
						<span>{{userInfo.phone}}</span>
						<img @click="type='editPhone';editPop=true" src="../../../assets/common/edit.png"/>
					</li>
					<li>
						<p>邮箱：</p>
						<span>{{userInfo.email}}</span>
						<img @click="type='editMail';editPop=true" src="../../../assets/common/edit.png"/>
					</li>
					<li>
						<p>企业名称：</p>
						<span>{{userInfo.orgName}}</span>
					</li>
					<li>
						<p>企业认证：</p>
						<span v-bind:class="{'color2':userInfo.orgCertState===2,'color3':userInfo.orgCertState===3,'color4':userInfo.orgCertState===4}">{{userInfo.orgCertState===1?'未认证':userInfo.orgCertState===2?'审核中':userInfo.orgCertState===3?'审核未通过':userInfo.orgCertState===4?'认证成功':''}}</span>
						<a @click="goCert">{{userInfo.orgCertState===1?'立即认证':userInfo.orgCertState===3?'重新认证':userInfo.orgCertState===4?'更新认证':''}}</a>
					</li>
				</ul>
			</div>
		</div>
        <router-view></router-view>
		
		<el-dialog :visible.sync="editPop" :title="type==='editName'?'修改用户名':type==='editPhone'?'修改手机号':type==='editMail'?'修改邮箱':''" width="470px">
			<div class="vft6" v-loading="loading">
				<!-- <h6>修改用户名</h6> -->
				<el-form :model="editForm" ref="editForm" :rules="rules" :label-width="type==='editMail'?'80px':type==='editPhone'?'130px':'60px'">
				  <el-form-item prop="username" v-if="type==='editName'" label="用户名">
					<el-input placeholder="请输入用户名（50个汉字、字母、数字组合）" v-model="editForm.username" autocomplete="off" clearable></el-input>
				  </el-form-item>
				  <p class="ojsjs" v-if="type==='editPhone'">未保护账号安全，请使用{{userInfo.phone}}验证身份</p>
				  <el-form-item class="rtghs" prop="oldPhoneCode" v-if="type==='editPhone'" label="当前手机号验证码">
					<el-input placeholder="请输入验证码" maxlength="6" v-model="editForm.oldPhoneCode" autocomplete="off"></el-input>
					<div v-bind:class="{'gray': time!=60,'iughw':time===60}" @click="getCode1">{{time===60?'获取验证码':time + 's'}}</div>
				  </el-form-item>
				  <el-form-item v-if="type==='editPhone'" prop="newPhone" label="新手机号">
					<el-input placeholder="请输入手机号" v-model="editForm.newPhone" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item class="rtghs" prop="newPhoneCode"  v-if="type==='editPhone'" label="新手机号验证">
					<el-input placeholder="请输入验证码" maxlength="6" v-model="editForm.newPhoneCode" autocomplete="off"></el-input>
					<div v-bind:class="{'gray': time1!=60,'iughw':time1===60}" @click="getCode2">{{time1===60?'获取验证码':time1 + 's'}}</div>
				  </el-form-item>
				  <el-form-item v-if="type==='editMail'" label="当前邮箱">
					  <p style="text-align: left;">userInfo.email</p>
				  </el-form-item>
				  <el-form-item v-if="type==='editMail'" prop="email" label="新邮箱">
					<el-input placeholder="请输入新邮箱" v-model="editForm.email" autocomplete="off" clearable></el-input>
				  </el-form-item>
				</el-form>
				<div slot="footer" @click="login('editForm')" class="dialog-footer">
				  确认
				</div>
			</div>
		</el-dialog>
    </div>
</template>
<script>
import secret from '../../../components/secret.vue'
let timer = null
let timer1 = null
export default {
    namme:'case1',
	components:{
	  secret
	},
    data(){
		var validatePhone = (rule, value, callback) => {
		  if (this.type === 'editPhone') {
				if (value === '') {
					callback(new Error('请输入手机号'));
				}
				if(!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)) {
					callback(new Error('请输入正确手机号'));
				}
			}
			callback();
		};
		
		var validateCode = (rule, value, callback) => {
		  if (this.type === 'editPhone' && !value) {
			callback(new Error('验证码不能为空'));
		  }
		  callback()
		};
		
		var validateName = (rule, value, callback) => {
		  if (this.type === 'editName' && !value) {
			  callback(new Error('请输入用户名'))
		  }
		  callback();
		};
		
		var validateEmail = (rule, value, callback) => {
			if (this.type === 'editMail' && !value) {
			  callback(new Error('请输入邮箱地址'))
			}
			callback();
		};
		
        return{
			oldPhone: '13161257793',
			userInfo:{},
			editForm: {
			  username: '',
			  newPhone: '',
			  oldPhoneCode: '',
			  newPhoneCode: '',
			  email: ''
			},
			editPop: false,
			loading: false,
			type: 'editPhone',
			time: 60,
			disabledClick: false,
			time1: 60,
			disabledClick1: false,
			rules: {
			  username: [
				{ validator: validateName, trigger: 'blur' }
			  ],
			  newPhone: [
				{ validator: validatePhone, trigger: 'blur' }
			  ],
			  oldPhoneCode: [
			  	{ validator: validateCode, trigger: 'blur' }
			  ],
			  newPhoneCode: [
			  	{ validator: validateCode, trigger: 'blur' }
			  ],
			  email: [
			  	{ validator: validateEmail, trigger: 'blur' }
			  ]
			},
			orderId: ''
        }
    },
    methods:{
		getOrderId(val) {
			if(!val) return
			this.orderId = val
			this.getCase()
		},
        getCase:function(){
            let params = {
				  userId: this.$cookies.getJSON('user').userId,
				  orderId: this.orderId
			  }
		    // 8024
            this.$axios.get('http://192.168.0.99:8020/user/account/info',params)
			  .then((res) =>{
				  console.log(res)
				  if (res.state===200) {
					
				  } else {
					this.$message.error(res.message);
				  }
				  this.userInfo = res.data
			  })
			  .catch(err=>{
				  alert(err);
			  })
        },
		login(form) {
		  this.$refs[form].validate((valid) => {
			if (valid) {
				let url = ''
				let params = {}
				this.loading = true
				if(this.type === 'editPhone') {
					params = {
						phone: this.editForm.newPhone,
						captcha: this.editForm.oldPhoneCode,
						newCaptcha: this.editForm.newPhoneCode
					}
					url = '/user/phone/update'
				} else if(this.type === 'editName') {
					params = {
						username: this.editForm.username
					}
					url = '/user/username/update'
				} else if(this.type === 'editMail') {
					params = {
						email: this.editForm.email
					}
					url = '/user/email/update'
				}
				params['userId'] = this.$cookies.getJSON('user').userId
				// 8024
				this.$axios.post(`http://192.168.0.99:8020${url}`,params)
				  .then((res) =>{
					  console.log(res)
					  if (res.state===200) {
						
					  } else {
						this.$message.error(res.message);
					  }
					  this.getCase()
					  this.editPop = false
					  this.loading = false
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
		getCode1() {
		  let _this = this
		  if(_this.disabledClick) return
		 //  if(!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.editForm.phone)) {
			// this.$message.error('请先输入正确手机号');
			// return
		 //  }
		 let params = {
			phone: this.userInfo.phone,
			captchaType: 4
		 }
		 // 8024
		 this.$axios.get('http://192.168.0.99:8020/user/captcha/get',params)
		 .then((res) =>{
		     console.log(res)
			  if (res.state===200) {
				_this.disabledClick = true
				_this.time--
				timer =  setInterval(function(){
				  if (_this.time===0) {
					  clearInterval(timer)
					  _this.disabledClick = false
					  _this.time = 60
					  return
				  }
				  _this.disabledClick = true
				  _this.time--
				},1000)  
			  } else {
				this.$message.error(res.message);
			  }
		 })
		 .catch(err=>{
			  this.$message.error(err);
		 })
		},
		getCode2() {
		  let _this = this
		  if(_this.disabledClick1) return
		  if(!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.editForm.newPhone)) {
			this.$message.error('请先输入正确手机号');
			return
		  }
		  if (this.editForm.newPhone == this.userInfo.phone) {
			this.$message.error('修改号码不能和旧号码一样');
			return
		  }
		  let params = {
			phone: this.editForm.newPhone,
			captchaType: 4
		  }
		  // 8024
		  this.$axios.get('http://192.168.0.99:8020/user/captcha/get',params)
		  .then((res) =>{
		      console.log(res)
			  if (res.state===200) {
				_this.disabledClick1 = true
				_this.time1--
				timer1 =  setInterval(function(){
				  if (_this.time===0) {
					  clearInterval(timer1)
					  _this.disabledClick1 = false
					  _this.time1 = 60
					  return
				  }
				  _this.disabledClick1 = true
				  _this.time1--
				},1000)
			  } else {
				this.$message.error(res.message);
			  }
		  })
		  .catch(err=>{
			  this.$message.error(err);
		  })
		  
		},
		goCert:function() {
			this.$router.push('/center/case2')
		}
    },
    mounted(){
		this.$store.commit('setCenterIndex',0)
    }
}
</script>
<style lang="less" scoped>
	.pkjh {
		.vhdd {
			.oiuhgh {
				ul {
					display: flex;
					li {
						width: 308px;
						height: 200px;
						background-color: #fff;
						border-radius: 2px;
						overflow: hidden;
						padding-left: 20px;
						box-sizing: border-box;
						padding-top: 24px;
						.tgss {
							display: flex;
							align-items: center;
							margin-bottom: 16px;
							p {
								width: 32px;
								height: 32px;
								background: #E2EBFE;
								border-radius: 8px;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 12px;
								img {
									width: 16px;
								}
							}
							h6 {
								font-size: 18px;
							}
						}
						.efgbn {
							font-size: 36px;
							margin-bottom: 10px;
							font-weight: 500;
							span {
								font-size: 14px;
								color: #666666;
							}
						}
						.cgyu {
							width: 88px;
							height: 40px;
							line-height: 40px;
							text-align: center;
							color: #fff;
							font-size: 14px;
							background: #1C66E5;
							border-radius: 2px;
							a {
								color: #fff;
								width: 88px;
								height: 40px;
								display: block;
							}
						}
					}
					.lione {
						box-shadow: inset 3px 0px 0px #1C66E5;
						margin-right: 16px;
					}
					.litwo {
						box-shadow: inset 3px 0px 0px #543AF3;
						margin-right: 16px;
					}
					.lithree {
						box-shadow: inset 3px 0px 0px #329DFF;
					}
				}
			}
			
			.bhuj {
				background-color: #fff;
				padding: 16px 20px;
				box-sizing: border-box;
				margin-top: 20px;
				h6 {
					font-size: 16px;
					margin-bottom: 20px;
					font-weight: 500;
				}
				ul {
					display: flex;
					flex-wrap: wrap;
					li {
						width: 50%;
						display: flex;
						align-items: center;
						font-size: 14px;
						margin-bottom: 12px;
						img {
							width: 13px;
							padding-left: 8px;
							cursor: pointer;
						}
						p {
							margin-right: 4px;
						}
						a {
							padding-left: 10px;
							color: #1C66E5;
							cursor: pointer;
						}
						.color2 {
							color: #FFAA16;
						}
						.color3 {
							color: #FF4340;
						}
						.color4 {
							color: #01AF43;
						}
					}
				}
			}
		}
	
		.el-dialog {
			.ojsjs {
				margin-bottom: 12px;
				position: relative;
				top: -8px;
			}
			.vft6 {
				text-align: center;
				margin-top: -30px;
				.el-form {
					margin-top: 24px;
				}
				.rtghs {
					position: relative;
					.iughw {
						width: 95px;
						text-align: center;
						position: absolute;
						right: 0;
						top: 0;
						color: #1C66E5;
						border-radius: 2px;
						&::after {
							position: absolute;
							left: 0;
							top: 12px;
							content: '';
							width: 1px;
							height: 16px;
							background-color: #E0E0E0;
						}
					}
					.iughw {
						width: 95px;
						text-align: center;
						position: absolute;
						right: 0;
						top: 0;
						color: #1C66E5;
						border-radius: 2px;
						&::after {
							position: absolute;
							left: 0;
							top: 12px;
							content: '';
							width: 1px;
							height: 16px;
							background-color: #E0E0E0;
						}
					}
					.gray {
						width: 95px;
						text-align: center;
						position: absolute;
						right: 0;
						top: 0;
						border-radius: 2px;
						background-color: #b4bccc;
						color: #999;
					}
				}
				.dialog-footer {
					width: 120px;
					margin: 0 auto;
					height: 42px;
					line-height: 42px;
					text-align: center;
					color: #fff;
					background-color: #1C66E5;
				}
				.dialog-footer:active {
					opacity: 0.6;
				}
				.rtghj {
					color: #999999;
					font-size: 14px;
					margin-top: 16px;
					span {
						color: #1C66E5;
					}
					a {
						color: #1C66E5;
					}
				}
				.oeiuy {
					color: #1C66E5;
					font-size: 14px;
					margin-top: 16px;
					color: #1C66E5;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 16px;
						height: 14px;
						padding-right: 4px;
					}
				}
				.erfgh {
					margin-top: 16px;
					a {
						color: #1C66E5;
					}
				}
				.dgtww {
					text-align: right;
					margin-bottom: 16px;
					position: relative;
					top: -8px;
				}
			}
		}
	}
</style>