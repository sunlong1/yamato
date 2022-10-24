<template>
    <div class="more-api">
        <div class="more-api-box">
			<!--banner -->
			<ul class="list">
			    <li  v-for="item in caselist" >
			        <router-link :to="item.url+'?name='+item.name"active-class="active" exact>
			            <div class="box">
							<div class="wdwdl">
								<img :src="item.icon"/>
								<p>{{item.name}}</p>
							</div>
							<span>(88)</span>
			            </div>
			        </router-link>
			    </li>
			</ul>
			<div class="router_box">
			    <router-view ></router-view>
			</div>
		</div>
    </div>
</template>
<script>
export default {
	name: 'moreApi',
    data(){
        return{
            shows:1,
            caselist:[
                {
                    name:"接口列表",
                    url:"/moreApi/case1",
					icon: require('../../assets/leftAside/111_.png')
                },
                {
                    name:"工商信息",
                    url:"/moreApi/case2",
					icon: require('../../assets/leftAside/111_.png')
                },
                {
                    name:"司法风险",
                    url:"/moreApi/case3",
					icon: require('../../assets/leftAside/111_.png')
                },
                {
                    name:"经营风险",
                    url:"/moreApi/case4",
					icon: require('../../assets/leftAside/111_.png')
                },
                {
                    name:"知识产权",
                    url:"/moreApi/case5",
					icon: require('../../assets/leftAside/111_.png')
                },
                {
                    name:"税务相关",
                    url:"/moreApi/case6",
					icon: require('../../assets/leftAside/111_.png')
                },
				{
				    name:"经营状况",
				    url:"/moreApi/case7",
					icon: require('../../assets/leftAside/111_.png')
				},
				{
				    name:"工商信息附属信息",
				    url:"/moreApi/case8",
					icon: require('../../assets/leftAside/111_.png')
				},
            ]
        }
    },
    methods:{

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
					.box {
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
						.box {
							color: #1C66E5;
						}
					}
				}
			}
			.router_box {
				width: 956px;
				min-height: 100%;
				background-color: #fff;
				margin-top: 20px;
			}
		}
	}
</style>