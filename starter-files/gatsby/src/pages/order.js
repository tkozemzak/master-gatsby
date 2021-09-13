import React, { useState } from 'react';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const OrdersPage = ({ data }) => {
	const pizzas = data.pizzas.nodes;

	const { values, updateValue } = useForm({
		name: '',
		email: '',
	});

	const { order, addToOrder, removeFromOrder, clearOrder } = usePizza({
		pizzas,
		inputs: values,
	});

	return (
		<>
			<SEO title='Order a Pizza!' />
			<OrderStyles>
				<fieldset>
					<legend>Your Info</legend>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						id='name'
						value={values.name}
						onChange={updateValue}
					/>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						name='email'
						id='id'
						value={values.email}
						onChange={updateValue}
					/>
				</fieldset>
				<fieldset className='menu'>
					<legend>Menu</legend>
					{pizzas.map((pizza) => {
						return (
							<MenuItemStyles key={pizza.id}>
								<Img
									width='50'
									height='50'
									fluid={pizza.image.asset.fluid}
									alt={pizza.name}
								/>
								<div>
									<h2>{pizza.name}</h2>
								</div>
								<div>
									{['S', 'M', 'L'].map((size) => {
										return (
											<button
												type='button'
												key={size}
												onClick={() =>
													addToOrder({
														id: pizza.id,
														size,
													})
												}>
												{size}{' '}
												{formatMoney(calculatePizzaPrice(pizza.price, size))}
											</button>
										);
									})}
								</div>
							</MenuItemStyles>
						);
					})}
				</fieldset>
				<fieldset className='order'>
					<legend>Order</legend>
					<PizzaOrder
						order={order}
						removeFromOrder={removeFromOrder}
						pizzas={pizzas}
					/>
				</fieldset>
				<fieldset>
					<h3>Your Total is: {calculateOrderTotal(order, pizzas)}</h3>
					<div>
						<button className='order-btn' type='submit'>
							Order Now
						</button>
						{order.length ? (
							<button className='order-btn' onClick={clearOrder}>
								Clear Cart
							</button>
						) : null}
					</div>
				</fieldset>
			</OrderStyles>
		</>
	);
};

export const query = graphql`
	query {
		pizzas: allSanityPizza {
			nodes {
				name
				id
				slug {
					current
				}
				price
				image {
					asset {
						fluid(maxWidth: 100) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;

export default OrdersPage;
