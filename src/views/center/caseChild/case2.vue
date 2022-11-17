<template>
	<div class="ertghj" :loading="loading">
		<p v-if="status!=1" v-bind:class="['osie',{'yellow':status===5 || status===2,'blue': status===4}]">{{ruleForm.stateDesc}}</p>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
		  <el-form-item label="企业名称" prop="orgName">
		    <el-input v-model="ruleForm.orgName" @blur="comBlur()" placeholder="请输入企业名称" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="统一社会信用代码" prop="usCreditCode">
		    <el-input v-model="ruleForm.usCreditCode" :disabled="getCompany" placeholder="企业社会统一信用代码" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="法定代表人" prop="legal">
		    <el-input v-model="ruleForm.legal" :disabled="getCompany" placeholder="企业法定代表人" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="联系地址" prop="address">
		    <el-input v-model="ruleForm.address" placeholder="联系地址" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="所在部门" prop="department">
		    <el-input v-model="ruleForm.department" placeholder="请输入所在部门" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="应用场景" prop="scene">
		  	<el-input type="textarea" v-model="ruleForm.scene" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="认证到期时间" prop="expireTime">
		  	<el-input v-model="ruleForm.expireTime" placeholder="请输入认证到期时间" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="上传营业执照" prop="paper">
		  	<el-upload
			  :limit="num"
		  	  action="http://192.168.0.99:8024/user/img/upload"
		  	  list-type="picture-card"
		  	  :on-preview="handlePictureCardPreview"
			  :on-success="handlePictureSuccesss"
			  :on-error="handlePictureFail"
			  :file-list="ruleForm.paper"
			  accept="image"
		  	  :on-remove="handleRemove">
		  	  <i class="el-icon-plus"></i>
			  <span class="dewde"></span>
		  	</el-upload>
			<p class="dewde">支持JPG、JPEG、PNG格式，大小不超过5M。</p>
		  	<el-dialog :visible.sync="dialogVisible">
		  	  <img width="100%" :src="dialogImageUrl" alt="">
		  	</el-dialog>
		  </el-form-item>
		  <el-form-item>
			  <el-checkbox v-model="checked">我已阅读并同意<router-link to="/aboutUs/case4?name=认证服务协议&id=3">《动态时序认证服务协议》</router-link></el-checkbox>
		  </el-form-item>
		  <el-form-item>
			<el-button @click="resetForm('ruleForm')">取消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">提交认证</el-button>
		  </el-form-item>
		</el-form>
		
		<el-dialog :visible.sync="waitPop" :show-close="false" width="400px">
			<div class="dwdwe">
				<h6>企业认证信息已提交，请等待审核...</h6>
				<p>提交后一个工作日内完成审核</p>
				<el-button type="primary" @click="close()">关闭</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="diffCompany" width="400px">
			<div class="oggss">
				<h6>认证企业名称与注册企业名称不一致<br/>是否继续认证？</h6>
				<p><span>认证企业名称：</span>动态时序有限公司</p>
				<p><span>注册企业名称：</span>北京动态时序有限公司</p>
				<div class="kgubs">
					<el-button type="plain" @click="rewirte()">重新填写</el-button>
					<el-button type="primary" @click="gohead()">继续认证</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
  export default {
    data() {
      return {
	    dialogImageUrl: '',
	    dialogVisible: false,
        ruleForm: {
          orgName: '',
          usCreditCode: '',
          legal: '',
          address: '',
          department: '',
          scene: '',
          img: '',
		  checked: false,
		  expireTime: '2023-09-09',
		  paper: []
        },
		oldCompanyName: '',
		checked: false,
		waitPop: false,
		diffCompany: false,
		status: 1,
		num: 1,
		loading: false,
        rules: {
          orgName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
			{ min: 6, max: 50, message: '长度在6-50个汉字', trigger: 'blur' }
          ],
          usCreditCode: [
            { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
          ],
		  legal: [
		    { required: true, message: '请输入法定代表人', trigger: 'blur' }
		  ],
		  address: [
		    { required: true, message: '请输入联系地址', trigger: 'blur' }
		  ],
		  department: [
		    { required: true, message: '请输入所在部门', trigger: 'blur' },
			{ min: 1, max: 10, message: '所在部门请输入10个汉字以内', trigger: 'blur' }
		  ],
		  scene: [
		    { required: true, message: '请输入应用场景', trigger: 'blur' }
		  ],
		  expireTime: [
		    { required: true, message: '', trigger: '' }
		  ],
		  paper: [
		    { required: true, message: '', trigger: '' }
		  ]
        },
		if_upload: false,
		getCompany: false
      };
    },
	mounted() {
		this.getData()
		this.$store.commit('setCenterIndex',1)
		// this.ruleForm.paper = [
		// 	{name: 'result@2.png',url: 'https://tmp-test-bucket.obs.cn-north-4.myhuaweicloud.com/head1.jpeg'}
		// ]
	},
    methods: {
	  comBlur() {
		  if(this.ruleForm.orgName.length>5) {
			  this.loading = true
			  let params = {
				  userId: this.$cookies.getJSON('user').userId,
				  name	: this.ruleForm.orgName
			  }
			  // 8024
			  this.$axios.get('http://192.168.0.99:8020/user/org/base/info',params)
			  .then((res) =>{
				  if (res.state===200) {
					this.ruleForm.usCreditCode = res.data.usCreditCode
					this.ruleForm.legal = res.data.legal
					this.getCompany = true
				  } else {
					this.$message.error(res.message);
					this.getCompany = false
				  }
				  this.loading = false
			  })
			  .catch(err=>{
				  this.$message.error(err);
				  this.loading = false
			  })
		  }
		  
	  },
	  handleRemove(file, fileList) {
		console.log(file, fileList);
	  },
	  handlePictureFail(err, file, fileList) {
		this.$message.error(err);  
	  },
	  handlePictureCardPreview(file) {
	    console.log(file)
		this.dialogImageUrl = file.url;
		this.dialogVisible = true;
	  },
	  handlePictureSuccesss(file,fileList) {
		console.log(fileList);
		this.ruleForm.paper = fileList
	  },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
			  console.log(this.ruleForm.paper)
			  if (this.ruleForm.paper.length===0) {
				this.$message.error('请上传工商营业执照');
				return
			  }
			  if (!this.checked) {
				this.$message.error('请阅读并勾选下方协议');
				return
			  }
			  // if (this.oldCompanyName != this.ruleForm.orgName && ) {
				  
			  // }
			this.loading = true
           let params = {
			  userId: this.$cookies.getJSON('user').userId,
			  orgName: this.ruleForm.orgName,
			  usCreditCode: this.ruleForm.usCreditCode,
			  legal: this.ruleForm.legal,
			  address: this.ruleForm.address,
			  department: this.ruleForm.department,
			  scene: this.ruleForm.scene,
			  expireTime: this.ruleForm.expireTime,
			  businessLicense: 'www',
			  goCert: 1
			}
			// 8024
           this.$axios.post('http://192.168.0.99:8020/user/org/cert/submit',params)
			  .then((res) =>{
				  console.log(res)
				  if (res.state===200) {
					this.$message.success(res.message);
				  } else {
					  this.$message.error(res.message);
				  }
				  
				  this.loading = false
			  })
			  .catch(err=>{
				  this.$message.error(err);
				  this.loading = false
			  })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
	  close() {
		this.waitPop = false  
	  },
	  rewirte() {
		 this.diffCompany = false 
	  },
	  gohead() {
		  this.diffCompany = false
		  this.submitForm()
	  },
	  getData() {
		let params = {
			  userId: this.$cookies.getJSON('user').userId,
			  orderId: ''
		}
		// 8024
		this.$axios.get('http://192.168.0.99:8020/user/org/cert/info',params)
		  .then((res) =>{
			  console.log(res)
			  if (res.state===200) {
				
			  } else {
				this.$message.error(res.message);
			  }
			  this.ruleForm['paper'] = [
				  {name: 'result@2.png',url: res.data.businessLicense}
			  ]
			  this.status = res.data.state
			  this.ruleForm = res.data
			  this.oldCompanyName = res.data.orgName
		  })
		  .catch(err=>{
			  this.$message.error(err);
		  })  
	  }
    }
  }
</script>
<style lang="less" scoped>
	.ertghj {
		background-color: #fff;
		padding: 74px 333px 254px 20px;
		position: relative;
		.osie {
			position: absolute;
			top: 16px;
			font-size: 14px;
			background-color: #FFD8D6;
			border: 1px solid #FFD8D6;
			padding: 6px 16px;
			width: 916px;
			box-sizing: border-box;
			border-radius: 2px;
			color: #333333;
		}
		.yellow {
			background: #FFF7E9;
			border: 1px solid #FFEFD3;
		}
		.blue {
			background: #F2F7FF;
			border: 1px solid #D9EDFF;
		}
		.el-form-item {
			.dewde {
				color: #999999;
				font-size: 12px;
			}
			a {
				color: #1C66E5;
			}
			.el-button--primary {
				background-color: #1C66E5;
			}
		}
		.dwdwe {
			text-align: center;
			h6 {
				font-size: 16px;
				color: #333333;
				margin-bottom: 12px;
			}
			p {
				font-size: 14px;
				color: #666666;
				margin-bottom: 24px;
			}
			.el-button--primary {
				width: 80px;
			}
		}
		
		.oggss {
			text-align: center;
			h6 {
				font-size: 16px;
				margin-bottom: 16px;
			}
			p {
				margin-bottom: 4px;
				span {
					font-weight: 500;
				}
			}
			.kgubs {
				margin-top: 26px;
			}
		}
	}
</style>