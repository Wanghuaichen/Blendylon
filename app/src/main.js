import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

import Input from './core/directives/input';
import Window from './core/directives/window';
import UiDragHandler from './core/directives/ui-drag-handler';

Vue.use(Vuex);
new Vue({
    el: '#app',
    store: store,
    render: x => x(require('./modules/app/App.vue'))
});
