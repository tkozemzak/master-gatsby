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

async function turnSlicemastersIntoPages({ graphql, actions }) {
	const { data } = await graphql(`
		query {
			slicemasters: allSanityPerson {
				totalCount
				nodes {
					name
					id
					slug {
						current
					}
				}
			}
		}
	`);

	const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
	const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

	console.log(
		`there are ${data.slicemasters.totalCount} people and we have ${pageCount} pages with ${pageSize} per page`
	);

	Array.from({ length: pageCount }).forEach((_, i) => {
		console.log(`creating page ${i}`);
		actions.createPage({
			path: `/slicemasters/${i + 1}`,
			component: path.resolve('./src/pages/slicemasters.js'),
			context: {
				skip: i * pageSize,
				currentPage: i + 1,
				pageSize,
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
		turnSlicemastersIntoPages(params),
	]);
}
