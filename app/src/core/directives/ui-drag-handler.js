/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue';

const thresholdY = 83;
const thresholdX = 90;
const offset     = 34;

Vue.directive('ui-drag-handler',
{
    bind: (el, binding) => {

        $(() => {
            let type   = binding.value[0];
            let a      = binding.value[1];
            let b      = binding.value[2];
            let parent = binding.value[3] || null;
            let parentWidth = 0
            let parentHeight = 0
            let $a     = $('#' + a);
            let $b     = $('#' + b);
            let x      = $a.width();
            let y      = $b.height();
    
            if(!parent) {
                parentWidth = window.innerWidth
                parentHeight = window.innerHeight
            }
            else {
                parentWidth = $('#' + parent).width()
                parentHeight = $('#' + parent).height()
            }
            
            window.addEventListener('resize', _ => {
                x = $a.width();
                y = $b.height();
                parentWidth = $('#' + parent).width()
                parentHeight = $('#' + parent).height()
                
                if(type == 'vertical')
                    dragVertical(a, b, x, parentWidth)
                else if(type == 'horizontal')
                    dragHorizontal(a, b, y, parentHeight)
            });
    
            let toPercent = (a, b) => (a / b) * 100
            
            let dragVertical = (a, b, x, pWidth) => {
                let aWidth   = pWidth - x
                let bWidth   = pWidth - aWidth
                let aPercent = toPercent(aWidth, pWidth);
                let bPercent = toPercent(bWidth, pWidth);
                
                $('#' + a).css('width', aPercent + '%');
                $('#' + b).css('width', bPercent + '%');
                
                if(parent)
                    el.style.left = bPercent + '%'
                
                window.resizeEvents.emit('drag_resize', 'vertical');
            }
    
            let dragHorizontal = (a, b, y, pHeight) => {
                let aHeight   = pHeight - y
                let bHeight   = pHeight - aHeight
                let aPercent  = toPercent(aHeight, pHeight);
                let bPercent  = toPercent(bHeight, pHeight);
    

                $('#' + a).css('height', aPercent + '%');
                $('#' + b).css('height', bPercent + '%');
                window.resizeEvents.emit('drag_resize', 'horizontal');
            }
    
            el.addEventListener('mousedown', _ => {
                $(window).on('mousemove', event => {
                    x = event.clientX;
                    y = event.clientY;
            
                    if(type == 'vertical')
                        dragVertical(a, b, x, parentWidth)
                    if(type == 'horizontal')
                        dragHorizontal(a, b, y, parentHeight)
                });
        
                $(document).on('mouseup', () => $(window).off('mousemove'))
            });
        })
        
    }
});
