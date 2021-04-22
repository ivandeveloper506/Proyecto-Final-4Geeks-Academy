import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import imgHomeRigthBg from "../../img/img-home-rigth-bg.jpg";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid main-div-class">
			{/* <div className="d-flex justify-content-center"> */}
			<div className="row">
				<div className="col-md-8 home-left-class m-2 p-0">
					<h1>Bienvenido a QR+Services</h1>
					<h1>Conozca todo lo que ponemos a su disposición registrandose en nuestra aplicación</h1>
				</div>
				<div className="col-md home-rigth-class m-2 p-0">
					<img
						className="cardImage"
						src={imgHomeRigthBg}
						alt="Image home rigth"
						width="100%"
						height="500px"
					/>
					<div className="home-rigth-top-class">Soy QR</div>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
};
