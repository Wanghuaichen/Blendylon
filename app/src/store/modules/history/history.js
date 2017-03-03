/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import {HISTORY} from '../../mutations-types'

module.exports =
{
    state: {
        history: {}
    },
    getters: {
        history: state => state.history
    },
    actions: {
        addAction(store, action) {
            store.commit(HISTORY.ADD_ACTION, action);
        },
        undoAction(store, action) {
            store.commit(HISTORY.UNDO_ACTION, action);
        }
    },
    mutations: {
        [HISTORY.ADD_ACTION](state, action) {
            state.history.push(action);
        },
        [HISTORY.UNDO_ACTION](state, action) {
            // Todo: undo the faking action
        }
    }
}
