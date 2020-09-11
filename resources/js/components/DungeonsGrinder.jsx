import React from 'react';

export default function DungeonsGrinder(props) {

	const [selectedDungeon, setSelectedDungeon] = React.useState(undefined);

	return (
		<div className="DungeonsGrinder">
			<div className="DungeonsGrinder__list">
				<div className="DungeonsGrinder__list-dungeon">
					Donjon secret LOL
				</div>
			</div>
			<div className="DungeonsGrinder__details">
				<div className="DungeonsGrinder__details-header">
					<span className="DungeonsGrinder__title">
						Donjon secret
					</span>
					<span className="DungeonsGrinder__average">
						1 399 999 PP
					</span>
				</div>

				<div className="DungeonsGrinder__products-list">
					<div className="DungeonsGrinder__product">
						<input type="text" className="DungeonsGrinder__product-quantity" value={10}/>
						<div className="DungeonsGrinder__product-identifier">
							Fragments de cercle d'enchantement
						</div>
						<div className="DungeonsGrinder__product-price">
							199 999 PP
						</div>
					</div>
					<div className="DungeonsGrinder__product">
						<input type="text" className="DungeonsGrinder__product-quantity" value={10}/>
						<div className="DungeonsGrinder__product-identifier">
							Fragments d'Eldrit
						</div>
						<div className="DungeonsGrinder__product-price">
							50 000pp
						</div>
					</div>
					<div className="DungeonsGrinder__product">
						<input type="text" className="DungeonsGrinder__product-quantity" value={10}/>
						<div className="DungeonsGrinder__product-identifier">
							Eau fraîche
						</div>
						<div className="DungeonsGrinder__product-price">
							12 000PP
						</div>
					</div>
					<div className="DungeonsGrinder__product">
						<input type="text" className="DungeonsGrinder__product-quantity" value={10}/>
						<div className="DungeonsGrinder__product-identifier">
							Bonnes herbes sa mère
						</div>
						<div className="DungeonsGrinder__product-price">
							4999 PP
						</div>
					</div>
				</div>
				<div className="DungeonsGrinder__products-actions">
					<div className="DungeonsGrinder__product-input">
						<div className="DungeonsGrinder__input" style={{border: "solid"}}>
							SearchableInputHERE
						</div>
						<button>OK +</button>
					</div>
					<div className="DungeonsGrinder__global-actions">
						<span className="DungeonsGrinder__product-total">
							999 999
							<i className="fas fa-caret-down"/>
						</span>
						<button className="DungeonsGrinder__submit">
							Sauvegarder maggle!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
