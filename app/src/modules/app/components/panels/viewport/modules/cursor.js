/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

export default class Cursor
{
    constructor(scene, camera)
    {
        this.scene = scene;
        this.camera = camera;
        this.spriteManager = new BABYLON.SpriteManager(
            'cursor_manager',
            './app/src/assets/img/cursor.png',
            1,
            40,
            this.scene
        );
        this.instance = new BABYLON.Sprite('Cursor', this.spriteManager);
        this.spriteManager.renderingGroupId = 2;
        this.spriteManager.fogEnabled = false;
        this.ratio = 0.04;
        this.resize();
    }

    resize() {
        this.instance.size = this.camera.instance.radius * this.ratio;
    }

    toggleVisibility() {
        return this.spriteManager.renderingGroupId =
            this.spriteManager.renderingGroupId == 2 ? -1 : 2;
    }

    setPosition(pos) {
        this.instance.position = pos.clone();
        this.resize();
    }

    reset() {
        this.instance.position = BABYLON.Vector3.Zero();
        this.resize();
    }
}
