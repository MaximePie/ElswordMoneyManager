import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import server from "../server";

export default function Navbar(props) {

	const [nextTarget, setNextTarget] = useState(undefined);
	useEffect(() => {
		fetchNextTarget();
	}, [])

	return (
		<div className="Navbar">
			<Link to='/' className="Navbar__link">Tableau</Link>
			<Link to='/add' className="Navbar__link">Ajouter</Link>
			<Link to='/dungeons' className="Navbar__link">Donjons</Link>
			<Link to='/catalog' className="Navbar__link">Catalogue</Link>
			{nextTarget && (
				<span className="Navbar__target">Next target : {nextTarget.name} - {nextTarget.price}</span>
			)}
		</div>
	);

	/**
	 * Fetch the nextTarget and set it
	 */
	function fetchNextTarget() {
		server.get('nextTarget').then((response) => {
			const { nextEquipment } = response.data;
			if (nextEquipment) {
				setNextTarget(nextEquipment)
			}
		})
	}
}
