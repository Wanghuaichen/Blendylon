/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue'
import CST from '../../../core/utils/CST'
import {GRIDS} from '../../mutations-types'

const Store =
      {
          state     : {
              grids    : [],
              current  : 0,
              defaults : {
                  type            : CST.OBJECTS.VIEWPORT_MESH,
                  size            : 12,
                  applyFog        : false,
                  rotation        : new BABYLON.Vector3(-CST.HALFPI, 0, 0),
                  specularColor   : new BABYLON.Color3.Black(),
                  emissiveColor   : new BABYLON.Color3(0.65, .65, .65),
                  disableLighting : true
              }
          },
          getters   : {
              getCurrentGrid : state => state.grids[state.current]
          },
          actions   : {
              addGrid(store, scene) {
                  store.commit(GRIDS.ADD, scene);
              },
              setGridRatio(store, payload) {
                  store.commit(GRIDS.SET_RATIO, payload)
              },
              setGridOpacity(store, payload) {
                  store.commit(GRIDS.SET_OPACITY, payload)
              },
              setGridFrequency(store, payload) {
                  store.commit(GRIDS.SET_FREQUENCY, payload)
              },
              deleteGrid(store, payload) {
                  store.commit(GRIDS.DELETE, payload);
              }
          },
          mutations : {
              [GRIDS.SWITCH](state, sceneId) {
                  let index = getGridIndex(sceneId);
                  if(index >= 0)
                      state.currrent = index;
              },
              [GRIDS.DELETE](state, payload) {
                  let index = getGridIndex(payload.sceneId);
                  if(index >= 0) {
                      let grid = state.grids[index];
                      if(typeof grid.dispose == 'function')
                          grid.dispose();
                
                      state.grids.splice(index, 1);
                      state.current = getLastIndex();
                  }
              },
              [GRIDS.SET_RATIO](state, payload) {
                  let index = getGridIndex(payload.sceneId);
                  if(index >= 0) {
                      let grid = state.grids[index];
                      grid.material.gridRatio = payload.ratio
                      Vue.set(state.grids, index, grid);
                  }
              },
              [GRIDS.SET_OPACITY](state, payload) {
                  let index = getGridIndex(payload.sceneId);
                  if(index >= 0) {
                      let grid = state.grids[index];
                      grid.material.opacity = payload.opacity
                      Vue.set(state.grids, index, grid);
                  }
              },
              [GRIDS.SET_FREQUENCY](state, payload) {
                  let index = getGridIndex(payload.sceneId);
                  if(index >= 0) {
                      let grid = state.grids[index];
                      grid.material.majorUnitFrequency = payload.frequency
                      Vue.set(state.grids, index, grid);
                  }
              },
              [GRIDS.ADD](state, payload) {
                  let name = 'viewport_grid_' + payload.scene.id;
                  let grid = BABYLON.Mesh.CreatePlane(
                      name,
                      state.defaults.size,
                      payload.scene,
                      true,
                      BABYLON.Mesh.DOUBLESIDE
                  );
            
                  grid.sceneId  = payload.scene.id;
                  grid.type     = state.defaults.type;
                  grid.applyFog = state.defaults.applyFog;
                  grid.rotation = state.defaults.rotation.clone();
                  
                  grid.convertToFlatShadedMesh();
                  grid.freezeWorldMatrix();
            
                  grid.material = new BABYLON.GridMaterial(
                      'material_' + name,
                      payload.scene
                  );
            
                  grid.material.gridRatio          = 0.1;
                  grid.material.opacity            = 0.1;
                  grid.material.majorUnitFrequency = 5;
                  grid.material.backFaceCulling    = false;
                  grid.material.disableLighting    = state.defaults.disableLighting
                  grid.material.specularColor      = state.defaults.specularColor;
            
                  state.grids.push(grid);
              }
          }
      }

const getLastIndex = () => {
    let length = Store.state.grids.length - 1;
    if(length >= 0) return length;
    else return 0
}

const getGridIndex = (sceneId) => {
    return Store.state.grids.findIndex(grid => grid.sceneId == sceneId);
}

module.exports = Store;
