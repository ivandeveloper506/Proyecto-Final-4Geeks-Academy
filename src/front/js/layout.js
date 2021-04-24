import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
<<<<<<< HEAD
import { Login } from "./pages/login";
import { Singin } from "./pages/singin";
import { AboutUs } from "./pages/aboutUs";
=======
>>>>>>> b5eb5ecfd162b459b871a35c50cfc1840d9a5b1c
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
<<<<<<< HEAD
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/singin">
							<Singin />
						</Route>
						<Route exact path="/aboutUs">
							<AboutUs />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
=======
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
>>>>>>> b5eb5ecfd162b459b871a35c50cfc1840d9a5b1c
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
