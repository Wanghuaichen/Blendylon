
/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../../../../utils/CST';

export default class Grid
{
    constructor(scene)
    {
        this.scene = scene;
        this.instance = null;
        this.material = null;
        this.create();
    }

    create()
    {
        this.instance = BABYLON.Mesh.CreatePlane(
            'Grid',
            100,
            this.scene,
            true,
            BABYLON.Mesh.DOUBLESIDE
        );

        this.instance.type = CST.OBJECTS.VIEWPORT_MESH;
        this.instance.applyFog = false;
        // this.instance.isPickable = false;
        this.instance.rotation.x = -CST.HALFPI;
        this.instance.convertToFlatShadedMesh();

        this.material = new BABYLON.StandardMaterial('Grid_texture', this.scene);
        this.material.diffuseTexture = new BABYLON.Texture("./app/src/assets/img/grid.png", this.scene);
        this.material.specularColor  = new BABYLON.Color3.Black();
        this.material.emissiveColor  = new BABYLON.Color3(0.15, 0.15, 0.15);

        this.material.diffuseTexture.hasAlpha = true;
        this.material.diffuseTexture.uScale   = 400.0;
        this.material.diffuseTexture.vScale   = 400.0;

        this.instance.material = this.material;
    }
}
