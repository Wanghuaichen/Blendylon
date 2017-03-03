/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../../../../utils/CST'

export default class Line
{
    constructor(scene, camera, parent)
    {
        this.scene  = scene;
        this.camera = camera;
        this.parent = parent;
        this.dist   = 5;

        return this.build();
    }


    build()
    {
        if(typeof this.parent.direction != 'undefined'
        && typeof this.parent.position  != 'undefined')
        {
            let start     = BABYLON.Vector3.FromArray([this.parent.position.x, this.parent.position.y, this.parent.position.z]);
            let direction = BABYLON.Vector3.FromArray([this.parent.direction.x, -1, this.parent.direction.z]);
            let end       = start.add(direction.scaleInPlace(this.dist));

            this.instance = BABYLON.Mesh.CreateDashedLines(
                'LightWidgetDirection_' + this.parent.name,
                [
                    start,
                    end
                ],
                0.6, 0.2, 60, this.scene
            );

            this.instance.updatable = true;
            this.instance.type      = CST.OBJECTS.MESH;
            this.instance.parent    = this.parent;
            console.log(start, end)

            return this.instance;
        }
    }
}
