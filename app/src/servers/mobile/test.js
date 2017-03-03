/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

let cp = require('child_process');

let s = cp.fork('./server.js')

s.on('error', function(err) {
    console.log(err)
});

s.on('message', function(data) {
    console.log(data);
});

s.on('exit', function(data) {
    console.log('Server exited', data)
})
