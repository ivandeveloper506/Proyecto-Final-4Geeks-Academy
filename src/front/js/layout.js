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

const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<NavbarMain />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/recover" component={Recover} />
					<Route exact path="/about-us" component={AboutUs} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/contact" component={Contact} />
					<Route>
						<h1>Not found!</h1>
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
