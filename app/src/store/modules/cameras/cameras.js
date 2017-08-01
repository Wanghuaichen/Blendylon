/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue'
import CST from '../../../core/utils/CST'
import {CAMERAS, CURSORS} from '../../mutations-types'

const Store =
      {
          state     : {
              cameras          : [],
              current          : 0,
              views            : {
                  left   : [-CST.PI, CST.HALFPI],
                  right  : [0, CST.HALFPI],
                  back   : [-CST.HALFPI, CST.HALFPI],
                  front  : [CST.HALFPI, CST.HALFPI],
                  bottom : [CST.HALFPI, CST.TWOPI],
                  top    : [CST.HALFPI, 0],
                  camera : []
              },
              transitionFrames : 100,
              defaults         : {
                  alpha               : 1,
                  beta                : 0.8,
                  radius              : 10,
                  mode                : 0,
                  orthoTop            : 3,
                  orthoBottom         : -3,
                  orthoLeft           : -6,
                  orthoRight          : 6,
                  minZ                : 0.01,
                  maxZ                : 1000,
                  wheelPrecision      : 8,
                  angularSensibilityX : 100,
                  angularSensibilityY : 100,
                  inertia             : 0,
                  layerMask           : 1,
                  target              : new BABYLON.Vector3.Zero(),
                  currentView         : 'user'
              }
          },
          getters   : {
              getCameras               : state => state.cameras,
              getCurrentCameraIndex    : state => state.current,
              getCurrentCameraDefaults : state => state.defaults,
              getCurrentCamera         : state => state.cameras[state.current],
              getLastCamera            : state => state.cameras[getLastIndex()],
              getBeforeLastCamera      : state => state.cameras[state.cameras.length - 2]
          },
          actions   : {
              addCamera(store, payload) {
                  store.commit(CAMERAS.ADD, payload);
              },
              toggleCameraMode(store, payload) {
                  store.commit(CAMERAS.TOGGLE_MODE, payload);
              },
              setViewportCameraTarget(store, payload) {
                  store.commit(CAMERAS.SET_VIEWPORT_TARGET, payload);
                  store.commit(CURSORS.RESIZE, {
                      sceneId : payload.sceneId,
                      radius  : store.state.defaults.radius
                  })
              },
              setViewportCameraRadius(store, payload) {
                  store.commit(CAMERAS.SET_VIEWPORT_RADIUS, payload);
              },
              setViewportCameraFov(store, payload) {
                  store.commit(CAMERAS.SET_VIEWPORT_FOV, payload);
              },
              setViewportCameraMinZ(store, payload) {
                  store.commit(CAMERAS.SET_VIEWPORT_MIN_Z, payload);
              },
              setViewportCameraMaxZ(store, payload) {
                  store.commit(CAMERAS.SET_VIEWPORT_MAX_Z, payload);
              },
              setViewportCameraInertia(store, payload) {
                  store.commit(CAMERAS.SET_VIEWPORT_INERTIA, payload);
              },
              setViewportCameraView(store, payload) {
            
                  store.commit(CAMERAS.RESET_VIEWPORT_AXIS, payload);
                  store.commit(CAMERAS.SET_VIEWPORT_VIEW, payload);
                  store.commit(CAMERAS.TRANSITION_VIEWPORT, payload);
              },
              addViewportCamera(store, payload) {
                  store.commit(CAMERAS.ADD_VIEWPORT, payload);
              },
              deleteCamera(store, payload) {
                  store.commit(CAMERAS.DELETE, payload);
              }
          },
          mutations : {
              [CAMERAS.TOGGLE_MODE](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera  = state.cameras[index];
                      camera.mode = camera.mode == 0 ? 1 : 0;
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.SWITCH](state, sceneId) {
                  let index = getViewportCameraIndex(sceneId);
            
                  if (index >= 0) {
                      state.current = index;
                      state.cameras[state.current].attachControl(state.cameras[state.current].canvas, true);
                  }
              },
              [CAMERAS.DELETE](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera = state.cameras[index];
                
                      if (typeof camera.dispose == 'function') {
                          camera.dispose();
                      }
                      state.cameras.splice(index, 1);
                      state.current = getLastIndex();
                  }
              },
              [CAMERAS.ADD](state, payload) {
            
              },
              [CAMERAS.SET_VIEWPORT_FOV](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera = state.cameras[index];
                      camera.fov = payload.fov;
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.SET_VIEWPORT_MIN_Z](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera  = state.cameras[index];
                      camera.minZ = payload.minZ;
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.SET_VIEWPORT_MAX_Z](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera  = state.cameras[index];
                      camera.maxZ = payload.maxZ;
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.SET_VIEWPORT_RADIUS](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera    = state.cameras[index];
                      camera.radius = payload.radius;
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.SET_VIEWPORT_INERTIA](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera     = state.cameras[index];
                      camera.inertia = payload.inertia;
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.RESET_VIEWPORT_AXIS](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera = state.cameras[index];
                      ['alpha', 'beta'].forEach(axis => {
                          camera[axis] =
                              camera[axis] > CST.TWOPI ||
                              camera[axis] < -CST.TWOPI
                                  ? 0 : camera[axis];
                      });
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.TRANSITION_VIEWPORT](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera = state.cameras[index];
                      let view   = state.views[payload.view];
                      view.push(camera.radius);
                
                      ['alpha', 'beta', 'radius'].forEach((axis, index) => {
                          let animation = new BABYLON.Animation(
                              'camera_' + axis,
                              axis,
                              30,
                              BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                              BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
                          );
                    
                          animation.setKeys([
                              {frame : 0, value : camera[axis]},
                              {frame : 20, value : view[index]}
                          ]);
                    
                          animation.setEasingFunction(new BABYLON.CubicEase());
                          camera.animations.push(animation);
                      });
                
                      Vue.set(state.cameras, index, camera);
                      payload.scene.beginAnimation(camera, 0, state.transitionFrames, false, 1);
                  }
              },
              [CAMERAS.SET_VIEWPORT_VIEW](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera         = state.cameras[index];
                      camera.currentView = payload.view
                
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.SET_VIEWPORT_TARGET](state, payload) {
                  let index = getViewportCameraIndex(payload.sceneId);
                  if (index >= 0) {
                      let camera = state.cameras[index];
                
                      if (typeof camera.setTarget == 'function')
                          camera.setTarget(payload.position);
                
                      Vue.set(state.cameras, index, camera);
                  }
              },
              [CAMERAS.ADD_VIEWPORT](state, payload)
              {
                  let camera = new BABYLON.ArcRotateCamera(
                      'viewport_camera_' + Math.random(),
                      state.defaults.alpha,
                      state.defaults.beta,
                      state.defaults.radius,
                      state.defaults.target,
                      payload.scene
                  );
            
                  //Todo: Optimize merge defaults
            
                  camera.sceneId             = payload.scene.id;
                  camera.defaultRadius       = state.defaults.radius;
                  camera.canvas              = payload.canvas;
                  camera.currentView         = 'user';
                  camera.type                = CST.OBJECTS.VIEWPORT_CAMERA;
                  camera.mode                = state.defaults.mode;
                  camera.orthoTop            = state.defaults.orthoTop;
                  camera.orthoBottom         = state.defaults.orthoBottom;
                  camera.orthoLeft           = state.defaults.orthoLeft;
                  camera.orthoRight          = state.defaults.orthoRight;
                  camera.minZ                = state.defaults.minZ;
                  camera.maxZ                = state.defaults.maxZ;
                  camera.wheelPrecision      = state.defaults.wheelPrecision;
                  camera.angularSensibilityX = state.defaults.angularSensibilityX;
                  camera.angularSensibilityY = state.defaults.angularSensibilityY;
                  camera.inertia             = state.defaults.inertia;
                  camera.panningInertia      = state.defaults.inertia;
                  camera.panningSensibility  = state.defaults.angularSensibilityX;
                  camera.layerMask           = state.defaults.layerMask;
            
                  console.log(camera)
                  camera.attachControl(payload.canvas, false, true);
                  camera.setTarget(state.defaults.target.clone());
            
                  state.cameras.push(camera);
              }
          }
      }

const getLastIndex = () => {
    let length = Store.state.cameras.length - 1;
    if (length >= 0) return length;
    else return 0
}

const getViewportCameraIndex = (sceneId) => {
    return Store.state.cameras.findIndex(camera => {
        return camera.sceneId == sceneId
    });
};

module.exports = Store;


