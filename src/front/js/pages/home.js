import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import "../../styles/home-card.scss";
import imgHomeQR from "../../img/img-qr-home-bg.jpg";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import imgSubscribe from "../../img/img-subscriber.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid main-div-class">
			<div className="row">
				<div className="container home-title-class">
					<h1>QR+Service</h1>
					<p>Regístrese y conozca el servicio que ponemos a su disposición</p>
				</div>

				<div className="col-md-8 home-left-class m-2 p-0">
					<div className="home-left-top-class">
						<img className="img-qr-home-class" src={imgHomeQR} alt="Image QR" />
					</div>
				</div>
			</div>

			<div className="col-md-12">
				<div className="home-button-action-class">
					<NavLink to="register">
						<Button className="button-register-class" variant="btn btn-warning btn-lg">
							Quiero registrarme <i className="fas fa-pen " />
						</Button>
					</NavLink>
				</div>
			</div>
		</div>
	);
};
