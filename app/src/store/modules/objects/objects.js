/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import {OBJECTS} from '../../mutations-types'

module.exports =
{
    state     : {
        objects : [
            {
                test : 2
            }
        ]
    },
    getters   : {
        objects : state => state.objects
    },
    actions   : {
        setObjects(store, objects) {
            store.commit(OBJECTS.SET, objects);
        },
        addObject(store, object) {
            store.commit(OBJECTS.ADD, object);
        }
    },
    mutations : {
        [OBJECTS.SET](state, objects) {
            state.objects = objects;
        },
        [OBJECTS.ADD](state, object) {
            state.objects.push(object);
        }
    }
}
