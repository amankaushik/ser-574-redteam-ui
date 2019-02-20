import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
/*import 'vuetify/src/stylus/main' // Ensure you are using stylus-loader*/

Vue.config.productionTip = false;
Vue.use(Vuetify, {iconfont: 'mdi'});
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
