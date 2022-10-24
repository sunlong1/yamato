<template>
    <div class="banner_box">
      <div class="con">
        <router-link to="/" class="logo"><img src="../../src/assets/logo.png" alt=""></router-link>
		<div class="search-box">
			<el-input placeholder="请输入接口名称/接口ID" v-model="input3" class="input-with-select">
			    <el-button slot="append" icon="el-icon-search"></el-button>
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
				<router-link  to="/case">接口测试</router-link>
			</li>
			<li>
				<router-link  to="/charge">充值中心</router-link>
			</li>
			<li class="login" @click="dialogFormVisible=true">
				登陆
			</li>
			<li class="register" @click="dialogFormVisible=true">
				立即注册
			</li>
			<!-- <li class="header" @click="goUserCenter">
				<span>{{name}}</span> <el-avatar :size="24" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
			</li> -->
        </ul>
      </div>
	  
	  <el-dialog :visible.sync="dialogFormVisible">
		<img src="../assets/logo.png"/>
	    <el-form :model="form">
	      <el-form-item>
	        <el-input placeholder="请输入手机号" v-model="form.phone" autocomplete="off"></el-input>
	      </el-form-item>
	      <el-form-item>
	        <el-input placeholder="请输入密码" v-model="form.phone" autocomplete="off"></el-input>
	      </el-form-item>
		  <el-form-item>
		    <el-input placeholder="请输入企业名称全称" v-model="form.company" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-input placeholder="请输入邮箱地址" v-model="form.email" autocomplete="off"></el-input>
		  </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="dialogFormVisible = false">取 消</el-button>
	      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
	    </div>
	  </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
		input3: '',
		name: 'sunlong',
		form: {
		  phone: '',
		  code: '',
		  password: '',
		  passwordAgain: '',
		  company: '',
		  email: ''
	    },
		dialogFormVisible: false
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
	  goUserCenter () {
		  this.$router.push('center')
	  }
    }
  }
</script>
<style lang="less" scoped>
	.banner_box{
	  // height: 120px;
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
		  color: #1C66E5;
	  }
	  .register {
		  width: 112px;
		  height: 60px;
		  line-height: 60px;
		  background-color: #1C66E5;
		  color: #fff;
		  text-align: center;
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
		.el-input-group__append button.el-button {
			background-color: #1C66E5;
			color: #fff;
			border-radius: 0;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
		}
	}
</style>