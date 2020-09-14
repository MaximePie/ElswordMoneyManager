import React, {useEffect, useState} from 'react';
import server from "../server";

export default function EquipmentsPage({}) {
  const [equipmentsList, setEquipmentsList] = useState([]);

  const [newEquipmentName, setNewEquipmentName] = React.useState('');
  const [newEquipmentPrice, setNewEquipmentPrice] = React.useState('');

  useEffect(() => {
  	fetchEquipmentsList();
	}, []);

	return (
    <div className="EquipmentsPage">
			<div>
				<p>
					<span>Nom</span>
					<input type="text" onChange={(event) => setNewEquipmentName(event.target.value)}/>
				</p>
				<p>
					<span>Price</span>
					<input type="text" onChange={(event) => setNewEquipmentPrice(event.target.value)}/>
				</p>
				<button disabled={!newEquipmentName || !newEquipmentPrice} onClick={createNewEquipment}>Créer</button>
			</div>
			<div>
				{equipmentsList.map(equipment => <p>{equipment.name} -  {equipment.price}</p>)}
			</div>
    </div>
  );

	/**
	 * Fetch the equipmentsList and set it
	 */
	function fetchEquipmentsList() {
		server.get('equipments').then((response) => {
			const {equipments} = response.data;
			if (equipments) {
				setEquipmentsList(equipments)
			}
		})
	}

	/**
	 * Create a new Equipment
	 */
	function createNewEquipment() {
		server.post('equipment', {name: newEquipmentName, price: newEquipmentPrice}).then(fetchEquipmentsList);
	}
}
