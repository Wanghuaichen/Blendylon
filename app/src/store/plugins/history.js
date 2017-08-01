/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

module.exports = () => {
    return store => {
        store.subscribe((mutation, state) => {
            if(typeof mutation.payload != 'undefined') {
                if(!mutation.payload.init) {
                    // console.log(state.Cursors.cursors)
                }
            }
        })
    }
}
