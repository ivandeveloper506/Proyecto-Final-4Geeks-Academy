import React from "react";
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
import PersonGenerateQr from "./pages/person-generate-qr";

const Layout = () => {
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
					<Route exact path="/dashboard/person/detail/:id" component={PersonDetail} />
					<Route exact path="/dashboard/person/medicine/:id" component={PersonMedicineTable} />
					<Route exact path="/dashboard/person/medicine/detail/" component={PersonMedicineDetail} />
					<Route
						exact
						path="/dashboard/person/medicine/detail/:id/:personId"
						component={PersonMedicineDetail}
					/>
					<Route exact path="/dashboard/person/vaccine/:id" component={PersonDetail} />
					<Route exact path="/dashboard/person/generateqr/:id" component={PersonGenerateQr} />
					{/* <Route exact path="/dashboard/person-information" component={PersonInformation} /> */}
					{/* <Route exact path="/dashboard/person-generate-qr" component={PersonGenerateQr} /> */}
					<Route>
						<h1>Not found!</h1>
					</Route>
					{/* <Route exact path="*" component={NotFoundPage} /> */}
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
