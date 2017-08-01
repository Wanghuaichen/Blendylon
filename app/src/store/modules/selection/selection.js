/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import {SELECTION} from '../../mutations-types'
import CST from '../../../core/utils/CST'

module.exports =
{
    state     : {
        selection : [],
        options   : {
            width : 0.01,
            color : '#f2711c'
        }
    },
    getters   : {
        getSelection  : state => state.selection,
        firstSelected : state => state.selection[0],
        lastSelected  : state => state.selection[state.selection.length - 1]
    },
    actions   : {
        setSelection(store, objects)
        {
            if (!Array.isArray(objects))
                objects = [objects];
            
            store.commit(SELECTION.CLEAR);
            store.commit(SELECTION.STYLIZE, objects);
            store.commit(SELECTION.SET, objects);
        },
        addToSelection(store, object) {
            store.commit(SELECTION.STYLIZE, [object]);
            store.commit(SELECTION.ADD_TO, object);
        },
        deleteSelection(store) {
            store.commit(SELECTION.DELETE)
        },
        clearSelection(store, scene) {
            store.commit(SELECTION.CLEAR, scene);
        },
        removeFromSelection(store, objects) {
            store.commit(SELECTION.REMOVE_FROM, objects);
        }
    },
    mutations : {
        [SELECTION.STYLIZE](state, objects)
        {
            objects.forEach(object => {
                object.renderOutline = true;
                object.outlineWidth  = state.options.width;
                object.outlineColor  = new BABYLON.Color3.FromHexString(state.options.color);
            })
        },
        [SELECTION.UNSTYLIZE](state, object) {
            object.renderOutline = false;
        },
        [SELECTION.SET](state, objects) {
            state.selection = objects;
        },
        [SELECTION.ADD_TO](state, object) {
            state.selection.push(object);
        },
        [SELECTION.DELETE](state)
        {
            state.selection.forEach(object => {
                if (typeof object.dispose == 'function') {
                    if (object.type == CST.OBJECTS.LIGHT
                        && typeof object.widget != 'undefined')
                        if (typeof object.widget.destroy == 'function')
                            object.widget.destroy();
                    
                    if (object.material && object.material.dispose == 'function')
                        object.material.dispose();
                    
                    object.dispose();
                }
            });
            
            this.selection = [];
        },
        [SELECTION.CLEAR](state, scene)
        {
            this.selection = [];
            scene.meshes.forEach(mesh => mesh.renderOutline = false);
        },
        [SELECTION.REMOVE_FROM](state, objects) {
            
        }
    }
}
