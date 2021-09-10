import React, { useState } from 'react';

export default function useForm(defaults) {
	const [values, setValues] = useState(defaults);

	function updateValue(e) {
		//check if it is a number and convert it
		let value = e.target.value;

		if (e.target.type === 'number') {
			value = parseInt(value);
		}

		setValues({
			//copy existing values into it
			...values,
			//update new value that changed
			[e.target.name]: value,
		});
	}

	return { values, updateValue };
}
