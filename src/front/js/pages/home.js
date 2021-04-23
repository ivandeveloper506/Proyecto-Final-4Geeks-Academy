import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div classNameName="text-center mt-5 imgmain-className">
			<header className="w3-container w3-red w3-center">
				<h1 className="w3-margin w3-jumbo">START PAGE</h1>
				<p className="w3-xlarge">Template by w3.css</p>
				<button className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Get Started</button>
			</header>
		</div>
	);
};
