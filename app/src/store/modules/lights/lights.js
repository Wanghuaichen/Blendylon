
/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import {LIGHTS} from '../../mutations-types'
import api from '../../api/api'

module.exports =
{
    state: {
        lights: [],
    },
    getters: {
        lights: state => state.lights
    },
    actions: {
        addLight(store, payload) {
            store.commit(LIGHTS.ADD, payload);
        }
    },
    mutations: {
        [LIGHTS.ADD](state, payload) {
            api.lights.create()
        }
    }
}
