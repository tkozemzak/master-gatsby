import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = ({ data, pageContext }) => {
	const pizzas = data.pizzas.nodes;

	return (
		<>
			<ToppingsFilter activeTopping={pageContext.topping}/>
			<h1>There are {pizzas.length} pizzas available:</h1>
			<PizzaList pizzas={pizzas} />
		</>
	);
};

export const query = graphql`
	query PizzaQuery($topping: [String]) {
		pizzas: allSanityPizza(
			filter: { toppings: { elemMatch: { name: { in: $topping } } } }
		) {
			nodes {
				name
				id
				slug {
					current
				}
				toppings {
					id
					name
				}
				image {
					asset {
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;

export default PizzasPage;
