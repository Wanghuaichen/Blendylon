/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import CST from '../../../../../../../utils/CST';

export default class WidgetPosition
{
    constructor(scene, id)
    {
        this.id = id;
        this.scene = scene;
        this.mesh = BABYLON.Mesh.CreateCylinder(
            'widget_position' + this.id,
            8, 0.4, 0.4, 8, 1,
            this.scene,
            true
        );

        this.mesh.material = new BABYLON.StandardMaterial('widget_position_material_' + id, this.scene);
        this.mesh.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.mesh.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        this.mesh.material.diffuseColor  = new BABYLON.Color3(1, 0, 0);

        this.mesh.type = CST.OBJECTS.VIEWPORT_WIDGET;
        this.mesh.isPickable = true;
    }
}
