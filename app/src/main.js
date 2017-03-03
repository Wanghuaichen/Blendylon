import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

import Input from './directives/input';
import Window from './directives/window';
import UiDragHandler from './directives/ui-drag-handler';

Vue.use(Vuex);
new Vue({
    el: '#app',
    store: store,
    render: x => x(require('./modules/app/App.vue'))
});
