<template>
  <div class="ask-box">
    <div class="obhh">
    	<p>套餐类型：</p>
    	<el-select @change="typeChange('second')" v-model="filters01" placeholder="请选择">
    		<el-option
    		  v-for="item in options01"
    		  :key="item.value"
    		  :label="item.label"
    		  :value="item.value">
    		</el-option>
    	</el-select>
    	<p>关联密钥：</p>
    	<el-select v-model="filters02" @change="scretChange" placeholder="请选择">
    		<el-option
    		  v-for="item in options02"
    		  :key="item.value"
    		  :label="item.label"
    		  :value="item.value">
    		</el-option>
    	</el-select>
    	<span v-if="scretLabel">{{ifSee?scretLabel:'*****************************'}}</span>
    	<img v-if="scretLabel" @click="ifSee=!ifSee" :src="ifSee?img1:img2"/>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'secret',
    props: ['eidPop'],
	data() {
		return {
			options01: [{
			  value: 1,
			  label: '按次计费'
			}, {
			  value: 2,
			  label: '按天计费'
			}, {
			  value: 3,
			  label: '按年计费'
			}],
			img1: require('../assets/common/ddd.png'),
			img2: require('../assets/common/ddd_.png'),
			options02: [],
			filters01: 1,
			filters02: '',
			orderId: '',
			scretLabel: '',
			ifSee: true
		}
	},
    methods: {
      go_later () {
        this.$emit("childMsg", false);
      },
	  solveArr(arr,time) {
	  	let arro= []
	  	arr.forEach(item=>{
	  		let obj = {}
	  		obj['value'] = item.orderId
	  		obj['label'] = item.secret
	  		arro.push(obj)
	  	})
	  	
	  	this.options02 = arro
	  	// 添加
	  	if(arro.length>0 && time==='first') {
	  		this.filters02 = arro[0].value
	  		this.orderId = arro[0].value
	  		this.scretLabel =  arro[0].label
	  	}
	  	// this.getCase()
		this.$emit("orderId", this.orderId);
	  },
      typeChange(time) {
      	// this.filters01 = ''
      	this.filters02 = ''
      	this.scretLabel = ''
      	this.options02=[]
      	this.orderId = ''
      	let params = {
      		  userId: this.$cookies.getJSON('user').userId,
      		  billingMode: this.filters01
      	  }
      	this.$axios.get('http://192.168.0.99:8023/order/secret',params)
      	  .then((res) =>{
      		  console.log(res)
      		  if (res.state===200) {
      			
      		  } else {
      			this.$message.error(res.message);
      		  }
      		  this.solveArr(res.data,time)
      	  })
      	  .catch(err=>{
      		  this.$message.error(err);
      	  })
      },
	  scretChange(val) {
	  	this.options02.forEach(item=>{
	  		console.log(item.value == val)
	  		console.log(item.value)
	  		console.log(val)
	  		if (item.value === val) {
	  			this.scretLabel = item.label
	  		}
	  		this.orderId = val
	  	})
	  	// console.log(val,label)
	  	// this.orderId = val
	  	// this.getCase()
		this.$emit("orderId", this.orderId);
	  }
    },
	mounted() {
		this.typeChange('first')
	}
  }
</script>

<style lang="less" scoped>
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
</style>
