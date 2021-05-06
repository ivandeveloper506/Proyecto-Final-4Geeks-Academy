import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import PersonTable from "./person-table";

export default function Person() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-5">
			<PersonTable />
		</div>
	);
}
