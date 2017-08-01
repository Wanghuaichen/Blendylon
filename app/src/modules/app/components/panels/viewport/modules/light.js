/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import CST from '../../../../../../core/utils/CST'
import Line from './line'

export default class Light {
    constructor(scene, camera, light) {
        this.light                          = light;
        this.scene                          = scene;
        this.camera                         = camera;
        this.size                           = 60;
        this.ratio                          = 0.04;
        this.spriteManager                  = new BABYLON.SpriteManager(
            'light_manager',
            'assets/img/light.png',
            1,
            this.size,
            this.scene
        );
        this.lines                          = new Line(this.scene, this.camera, this.light);
        this.instance                       = new BABYLON.Sprite('LightWidget_' + this.light.name, this.spriteManager);
        this.instance.type                  = CST.OBJECTS.VIEWPORT_WIDGET;
        this.spriteManager.renderingGroupId = 1;
        this.spriteManager.fogEnabled       = false;
        this.resize();
    }
    
    resize() {
        this.instance.size = this.camera.radius * this.ratio;
    }
    
    toggleVisibility() {
        return this.spriteManager.renderingGroupId =
            this.spriteManager.renderingGroupId == 1 ? -1 : 1;
    }
    
    setPosition(pos) {
        this.instance.position = pos.clone();
        this.resize();
    }
    
    destroy() {
        if (typeof this.instance != 'undefined')
            this.instance.dispose();
        
        if (typeof this.lines.dispose != 'undefined')
            this.lines.dispose();
    }
    
    reset() {
        this.instance.position = BABYLON.Vector3.Zero();
        this.resize();
    }
}
