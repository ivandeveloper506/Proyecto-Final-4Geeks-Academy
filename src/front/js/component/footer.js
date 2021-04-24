import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import "../../styles/footer.scss";

export const Footer = () => (
	<div className="container-fluid main-footer-class">
		<footer>
			<div className="row">
				<div className="footer-left col-md-4 col-sm-6">
					<p className="about">
						<span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus
						condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien
						ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt, ultricies feugiat leo.
						Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis,
						tristique ante sed, viverra massa.
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
					<p className="name"> QR+Service &copy; 2021</p>
					<div>
						<img
							src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
							className="img-fluid"
							width="100px"
							height="100px"
							alt=""
						/>
					</div>
				</div>
			</div>
		</footer>
	</div>
);
