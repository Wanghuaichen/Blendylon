/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue'
import CST from '../../../core/utils/CST'
import Utility from '../../../core/utils/Utility'
import {LIGHTS} from '../../mutations-types'
import api from '../../api/api'
import shortid from 'shortid'

const Store =
      {
          state     : {
              lights           : [],
              names            : 0,
              shadowGenerators : [],
              defaults         : {
                  range     : 10,
                  angle     : .8,
                  exponent  : 2.0,
                  intensity : 1.0,
                  direction : new BABYLON.Vector3(-.5, -.5, 0),
                  widget    : {
                      ratio : .04
                  },
                  manager   : {
                      size             : 60,
                      renderingGroupId : 1,
                      fogEnabled       : false
                  }
              }
          },
          getters   : {
              getLights           : state => state.lights,
              getLastLightCreated : state => {
                  if(typeof state.lights[state.lights.length - 1] != 'undefined')
                      return state.lights[state.lights.length - 1];
              },
              getShadowGenerators : state => state.shadowGenerators
          },
          actions   : {
              addLight(store, payload) {
                  store.commit(LIGHTS.ADD, payload);
              },
              removeLight(store, payload) {
                  store.commit(LIGHTS.REMOVE, payload);
              },
              toggleLight(store, payload) {
                  store.commit(LIGHTS.TOGGLE, payload);
              },
              setLightDiffuseColor(store, payload) {
                  store.commit(LIGHTS.SET_DIFFUSE_COLOR, payload);
              },
              setLightSpecularColor(store, payload) {
                  store.commit(LIGHTS.SET_SPECULAR_COLOR, payload);
              },
              setLightGroundColor(store, payload) {
                  store.commit(LIGHTS.SET_GROUND_COLOR, payload);
              },
              setLightPosition(store, payload) {
                  store.commit(LIGHTS.SET_POSITION, payload);
              },
              setLightPositionX(store, payload) {
                  store.commit(LIGHTS.SET_POSITION_X, payload);
              },
              setLightPositionY(store, payload) {
                  store.commit(LIGHTS.SET_POSITION_Y, payload);
              },
              setLightPositionZ(store, payload) {
                  store.commit(LIGHTS.SET_POSITION_Z, payload);
              },
              setLightDirection(store, payload) {
                  store.commit(LIGHTS.SET_DIRECTION, payload);
              },
              setLightDirectionX(store, payload) {
                  store.commit(LIGHTS.SET_DIRECTION_X, payload);
              },
              setLightDirectionY(store, payload) {
                  store.commit(LIGHTS.SET_DIRECTION_Y, payload);
              },
              setLightDirectionZ(store, payload) {
                  store.commit(LIGHTS.SET_DIRECTION_Z, payload);
              },
              setLightIntensity(store, payload) {
                  store.commit(LIGHTS.SET_INTENSITY, payload);
              },
              setLightAngle(store, payload) {
                  store.commit(LIGHTS.SET_ANGLE, payload);
              },
              setLightExponent(store, payload) {
                  store.commit(LIGHTS.SET_EXPONENT, payload);
              },
              setLightRange(store, payload) {
                  store.commit(LIGHTS.SET_RANGE, payload);
              },
              addShadowGenerator(store, payload) {
                  store.commit(LIGHTS.ADD_SHADOW_GENERATOR, payload)
              },
              removeShadowGenerator(store, payload) {
                  store.commit(LIGHTS.REMOVE_SHADOW_GENERATOR, payload);
              }
          },
          mutations : {
              [LIGHTS.TOGGLE](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light = state.lights[index];
                      light.setEnabled(payload.value)
                      light.widget.color.a = payload.value === true ? 1 : .5;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_DIFFUSE_COLOR](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light     = state.lights[index];
                      light.diffuse = payload.color;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_SPECULAR_COLOR](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light      = state.lights[index];
                      light.specular = payload.color;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_GROUND_COLOR](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light    = state.lights[index];
                      light.ground = payload.color;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_POSITION](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light      = state.lights[index];
                      light.position = payload.position;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_POSITION_X](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light        = state.lights[index];
                      light.position.x = payload.value;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_POSITION_Y](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light        = state.lights[index];
                      light.position.y = payload.value;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_POSITION_Z](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light        = state.lights[index];
                      light.position.z = payload.value;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_DIRECTION](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light       = state.lights[index];
                      light.direction = payload.direction;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_DIRECTION_X](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light         = state.lights[index];
                      light.direction.x = payload.value;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_DIRECTION_Y](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light         = state.lights[index];
                      light.direction.y = payload.value;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_DIRECTION_Z](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light         = state.lights[index];
                      light.direction.z = payload.value;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_INTENSITY](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light       = state.lights[index];
                      light.intensity = payload.intensity;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_ANGLE](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light   = state.lights[index];
                      light.angle = payload.angle;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_EXPONENT](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light      = state.lights[index];
                      light.exponent = payload.exponent;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.SET_RANGE](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light   = state.lights[index];
                      light.range = payload.range;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.ADD_SHADOW_GENERATOR](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light = state.lights[index];
                      if(typeof light.shadowsGenerator == 'undefined') {
                          light.shadowsGenerator                    = new BABYLON.ShadowGenerator(1024, light);
                          light.shadowsGenerator.usePoissonSampling = true;
                          light.shadowsGenerator.bias               = 0.000001;
                          Vue.set(state.lights, index, light);
                      }
                  }
              },
              [LIGHTS.REMOVE_SHADOW_GENERATOR](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0) {
                      let light = state.lights[index];
                      if(typeof light.shadowsGenerator.dispose != 'undefined')
                          light.shadowsGenerator.dispose();
                      light.shadowsGenerator = undefined;
                      Vue.set(state.lights, index, light);
                  }
              },
              [LIGHTS.ADD](state, payload)
              {
                  payload.name    = setLightName(payload.type + 'Light');
                  let light       = api.lights.create(payload);
                  light.sceneId   = payload.scene.id;
                  light.id        = shortid.generate();
                  light.type      = CST.OBJECTS.LIGHT;
                  light.angle     = state.defaults.angle;
                  light.exponent  = state.defaults.exponent;
                  light.intensity = state.defaults.intensity;
                  light.range     = state.defaults.range;
            
                  if(payload.type == 'directional')
                      light.direction = state.defaults.direction;
            
                  light.spriteManager = new BABYLON.SpriteManager(
                      payload.name + '_spriteManager',
                      'assets/img/light.png',
                      1,
                      state.defaults.manager.size,
                      payload.scene
                  );
            
                  light.widget                         = new BABYLON.Sprite(payload.name + '_widget', light.spriteManager);
                  light.widget.isPickable              = true;
                  light.widget.type                    = CST.OBJECTS.VIEWPORT_WIDGET;
                  light.widget.light                   = light;
                  light.widget.position                = payload.type == 'hemispheric' ? BABYLON.Vector3.Zero() : light.position;
                  light.spriteManager.type             = CST.OBJECTS.VIEWPORT_WIDGET;
                  light.spriteManager.renderingGroupId = state.defaults.manager.renderingGroupId;
                  light.spriteManager.isPickable       = true;
                  light.spriteManager.fogEnabled       = state.defaults.manager.fogEnabled;
            
            
                  state.lights.push(light);
              },
              [LIGHTS.REMOVE](state, payload) {
                  let index = getLightIndex(payload.lightId);
                  if(index >= 0)
                      state.splice(index, 1);
              }
          }
      }

const getLightIndex = (id) => {
    return Store.state.lights.findIndex(light => light.id == id);
}

const setLightName = (name) => {
    name       = Utility.capitalize(name);
    let exists = Store.state.lights.find(light => light.name == name);
    
    if(!exists) return name;
    else {
        Store.state.names++;
        
        return name + '.' + Utility.pad(Store.state.names, 3)
    }
};

module.exports = Store;
