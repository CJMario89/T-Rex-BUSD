/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import { VueDapp } from "vue-dapp";


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// const app = new Vue({
//     el: '#app',
// });

Vue.createApp({
    components: {
        'navbar-l': require('./components/navbar_l.vue').default
    }
}).mount('#navbar-l');
const navbar_r = Vue.createApp({
    components: {
        'navbar-r': require('./components/navbar_r.vue').default
    }
});
navbar_r.use(VueDapp);
navbar_r.mount('#navbar-r');
Vue.createApp({
    components: {
        'infobar': require('./components/infobar.vue').default
    }
}).mount('#infobar');
Vue.createApp({
    components: {
        'investment-portal': require('./components/investmentPortal.vue').default
    }
}).mount('#investment-portal');

Vue.createApp({
    components: {
        'statistics': require('./components/statistics.vue').default
    }
}).mount('#statistics');

Vue.createApp({
    components: {
        'referral': require('./components/referral.vue').default
    }
}).mount('#referral');

Vue.createApp({
    components: {
        'investment-calculator': require('./components/investmentCalculator.vue').default
    }
}).mount('#investment-calculator');

Vue.createApp({
    components: {
        'footer-block': require('./components/footerBlock.vue').default
    }
}).mount('#footer-block');