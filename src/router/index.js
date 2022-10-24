import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import API from '@/views/api/index'
import moreAPI from '@/views/api/allApi'
import apiDetail from '@/views/api/apiDetail'
import charge from '@/views/charge/index'
import center from '@/views/center/index'
import login from '@/views/login/login'
import aboutUs from '@/views/aboutUs/aboutUs'
import contact from '@/views/contact/contact'
// import news from '@/views/news/news'
import apiTest from '@/views/apiTest/case'
import Center from '@/views/center/index'
import case1 from '@/views/center/caseChild/case1'
import case2 from '@/views/center/caseChild/case2'
import case3 from '@/views/center/caseChild/case3'
import case4 from '@/views/center/caseChild/case4'
import case5 from '@/views/center/caseChild/case5'
// import case1 from '@/views/apiTest/caseChild/case1'
// import caseDetail from '@/views/apiTest/caseChild/caseDetail'
// import case2 from '@/views/apiTest/caseChild/case2'
import newslist from '@/views/new/newslist'
import newslist1 from '@/views/new/newslist1'
import newinfos from '@/views/new/newinfos'
// import case3 from '@/views/apiTest/caseChild/case3'
// import case4 from '@/views/apiTest/caseChild/case4'
// import case5 from '@/views/apiTest/caseChild/case5'
// import case6 from '@/views/apiTest/caseChild/case6'

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
	  path: '/moreApi',
	  name: 'moreApi',
	  component: moreAPI
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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/about',
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/case',
      name: 'case',
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
		    component:case1,
		  },
		  {
		    path:'/center/case2',
		    component:case2,
		  },
		  {
		    path:'/center/case3',
		    component:case3,
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
      path:'/newslist1',
      name:newslist,
      component:newslist,
      children:[
        {
          path:'',
          name:newslist1,
          component:newslist1,
        },
        {
          path:'/newslist2',
          name:newslist1,
          component:newslist1
        },
        {
          path:'/newslist3',
          name:newslist1,
          component:newslist1
        },
        {
          path:'/newslist4',
          name:newslist1,
          component:newslist1
        },
        {
          path:'/newslist1/newinfos',
          name:newinfos,
          component:newinfos}
      ]
    }

  ]
})
