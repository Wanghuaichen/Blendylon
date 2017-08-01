/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

module.exports = {
    create(payload)
    {
        let zero = new BABYLON.Vector3.Zero();
        
        switch(payload.type) {
            case 'point':
                return new BABYLON.PointLight(
                    payload.name,
                    payload.position,
                    payload.scene
                );
                break;
            case 'directional':
                return new BABYLON.DirectionalLight(
                    payload.name,
                    payload.position,
                    payload.scene
                );
                break;
            case 'spot':
                return new BABYLON.SpotLight(
                    payload.name,
                    payload.position,
                    new BABYLON.Vector3(0, -1, 0),
                    0,
                    1,
                    payload.scene
                );
                break;
            case 'hemispheric':
                return new BABYLON.HemisphericLight(
                    payload.name,
                    payload.position,
                    payload.scene
                )
                break;
        }
    }
}
