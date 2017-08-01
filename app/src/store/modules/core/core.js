/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../core/utils/CST'
import {CORE} from '../../mutations-types'

const Store = {
    state     : {
        canvas       : {},
        engine       : {},
        currentState : CST.STATES.EDITOR.ALWAYS,
        options      : {
            viewport  : {
                showOptions : false,
                showTools   : false
            },
            rendering : {
                frameRange : {
                    start : 0,
                    end   : 600
                },
                resolution : new BABYLON.Vector2(1920, 1080)
            }
        }
    },
    getters   : {
        isViewportOptionsVisible : state => state.options.viewport.showOptions,
        isViewportToolsVisible   : state => state.options.viewport.showTools,
        getEditorState           : state => state.currentState,
        getCoreOptions           : state => state.options,
        getCanvas                : state => state.canvas,
        getEngine                : state => state.engine
    },
    actions   : {
        initCore(store, payload) {
            store.commit(CORE.INITIALIZE, payload);
        },
        setCurrentState(store, payload) {
            store.commit(CORE.SET_STATE, payload);
        },
        setRenderingResolutionX(store, payload) {
            store.commit(CORE.SET_RENDERING_RESOLUTION_X, payload);
        },
        setRenderingResolutionY(store, payload) {
            store.commit(CORE.SET_RENDERING_RESOLUTION_Y, payload);
        },
        setRenderingFrameRangeStart(store, payload) {
            store.commit(CORE.SET_RENDERING_FRAME_RANGE_START, payload);
        },
        setRenderingFrameRangeEnd(store, payload) {
            store.commit(CORE.SET_RENDERING_FRAME_RANGE_END, payload);
        },
        toggleViewportOptions(store, payload) {
            store.commit(CORE.TOGGLE_VIEWPORT_OPTIONS, payload)
        },
        toggleViewportTools(store, payload) {
            store.commit(CORE.TOGGLE_VIEWPORT_TOOLS, payload)
        }
    },
    mutations : {
        [CORE.SET_STATE](state, payload) {
            state.currentState = payload.state;
        },
        [CORE.SET_RENDERING_RESOLUTION_X](state, payload) {
            state.options.rendering.resolution.x = payload.x
        },
        [CORE.SET_RENDERING_RESOLUTION_Y](state, payload) {
            state.options.rendering.resolution.y = payload.y
        },
        [CORE.SET_RENDERING_FRAME_RANGE_START](state, payload) {
            state.options.rendering.frameRange.start = payload.start
        },
        [CORE.SET_RENDERING_FRAME_RANGE_END](state, payload) {
            state.options.rendering.frameRange.end = payload.end
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
