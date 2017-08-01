/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import {INPUTS} from '../../mutations-types'
import Input from '../../../core/inputs/input';

const Store =
      {
          state     : {
              inputs : {}
          },
          getters   : {
              getInputs : state => state.inputs
          },
          actions   : {
              createInputs(store, payload) {
                  store.commit(INPUTS.CREATE, payload);
              }
          },
          mutations : {
              [INPUTS.CREATE](state, payload) {
                  state.inputs = new Input(payload);
              }
          }
      }

module.exports = Store;
