
/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../core/utils/CST'
import {LIGHTS} from '../../mutations-types'
import api from '../../api/api'
import shortid from 'shortid'

module.exports =
{
    state: {
        lights: [],
        shadowGenerators: []
    },
    getters: {
        getLights: state => state.lights,
        getShadowGenerators: state => state.shadowGenerators
    },
    actions: {
        addLight(store, payload) {
            store.commit(LIGHTS.ADD, payload);
        },
        removeLight(store, payload) {
            store.commit(LIGHTS.REMOVE, payload);
        },
        addShadowGenerator(store, payload) {
            store.commit(LIGHTS.ADD_SHADOW_GENERATOR, payload)
        },
        removeShadowGenerator(store, payload) {
            store.commit(LIGHTS.REMOVE_SHADOW_GENERATOR, payload);
        }
    },
    mutations: {
        [LIGHTS.ADD_SHADOW_GENERATOR](state, payload) {

        },
        [LIGHTS.REMOVE_SHADOW_GENERATOR](state, payload) {

        },
        [LIGHTS.ADD](state, payload) {
            let light = api.lights.create(payload);
            light.id = shortid.generate();

            console.log(light)
        },
        [LIGHTS.REMOVE](state, payload) {

        }
    }
}
