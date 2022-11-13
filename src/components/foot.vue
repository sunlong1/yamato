<template>
    <div class="efrew">
        <div class="ijsjs">
			<div class="vrth">
				<ul>
					<li>数据来源</li>
					<li>全国企业信用信息公示系统</li>
					<li>中国执行信息公开网</li>
					<li>中国裁判文书网</li>
					<li>中国土地市场网</li>
					<li>中国货币网</li>
					<li>中国法院网</li>
					<li>中国商标网</li>
				</ul>
				<ul>
					<li>关于我们</li>
					<li><router-link to="/aboutUs/case1">关于我们</router-link></li>
					<li>用户协议</li>
					<li>隐私政策</li>
					<li>认证服务协议</li>
				</ul>
				<ul>
					<li>联系我们</li>
					<li>联系电话：400-608-0000</li>
					<li>工作时间：工作日 8：30 - 20：00</li>
					<li>电子邮箱：bd@tianyancha.com</li>
					<li>公司地址：北京市海淀区知春路中国微信<br/>通讯大厦</li>
				</ul>
			</div>
		</div>
		<div class="cttt">
			版权所有：北京动态时序有限公司 ©2020 京ICP备18062903号-1
		</div>
    </div>
</template>
<script>
export default {
    name:'foot',
    data(){
        return {
            wximg:'',
            beian_num:''
        }
    },
    methods:{
       
    },
    mounted(){
        // this.getwximg()
    }
}
</script>
<style lang="less" scoped>
.efrew{
	color: #fff;
    .ijsjs {
		background: #2E323E;
		padding: 24px 0;
		.vrth {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			ul {
				li {
					font-size: 14px;
					line-height: 26px;
					opacity: 0.8;
					cursor: pointer;
					&:first-child {
						font-size: 16px;
						color: #EEEEEE;
						padding-bottom: 4px;
						opacity: 1;
					}
					&:hover {
						opacity: 1;
					}
					a {
						color: #fff;
						opacity: 0.8;
						&:hover {
							opacity: 1;
						}
					}
				}
			}
		}
	}
	.cttt {
		background: #1F222B;
		text-align: center;
		font-size: 12px;
		height: 44px;
		line-height: 44px;
	}
}
</style>