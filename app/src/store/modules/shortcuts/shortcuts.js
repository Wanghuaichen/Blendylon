/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../core/utils/CST'
import {SHORTCUTS} from '../../mutations-types'

module.exports =
{
    state     : {
        shortcuts : [
            {
                name        : 'Toggle viewport tools',
                description : 'Hide / Show  the viewport tools panel.',
                state       : CST.STATES.VIEWPORT.HOVER,
                keys        : 't',
                callback    : 'toggleViewportTools'
            },
            {
                name        : 'Toggle viewport options',
                description : 'Hide / Show  the viewport options panel.',
                state       : CST.STATES.VIEWPORT.HOVER,
                keys        : 'n',
                callback    : 'toggleViewportOptions'
            },
            {
                name        : 'Close contexts elements',
                description : 'Close the currents contexts elements.',
                state       : CST.STATES.EDITOR.ALWAYS,
                keys        : 'escape',
                callback    : 'closeContexts'
            },
            {
                name        : 'Show quick menu / search',
                description : 'Show the quick menu at mouse position',
                state       : CST.STATES.EDITOR.ALWAYS,
                keys        : 'space',
                callback    : 'showContextMenu'
            },
            {
                name        : 'Reset current cursor',
                description : 'Reset the current cursor position',
                state       : CST.STATES.EDITOR.HOVER,
                keys        : 'shift+c',
                callback    : 'resetCurrentCursor'
            },
            {
                name        : 'Clear selection',
                description : 'Clear the current selection',
                state       : CST.STATES.EDITOR.HOVER,
                keys        : 'a',
                callback    : 'clearSelection'
            },
            {
                name        : 'Delete selection',
                description : 'Delete the current objects selected',
                state       : CST.STATES.EDITOR.HOVER,
                keys        : 'x',
                callback    : 'removeSelection'
            },
            {
                name        : 'Center view on selection',
                description : 'Center the view on the current selection',
                state       : CST.STATES.EDITOR.HOVER,
                keys        : '.',
                callback    : 'centerViewOnSelection'
            },
            {
                name        : 'Toggle camera mode',
                description : 'Toggle the current camera mode (Perspective / Orthographic)',
                state       : CST.STATES.EDITOR.HOVER,
                keys        : '5',
                callback    : 'setCameraMode'
            }
        ]
    },
    getters   : {
        getShortcuts : state => state.shortcuts
    },
    actions   : {
        setShortcutKeys(store, payload) {
            store.commit(SHORTCUTS.SET_KEYS, payload);
        }
    },
    mutations : {
        [SHORTCUTS.SET_KEYS](state, payload) {
            
        }
    }
}
