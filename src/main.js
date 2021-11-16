import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/components/base';
import '@/assets/svg-icons';
import '@/assets/scss/_index.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
