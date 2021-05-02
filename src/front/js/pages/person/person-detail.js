import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export default function PersonDetail() {
	const params = useParams();
	const personId = parseInt(params.id);
	const { store, actions } = useContext(Context);

	console.log("*** PersonDetail ***");
	console.log(personId);
	console.log(store.persons);

	return (
		<div className="container">
			{store.persons.map((item, index) => {
				if (personId === index) {
					return <div className="text-white">{item.full_name}</div>;
				}
			})}
		</div>
	);
}
