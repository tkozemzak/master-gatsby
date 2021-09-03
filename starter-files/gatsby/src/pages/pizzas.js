import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = ({ data }) => {
	const pizzas = data.pizzas.nodes;

	return (
		<>
			<ToppingsFilter />
			<h1>There are {pizzas.length} pizzas available:</h1>
			<PizzaList pizzas={pizzas} />
		</>
	);
};

export const query = graphql`
	query PizzaQuery {
		pizzas: allSanityPizza {
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
