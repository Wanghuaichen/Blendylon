/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue'
import {CURSORS} from '../../mutations-types';

const Store =
{
    state: {
        cursors  : [],
        current  : 0,
        defaults :
        {
            radius     : 10,
            size       : 40,
            ratio      : 0.04,
            groupId    : 2,
            fogEnabled : false
        }
    },
    getters: {
        getCurrentCursor           : state => state.cursors[state.current].instance,
        getCurrentCursorDefaults   : state => state.defaults,
        getCurrentCursorPosition   : state => state.cursors[state.current].instance.position,
        getCurrentCursorVisibility : state => state.cursors[state.current].visible,
        getCurrentCursorManager    : state => state.cursors[state.current].instance.manager
    },
    actions: {
        createCursor(store, payload) {
            store.commit(CURSORS.CREATE, payload);
            store.commit(CURSORS.RESIZE, payload);
        },
        deleteCursor(store, payload) {
            store.commit(CURSORS.DELETE, payload);
        },
        resetCursorPosition(store, payload) {
            store.commit(CURSORS.RESET_POSITION, payload);
            store.commit(CURSORS.RESIZE, payload);
        },
        setCursorPosition(store, payload) {
            store.commit(CURSORS.POSITION, payload);
            store.commit(CURSORS.RESIZE, payload);
        },
        setCursorPositionX(store, payload) {
            store.commit(CURSORS.POSITION_X, payload);
            store.commit(CURSORS.RESIZE, payload);
        },
        setCursorPositionY(store, payload) {
            store.commit(CURSORS.POSITION_Y, payload);
            store.commit(CURSORS.RESIZE, payload);
        },
        setCursorPositionZ(store, payload) {
            store.commit(CURSORS.POSITION_Z, payload);
            store.commit(CURSORS.RESIZE, payload);
        },
        resizeCursor(store, payload) {
            store.commit(CURSORS.RESIZE, payload);
        },
        showCursor(store, sceneId) {
            store.commit(CURSORS.SHOW, sceneId);
        },
        hideCursor(store, sceneId) {
            store.commit(CURSORS.HIDE, sceneId);
        }
    },
    mutations: {
        [CURSORS.SWITCH](state, sceneId) {
            let index = getCursorIndex(sceneId);
            if(index >= 0)
                state.current = index;
        },
        [CURSORS.CREATE](state, payload)
        {
            let
            name    = 'Cursor_' + payload.scene.id,
            manager = new BABYLON.SpriteManager(
                'manager_'+name,
                './app/src/assets/img/cursor.png',
                1,
                state.defaults.size,
                payload.scene
            );

            manager.renderingGroupId = state.defaults.groupId;
            manager.fogEnabled = state.defaults.fogEnabled;

            state.cursors.push({
                sceneId  : payload.scene.id,
                visible  : true,
                instance : new BABYLON.Sprite(name, manager),
                manager  : manager
            });
        },
        [CURSORS.RESET_POSITION](state, payload) {
            let index = getCursorIndex(payload.sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.instance.position = new BABYLON.Vector3.Zero();
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.POSITION](state, payload) {
            let index = getCursorIndex(payload.sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.instance.position = payload.position.clone();
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.POSITION_X](state, payload) {
            let index = getCursorIndex(payload.sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.instance.position.x = payload.x;
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.POSITION_Y](state, payload) {
            let index = getCursorIndex(payload.sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.instance.position.y = payload.y;
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.POSITION_Z](state, payload) {
            let index = getCursorIndex(payload.sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.instance.position.z = payload.z;
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.RESIZE](state, payload) {
            let index = getCursorIndex(payload.sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.instance.size = isNaN(payload.radius)
                    ? state.defaults.radius * state.defaults.ratio
                    : payload.radius * state.defaults.ratio;
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.SHOW](state, sceneId) {
            let index = getCursorIndex(sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.visible = true;
                cursor.manager.renderingGroupId = state.defaults.groupId;
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.HIDE](state, sceneId)  {
            let index = getCursorIndex(sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                cursor.visible = false;
                cursor.manager.renderingGroupId = -1;
                Vue.set(state.cursors, index, cursor);
            }
        },
        [CURSORS.DELETE](state, payload) {
            let index = getCursorIndex(payload.sceneId);

            if(index >= 0) {
                let cursor = state.cursors[index];
                if(typeof cursor.dispose == 'function')
                    state.cursor.dispose();
                state.cursors.splice(index, 1);
                state.current = getLastIndex();
            }
        }
    }
}

const getLastIndex = () => {
    let length = Store.state.cursors.length - 1;
    if(length >= 0) return length;
    else return 0
}

const getCursorIndex = (sceneId) => {
    return Store.state.cursors.findIndex(cursor => {
        return cursor.sceneId == sceneId
    });
};

module.exports = Store;

