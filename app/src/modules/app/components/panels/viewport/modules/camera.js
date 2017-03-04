/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../../../../core/utils/CST';

export default class Camera
{
    constructor(scene, config)
    {
        config = config || {};
        this.scene = scene;
        this.instance = {};

        this.activeCamera = null;
        this.currentView = 'user';

        return this.init(config);
    }

    init(config)
    {
        this.instance = new BABYLON.ArcRotateCamera(
            'viewport_camera', 1, 0.8, 10,
            new BABYLON.Vector3(0, 0, 0),
            this.scene
        );

        this.instance.type = CST.OBJECTS.VIEWPORT_CAMERA;

        this.instance.mode = 0;
        this.instance.orthoTop = 3;
        this.instance.orthoBottom = -3;
        this.instance.orthoLeft = -6;
        this.instance.orthoRight = 6;
        // this.instance.fovMode =  this.instance.FOVMODE_HORIZONTAL_FIXED;

        this.instance.minZ = config.minZ || 0.001;
        this.instance.maxZ = config.maxZ || 5000;
        this.instance.wheelPrecision = config.wheelPrecision || 8;
        this.instance.angularSensibilityX = config.angularSensibilityX || 100;
        this.instance.angularSensibilityY = config.angularSensibilityY || 100;
        this.instance.inertia = config.inertia || 0;
        this.instance.layerMask = 1;
        this.centerTo(BABYLON.Vector3.Zero());

        return this;
    }

    attach(canvas) {
        this.instance.attachControl(canvas, true);
    }

    centerTo(position) {
        this.instance.setTarget(position);
    }

    toggleMode() {
        this.instance.mode = this.instance.mode == 1 ? 0 : 1;
    }

    setCurrentView(view)
    {
        this.currentView = view;
    }

    setView(position)
    {
        //Todo: support for camera view

        this.setCurrentView(position);

        let
        frames = 100,
        positions =
        {
            left   : [-CST.PI,     CST.HALFPI],
            right  : [0,           CST.HALFPI],
            back   : [-CST.HALFPI, CST.HALFPI],
            front  : [CST.HALFPI,  CST.HALFPI],
            bottom : [CST.HALFPI,  CST.TWOPI],
            top    : [CST.HALFPI,  0],
            camera : []
        };

        this.transition(
            positions[position][0],
            positions[position][1],
            this.instance.radius,
            frames
        );
    }

    resetAxis(axe)
    {
        if(typeof axe == Array)
        {
            axe.forEach(axis =>
            {
                this.instance[axis] =
                    this.instance[axis] > CST.TWOPI ||
                    this.instance[axis] < -CST.TWOPI
                        ? 0 : this.instance[axis];
            });
        }
       else
        {
            this.instance[axe] =
                this.instance[axe] > CST.TWOPI ||
                this.instance[axe] < -CST.TWOPI
                    ? 0 : this.instance[axe];
        }
    }

    createAnimation(axis, value)
    {
        let animation = new BABYLON.Animation('camera_' + axis, axis, 30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        animation.setKeys([
            {frame: 0, value: this.instance[axis]},
            {frame: 20, value: value}
        ]);

        animation.setEasingFunction(new BABYLON.CubicEase());

        return animation;
    }

    transition(alpha, beta, radius, frames)
    {
        this.resetAxis(['alpha', 'beta']);

        ['alpha', 'beta', 'radius'].forEach((axis, index) =>
            this.instance.animations.push(this.createAnimation(axis, arguments[index]))
        );

        this.scene.beginAnimation(this.instance, 0, frames, false, 1);
    }
}
