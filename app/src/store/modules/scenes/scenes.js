/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import shortid from 'shortid'
import CST from '../../../utils/CST'
import Utility from '../../../utils/Utility'
import Input from '../../../modules/app/components/core/inputs/input';
import
{
    SCENES,
    CURSORS,
    CAMERAS,
    GRIDS
}
from '../../mutations-types'

const Store =
{
    state: {
        scenes   : [],
        names    : 0,
        current  : 0,
        defaults : {
            clearColor: new BABYLON.Color3(.3, .3, .3),
            ambientColor: new BABYLON.Color3(.3, .3, .3)
        }
    },
    getters: {
        getScenes         : state => state.scenes,
        getCurrentSceneId : state => state.scenes[state.current].id,
        getCurrentScene   : state => state.scenes[state.current]
    },
    actions: {
        setActiveCamera(store, camera) {
            store.commit(SCENES.SET_ACTIVE_CAMERA, camera);
        },
        switchScene(store, id) {
            store.commit(SCENES.SWITCH, id);
            store.commit(CAMERAS.SWITCH, id);
            store.commit(CURSORS.SWITCH, id);
        },
        addScene(store, payload) {
            store.commit(SCENES.ADD, payload);
            let currentScene = store.state.scenes[store.state.current];
            //Todo: Add scene components
            // + Cursor
            // + Camera
            // - Grid
            // - Selection

            let settings = {
                cursor: {
                    scene: currentScene,
                    radius: 10
                },
                camera: {
                    scene: currentScene,
                    canvas: payload.canvas
                },
                grid: {
                    scene: currentScene
                }
            };

            for(var setting in settings)
                settings[setting].init = true;

            store.commit(CAMERAS.ADD_VIEWPORT, settings.camera);
            store.commit(GRIDS.ADD,      settings.grid);
            store.commit(CURSORS.CREATE, settings.cursor);
            store.commit(CURSORS.RESIZE, {
                sceneId: settings.cursor.scene.id,
                radius: settings.cursor.radius
            });

            var light = new BABYLON.HemisphericLight(
                'Light_' + currentScene.id,
                new BABYLON.Vector3(-CST.HALFPI, 1, CST.HALFPI),
                currentScene
            );
            light.showName  = false;
            light.showAxis  = false;
            light.intensity = .5;
            light.type      = CST.OBJECTS.LIGHT
        },
        deleteScene(store, payload) {
            store.commit(GRIDS.DELETE,   payload);
            store.commit(CURSORS.DELETE, payload);
            store.commit(SCENES.DELETE,  payload);
        }
    },
    mutations: {
        [SCENES.SET_ACTIVE_CAMERA](state, camera) {
            state.scenes[state.current].activeCamera = camera;
        },
        [SCENES.SWITCH](state, id) {
            state.current = getSceneIndex(id)
        },
        [SCENES.ADD](state, payload)
        {
            let scene          = new BABYLON.Scene(payload.engine);
            scene.id           = shortid.generate();
            scene.name         = setSceneName('Scene');
            scene.clearColor   = state.defaults.clearColor;
            scene.ambientColor = state.defaults.ambientColor;

            scene.renderLoop = function() { this.render() }

            state.scenes.push(scene);
            state.current = getLastIndex()
        },
        [SCENES.DELETE](state, payload) {
            let index = state.scenes.findIndex(scene => scene.id == payload.sceneId);
            if(index >= 0)
            {
                let scene = state.scenes[index];
                if(typeof scene.dispose == 'function')
                    scene.dispose();
                state.scenes.splice(index, 1);
                state.current = getLastIndex()
            }
        }
    }
}

const getLastIndex = () => {
    let length = Store.state.scenes.length - 1;
    if(length >= 0) return length;
    else return 0
}

const getSceneIndex = (id) => {
    return Store.state.scenes.findIndex(scene => scene.id == id);
};

const setSceneName = (name) => {
    name = Utility.capitalize(name);
    let exists = Store.state.scenes.find(scene => scene.name == name);

    if(!exists) return name;
    else {
        Store.state.names++;

        return name + '.' + Utility.pad(Store.state.names, 3)
    }
};

module.exports = Store;

