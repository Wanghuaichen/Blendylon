
/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../utils/CST'
import {SHORTCUTS} from '../../mutations-types'

module.exports =
{
    state: {
        shortcuts: [
            {
                name: 'Toggle viewport tools',
                description: 'Hide / Show  the viewport tools panel.',
                state: CST.STATES.VIEWPORT.HOVER,
                keys: 't',
                callback: 'toggleViewportTools'
            },
            {
                name: 'Toggle viewport options',
                description: 'Hide / Show  the viewport options panel.',
                state: CST.STATES.VIEWPORT.HOVER,
                keys: 'n',
                callback: 'toggleViewportOptions'
            },
            {
                name: 'Close contexts elements',
                description: 'Close the currents contexts elements.',
                state: CST.STATES.EDITOR.ALWAYS,
                keys: 'escape',
                callback: 'closeContexts'
            },
            {
                name: 'Show quick menu / search',
                description: 'Show the quick menu at mouse position',
                state: CST.STATES.EDITOR.ALWAYS,
                keys: 'shift+a',
                callback: 'showContextMenu'
            }
        ]
    },
    getters: {
        getShortcuts: state => state.shortcuts
    },
    actions: {
        setShortcutKeys(store, payload) {
            store.commit(SHORTCUTS.SET_KEYS, payload);
        }
    },
    mutations: {
        [SHORTCUTS.SET_KEYS](state, payload) {

        }
    }
}
