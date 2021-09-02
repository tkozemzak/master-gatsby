import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

const SinglePizza = ({ pizza }) => {
	return (
		<div>
			<Link to={`/pizza/${pizza.slug.current}`}>
				<h2>
					<span className='mark'> {pizza.name} </span>
				</h2>
				<p> {pizza.toppings.map((topping) => topping.name).join(', ')} </p>
				<Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
			</Link>
		</div>
	);
};

const PizzaList = ({ pizzas }) => {
	return (
		<div>
			{pizzas.map((pizza) => {
				return <SinglePizza pizza={pizza} key={pizza.id} />;
			})}
		</div>
	);
};

export default PizzaList;
