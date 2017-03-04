/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Utility from '../core/utils/Utility'
import HistoryPlugin from './plugins/history'
Vue.use(Vuex);

let modules = {}
require('json-loader!./modules.json').forEach(module => {
    let name = Utility.capitalize(module);
    modules[name] = require('./modules/' + module + '/' + module);
})

export default new Vuex.Store({
    modules: modules,
    plugins: [HistoryPlugin()],
    strict: false
});
