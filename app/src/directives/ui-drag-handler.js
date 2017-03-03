/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

import Vue from 'vue';

const thresholdY = 83;
const thresholdX = 90;
const offset    = 34;

Vue.directive('ui-drag-handler',
{
    bind: (el, binding) =>
    {
        let type = Object.keys(binding.modifiers)[0];
        let a    = Object.keys(binding.value)[0];
        let b    = binding.value[a];
        let $a   = $('#' + a);
        let $b   = $('#' + b);
        let x    = $a.width();
        let y    = $b.height();

        window.addEventListener('resize', _ =>
        {
            if(type == 'vertical')
                dragVertical(a, b, x, window.innerWidth)
            else if(type == 'horizontal')
                dragHorizontal(a, b, y,  window.innerHeight)
        });

        let toPercent = (a, b) => (a / b) * 100

        let refreshTimeline = () => {
            window.timeline.ctx.canvas.width = $('#entities_list').width();
            window.timeline.ctx.canvas.height = $('#entities_list').height();
            window.timeline.graph.draw(window.timeline.ctx);
            window.timeline.cursor.draw(window.timeline.ctx);
        }

        let dragVertical = (a, b, x, screenWidth) =>
        {
            let aWidth   = Math.abs(screenWidth - x);
            let bWidth   = Math.abs(screenWidth - aWidth);
            let aPercent = toPercent(aWidth, screenWidth);
            let bPercent = toPercent(bWidth, screenWidth);

            if(bPercent < thresholdX && aPercent < thresholdX)
            {
                refreshTimeline();

                $('#' + a).css('right', aPercent + '%');
                $('#' + b).css('left', bPercent + '%');
                $(el).css('left', 'calc('+ bPercent +'% - 2px)');
            }
        }

        let dragHorizontal = (a, b, y, screenHeight) =>
        {
            let aHeight   = Math.abs(screenHeight - y + offset);
            let bHeight   = Math.abs(screenHeight - aHeight);
            let bValue    = 'calc('+toPercent(bHeight, screenHeight) + '% - 2px)';
            let aPercent  = toPercent(aHeight, screenHeight);
            let bPercent  = toPercent(bHeight, screenHeight);

            if($(el).hasClass('drag-handler-left-panel'))
            {
                if(bPercent < thresholdY && aPercent < thresholdY)
                {
                    bValue = 'calc('+bPercent + '% - 2px)';

                    refreshTimeline();

                    $('#' + a).css('bottom', 'calc('+aPercent + '% + 2px)');
                    $('#' + b).css('top', bValue);

                    $('#' + b).css('height', aPercent+'%');
                    $(el).css('top', 'calc('+bPercent+'% - 2px)');
                }
            }
            else
            {
                if(bPercent < thresholdY && aPercent < thresholdY)
                {
                    $('#' + a).css('bottom', 'calc('+aPercent + '% + 2px)');
                    $('#' + b).css('top', bValue);

                    $('#' + b).css('height', aPercent+'%');
                    $(el).css('top', 'calc('+bPercent+'% - 2px)');
                }
            }
        }

        el.addEventListener('mousedown', _ =>
        {
            $(window).on('mousemove', event =>
            {
                x = event.clientX;
                y = event.clientY;

                if(type == 'vertical')
                    dragVertical(a, b, x, window.innerWidth)
                if(type == 'horizontal')
                    dragHorizontal(a, b, y, window.innerHeight)
            });

            $(document).on('mouseup', () => $(window).off('mousemove'))
        });
    }
});
