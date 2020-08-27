import React from 'react';
import server from "../server";

export default function Product(props) {
	const { product, charactersList, onSelectedCharacter, onEdit, onPriceUpdate} = props;

	return (
		<div className="Product">
      <span className="Product__field">
        {product.name + ' '}
      </span>
			<span className="Product__field">
        {product.current_price + ' '}
      </span>
			<span className="Product__field">
				{charactersList.length !== 0 && (
					<select
						name="character"
						value={product.character?.id}
						onChange={(event) => {updateSelectedCharacter(event.target.value, product.id)}}>
						<option value={undefined}/>
						{charactersList.map((character) => {
							return (
								<option value={character.id}>
									{character.name}
								</option>
							)
						})}
					</select>
				)}
			</span>
			<span className="Product__field" onClick={() => deleteProduct(product.id)}>
				<i className="fas fa-trash"/>
			</span>
			<span className="Product__field" onClick={onEdit}>
				<i className="fas fa-edit"/>
			</span>
			<span className="Product__field" onClick={() => {updateCurrentPrice(product, true)}}>
				<i className="fas fa-plus"/>
			</span>
			<span className="Product__field" onClick={() => {updateCurrentPrice(product, false)}}>
				<i className="fas fa-minus"/>
			</span>
			{props.children}
		</div>
	);


	/**
	 * Update the selected character
	 */
	function updateSelectedCharacter(characterId, productId) {
		server.post(`updateSelectedCharacter/${productId}`, {characterId}
		).then(() => {
			onSelectedCharacter();
		})
	}

	/**
	 * Deletes the targeted product
	 * @param productId
	 */
	function deleteProduct(productId) {
		server.get(`products/delete/${productId}`).then(fetchProducts);
	}


	/**
	 * Update the current price
	 */
	function updateCurrentPrice(updatedProduct, success) {
		server.post('updateProductPrice', {
				productPriceId: updatedProduct.current_price_id,
				success, productId: updatedProduct.id
		}).then(onPriceUpdate);
	}
}
