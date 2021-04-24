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
	};

	const userEdit = () => {
		console.log("*** Editar Usuario ***");

		console.log(store.userProfile.user_image);
	};

	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle className="avatar-button-menu-class">
					<img
						className="avatar-image-menu-class rounded-circle"
						src={
							store.userProfile.user_image ||
							store.userProfile.user_image === "" ||
							store.userProfile.user_image === undefined ||
							store.userProfile.user_image === null
								? NoImageUser
								: store.userProfile.user_image
						}
						alt="Image profile"
					/>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
					<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
					<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}
