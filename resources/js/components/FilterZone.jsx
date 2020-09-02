import React from 'react';

export default function Component({charactersList, onFilter, filteredCharacter}) {
	return (
		<div className="FilterZone">
			{charactersList.length !== 0 && (
				<>
					<h3>Qui achète ?</h3>
					<select
						className="FilterZone__input" name="character"
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
				</>
			)}
		</div>
	);
}
