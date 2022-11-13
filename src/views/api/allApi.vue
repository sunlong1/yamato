<template>
    <div class="bhusoso">
		<div class="vhuss">
			<img class="jiaobiao" src="../../assets/common/jiaobiao.png"/>
			<el-carousel :loop='true' :interval='4000' trigger="click" height="150px">
			  <el-carousel-item v-for="(item,index) in Math.ceil(arr3.length/5)" :key="index">
				<ul class="vghss">
					<li v-for="(demo,id) in arr3.slice(index*5,index*5+5)">
						<div class="rfgns">
							<img src="../../assets/index&api/hongxin.png"/>
							<p>{{demo.name}}</p>
						</div>
						<p class="sjddd">{{demo.descr}}</p>
						<div class="vguu" @click="goDetail(demo.dimId,demo.id)">查看详情</div>
					</li>
				</ul>
				</el-carousel-item>
			</el-carousel>
		</div>
		
        <div class="more-api-box">
			<!--banner -->
			<ul class="list">
			    <li v-for="(item,index) in caselist" @click="listChange(item.id,item.name,item.num)" v-bind:class="{'active': shows==item.id}">
			        <div class="wdwdl">
						<!--  shows==item.id?item.acIcon:item.icon -->
			        	<img :src="item.picture"/>
			        	<p>{{item.name}}</p>
			        </div>
			        <span>({{item.num}})</span>
			    </li>
			</ul>
			<div class="router_box">
			    <h4>{{$route.query.source==='search'?`搜索结果（${arr2.length}）`:`${name} (${total})`}} </h4>
				<ul v-if="arr2.length>0">
					<li v-for="item in arr2">
						<div class="rtgh">
							<img src="../../assets/index&api/hongxin.png"/>
						</div>
						<div class="ijhb">
							<h6>{{item.name}}</h6>
							<p class="tyhn">{{item.descr}}</p>
							<div class="gtrr">
								<div class="vffd">
									<p>接口ID：<span class="wdwe">{{item.showId}}</span></p>
									<p>价格：<span class="gddss">￥{{item.price}}</span></p>
								</div>
								<div class="fdds" @click="goDetail(shows,item.id)">申请接口</div>
							</div>
						</div>
					</li>
				</ul>
				
				<div class="wdwds" v-else>
					<img src="../../assets/kong/kong_.png"/>
					<p>暂无搜索结果</p>
				</div>
				
				<div v-if="pages>10" class="erfr">
					<el-pagination
						background	
						:current-page="currentPage"
					    layout="prev, pager, next"
						@current-change="handleCurrentChange"
					    :total="pages">
					  </el-pagination>
				</div>
			</div>
			
		</div>
    </div>
</template>
<script>
export default {
	name: 'allApi',
    data(){
        return{
            shows:0,
			name: '',
			total: 0,
            caselist:[],
			arr2: [],
			arr3: [],
			pages: 1,
			currentPage: 1
        }
    },
    methods:{
		listChange(id,name,num) {
			this.shows = id
			this.name = name
			this.total = num
			this.$route.query.source = 'list'
			this.getRight('',1)
		},
		goDetail(dimId,index) {
			this.$router.push(`/apiDetail?dimId=${dimId}&id=${index}`)
		},
		handleCurrentChange(val) {
			console.log(val)
			this.getRight('',val)
		},
		getRight(name,page) {
			console.log(name,page)
			this.currentPage = page
			let params = {
				  dimId: this.shows,
				  name: name,
				  pageNum: page
			  }
			this.$axios.get(`http://192.168.0.99:8027/portal/api/interface`,params)
			  .then((res) =>{
				  console.log(res)
				  if (res.state===200) {
					
				  } else {
					this.$message.error(res.message);
				  }
				  try{
				  	this.arr2 = res.data.item.records[0].intfList
				  }catch(e){
				  	console.log(e)
				  }
				  this.pages = res.data.item.total
			  })
			  .catch(err=>{
				  this.$message.error(err);
			  })
		},
		getLeft:function(){
			this.$axios.get(`http://192.168.0.99:8027/portal/api/interface/dim`)
			  .then((res) =>{
				  if (res.state===200) {
					
				  } else {
					this.$message.error(res.message);
				  }
				  this.caselist = res.data.items
				  // this.shows = this.caselist[0].id
				  // this.getRight(this.caselist[0].name,1)
				  if (!this.$route.query.source) {
					  this.listChange(this.caselist[0].id,this.caselist[0].name,this.caselist[0].num)
				  }
			  })
			  .catch(err=>{
				  this.$message.error(err);
			  })
		},
		getTop:function() {
			this.$axios.get(`http://192.168.0.99:8027/portal/api/interface/refer`)
			  .then((res) =>{
				  console.log(res)
				  if (res.state===200) {
					
				  } else {
					this.$message.error(res.message);
				  }
				  this.arr3 = res.data
				  // this.shows = this.caselist[0].id
				  // this.getRight(this.caselist[0].name,1)
				  // this.listChange(this.caselist[0].id,this.caselist[0].name,this.caselist[0].num)
			  })
			  .catch(err=>{
				  this.$message.error(err);
			  })
		}
    },
    mounted(){
		console.log(this.$route.query.source)
		this.getLeft()
		this.getTop()
		if (this.$route.query.source==='search') {
			this.shows = ''
			console.log(this.$route.query.search)
			this.getRight(this.$route.query.search,1)
		}
    }
}
</script>
<style lang="less" scoped>
	.bhusoso {
		background: #F6F8FE;
		padding-bottom: 55px;
		.vhuss {
			width: 1200px;
			margin: 80px auto 0 auto;
			box-sizing: border-box;
			padding: 20px 20px 0;
			background-color: #fff;
			position: relative;
			box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
			.jiaobiao {
				position: absolute;
				right: 0;
				top: 0;
				width: 50px;
				height: 50px;
			}
			.vghss {
				display: flex;
				li {
					width: 20%;
					padding-right: 30px;
					box-sizing: border-box;
					.rfgns {
						display: flex;
						align-items: center;
						margin-bottom: 12px;
						img {
							width: 18px;
							height: 20px;
							padding: 6px;
							background: linear-gradient(319.68deg, #E3EDFF 6.07%, #F5F9FF 92.78%);
							border-radius: 2px;
							margin-right: 8px;
						}
						p {
							color: #333333;
							font-size: 14px;
							font-weight: bold;
						}
					}
					.sjddd {
						font-size: 12px;
						color: #666666;
						line-height: 18px;
						height: 54px;
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:3; 
					}
					.vguu {
						width: 88px;
						height: 28px;
						font-size: 12px;
						line-height: 28px;
						text-align: center;
						background-color: #1C66E5;
						color: #fff;
						border-radius: 2px;
						margin-top: 12px;
						cursor: pointer;
					}
				}
			}
		}
		.more-api-box {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.list {
				width: 224px;
				margin-top: 20px;
				height: 425px;
				li {
					background-color: #fff;
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
				h4 {
					height: 49px;
					line-height: 49px;
					font-size: 16px;
					padding-left: 20px;
					border-bottom: 1px solid #EEEEEE;
				}
				ul {
					li {
						display: flex;
						align-items: center;
						// justify-content: space-between;
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
							width: 806px;
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
								width: 100%;
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
			
				.erfr {
					padding: 16px 0 20px;
					display: flex;
					justify-content: end;
				}
			}
		
		}
	}
</style>