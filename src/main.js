import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faBoxOpen, faTrashAlt, faShoppingBag, faDoorOpen, faTimes, faGifts } from '@fortawesome/free-solid-svg-icons'; // 部分引入
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// Vue.use(VeeValidate);
axios.defaults.withCredentials = true;

library.add(faSpinner, faBoxOpen, faTrashAlt, faShoppingBag, faDoorOpen, faTimes, faGifts)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter); // 名稱: 前面是自訂 後面是import

import './vee-validate';


router.beforeEach((to, from, next) => {
	console.log('beforeEach',to.meta.requiresAuth)
	if (to.meta.requiresAuth) {
		const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
		axios.post(api).then((response) => {
			console.log(response.data);
			if (response.data.success) {
				next();
			} else {
				next({
					path: '/login',
				})
			}
		})
	} else {
		next();
	}
})

new Vue({
	// i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
