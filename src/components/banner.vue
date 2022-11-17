<template>
    <div v-bind:class="['banner_box',{'banner_modal': !dialogFormVisible}]">
      <div class="con">
        <router-link to="/" class="logo"><img src="../../src/assets/logo.png" alt=""></router-link>
		<div class="search-box">
			<el-input placeholder="请输入接口名称" v-model="input3" clearable class="input-with-select">
			    <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
			  </el-input>
		</div>
        <ul class="list">
			<li>
				<router-link  to="/" active-class="active" exact>首页</router-link>
			</li>
			<li>
				<router-link  to="/api">API接口</router-link>
			</li>
			<li>
				<router-link  to="/apiTest">接口测试</router-link>
			</li>
			<li>
				<router-link  to="/charge">充值中心</router-link>
			</li>
			<li v-if="!loginStatus" class="login" @click="type='password';$store.commit('setShowLogin',1)">
				登录
			</li>
			<li v-if="!loginStatus" class="register" @click="type='register';$store.commit('setShowLogin',1)">
				立即注册
			</li>
			<li v-if="loginStatus" class="header" @click="goUserCenter">
				<span>{{name}}</span> <el-avatar :size="24" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
			</li>
        </ul>
      </div>
	  
	  <el-dialog :visible.sync="$store.state.showLogin" width="360px">
		<div class="vft6" v-loading="loading">
			<!-- <img class="logo" src="../assets/logo.png"/> -->
			<div class="oiuyg" v-if="type==='password' || type==='code'">
				<span :class="{'active': type==='password'}" @click="type='password'">账号密码登录</span>
				<span :class="{'active': type==='code'}" @click="type='code'">验证码登录</span>
			</div>
			<div class="ffewe" v-if="type==='register'">
				立即注册
			</div>
			<div class="ffewe" v-if="type==='forget'">
				忘记密码
			</div>
			<el-form :model="form" ref="form" :rules="rules">
			  <el-form-item prop="phone">
			    <el-input placeholder="请输入手机号" v-model="form.phone" autocomplete="off" clearable></el-input>
			  </el-form-item>
			  <el-form-item class="rtghs" prop="code" v-if="type!='password'">
			    <el-input placeholder="请输入短信验证码" maxlength="6" v-model="form.code" autocomplete="off"></el-input>
				<div v-bind:class="{'gray': time!=60,'iughw':time===60}" @click="getCode">{{time===60?'获取验证码':time + 's'}}</div>
			  </el-form-item>
			  <el-form-item prop="password" v-if="type!='code'">
			    <el-input placeholder="请输入密码（8-20位数字与字母组合）" type="password" v-model="form.password" autocomplete="off" clearable></el-input>
			  </el-form-item>
			  <div class="dgtww">
				<span  v-if="type==='password'" @click="type='forget'">忘记密码</span>  
			  </div>
			  <el-form-item prop="password2" v-if="type==='forget'">
			    <el-input placeholder="请确认密码（8-20位数字与字母组合）" type="password"  v-model="form.password2" autocomplete="off" clearable></el-input>
			  </el-form-item>
			  <el-form-item prop="company" v-if="type==='register'">
			    <el-input placeholder="请输入企业名称全称" v-model="form.company" autocomplete="off" clearable></el-input>
			  </el-form-item>
			  <el-form-item prop="email" v-if="type==='register'">
			    <el-input placeholder="请输入邮箱地址" v-model="form.email" autocomplete="off" clearable></el-input>
			  </el-form-item>
			</el-form>
			<div slot="footer" @click="login('form')" class="dialog-footer">
			  登录
			</div>
			<div class="rtghj" v-if="type==='password' || type==='code'">没有账号？<span @click="type='register'">立即注册</span></div>
			<div class="rtghj" v-if="type==='register'">已有账号<span @click="type='password'">去登录</span></div>
			<div class="oeiuy" v-if="type==='forget'"  @click="type='password'"><img src="../assets/common/return.png"/> <span>返回登录</span></div>
			<div class="erfgh" v-if="type==='password' || type==='code'"><el-checkbox v-model="checked">我已阅读并同意<router-link @click.native="dialogFormVisible=false" to="/aboutUs/case2?name=用户协议&id=1">《用户协议》</router-link>和<router-link @click.native="dialogFormVisible=false" to="/aboutUs/case3?name=隐私政策&id=2">《隐私政策》</router-link></el-checkbox></div>
		</div>
	  </el-dialog>
    </div>
</template>
<script>

let timer = null
  export default {
    data() {
	  var validatePhone = (rule, value, callback) => {
	    if (this.type === 'password' || this.type === 'code' ) {
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
		  if (!value) {
			callback(new Error('验证码不能为空'));
		  }
		  callback()
		};
		
		var validatePassword = (rule, value, callback) => {
		  if (value === '') {
			callback(new Error('请输入密码'));
		  } else {
			callback();
		  }
		};
		
		var validatePassword2 = (rule, value, callback) => {
		  if (value === '') {
			callback(new Error('请再次输入密码'));
		  } else if (value !== this.form.password) {
			callback(new Error('两次输入密码不一致!'));
		  } else {
			callback();
		  }
		};
		var validateCompany = (rule, value, callback) => {
		  if (!value) {
			return callback(new Error('请输入企业名称'));
		  }
		  callback()
		};
		
		var validateEmail = (rule, value, callback) => {
		  if (!value) {
			return callback(new Error('请输入邮箱地址'));
		  }
		  callback()
		};
		
      return {
        activeIndex: '1',
        activeIndex2: '1',
		input3: '',
		name: 'sunlong',
		form: {
		  phone: '13161257792',
		  code: 'e32e2',
		  password: 'ewdwed',
		  password2: '',
		  company: '',
		  email: ''
	    },
		type: 'password',
		time: 60,
		disabledClick: false,
		checked: false,
		loading: false,
		rules: {
		  phone: [
			{ validator: validatePhone, trigger: 'blur' }
		  ],
		  code: [
			{ validator: validateCode, trigger: 'blur' }
		  ],
		  password: [
		  	{ validator: validatePassword, trigger: 'blur' }
		  ],
		  password2: [
		  	{ validator: validatePassword2, trigger: 'blur' }
		  ],
		  company: [
		  	{ validator: validateCompany, trigger: 'blur' }
		  ],
		  email: [
		  	{ validator: validateEmail, trigger: 'blur' }
		  ]
		},
		loginStatus: false
      };
    },
	computed: {
		dialogFormVisible() {
			return this.$store.state.showLogin
		}
	},
	mounted() {
		this.checkLogin()
		console.log(this.$cookies.set('dddd','ffff',{ expires: 7 }))
	},
	watch: {
		type: function (newVal, oldVal) {
			this.time = 60
			this.checked = false
			this.resetForm('form')
			clearInterval(timer)
			this.disabledClick = false
		}
	},
    methods: {
	  resetForm(formName) {
		  this.$refs[formName].resetFields();
		},
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
	  goUserCenter () {
		  this.$router.push('/center/case1')
	  },
	  getCode() {
		  let _this = this
		  if(_this.disabledClick) return
		  if(!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.form.phone)) {
		  	this.$message.error('请先输入正确手机号');
			return
		  }
		  let params = {
			  phone: this.form.phone,
			  captchaType: this.type==='register'?1:this.type==='forget'?3:2
		  }
		  this.$axios.get('http://192.168.0.99:8024/user/captcha/get',params)
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
	  login(form) {
		  // /user/password/login
		  // /user/captcha/login
		  this.$refs[form].validate((valid) => {
			if (valid) {
				if ((this.type==='password' || this.type==='code') && !this.checked) {
				  this.$message.error('请阅读并勾选下方协议');
				  return
				}
				this.loading = true
				let url = ''
				let params = {}
				if (this.type==='password') {
					params = {
						phone: this.form.phone,
						password: this.form.password
					}
					url = '/user/password/login'
				} else if(this.type==='code') {
					params = {
						phone: this.form.phone,
						captcha: this.form.code
					}
					url = '/user/captcha/login'
				} else if(this.type==='register') {
					params = {
						phone: this.form.phone,
						password: this.form.password,
						captcha: this.form.code,
						orgName: this.form.company,
						email: this.form.email
						
					}
					url = '/user/register'
				} else if(this.type==='forget') {
					params = {
						phone: this.form.phone,
						password: this.form.password,
						captcha: this.form.code,
						confirmPassword: this.form.password2						
					}
					url = '/user/password/update'
				}
				this.$axios.post(`http://192.168.0.99:8024${url}`,params)
				  .then((res) =>{
					  console.log(res)
					  if (res.state===200) {
						if(this.type==='password' || this.type==='code') {
							this.dialogFormVisible = false
							this.$store.commit('setShowLogin',0)
							this.solve(res.data)
							this.$cookies.set('user', res.data, { expires: 0.7 })
							this.$store.commit('setToken',res.data.token)
						} else if(this.type==='register' || this.type==='forget') {
							this.$refs['form'].resetFields();
							this.type = 'password'
						}
					  } else {
						this.$message.error(res.message);
					  }
					  this.loading = false
				  })
				  .catch(err=>{
					  this.loading = false
					  this.$message.error(err);
				  })
			} else {
			  this.$message.error('error submit!!');
			  return false;
			}
		  });
	  },
	  solve(user) {
		  console.log(user)
		  this.loginStatus = true
		  this.name = user.userName
		  this.$store.commit('setToken',user.token)
	  },
	  checkLogin() {
		  let user = this.$cookies.getJSON('user')
		  if (user && user.token) {
			  this.solve(user)
		  }
	  },
	  goSearch() {
		  window.open(`${location.origin}/#/allApi?search=${this.input3}&source=search`,'_self')
		  location.reload()
		  // this.$router.push({name:'allApi',query: {search: this.input3,source: 'search'}})
	  }
    }
  }
</script>
<style lang="less" scoped>
	.banner_box{
	  height: 60px;
	  background-color: #fff;
	  width: 100%;
	  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
	}
	.banner_modal {
		position: fixed;
		left: 0;
		top:0;
		z-index: 9;
	}
	.con {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  height: 60px;
	}
	.logo{
	  display: block;
	  height: 36px;
	  img{
		  width: 142px;
		  height: 36px;
	  }
	}
	.list{
	  display: flex;
	  align-items: center;
	  font-size: 16px;
	  font-weight: 400;
	  color:#fff;
	  li{
		margin-right: 40px;
		cursor: pointer;
		a {
			color: #333333;
			padding-bottom: 20px;	
		}
		a:hover {
			color: #1C66E5;
		}
		.active {
			color: #1C66E5;
			border-bottom: 2px solid #1C66E5;
		}
		&:last-child {
			margin-right: 0;
		}
	  }
	  .login {
		  cursor: pointer;
		  color: #1C66E5;
	  }
	  .register {
		  width: 112px;
		  height: 60px;
		  line-height: 60px;
		  background-color: #1C66E5;
		  color: #fff;
		  text-align: center;
		  cursor: pointer;
	  }
	  .header {
		  font-size: 16px;
		  color: #333333;
		  display: flex;
		  align-items: center;
		  span {
			  padding-right: 10px;
			  font-weight: normal;
		  }
	  }
	}
	.search-box {
		width: 264px;
		height: 36px;
		position: relative;
		left: -100px;
		.el-input-group__append button.el-button {
			background-color: #1C66E5;
			color: #fff;
			border-radius: 0;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			cursor: pointer;
		}
	}
	.el-dialog {
		.vft6 {
			text-align: center;
			margin-top: -20px;
			.oiuyg {
				width: 240px;
				display: flex;
				justify-content: space-between;
				font-size: 18px;
				margin: 10px auto 0 auto;
				font-weight: normal;
				color: #333333;
				.active {
					padding-bottom: 10px;
					color: #1C66E5;
					border-bottom: 2px solid #1C66E5;
				}
			}
			.ffewe {
				font-size: 18px;
				color: #333333;
				text-align: center;
			}
			.el-form {
				margin-top: 24px;
			}
			.rtghs {
				position: relative;
				.iughw {
					width: 95px;
					text-align: center;
					position: absolute;
					cursor: pointer;
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
				cursor: pointer;
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
				cursor: pointer;
				img {
					width: 16px;
					height: 14px;
					padding-right: 4px;
				}
			}
			.erfgh {
				margin-top: 16px;
				cursor: pointer;
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
</style>