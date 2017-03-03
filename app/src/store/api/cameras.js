/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

const Cameras = {
    create(payload)
    {
        let zero = new BABYLON.Vector3.Zero();
        switch (payload.type)
        {
            case 'Free':
                return new BABYLON.FreeCamera(
                    payload.name,
                    zero,
                    payload.scene
                )
            break;
            case 'ArcRotate':
                return new BABYLON.ArcRotateCamera(
                    payload.name,
                    payload.alpha || 1,
                    payload.beta || 0.8,
                    payload.radius || 10,
                    payload.target || zero,
                    payload.scene
                )
            break
            case 'Touch':
                return new BABYLON.TouchCamera(
                    payload.name,
                    payload.position || zero,
                    payload.scene
                )
            break;
            case 'Gamepad':
                return new BABYLON.GamepadCamera(
                    payload.name,
                    payload.position || zero,
                    payload.scene
                )
            break;
            case 'DeviceOrientation':
                return new BABYLON.DeviceOrientationCamera(
                    payload.name,
                    payload.position || zero,
                    payload.scene
                )
            break;
            case 'Follow':
                return new BABYLON.FollowCamera(
                    payload.name,
                    payload.position || zero,
                    payload.scene
                )
            break;
            case 'VirtualJoysticks':
                return new BABYLON.VirtualJoysticksCamera(
                    payload.name,
                    payload.position || zero,
                    payload.scene
                )
            break;
            case 'AnaglyphArcRotate':
                return new BABYLON.AnaglyphArcRotateCamera(
                    payload.name,
                    payload.alpha || -Math.PI / 2,
                    payload.beta || Math.PI / 4,
                    payload.radius || 10,
                    payload.target || zero,
                    payload.eyeSpace || 0.033,
                    payload.scene
                )
            break;
            case 'AnaglyphFree':
                return new BABYLON.AnaglyphFreeCamera(
                    payload.name,
                    payload.position || zero,
                    payload.eyeSpace || 0.033,
                    payload.scene
                )
            break;
            case 'VRDeviceOrientationFree':
                return new BABYLON.VRDeviceOrientationFreeCamera(
                    payload.name,
                    payload.scene
                )
            break;
            case 'WebVRFree':
                return new BABYLON.WebVRFreeCamera(
                    payload.name,
                    payload.position || zero,
                    payload.scene
                )
            break;
        }
    }
}

module.exports = Cameras;
