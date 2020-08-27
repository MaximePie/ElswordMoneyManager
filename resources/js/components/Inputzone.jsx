import React from 'react';
import server from "../server";

export default function Inputzone(props) {

	const {
		onProductUpdate,
		onCharacterUpdate,
		charactersList,
		onFilter,
		filteredCharacter,
	} = props;


	const [product, setProduct] = React.useState('');
	const [characterName, setCharacterName] = React.useState('');
	const [selectedCharacter, setSelectedCharacter] = React.useState(undefined);

	return (
		<div className="Inputzone">
			<div className="Inputzone__main-fields">
				<div className="Inputzone__field">
					<span className="Inputzone__label">
							Personnage
					</span>
					<input
						type="text"
						className="Inputzone__input"
						placeholder="Personnage"
						onChange={(event) => {
							setCharacterName(event.target.value)
						}}/>
					<button disabled={characterName === ''} className="Inputzone__submit" onClick={createCharacter}
									type="submit">Enregistrer
					</button>
				</div>
				<div className="Inputzone__field">
					<span className="Inputzone__label">
							Produit
					</span>
					<input
						className="Inputzone__input"
						type="text"
						placeholder="Produit"
						onChange={(event) => {
							setProduct(event.target.value)
						}}/>
					{charactersList.length !== 0 && (
						<select className="Inputzone__input" name="character" onChange={(event) => {
							setSelectedCharacter(event.target.value)
						}}>
							<option value={null}/>
							{charactersList.map((character) => {
								return (
									<option value={character.id}>
										{character.name}
									</option>
								)
							})}
						</select>
					)}
					<button
						disabled={product === ''}
						className="Inputzone__submit"
						onClick={createProduct}
						type="submit">Enregistrer
					</button>
				</div>
			</div>
			<div className="Inputzone__filter">
				{charactersList.length !== 0 && (
					<select
						className="Inputzone__input" name="character"
						onChange={(event) => {
						onFilter(event.target.value)
					}}
						value={filteredCharacter || null}
					>
						<option value={null}/>
						{charactersList.map((character) => {
							return (
								<option value={character.id}>
									{character.name}
								</option>
							)
						})}
					</select>
				)}
			</div>
		</div>
	);


	/**
	 * Sends character name to the backoffice to create an item
	 */
	function createCharacter() {
		setCharacterName('');
		server.post('character', {name: characterName}).then(() => {
			onCharacterUpdate();
		});
	}

	/**
	 * Sends product name to the backoffice to create an item
	 */
	function createProduct() {
		setProduct('');
		server.post('product', {name: product, selectedCharacter}).then(() => {
			onProductUpdate();
		});
	}
}
