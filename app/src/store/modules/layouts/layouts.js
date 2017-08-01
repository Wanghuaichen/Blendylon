/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import {LAYOUTS} from '../../mutations-types'


const Store =
{
    state: {
        layouts: [],
        current: 0
    },
    getters: {
        getLayouts: state => state.layouts,
        getCurrentLayout: state => state.layouts[state.current]
    },
    actions: {
        addLayout(store, payload) {
            store.commit(LAYOUTS.ADD, payload);
        },
        addLayoutPanel(store, payload) {
            store.commit(LAYOUTS.ADD_PANEL, payload);
        }
    },
    mutations: {
        [LAYOUTS.ADD](state, payload) {
            state.layouts.push(payload);
        },
        [LAYOUTS.ADD_PANEL](state, payload) {
            state.layouts.push(payload);
        }
    }
}

const getLastIndex = () => {
    let length = Store.state.layouts.length - 1;
    if(length >= 0) return length;
    else return 0
}

const getSceneIndex = (id) => {
    return Store.state.scenes.findIndex(scene => scene.id == id);
};

module.exports = Store;
