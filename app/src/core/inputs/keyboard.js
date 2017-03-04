/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */
export default class Keyboard
{
	constructor()
	{
		this.ctrl = false;
		this.shift = false;


		window.addEventListener('keydown', (e) => {
			this.ctrl = e.ctrlKey;
			this.shift = e.shiftKey;
		});

		window.addEventListener('keyup', (e) => {
			this.ctrl = e.ctrlKey;
			this.shift = e.shiftKey;
		})
	}
}
