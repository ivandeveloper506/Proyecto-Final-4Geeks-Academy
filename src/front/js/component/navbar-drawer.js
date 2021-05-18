// import React from "react";
// import clsx from "clsx";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MenuItem from "@material-ui/core/MenuItem";

// import PersonDrawer from "../pages/person/person-drawer";
// import MedicineDrawer from "../pages/person/medicine-drawer";

// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		display: "flex"
// 	},
// 	appBar: {
// 		transition: theme.transitions.create(["margin", "width"], {
// 			easing: theme.transitions.easing.sharp,
// 			duration: theme.transitions.duration.leavingScreen
// 		})
// 	},
// 	appBarShift: {
// 		width: `calc(100% - ${drawerWidth}px)`,
// 		marginLeft: drawerWidth,
// 		transition: theme.transitions.create(["margin", "width"], {
// 			easing: theme.transitions.easing.easeOut,
// 			duration: theme.transitions.duration.enteringScreen
// 		})
// 	},
// 	menuButton: {
// 		marginRight: theme.spacing(2)
// 	},
// 	hide: {
// 		display: "none"
// 	},
// 	drawer: {
// 		width: drawerWidth,
// 		flexShrink: 0
// 	},
// 	drawerPaper: {
// 		width: drawerWidth
// 	},
// 	drawerHeader: {
// 		display: "flex",
// 		alignItems: "center",
// 		padding: theme.spacing(0, 1),
// 		// necessary for content to be below app bar
// 		...theme.mixins.toolbar,
// 		justifyContent: "flex-end"
// 	},
// 	content: {
// 		flexGrow: 1,
// 		padding: theme.spacing(3),
// 		transition: theme.transitions.create("margin", {
// 			easing: theme.transitions.easing.sharp,
// 			duration: theme.transitions.duration.leavingScreen
// 		}),
// 		marginLeft: -drawerWidth
// 	},
// 	contentShift: {
// 		transition: theme.transitions.create("margin", {
// 			easing: theme.transitions.easing.easeOut,
// 			duration: theme.transitions.duration.enteringScreen
// 		}),
// 		marginLeft: 0
// 	}
// }));

// export default function PersistentDrawerLeft() {
// 	const classes = useStyles();
// 	const theme = useTheme();
// 	const [open, setOpen] = React.useState(false);

// 	const handleDrawerOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleDrawerClose = () => {
// 		setOpen(false);
// 	};

// 	const handleProfileMenuOpen = event => {
// 		setAnchorEl(event.currentTarget);
// 		alert("Entro 1");
// 	};

// 	return (
// 		<div className={classes.root}>
// 			<CssBaseline />
// 			<AppBar
// 				position="fixed"
// 				className={clsx(classes.appBar, {
// 					[classes.appBarShift]: open
// 				})}>
// 				<Toolbar>
// 					<IconButton
// 						color="inherit"
// 						aria-label="open drawer"
// 						onClick={handleDrawerOpen}
// 						edge="start"
// 						className={clsx(classes.menuButton, open && classes.hide)}>
// 						<MenuIcon />
// 					</IconButton>
// 					<Typography variant="h5" noWrap>
// 						medicQR
// 					</Typography>
// 					{/* <div className={classes.grow} />
// 					<div className={classes.sectionDesktop}>
// 						<MenuItem onClick={handleProfileMenuOpen}>
// 							<IconButton
// 								aria-label="account of current user"
// 								aria-controls="primary-search-account-menu"
// 								aria-haspopup="true"
// 								color="inherit">
// 								<AccountCircle />
// 							</IconButton>
// 							<p>Editar perfil</p>
// 						</MenuItem>
// 					</div> */}
// 				</Toolbar>
// 			</AppBar>
// 			<Drawer
// 				className={classes.drawer}
// 				variant="persistent"
// 				anchor="left"
// 				open={open}
// 				classes={{
// 					paper: classes.drawerPaper
// 				}}>
// 				<div className={classes.drawerHeader}>
// 					<IconButton onClick={handleDrawerClose}>
// 						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
// 					</IconButton>
// 				</div>
// 				<Divider />
// 				<List>
// 					{["Personas", "Generar QR"].map((text, index) => (
// 						<ListItem button key={text}>
// 							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
// 							<ListItemText primary={text} />
// 						</ListItem>
// 					))}
// 				</List>
// 				<Divider />
// 				<List>
// 					{["Editar Perfil", "Cerrar Sesión"].map((text, index) => (
// 						<ListItem button key={text}>
// 							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
// 							<ListItemText primary={text} />
// 						</ListItem>
// 					))}
// 				</List>
// 			</Drawer>
// 			<main
// 				className={clsx(classes.content, {
// 					[classes.contentShift]: open
// 				})}>
// 				<div className={classes.drawerHeader} />
// 				{/* <PersonDrawer /> */}
// 				<div className="row">
// 					<div className="col-md-6">
// 						<PersonDrawer />
// 					</div>
// 					<div className="col-md-6">
// 						<MedicineDrawer />
// 					</div>
// 				</div>

// 				{/* <h1>Esto es una prueba</h1> */}
// 				{/* <Typography paragraph>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
// 					et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at
// 					ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis
// 					convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
// 					sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
// 					quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris
// 					commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue
// 					eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
// 					donec massa sapien faucibus et molestie ac.
// 				</Typography> */}
// 			</main>
// 		</div>
// 	);
// }

import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: "auto"
	}
});

export default function TemporaryDrawer() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const toggleDrawer = (anchor, open) => event => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = anchor => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === "top" || anchor === "bottom"
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<List>
				{["Personas", "Generar QR"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Editar Perfil", "Cerrar Sesión"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div>
			<IconButton onClick={toggleDrawer("left", true)} aria-label="filter list">
				<MenuIcon fontSize="large" />
			</IconButton>

			<Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
				{list("left")}
			</Drawer>
		</div>
	);
}
