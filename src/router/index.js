import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import API from '@/views/api/index'
import allAPI from '@/views/api/allApi'
import apiDetail from '@/views/api/apiDetail'
import charge from '@/views/charge/index'
import center from '@/views/center/index'
import apiTest from '@/views/apiTest/index'
import Center from '@/views/center/index'
import case1 from '@/views/center/caseChild/case1'
import case2 from '@/views/center/caseChild/case2'
import case3 from '@/views/center/caseChild/case3'
import case4 from '@/views/center/caseChild/case4'
import case5 from '@/views/center/caseChild/case5'
import AboutUs from '@/views/aboutUs/index'
import item1 from '@/views/aboutUs/caseChild/case1'
import item2 from '@/views/aboutUs/caseChild/case2'
import item3 from '@/views/aboutUs/caseChild/case3'
import item4 from '@/views/aboutUs/caseChild/case4'
// import Test from '@/components/index'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  linkExactActiveClass:'active',
  // 跳转返回顶部
  scrollBehavior(to,from,saveTop){
    if(saveTop){
      return saveTop;
    }else{
      return {x:0,y:0}
    }
  },
  routes: [
	// {
	//   path: '/',
	//   name: 'test',
	//   component: Test
	// },
    {
      path: '/',
      name: 'index',
      component: index
    },
	{
	  path: '/api',
	  name: 'api',
	  component: API
	},
	{
	  path: '/allApi',
	  name: 'allApi',
	  component: allAPI
	},
	{
	  path: '/apiDetail',
	  name: 'apiDetail',
	  component: apiDetail
	},
	{
	  path: '/charge',
	  name: 'charge',
	  component: charge
	},
	{
	  path: '/center',
	  name: 'center',
	  component: center
	},
    {
      path: '/apiTest',
      name: 'apiTest',
      component: apiTest
    },
	{
		path: '/center',
		name: 'center',
		component: Center,
		redirect: '/center/case1',
		children:[
		  {
		    path:'/center/case1',
		    component:case1
		  },
		  {
		    path:'/center/case2',
		    component:case2,
		  },
		  {
		    path:'/center/case3',
		    component:case3,
			name: 'myApi'
		  },
		  {
		    path:'/center/case4',
		    component:case4,
		  },
		  {
		    path:'/center/case5',
		    component:case5,
		  }
		]
	},
	{
		path: '/aboutUs',
		name: 'aboutUs',
		component: AboutUs,
		redirect: '/aboutUs/case1',
		children:[
		  {
		    path:'/aboutUs/case1',
		    component:item1,
		  },
		  {
		    path:'/aboutUs/case2',
		    component:item2,
		  },
		  {
		    path:'/aboutUs/case3',
		    component:item3,
		  },
		  {
		    path:'/aboutUs/case4',
		    component:item4,
		  }
		]
	}

  ]
})
