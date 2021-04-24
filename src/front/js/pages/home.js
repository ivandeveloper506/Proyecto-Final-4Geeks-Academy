import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import "../../styles/home-card.scss";
import imgHomeQR from "../../img/img-qr-home-bg.jpg";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
<<<<<<< HEAD
		<div classNameName=" logoCompany text-center  imgmain-className">
			<header className="w3-container w3-red w3-center">
				<div className="raw text-center">
					<div className="row">
						<div className=" col-md-4 col-sm-6" />
						<div className=" col-md-4 col-sm-6">
							<h1 className="w3-margin w3-jumbo">QR+</h1>
							<p className="w3-xlarge">Qué mejor que tenerlo como un QR </p>
							<p className="w3-xlarge">
								About the company Ut congue augue non tellus bibendum, in varius tellus condimentum. In
								scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices
								eleifend. Integer tellus est, vehicula eu lectus tincidunt, ultricies feugiat leo.
								Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh
								mollis, tristique ante sed, viverra massa.
							</p>
							<a href="/login" className="btn btn-danger">
								Registrarse Aquí
							</a>
						</div>
					</div>
				</div>
			</header>
=======
		<div className="container-fluid main-div-class">
			<div className="row">
				<div className="container home-title-class">
					<h1>Bienvenido a QR+Service</h1>
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
							Quiero registrarme <i className="fas fa-pen"></i>
						</Button>
					</NavLink>
				</div>
			</div>
>>>>>>> b5eb5ecfd162b459b871a35c50cfc1840d9a5b1c
		</div>
	);
};
