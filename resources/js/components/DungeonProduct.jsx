import React, {useEffect, useState} from 'react';

export default function DungeonProduct({onPriceUpdate, product}) {

	const [amount, setAmount] = useState(0);
	const [currentPrice, setCurrentPrice] = useState(0);

	useEffect(() => {
		const newPrice = amount * product.product.current_price;
		setCurrentPrice(newPrice);
		onPriceUpdate(product.id, newPrice)
	}, [amount]);

  return (
    <div className="DungeonProduct">
			<input
				type="text"
				className="DungeonProduct__product-quantity"
				value={amount}
				onChange={(event) => setAmount(parseInt(event.target.value))}
			/>
			<div className="DungeonsGrinder__product-identifier">
				{product.product.name}
			</div>
			<div className="DungeonProduct__product-price">
				{currentPrice}
			</div>
    </div>
  );
}
