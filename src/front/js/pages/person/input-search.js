import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { green } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block"
		}
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		// width: 500,
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			// width: 'auto',
			width: 800
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 700
		}
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex"
		}
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	}
}));

export default function PrimarySearchAppBar() {
	const classes = useStyles();

	const handleAdd = (event, name) => {
		alert("Agregar Persona!");
	};

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					{/* <Typography className={classes.title} variant="h6" noWrap>
            Listado de Personas
          </Typography> */}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Buscar persona…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<div className={classes.grow} />
					<Tooltip title="Agregar persona" aria-label="Agregar persona">
						<Fab
							style={{
								background: green[500],
								color: "white"
							}}
							onClick={() => handleAdd()}>
							<AddIcon />
						</Fab>
					</Tooltip>
				</Toolbar>
			</AppBar>
		</div>
	);
}
