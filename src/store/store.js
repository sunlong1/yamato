
import Vue from 'vue'
import vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(vuex);
export default new vuex.Store({
	state: {
		token: Cookies.get('token'),  //存到localStorage中一样m
		// indexspan:localStorage.getItem('indexspan') || 0,
		centerIndex: 1,
		aboutIndex: 1,
		showLogin: 0
	},
	mutations: {
		setToken(state,value){
		  Cookies.set('token', value, { expires: 7 })
		  state.token=value
		},
		setCenterIndex(state,value) {
			state.centerIndex=value
		},
		setAboutIndex(state,value) {
			state.aboutIndex=value
		},
		setShowLogin(state,value) {
			state.showLogin=value
		}
	}
})

