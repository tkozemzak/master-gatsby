import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
	//get template for page
	const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
	//query all pizzas
	const { data } = await graphql(`
		query {
			pizzas: allSanityPizza {
				nodes {
					name
					slug {
						current
					}
				}
			}
		}
	`);
	//loop over each pizza
	data.pizzas.nodes.forEach((pizza) => {
		actions.createPage({
			path: `pizza/${pizza.slug.current}`,
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			},
		});
	});
}

async function turnToppingsIntoPages({ graphql, actions }) {
	const toppingsTemplate = path.resolve('./src/pages/pizzas.js');

	const { data } = await graphql(`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
				}
			}
		}
	`);

	data.toppings.nodes.forEach((topping) => {
		actions.createPage({
			path: `topping/${topping.name}`,
			component: toppingsTemplate,
			context: {
				topping: topping.name,
			},
		});
	});
}

export async function createPages(params) {
	//Create pages dynamically
	await Promise.all([
		turnPizzasIntoPages(params),
		turnToppingsIntoPages(params),
	]);
}
