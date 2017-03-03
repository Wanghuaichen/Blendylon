/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

var PORT = 3500;

var http = require('http');
var express = require('express');
var socketIo = require('socket.io');

let app = express();
let server = http.Server(app);
let io = socketIo(server);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', (socket) =>
{
    console.log('socket connected')

    socket.on('device:orientation', (payload) => {
        if(typeof process.send == 'function') {
            process.send({
                type: 'device:orientation',
                data: payload
            });
        }
    });

    socket.on('device:move', payload => {
        if(typeof process.send == 'function') {
            process.send({
                type: 'device:move',
                data: payload
            });
        }
    })

    // socket.on('device:motion', (payload) => {
    //     if(typeof process.send == 'function') {
    //         process.send({
    //             type: 'device:motion',
    //             data: payload
    //         });
    //     }
    // });
})

server.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})
