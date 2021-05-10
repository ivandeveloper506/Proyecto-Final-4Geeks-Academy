import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export default function PersonInfoQr() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personId = parseInt(params.personId);
	const personData = [];

	useEffect(() => {
		actions.getPersonInfoQR(personId);
		actions.activeOption(`/person/infoqr/${personId}`);
		actions.infoQRActive(true);
	}, []);

	// console.log("*** PersonInfoQr [store.PersonInfoQR] ***");
	// console.log(store.PersonInfoQR.results);

	if (store.PersonInfoQR.results != undefined) {
		console.log("*** PersonInfoQr [store.PersonInfoQR] ***");
		console.log(store.PersonInfoQR.results);
		personData = store.PersonInfoQR.results;
	}

	return (
		<div className="container-fluid main-div-class">
			<div className="container">
				<div className="row">
					<div className="col title-page-class">
						<h1>{personData != undefined ? personData["full_name"] : ""}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
