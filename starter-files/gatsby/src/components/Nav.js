import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';
import OrderContext from './OrderContext';

const NavStyles = styled.nav`
	margin-bottom: 3rem;
	.logo {
		transform: translateY(-25%);
	}
	ul {
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr auto 1fr 1fr;
		grid-gap: 2rem;
		text-align: center;
		list-style: none;
		align-items: center;
		margin-top: -6rem;
	}
	li {
		--rotate: -1deg;
		transform: rotate(var(--rotate));
		order: 1;
		&:nth-child(1) {
			--rotate: -2.5deg;
		}
		&:nth-child(2) {
			--rotate: -2.5deg;
		}
		&:nth-child(4) {
			--rotate: 2.5deg;
		}
		&:hover {
			--rotate: 3deg;
		}
	}
	a {
		font-size: 3rem;
		text-decoration: none;
		&:hover {
			color: var(--red);
		}
		&[aria-current='page'] {
			color: var(--red);
		}
	}
`;

const Nav = () => {
	const [order] = useContext(OrderContext);

	return (
		<NavStyles>
			<ul>
				<li>
					<Link to='/'> Hot Now </Link>
				</li>
				<li>
					<Link to='/pizzas'> Pizza Menu </Link>
				</li>
				<li>
					<Link to='/'>
						<Logo />
					</Link>
				</li>
				<li>
					<Link to='/slicemasters'> SliceMasters </Link>
				</li>
				<li>
					<Link to='/order'>Order Ahead</Link>
					{order.length ? (
						<p style={{ fontSize: '10px' }}>
							(
							{order.length === 1
								? `${order.length} item in cart`
								: `${order.length} items in cart`}
							)
						</p>
					) : null}
				</li>
			</ul>
		</NavStyles>
	);
};

export default Nav;
