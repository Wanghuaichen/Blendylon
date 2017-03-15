/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue'
import CST from '../../../core/utils/CST'
import {CAMERAS, CURSORS} from '../../mutations-types'

const Store =
{
    state: {
        cameras: [],
        current: 0,
        defaults: {
            alpha: 1,
            beta: 0.8,
            radius: 10,
            mode: 0,
            orthoTop: 3,
            orthoBottom: -3,
            orthoLeft: -6,
            orthoRight: 6,
            minZ: 0.001,
            maxZ: 5000,
            wheelPrecision: 8,
            angularSensibilityX: 100,
            angularSensibilityY: 100,
            inertia: 0,
            layerMask: 1,
            target: new BABYLON.Vector3.Zero()
        }
    },
    getters: {
        getCameras                 : state => state.cameras,
        getCurrentCameraIndex      : state => state.current,
        getCurrentCameraDefaults   : state => state.defaults,
        getCurrentCamera           : state => state.cameras[state.current],
        getLastCamera              : state => state.cameras[getLastIndex()],
        getBeforeLastCamera        : state => state.cameras[state.cameras.length - 2]
    },
    actions: {
        addCamera(store, payload) {
            store.commit(CAMERAS.ADD, payload);
        },
        toggleCameraMode(store, payload) {
            store.commit(CAMERAS.TOGGLE_MODE, payload);
        },
        setViewportCameraTarget(store, payload) {
            store.commit(CAMERAS.SET_VIEWPORT_TARGET, payload);
            store.commit(CURSORS.RESIZE, {
                sceneId: payload.sceneId,
                radius: store.state.defaults.radius
            })
        },
        setViewportCameraRadius(store, payload) {
            store.commit(CAMERAS.SET_VIEWPORT_RADIUS, payload);
        },
        addViewportCamera(store, payload) {
            store.commit(CAMERAS.ADD_VIEWPORT, payload);
        },
        deleteCamera(store, payload) {

            store.commit(CAMERAS.DELETE, payload);
        }
    },
    mutations: {
        [CAMERAS.TOGGLE_MODE](state, payload) {
            let index = getViewportCameraIndex(payload.sceneId);
            if (index >= 0) {
                let camera = state.cameras[index];
                camera.mode = camera.mode == 0 ? 1 : 0;
                Vue.set(state.cameras, index, camera);
            }
        },
        [CAMERAS.SWITCH](state, sceneId) {
            let index = getViewportCameraIndex(sceneId);

            if(index >= 0) {
                state.current = index;
                state.cameras[state.current].attachControl(state.cameras[state.current].canvas, true);
            }
        },
        [CAMERAS.DELETE](state, payload) {
            let index = getViewportCameraIndex(payload.sceneId);
            if (index >= 0) {
                let camera = state.cameras[index];

                if(typeof camera.dispose == 'function') {
                    camera.dispose();
                }
                state.cameras.splice(index, 1);
                state.current = getLastIndex();
            }
        },
        [CAMERAS.ADD](state, payload) {

        },
        [CAMERAS.SET_VIEWPORT_RADIUS](state, payload) {
            let index = getViewportCameraIndex(payload.sceneId);
            if (index >= 0) {
                let camera = state.cameras[index];
                camera.radius = payload.radius;
                Vue.set(state.cameras, index, camera);
            }
        },
        [CAMERAS.SET_VIEWPORT_TARGET](state, payload) {
            let index = getViewportCameraIndex(payload.sceneId);
            if (index >= 0) {
                let camera = state.cameras[index];

                if(typeof camera.setTarget == 'function')
                    camera.setTarget(payload.position);

                Vue.set(state.cameras, index, camera);
            }
        },
        [CAMERAS.ADD_VIEWPORT](state, payload)
        {
            let camera = new BABYLON.ArcRotateCamera(
                'viewport_camera_' + Math.random(),
                state.defaults.alpha,
                state.defaults.beta,
                state.defaults.radius,
                state.defaults.target,
                payload.scene
            );

            //Todo: Optimize merge defaults

            camera.sceneId             = payload.scene.id;
            camera.defaultRadius       = state.defaults.radius;
            camera.canvas              = payload.canvas;
            camera.currentView         = 'user';
            camera.type                = CST.OBJECTS.VIEWPORT_CAMERA;
            camera.mode                = state.defaults.mode;
            camera.orthoTop            = state.defaults.orthoTop;
            camera.orthoBottom         = state.defaults.orthoBottom;
            camera.orthoLeft           = state.defaults.orthoLeft;
            camera.orthoRight          = state.defaults.orthoRight;
            camera.minZ                = state.defaults.minZ;
            camera.maxZ                = state.defaults.maxZ;
            camera.wheelPrecision      = state.defaults.wheelPrecision;
            camera.angularSensibilityX = state.defaults.angularSensibilityX;
            camera.angularSensibilityY = state.defaults.angularSensibilityY;
            camera.inertia             = state.defaults.inertia;
            camera.layerMask           = state.defaults.layerMask;

            camera.attachControl(payload.canvas);
            camera.setTarget(state.defaults.target.clone());

            state.cameras.push(camera);
        }
    }
}

const getLastIndex = () => {
    let length = Store.state.cameras.length - 1;
    if(length >= 0) return length;
    else return 0
}

const getViewportCameraIndex = (sceneId) => {
    return Store.state.cameras.findIndex(camera => {
        return camera.sceneId == sceneId
    });
};

module.exports = Store;


