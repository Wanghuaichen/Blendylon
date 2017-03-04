/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../core/utils/CST'
import {CORE} from '../../mutations-types'

const Store =
{
    state: {
        canvas: {},
        engine: {},
        currentState: CST.STATES.EDITOR.ALWAYS,
        options: {
            viewport: {
                showOptions: false,
                showTools: false
            }
        }
    },
    getters: {
        isViewportOptionsVisible: state => state.options.viewport.showOptions,
        isViewportToolsVisible: state => state.options.viewport.showTools,
        getEditorState: state => state.currentState,
        getCanvas: state => state.canvas,
        getEngine: state => state.engine
    },
    actions: {
        initCore(store, payload) {
            store.commit(CORE.INITIALIZE, payload);
        },
        setCurrentState(store, payload) {
            store.commit(CORE.SET_STATE, payload);
        },
        toggleViewportOptions(store, payload) {
            store.commit(CORE.TOGGLE_VIEWPORT_OPTIONS, payload)
        },
        toggleViewportTools(store, payload) {
            store.commit(CORE.TOGGLE_VIEWPORT_TOOLS, payload)
        }
    },
    mutations: {
        [CORE.SET_STATE](state, payload) {
            state.currentState = payload.state;
        },
        [CORE.TOGGLE_VIEWPORT_OPTIONS](state, payload) {
            if(state.currentState == CST.STATES.VIEWPORT.HOVER)
                state.options.viewport.showOptions = state.options.viewport.showOptions != true;
        },
        [CORE.TOGGLE_VIEWPORT_TOOLS](state, payload) {
            if(state.currentState == CST.STATES.VIEWPORT.HOVER)
                state.options.viewport.showTools = state.options.viewport.showTools != true;
        },
        [CORE.INITIALIZE](state, payload) {
            state.canvas = payload.canvas
            state.engine = new BABYLON.Engine(
                payload.canvas,
                payload.antialiased || false
            );
        }
    }
}

module.exports = Store;
