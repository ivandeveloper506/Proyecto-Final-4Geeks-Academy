import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import "../../styles/footer.scss";

export const Footer = () => (
	<div className="container-fluid main-footer-class">
		<footer>
			<div className="row">
				<div className="footer-left col-md-4 col-sm-6">
					<p className="about">
						<span>
							<h2>QR+Service</h2>
						</span>{" "}
						Un QR es su enlace físico. Es una acción rápida y sencilla. Un QR es fácil de crear y existen
						diferentes versiones y tipos, así como los hay estáticos y dinámicos. Inclusive un QR puede
						hasta sufrir daños y aún funcionar. No lo piense más, QR+Service es su mejor opción.
					</p>
				</div>
				<div className="footer-center col-md-4 col-sm-6">
					<div>
						<i className="fa fa-map-marker" />
						<p>
							<span> Torre Mercedes</span> San José, Costa Rica,
						</p>
					</div>
					<div>
						<i className="fa fa-phone" />
						<p> (+506) 2590 2424</p>
					</div>
					<div>
						<i className="fa fa-envelope" />
						<p>
							<a hrefclassName="text-primary"> servicioalcliente@qrservice.com</a>
						</p>
					</div>
				</div>
				<div className="footer-right col-md-4 col-sm-6">
					<h2>
						{""}
						QR+Service
					</h2>
					<p className="name"> derechos reservados&copy; 2021</p>
					<div>
						<img
							src="https://i.imgur.com/0Vy3kHL.jpg"
							className="img-fluid"
							width="80px"
							height="80px"
							alt=""
						/>
					</div>
				</div>
			</div>
		</footer>
	</div>
);
