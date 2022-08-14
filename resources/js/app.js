/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

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
Vue.component('navbar-l', require('./components/navbar_l.vue').default);
Vue.component('navbar-r', require('./components/navbar_r.vue').default);
Vue.component('infobar', require('./components/infobar.vue').default);
Vue.component('investment-portal', require('./components/investmentPortal.vue').default);
Vue.component('statistics', require('./components/statistics.vue').default);
Vue.component('referral', require('./components/referral.vue').default);
Vue.component('investment-calculator', require('./components/investmentCalculator.vue').default);
Vue.component('footer-block', require('./components/footerBlock.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// const app = new Vue({
//     el: '#app',
// });

var navbar_l = new Vue({
    data: {

    }
}).$mount('#navbar-l');
var navbar_r = new Vue({
    data: {

    }
}).$mount('#navbar-r');
var infobar = new Vue({
    data: {

    }
}).$mount('#infobar');
var investmentPortal = new Vue({
    data: {

    }
}).$mount('#investment-portal');

var statistics = new Vue({
    data: {

    }
}).$mount('#statistics');

var referral = new Vue({
    data: {

    }
}).$mount('#referral');

var investmentCalculator = new Vue({
    data: {

    }
}).$mount('#investment-calculator');

var footerBlock = new Vue({
    data: {

    }
}).$mount('#footer-block');