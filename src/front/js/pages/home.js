import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
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
		</div>
	);
};
