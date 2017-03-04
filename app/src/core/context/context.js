/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import Event from '../events/Event';

export default class Context extends Event
{
    constructor(type, options)
    {
        super();

        this.type     = type || undefined;
        this.options  = options || [];
        this.title    = '';
        this.icon     = '';
        this.offset   = new BABYLON.Vector2(125, 80);
        this.position = new BABYLON.Vector2.Zero();
        this.visible  = false;
    }

    setTitle(title) {
        this.title = title;
    }

    setIcon(icon) {
        this.icon = icon;
    }

    setOptions(options)
    {
        this.options = [];

        for(let option in options)
        {
            this.options.push({
                name  : option,
                value : options[option]
            });
        }
    }

    setPosition(position, centered)
    {
        if(typeof centered == 'undefined')
            centered = false;

        this.position = new BABYLON.Vector2(
            position.x - (centered ? this.offset.x : 0),
            position.y - (centered ? this.offset.y : 0)
        );
    }

    switch(centered = false)
    {
        if(this.visible)
        {
            this.hide();
            setTimeout(_ => this.show(centered), 1);
        }
        else
            this.show(centered);
    }

    toggle() {
        this.visible = !!this.visible !== true;
    }

    show(centered) {
        this.visible = true;

        if(centered) {
            setTimeout(() => {
                let viewport = $('#viewport_container');
                let viewportOptions = $('.viewport_options');
                let context = $('#context_form');
                let tools = $('#tools_list');
                let isToolsHidden = tools.css('display') == 'none';
                let isViewportOptionsHidden = viewportOptions.css('display') == 'none';
                let toolsWidth = !isToolsHidden ? tools.width() : 0;
                let viewportOptionsWidth = !isViewportOptionsHidden ? viewportOptions.width() : 0;


                this.setPosition(new BABYLON.Vector2(
                    ((viewport.width() + (toolsWidth || 0) - (viewportOptionsWidth || 0)) * 0.5) - (context.width() * 0.5),
                    ((viewport.height() + 39) * 0.5) - (context.height() * 0.5),
                ), false);
            }, 1)
        }
    }

    hide() {
        this.visible = false;
    }
}
