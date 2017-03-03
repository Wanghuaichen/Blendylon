/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import Event from '../events/Event'
import Utils from '../../../../../utils/Utility';

export default class Mouse extends Event
{
	constructor()
	{
	    super();
		this.states = [
			{event: 'down',  flag: 'Down',  default: false},
			{event: 'up',    flag: 'Up',    default: true},
			{event: 'move',  flag: 'Hover', default: false},
			{event: 'wheel', flag: 'Wheel', default: false}
		];

		this.tracked = [
			'viewport',
			'entities_list'
		];

		this.config = {
			wheelDelay: 250
		};

		this.timers  = {};

		this.isHover = {};
		this.isDown  = {};
		this.isUp    = {};
		this.isWheel = {};

		this.position = new BABYLON.Vector2.Zero();

		this.init();
	}

	init()
	{
		this.tracked.forEach(tracked => this.initFlags(tracked));

		this.states.forEach(state =>
		{
			let name = Utils.camelize('_on ' + Utils.capitalize(state.event));
			window.addEventListener('mouse' + state.event, this[name].bind(this));
		});
	}

	initFlags(tracked)
	{
		this.states.forEach(state =>
			this['is' + state.flag][tracked] = state.default);
	}

	addTracked(id)
	{
		if(this.tracked.indexOf(id) == -1)
		{
			this.tracked.push(id);
			this.initFlags(id);
		}
	}

	removeFlags(tracked)
	{
		this.states.forEach(state =>
			this['is' + state.flag][tracked]
			? delete this['is' + state.flag][tracked]
			: null
		);
	}

	removeTracked(id)
	{
		this.tracked = this.tracked.filter(x => x !== id);
		this.removeFlags(id);
	}

	toggleTracked(state, event)
	{
	    let self = this;
		this.tracked.forEach(x => {
		    let name = 'is' + Utils.capitalize(state);
            let value = x == event.target.id;
            self[name][x] = value;

            self.emit('toggleTracked', {
                name: name,
                event: Utils.capitalize(state),
                target: event.target,
                value: value
            })
        });
	}

	setTracked(state, value, event)
	{
		this.tracked.forEach(x =>
			x == event.target.id
			? this['is' + Utils.capitalize(state)][x] = value
			: null);
	}

	_onMove(event)
	{
		this.position.x = event.clientX;
		this.position.y = event.clientY;

		this.toggleTracked('hover', event);
	}

	_onDown(event)
	{
		this.setTracked('up', false, event);
		this.setTracked('down', true, event);
	}

	_onUp(event)
	{
		this.setTracked('down', false, event);
		this.setTracked('up', true, event);
	}

	_onWheel(event)
	{
		clearTimeout(this.timers['wheel']);

		this.setTracked('wheel', true, event);

		this.timers['wheel'] = setTimeout(_ =>
			this.setTracked('wheel', false, event)
		, this.config.wheelDelay);
	}
}
