import { Link } from "gatsby";
import React from "react";

const SinglePizza = ({ pizza }) => {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(", ")}</p>
      </Link>
      <img src={pizza.image.asset.fluid.src} />
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
