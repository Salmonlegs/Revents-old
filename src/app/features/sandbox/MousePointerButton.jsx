import React from 'react';
import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import DisplayMouse from './DisplayMouse';

export default function MousePointerButton() {
	const [displayMouseLocation, setDisplayMouseLocation] = useState(false);

	return (
		<div>
			<Button
				content={displayMouseLocation ? 'Hide mouse location' : 'Show mouse location'}
				onClick={() => setDisplayMouseLocation(!displayMouseLocation)}
			></Button>
			{displayMouseLocation && <DisplayMouse />}
		</div>
	);
}
