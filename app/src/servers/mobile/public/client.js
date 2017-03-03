/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */
var socket = io('http://192.168.0.40:3500');

if(!window.DeviceOrientationEvent)
    alert('Device orientation not supported');

socket.on('connect', function (socket) {
    alert('Connected!');
});

function handleDeviceOrientation(e) {
    socket.emit('device:orientation', {
        alpha : e.alpha,
        beta  : e.beta,
        gamma : e.gamma
    })
};

function handleDeviceMotion(e) {
    socket.emit('device:motion', {
        x: e.acceleration.x,
        y: e.acceleration.y,
        z: e.acceleration.z
    })
};


let timers = {}
let delay = 1000 / 60;
window.addEventListener('deviceorientation', handleDeviceOrientation, true);

let left = document.getElementById('left');
left.addEventListener('mousedown', _ => {
    timers.left = setInterval(_ => {
        socket.emit('device:move', {direction: 'left'})
    }, delay);
});
left.addEventListener('mouseup', _ => { clearInterval(timers.left)})

let right = document.getElementById('right');
right.addEventListener('mousedown', _ => {
    timers.right = setInterval(_ => {
        socket.emit('device:move', {direction: 'right'})
    }, delay);
});
right.addEventListener('mouseup', _ => { clearInterval(timers.right)})

let down = document.getElementById('down');
down.addEventListener('mousedown', _ => {
    timers.down = setInterval(_ => {
        socket.emit('device:move', {direction: 'down'})
    }, delay);
});
down.addEventListener('mouseup', _ => { clearInterval(timers.down)})


let up = document.getElementById('up');
up.addEventListener('mousedown', _ => {
    timers.up = setInterval(_ => {
        socket.emit('device:move', {direction: 'up'})
    }, delay);
});
up.addEventListener('mouseup', _ => { clearInterval(timers.up)})

// window.addEventListener('devicemotion', handleDeviceMotion, true);
