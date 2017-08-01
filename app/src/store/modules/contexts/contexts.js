/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import {CONTEXTS} from '../../mutations-types'

module.exports =
{
    state     : {
        contexts : []
    },
    getters   : {
        contexts : state => state.contexts
    },
    actions   : {},
    mutations : {}
}
