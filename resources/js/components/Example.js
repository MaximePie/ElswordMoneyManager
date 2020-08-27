import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../../fontawesome/all';
import server from "../server";
import "../../sass/base.scss";

import Inputzone from "./Inputzone";
import Product from "./Product";

function App() {

	const [productsList, setProductsList] = React.useState([]);
	const [charactersList, setCharactersList] = React.useState([]);
	const [filteredCharacter, setFilteredCharacter] = React.useState(undefined);
	const [editedProduct, setEditedProduct] = React.useState(undefined);
	const [productPrices, setProductPrices] = React.useState(undefined);
	const [price, setPrice] = React.useState(undefined);

	useEffect(() => {
		fetchProducts();
		fetchCharacters();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [filteredCharacter]);

	useEffect(() => {
		if (editedProduct) {
			fetchProductPrices();
		}
	}, [editedProduct]);

	console.log(filteredCharacter);

	return (
		<div className="App">
			<div className="App__content">
				<Inputzone
					onProductUpdate={fetchProducts}
					onCharacterUpdate={fetchCharacters}
					charactersList={charactersList}
					onFilter={setFilteredCharacter}
					filteredCharacter={filteredCharacter}
				/>
				<div className="App__products-list">
					{productsList.map(product => {
						return (
							<Product
								product={product}
								charactersList={charactersList}
								onUpdateSelectedCharacter={onUpdateSelectedCharacter}
								onEdit={() => setEditedProduct({...product})}
								onPriceUpdate={updateCurrentPrice}
							/>
						)
					})}
				</div>
				{editedProduct && (
					<div className="App_product">
						<h3>{editedProduct.name}</h3>
						{productPrices && productPrices.map((price) => {
							return (
								<div className="App__price">
									{' ' + price.price}
									{' ' + price.success}
									{' ' + price.failed}
									{' ' + price.rate}%
								</div>
							)
						})}
						<input type="text" className="App__field" onChange={(event) => {
							setPrice(event.target.value)
						}}/>
						<button onClick={createProductPrice} type="submit">Enregistrer</button>
					</div>
				)}
			</div>
		</div>
	);

	/**
	 * Fetch the Characters and set it
	 */
	function fetchCharacters() {
		server.get('characters').then((response) => {
			const {characters} = response.data;
			if (characters) {
				setCharactersList(characters)
			}
		})
	}

	/**
	 * Fetch the products and set it
	 */
	function fetchProducts() {

		const url = filteredCharacter ? `products/${filteredCharacter}` : 'products';

		server.get(url).then((response) => {
			const {products} = response.data;
			if (products) {
				setProductsList(products)
			}
		})
	}

	/**
	 * Fetch the ProductInfo and set it
	 */
	function fetchProductPrices() {
		server.get(`product/${editedProduct.id}`).then((response) => {
			const {productPrices} = response.data;
			if (productPrices) {
				setProductPrices(productPrices)
			}
		})
	}

	/**
	 * Create the Product Price
	 */
	function createProductPrice() {
		server.post('productPrice', {price, productId: editedProduct.id}).then(() => {
			setPrice('');
			fetchProductPrices();
		});
	}

	/**
	 * Update the current price
	 */
	function updateCurrentPrice(updatedProduct, success) {
		fetchProducts();
		if (editedProduct) {
			fetchProductPrices();
		}
	}

	/**
	 * Update the selected character
	 */
	function onUpdateSelectedCharacter() {
		fetchProducts();
		fetchCharacters();
		if (editedProduct) {
			fetchProductPrices();
		}
	}
}

export default App;

if (document.getElementById('root')) {
	ReactDOM.render(<App/>, document.getElementById('root'));
}
