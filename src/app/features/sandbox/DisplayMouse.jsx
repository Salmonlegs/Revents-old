import React from 'react';
import { useState, useEffect } from 'react';

export default function DisplayMouse() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const logMousePosition = (e) => {
		setX(e.clientX);
		setY(e.clientY);
	};

	useEffect(() => {
		window.addEventListener('mousemove', logMousePosition);
		return () => {
			window.removeEventListener('mousemove', logMousePosition);
		};
	}, []);

	return (
		<span>
			Your mouse is located at: {y}(y) &nbsp;{x}(x)
		</span>
	);
}
