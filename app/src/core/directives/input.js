/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import Vue from 'vue'
import Utils from '../utils/Utility'

Vue.directive('input-draggable',
    {
        bind : function(el, binding) {
            var pos, fixed, old = el.value;
            
            el.addEventListener('mousedown', _ => {
                $(window).on('mousemove', event => {
                    let
                        n    = 0,
                        x    = event.clientX,
                        min  = $(el).attr('min') || -9999999,
                        max  = $(el).attr('max') || 99999999,
                        step = $(el).attr('step') || 1;
                    
                    if(pos) {
                        if(x < pos) {
                            n = fixed - (Math.round((pos - x) / 5) * step);
                            if(n >= min)
                                el.value = n.toFixed(Utils.decimals(step));
                            
                            el.dispatchEvent(new Event('inputDrag'));
                        }
                        else if(event.clientX > pos) {
                            n = fixed + Math.round((x - pos) / 5) * step;
                            if(n <= max)
                                el.value = n.toFixed(Utils.decimals(step));
                            
                            el.dispatchEvent(new Event('inputDrag'));
                        }
                    }
                    else {
                        fixed = el.value = el.value.replace('$', '');
                        fixed = parseFloat(fixed);
                        pos   = event.clientX;
                    }
                });
                
                $(document).on('mouseup', function() {
                    $(window).off('mousemove');
                    pos = null;
                })
            });
        }
    });
