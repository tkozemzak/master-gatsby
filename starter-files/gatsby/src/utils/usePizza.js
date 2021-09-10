import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
	//create state to hold order
	const [order, setOrder] = useState([]);

	//make function to add items to order
	function addToOrder(orderedPizza) {
		setOrder([...order, orderedPizza]);
	}
	//make function to remove items from order
	function removeFromOrder(index) {
		setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
	}

	function clearOrder() {
		setOrder([]);
	}

	//TODO send data to serverless function upon checkout

	return {
		order,
		addToOrder,
		removeFromOrder,
		clearOrder,
	};
}
