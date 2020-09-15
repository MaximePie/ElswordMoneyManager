import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../../fontawesome/all';
import server from "../server";
import "../../sass/base.scss";

import FilterZone from "./FilterZone";
import Inputzone from "./Inputzone";
import Navbar from "./Navbar";
import Product from "./Product";
import DungeonsGrinder from "./DungeonsGrinder";
import EquipmentsPage from "./EquipmentsPage";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';


function App() {

	const [productsList, setProductsList] = React.useState([]);
	const [charactersList, setCharactersList] = React.useState([]);
	const [filteredCharacter, setFilteredCharacter] = React.useState(undefined);
	const [editedProduct, setEditedProduct] = React.useState(undefined);
	const [productPrices, setProductPrices] = React.useState(undefined);
	const [price, setPrice] = React.useState('');

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

	return (
		<div className="App">
			<BrowserRouter history={createBrowserHistory}>
				<Navbar/>
				<Switch>
					<Route path='/' exact>
						<div className="App__content">
							<FilterZone
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
											onDelete={fetchProducts}
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
					</Route>
					<Route path={'/add'} exact>
						<Inputzone
							onProductUpdate={fetchProducts}
							onCharacterUpdate={fetchCharacters}
							charactersList={charactersList}
							onFilter={setFilteredCharacter}
							filteredCharacter={filteredCharacter}
						/>
					</Route>
					<Route path='/dungeons'>
						<DungeonsGrinder productsList={productsList}/>
					</Route>
					<Route path='/catalog'>
						<EquipmentsPage/>
					</Route>
				</Switch>
			</BrowserRouter>
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

		let newPrice = 0;
		if (productPrices && productPrices.length)
		{
			/**
			 * Inferior to the lowest price
			 */
			console.log("Entering productPrices");
			console.log("0 : " + productPrices[0].price);
			console.log("Last : " + productPrices[productPrices.length - 1].price);
			const intPrice = parseInt(price, 10);
			const priceInterval = productPrices - price;
			if (price < productPrices[0].price) {
				newPrice = intPrice - priceInterval
			}
			else if (price > productPrices[productPrices.length - 1].price) {
				newPrice = intPrice + priceInterval
			}
		}

		console.log(newPrice)

		server.post('productPrice', {price, productId: editedProduct.id}).then(() => {
			setPrice(newPrice);
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
