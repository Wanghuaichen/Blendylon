/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

import Shortcuts from './shortcuts';
import Keyboard from './keyboard';
import Window from './window';
import Mouse from './mouse';

export default class Input
{
	constructor(opts)
	{
		this.engine = opts.engine;

		this.shortcuts = Shortcuts;
		this.keyboard  = new Keyboard(this.engine);
		this.window    = new Window(this.engine);
		this.mouse     = new Mouse();
	}
}
