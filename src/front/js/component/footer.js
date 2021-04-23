import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer-class">
		<div className="row">
			<div className="footer-left col-md-4 col-sm-6">
				<p className="about">
					<span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus condimentum.
					In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices
					eleifend. Integer tellus est, vehicula eu lectus tincidunt, ultricies feugiat leo. Suspendisse
					tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed,
					viverra massa.
				</p>
				<div className="icons">
					<a href="#">
						<i className="fa fa-facebook" />
					</a>
					<a href="#">
						<i className="fa fa-twitter" />
					</a>
					<a href="#">
						<i className="fa fa-linkedin" />
					</a>
					<a href="#">
						<i className="fa fa-google-plus" />
					</a>
					<a href="#">
						<i className="fa fa-instagram" />
					</a>
				</div>
			</div>
			<div className="footer-center col-md-4 col-sm-6">
				<div>
					<i className="fa fa-map-marker" />
					<p>
						<span> Street name and number</span> City, Country
					</p>
				</div>
				<div>
					<i className="fa fa-phone" />
					<p> (+00) 0000 000 000</p>
				</div>
				<div>
					<i className="fa fa-envelope" />
					<p>
						<a href="#"> office@company.com</a>
					</p>
				</div>
			</div>
			<div className="footer-right col-md-4 col-sm-6">
				<h2>
					{" "}
					Company
					<span> logo</span>
				</h2>
				<p className="menu">
					<a href="/"> Inicio</a> |<a href="/login"> Iniciar Sesión</a> | <a href="/singin"> Registrarse</a> |
					<a href="/aboutUs"> Acerca de nosotros</a>
				</p>
				<p className="name"> Company Name &copy; 2016</p>
			</div>
		</div>
	</footer>
);
