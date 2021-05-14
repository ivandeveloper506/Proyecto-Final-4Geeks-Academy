import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.scss";
import imgAboutUs1 from "../../img/img-about-us-1.png";

export default function AboutUs() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid main-div-class">
			<div className="container">
				<div className="row">
					<div className="col title-page-class">
						<h1>Quiénes Somos</h1>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-md-6 text-white">
						<div className="img-card-class">
							<img src={imgAboutUs1} alt="Image Services 1" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="card-class">
							<p>
								medicQR es la idea hecha realidad de un grupo de personas con formación profesional que
								va desde la economía, aviación, electrónica, hasta la misma informática.
							</p>
							<p>
								Unidos por una oportunidad gubernamental en el estudio de la programación, Iván,
								Lilliana, Carlos y Jairo están en el nicho de las aplicaciones web desde mayo del 2021.
							</p>
							<p>
								Con muchas ganas y diario esfuerzo, con el objetivo siempre en mente, este grupo de
								individuos han sacado provecho de una oportunidad que los ubicó con nombre firme, en el
								mercado de las aplicaciones.
							</p>

							<p>
								Su punto de partida fue un proyecto de curso que alcanzó en un corto tiempo, mucha
								popularidad gracias a su alcance social. Posterior a esto las ideas siguieron
								evolucionando, y al día de hoy medicQR es una aplicación con más de doscientas mil
								descargas que va en aumento gracias a su variedad de aplicaciones.
							</p>

							<p>
								Recomendado por instituciones gubernamentales, así como adquirido por empresas privadas,
								medicQR sigue avanzando por buen camino ahora acompañado de otras aplicaciones creadas
								por el grupo.
							</p>

							<p>
								Siguenos en nuestras redes sociales y entérate de las nuevas mejoras y otros productos
								estrella de medicQR.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
