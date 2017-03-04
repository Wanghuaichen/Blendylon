/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

export default class Window
{
	constructor(engine)
	{
		window.addEventListener('resize', _ =>
		{
			engine.resize();
		});
	}
}
