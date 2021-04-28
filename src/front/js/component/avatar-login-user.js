/********************************************************************************/
/* Fecha Creación:  23 Marzo 2021.                                              */
/* Autor:           Iván Fonseca Castro                                         */
/*                                                                              */
/* Descripción:     Componente principal para renderizar las opciones del Menú. */
/********************************************************************************/

import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
// import DropdownItem from "./dropdown-item";
import Avatar from "./avatar";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import { Button } from "react-bootstrap";

export default function AvatarLoginUser() {
	const { store, actions } = useContext(Context);

	return store.userLogged ? (
		<Avatar />
	) : (
		<NavLink to="login">
			<Button variant="danger">Iniciar sesión</Button>
		</NavLink>
	);
}
