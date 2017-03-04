/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import CST from '../../../../../../../core/utils/CST'

export default class Selection
{
    constructor(scene, camera, config)
    {
        this.camera = camera;
        this.scene = scene;
        config = config || {};

        this.selected = {};

        this.outline = config.outline || true;
        this.color   = config.color   || '#f2711c';
        this.width   = config.width   || 0.01;

        return this;
    }

    remove()
    {
        if(this.selected && typeof this.selected.dispose == 'function')
        {
            if(this.selected.type == CST.OBJECTS.LIGHT
            && typeof this.selected.widget != 'undefined')
                if(typeof this.selected.widget.destroy == 'function')
                    this.selected.widget.destroy();

            if(this.selected.material)
                this.selected.material.dispose();

            this.selected.dispose();
            this.selected = {};
        }
    }

    stylize(object)
    {
        object.renderOutline = this.outline;
        object.outlineWidth  = this.width;3
        object.outlineColor  = new BABYLON.Color3.FromHexString(this.color);

        return object;
    }

    set(object, scene)
    {
        this.clear(scene);
        this.selected = this.stylize(object);
    }

    add(object) {

    }

    clear(scene)
    {
        this.selected = {};
        scene.meshes.forEach(mesh => mesh.renderOutline = false);
    }
}
