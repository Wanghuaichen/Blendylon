/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import Vue from 'vue'

Vue.directive('window-draggable',
{
    bind: el =>
    {
        let excludes = ['INPUT', 'BUTTON', 'SELECT']

        $(el).on('mousedown', e =>
        {
            if(excludes.indexOf(e.target.tagName) == -1)
            {
                let
                dx = e.pageX - parseFloat(el.style.left),
                dy = e.pageY - parseFloat(el.style.top);

                el.style.cursor = 'move';

                $(window).on('mousemove', e =>
                {
                    let x      = parseFloat(e.pageX) - dx;
                    let y      = parseFloat(e.pageY) - dy;
                    let width  = $(el).width();
                    let height = $(el).height();

                    if(x < 0) x = 0;
                    if(y < 0) y = 0;

                    if((x + width) > window.innerWidth)
                        x = window.innerWidth - width;
                    if((y + height) > window.innerHeight)
                        y = window.innerHeight - height;

                    el.style.left = x + 'px';
                    el.style.top  = y + 'px';
                })
            }
        });

        $(window).on('mouseup', e =>
        {
            $(window).off('mousemove')
            el.style.cursor = 'default'
        })
    }
});
