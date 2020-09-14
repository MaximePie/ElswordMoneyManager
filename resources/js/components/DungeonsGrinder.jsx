import React, {useEffect, useState} from 'react';
import server from "../server";
import DungeonProduct from './DungeonProduct';

export default function DungeonsGrinder({productsList}) {

	const [newDungeonName, setNewDungeonName] = useState('');
	const [selectedDungeon, setSelectedDungeon] = useState(undefined);
	const [searchedProduct, setSearchedProduct] = useState(undefined);
	const [time, setTime] = useState(undefined);
	const [coins, setCoins] = useState(0);

	const [dungeons, setDungeons] = useState([]);
	const [displayedProducts, setDisplayedProducts] = useState([]);
	const [dungeonProducts, setDungeonProducts] = useState([]);

	const [dungeonCurrentRunPrice, setDungeonCurrentRunPrice] = useState(0);
	const [dungeonPrices, setDungeonPrices] = useState([]);

	useEffect(() => {
		if (productsList) {
			const currentlyDisplayedProducts = productsList.filter((product) => {
				return product.name.includes(searchedProduct)
			});

			if (searchedProduct) {
				setDisplayedProducts(currentlyDisplayedProducts);
			} else {
				setDisplayedProducts(productsList);
			}
		}

	}, [searchedProduct, productsList]);

	useEffect(() => {
		fetchDungeons();
	}, []);

	useEffect(() => {
		if (selectedDungeon) {
			fetchDungeonProducts();
		}
	}, [selectedDungeon]);

	useEffect(() => {
		if (dungeonProducts.length) {
			const currentDungeonPrices = [...dungeonPrices];
			dungeonProducts.forEach(product => {
				currentDungeonPrices[product.id] = 0;
			});
		}
	}, [dungeonProducts]);

	/**
	 * Update the current run price based on the products dungeon prices
	 */
	useEffect(() => {
		if (dungeonPrices.length) {
			const filteredPrices = [...dungeonPrices]
				.filter(price => {
					console.log(price);
					return !!price
				});

			if (filteredPrices.length) {
				setDungeonCurrentRunPrice(filteredPrices
					.reduce((accumulator, currentValue) => {
						return accumulator + currentValue
					}))
			}
			else {
				setDungeonCurrentRunPrice(0);
			}
		}
	}, [dungeonPrices]);

	return (
		<div className="DungeonsGrinder">
			<div className="DungeonsGrinder__list">
				<div className="DungeonsGrinder__add-dungeon-zone">
					<input type="text" className="DungeonGrinder__add-dungeon-input" onChange={
						(event) => setNewDungeonName(event.target.value)
					}/>
					<button onClick={addDungeon}>Enregistrer</button>
				</div>
				<div className="DungeonsGrinder__list-dungeons">
					{dungeons.map((dungeon => {
						return (
							<div className="DungeonsGrinder__list-dungeon" onClick={() => setSelectedDungeon(dungeon)}>
								{dungeon.name}
							</div>
						)
					}))}
				</div>
			</div>
			{selectedDungeon && (
				<div className="DungeonsGrinder__details">
					<div className="DungeonsGrinder__details-header">
						<span className="DungeonsGrinder__title">
							{selectedDungeon.name}
						</span>
						<span className="DungeonsGrinder__average">
							{selectedDungeon.averageRewards}
						</span>
						<span className="DungeonsGrinder__time">
							{selectedDungeon.averageTime} seconds
						</span>
					</div>

					<div className="DungeonsGrinder__products-list">
						{dungeonProducts?.map(product =>
							<DungeonProduct product={product} onPriceUpdate={onPriceUpdate}/>
						)}
					</div>
					<div className="DungeonsGrinder__products-actions">
						<div className="DungeonsGrinder__timer">
							<span>Argent récolté</span>
							<input className="DungeonsGrinder__input" onChange={(event) =>
								setCoins(event.target.value)
							}/>
							<span>Temps passé dessus là</span>
							<input className="DungeonsGrinder__input" onChange={(event) =>
								setTime(event.target.value)
							}/>
						</div>
						<div className="DungeonsGrinder__global-actions">
							<span className="DungeonsGrinder__product-total">
								{dungeonCurrentRunPrice}
								<i className="fas fa-caret-down"/>
							</span>
							<button
								className="DungeonsGrinder__submit"
								onClick={saveDungeonRun}
								disabled={!time || !dungeonCurrentRunPrice}
							>
								Sauvegarder
							</button>
						</div>
						<div className="DungeonsGrinder__product-input">
							<input className="DungeonsGrinder__input" onChange={(event) =>
								setSearchedProduct(event.target.value)
							}/>
							{displayedProducts.length && displayedProducts.map((product) => {
								return (
									<div className="DungeonsGrinder__product-input-row" onClick={() => addProduct(product)}>
										{product.name}
									</div>
								)
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);

	/**
	 * Add a product to the selected products on a dungeon and update the SelectedProducts List
	 */
	function addProduct(product) {
		server.get("addDungeonProduct/" + product.id + "/" + selectedDungeon.id).then(fetchDungeonProducts);
	}

	/**
	 * Create a new Dungeon
	 */
	function addDungeon() {
		server.post('addDungeon', {name: newDungeonName}).then(fetchDungeons);
	}

	/**
	 * Fetch the Dungeons and set it
	 */
	function fetchDungeons() {
		server.get('dungeons').then((response) => {
			const {dungeons} = response.data;
			if (dungeons) {
				setDungeons(dungeons)
			}
		})
	}

	/**
	 * Fetch the dungeonProducts and set it
	 */
	function fetchDungeonProducts() {
		server.get(`dungeonProducts/${selectedDungeon.id}`).then((response) => {
			const {dungeonProducts: dungeonProductsData} = response.data;
			if (dungeonProductsData) {
				setDungeonProducts(dungeonProductsData);
			} else {
				setDungeonProducts([]);
			}
		})
	}

	/**
	 * Update the price for the current Secret Dungeon
	 * @param dungeonProductId number The id of the dungeon product
	 * @param newPrice number The new price of the corresponding dungeon product
	 */
	function onPriceUpdate(dungeonProductId, newPrice) {
		const updatedDungeonPrices = [...dungeonPrices];
		updatedDungeonPrices[dungeonProductId] = newPrice;
		setDungeonPrices(updatedDungeonPrices);
	}

	/**
	 * Send the current gained PP to the
	 */
	function saveDungeonRun() {
		server.post('dungeonRun/' + selectedDungeon.id, {
			earnedCoins: dungeonCurrentRunPrice + coins,
			time
		}).then(fetchDungeons);
	}
}
