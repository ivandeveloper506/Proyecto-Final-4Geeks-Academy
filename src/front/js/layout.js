import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../front/js/store/appContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { NavbarMain } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "./pages/login";
import Register from "./pages/register";
import AboutUs from "./pages/about-us";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Recover from "./pages/recover";
import Dashboard from "./pages/dashboard";
import Person from "./pages/person/person";
import PersonDetail from "./pages/person/person-detail";
import PersonMedicineTable from "./pages/person/person-medicine-table";
import PersonMedicineDetail from "./pages/person/person-medicine-detail";
import PersonInformation from "./pages/person-information";
import PersonGenerateQr from "./pages/person/person-table-generateqr";
import PersonInfoQr from "./pages/person/person-infoqr";
import PersonGenerateQrDetail from "./pages/person/person-table-generateqr-detail";

const Layout = () => {
	const { store, actions } = useContext(Context);
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<NavbarMain />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/recover" component={Recover} />
					<Route exact path="/about-us" component={AboutUs} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/dashboard/person" component={Person} />
					<Route exact path="/dashboard/person/detail" component={PersonDetail} />
					<Route exact path="/dashboard/person/detail/:personId" component={PersonDetail} />
					<Route exact path="/dashboard/person/medicine/:personId" component={PersonMedicineTable} />
					<Route exact path="/dashboard/person/medicine/detail/" component={PersonMedicineDetail} />
					<Route
						exact
						path="/dashboard/person/medicine/detail/:personId/:id"
						component={PersonMedicineDetail}
					/>
					<Route exact path="/dashboard/person/generateqr" component={PersonGenerateQr} />
					<Route
						exact
						path="/dashboard/person/generateqr/detail/:personId"
						component={PersonGenerateQrDetail}
					/>
					<Route exact path="/person/infoqr/:personId" component={PersonInfoQr} />
					{/* <Route exact path="/dashboard/person/generateqr/:id" component={Person} /> */}
					{/* <Route exact path="/dashboard/person-information" component={PersonInformation} /> */}
					{/* <Route exact path="/dashboard/person-generate-qr" component={PersonGenerateQr} /> */}
					<Route>
						<h1>Not found!</h1>
					</Route>
					{/* <Route exact path="*" component={NotFoundPage} /> */}
				</Switch>
				{store.infoQRActive ? "" : store.userLogged ? "" : <Footer />}
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
