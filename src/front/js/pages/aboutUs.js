import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/test9.jpg";
import "../../styles/home.scss";

export const AboutUs = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Pantalla Acerca de Nosotros</h1>
		</div>
	);
};
