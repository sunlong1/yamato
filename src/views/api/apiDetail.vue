<template>
    <div class="more-api">
        <div class="more-api-box">
			<!--banner -->
			<ul class="list">
			    <li v-for="(item,index) in caselist" @click="listChange(index)" v-bind:class="{'active': shows==index}">
			        <div class="wdwdl">
			        	<img :src="shows==index?item.acIcon:item.icon"/>
			        	<p>{{item.name}}</p>
			        </div>
			        <span>(88)</span>
			    </li>
			</ul>
			<div class="router_box">
			    <div class="tyhj">
			    	<div class="rtgh">
			    		<img src="../../assets/index&api/hongxin.png"/>
			    	</div>
			    	<div class="ijhb">
			    		<h6>工商照面信息</h6>
			    		<p class="tyhn">企业工商照面及相关信息，包括统一社会信用代码、注册资本、经营范围、企业法定代表人、经营范围、企业法定代表人、企...</p>
			    		<div class="gtrr">
			    			<div class="vffd">
			    				<p>接口ID：<span class="wdwe">1003</span></p>
			    				<p>价格：<span class="gddss">￥0.5/次</span></p>
			    			</div>
			    			<div class="fdds">申请接口</div>
			    		</div>
			    	</div>
			    </div>
				
			</div>
		</div>
    </div>
</template>
<script>
export default {
	name: 'apiDetail',
    data(){
        return{
            shows:0,
            caselist:[
                {
                    name:"接口列表",
                    url:"/moreApi/case1",
					icon: require('../../assets/leftAside/111_.png'),
					acIcon: require('../../assets/leftAside/111.png')
                },
                {
                    name:"工商信息",
                    url:"/moreApi/case2",
					icon: require('../../assets/leftAside/ddd_.png'),
					acIcon: require('../../assets/leftAside/ddd.png')
                },
                {
                    name:"司法风险",
                    url:"/moreApi/case3",
					icon: require('../../assets/leftAside/ddd_.png'),
					acIcon: require('../../assets/leftAside/ddd.png')
                },
                {
                    name:"经营风险",
                    url:"/moreApi/case4",
					icon: require('../../assets/leftAside/555_.png'),
					acIcon: require('../../assets/leftAside/555.png')
                },
                {
                    name:"知识产权",
                    url:"/moreApi/case5",
					icon: require('../../assets/leftAside/bbb_.png'),
					acIcon: require('../../assets/leftAside/bbb.png')
                },
                {
                    name:"税务相关",
                    url:"/moreApi/case6",
					icon: require('../../assets/leftAside/ccc_.png'),
					acIcon: require('../../assets/leftAside/ccc.png')
                },
				{
				    name:"经营状况",
				    url:"/moreApi/case7",
					icon: require('../../assets/leftAside/666_.png'),
					acIcon: require('../../assets/leftAside/666.png')
				},
				{
				    name:"工商信息附属信息",
				    url:"/moreApi/case8",
					icon: require('../../assets/leftAside/222_.png'),
					acIcon: require('../../assets/leftAside/222.png')
				},
            ]
        }
    },
    methods:{
		listChange(index) {
			console.log(index)
			this.shows = index
		}
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
	.more-api {
		background: #F6F8FE;
		padding-bottom: 55px;
		.more-api-box {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.list {
				width: 224px;
				background-color: #fff;
				margin-top: 20px;
				li {
					padding: 14px 20px;
					border-bottom: 1px solid #F3F3F3;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #333;
					.wdwdl {
					  display: flex;
					  align-items: center;
					  img {
						width: 13px;
						padding-right: 8px;
					  }
					  p {
						font-size: 14px;
					  }
					}
				}
				.active {
				  color: #1C66E5;
				}
			}
			.router_box {
				width: 956px;
				min-height: 100%;
				background-color: #fff;
				margin-top: 20px;
				.tyhj {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 16px;
					border-bottom: 1px solid #EEEEEE;
					.rtgh {
						width: 110px;
						height: 110px;
						background: linear-gradient(319.68deg, #E3EDFF 6.07%, #F5F9FF 92.78%);
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 20px;
						img {
							width: 42px;
							height: 48px;
						}
					}
					.ijhb {
						h6 {
						  font-size: 18px;
						  margin-bottom: 4px;
						}
						.tyhn {
						  font-size: 14px;
						  color: #666666;
						  margin-bottom: 8px;
						}
						.gtrr {
							display: flex;
							align-items: center;
							justify-content: space-between;
							.vffd {
								p {
									font-size: 14px;
									.wdwe {
										color: #666666;
									}
									.gddss {
										color: #FF4340;
									}
								}
							}
							
							.fdds {
								width: 116px;
								height: 36px;
								line-height: 36px;
								text-align: center;
								font-size: 14px;
								color: #fff;
								background-color: #1C66E5;
								margin-top: 8px;
							}
						}
					}
				}
			}
		}
	}
</style>