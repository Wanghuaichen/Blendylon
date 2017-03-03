/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import PositionWidget from './position';
import RotationWidget from './rotation';
import ScalingWidget  from './scaling';

export default class Widgets
{
    constructor(scene)
    {
        this.widgets = {
            position: {
                x: new PositionWidget(scene, 'X'),
                y: new PositionWidget(scene, 'Y'),
                z: new PositionWidget(scene, 'Z')
            },
            rotation: {
                x: new RotationWidget(scene, 'X'),
                y: new RotationWidget(scene, 'Y'),
                z: new RotationWidget(scene, 'Z'),
            },
            scaling: {
                x: new ScalingWidget(scene, 'X'),
                y: new ScalingWidget(scene, 'Y'),
                z: new ScalingWidget(scene, 'Z'),
            }
        };

        this.scaleRatio = new BABYLON.Vector3(3, 3, 3);
        this.scaling    = new BABYLON.Vector3.Zero();
        this.distance   = new BABYLON.Vector3.Zero();
    }

    getDistanceFromCamera(widget)
    {
        this.distance = new BABYLON.Vector3.Distance(
            this.scene.getCameraByName('viewport_camera').position,
            widget.position
        ) * .03;
    }

    getScale(widget)
    {
        var dist  = this.getDistanceFromCamera(widget);
        var scale = new BABYLON.Vector3(dist, dist, dist).divide(this.scaleRatio);

        this.scaling.x = scale.x;
        this.scaling.y = scale.y;
        this.scaling.z = scale.z;
    }
}
