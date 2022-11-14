<template>
    <div class="more-api">
        <div class="more-api-box">
			<!--banner -->
			<ul class="list">
			    <li  v-for="(item,index) in caselist" @click="listChange(index)" >
			        <router-link :to="item.url" v-bind:class="{'active': $store.state.centerIndex==index}" exact>
			            <div class="box">
							<div class="wdwdl">
								<img :src="$store.state.centerIndex==index?item.acIcon:item.icon"/>
								<p>{{item.name}}</p>
							</div>
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
	name: 'center',
    data(){
        return{
            shows:0,
            caselist:[
                {
                    name:"控制台",
                    url:"/center/case1",
					icon: require('../../assets/leftAside/777.png'),
					acIcon: require('../../assets/leftAside/777_.png')
                },
                {
                    name:"企业认证",
                    url:"/center/case2",
					icon: require('../../assets/leftAside/777.png'),
					acIcon: require('../../assets/leftAside/777_.png')
                },
                {
                    name:"我的接口",
                    url:"/center/case3",
					icon: require('../../assets/leftAside/fff.png'),
					acIcon: require('../../assets/leftAside/fff_.png')
                },
                {
                    name:"接口账单",
                    url:"/center/case4",
					icon: require('../../assets/leftAside/777.png'),
					acIcon: require('../../assets/leftAside/777_.png')
                },
                {
                    name:"我的订单",
                    url:"/center/case5",
					icon: require('../../assets/leftAside/eee.png'),
					acIcon: require('../../assets/leftAside/eee_.png')
                }
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
		// this.shows = this.$route.query.id || 0
		// console.log(this.$store.state.centerIndex)
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
				margin-top: 20px;
				li {
					background-color: #fff;
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
				margin-top: 20px;
			}
		}
	}
</style>