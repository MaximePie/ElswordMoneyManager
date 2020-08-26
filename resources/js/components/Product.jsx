import React from 'react';

export default function Product(props) {
	const {product} = props;

	return (
		<div className="Product">
      <span className="Product__field">
        {product.name + ' '}
      </span>
			<span className="Product__field">
        {product.current_price + ' '}
      </span>
			{props.children}
		</div>
	);
}
