import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import imgHomeRigthBg from "../../img/img-home-rigth-bg.jpg";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid main-div-class">
			<div className="row">
				<div className="container home-title-class">
					<h1>Bienvenido a QR+Service</h1>
					<p>Regístrese y conozca el servicio que ponemos a su disposición</p>
				</div>

				<div className="col-md-8 home-left-class m-2 p-0">
					<div className="home-left-top-class"></div>
				</div>
			</div>

			<div className="home-button-action-class">
				<NavLink to="register">
					<Button className="button-register-class" variant="btn btn-warning btn-lg">
						<i className="fas fa-qrcode"></i> Quiero registrarme <i className="fas fa-qrcode"></i>
					</Button>
				</NavLink>
			</div>
		</div>
	);
};
