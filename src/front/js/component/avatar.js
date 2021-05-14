import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import "../../styles/index.scss";
import NoImageUser from "../../img/img-no-user.jpg";

import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Collapse } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AvatarLoginUser from "./avatar-login-user";

export default function Avatar() {
	const { store, actions } = useContext(Context);
	const [open, setOpen] = useState(false);

	const logout = () => {
		actions.logout();

		// Se configura la opción del home
		actions.activeOption("/home");
	};

	const userEdit = () => {
		console.log(store.userProfile.user_image);
	};

	return (
		<NavLink onClick={() => logout()} to="login">
			<Button variant="success">Cerrar sesión</Button>
		</NavLink>
	);
}
