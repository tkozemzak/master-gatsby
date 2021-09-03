import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 4rem;
	a {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 0 1rem;
		align-items: center;
		padding: 5px;
		background: var(--grey);
		border-radius: 2px;
		.count {
			background: white;
			padding: 2px 5px;
		}
		.active {
			background: var(--yellow);
		}
	}
`;

const countPizzasInToppings = (pizzas) => {
	//map over pizzas to get a full array of toppings
	const counts = pizzas
		.map((pizza) => pizza.toppings)
		.flat()
		.reduce((acc, topping) => {
			//count how many pizzas have the same toppings and keep track of total count
			const existingTopping = acc[topping.id];
			if (existingTopping) {
				existingTopping.count += 1;
			} else {
				acc[topping.id] = {
					id: topping.id,
					name: topping.name,
					count: 1,
				};
			}

			return acc;
		}, {});
	//sort toppings by count
	const sortedToppings = Object.values(counts).sort((a, b) => {
		return b.count - a.count;
	});

	return sortedToppings;
};

const ToppingsFilter = () => {
	const { toppings, pizzas } = useStaticQuery(graphql`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
					vegetarian
				}
			}
			pizzas: allSanityPizza {
				nodes {
					toppings {
						name
						id
					}
				}
			}
		}
	`);
	const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

	return (
		<ToppingsStyles>
			{/* map over each topping and display name + count */}
			{toppingsWithCounts.map((topping) => (
				<Link to={`/topping/${topping.name}`} key={topping.id}>
					<span className='name'>{topping.name}</span>
					<span className='count'>{topping.count}</span>
				</Link>
			))}
		</ToppingsStyles>
	);
};

export default ToppingsFilter;