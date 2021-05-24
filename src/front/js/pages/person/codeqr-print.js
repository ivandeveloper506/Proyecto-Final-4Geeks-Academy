import ReactToPrint from "react-to-print";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../../../styles/qrstyles.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { QRCode } from "react-qrcode-logo";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

let QRCodePerson = [];
let personQRGenerate = [];

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 400
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

class ComponentToPrint extends React.Component {
	render() {
		return (
			<div className="container qrprint-class">
				<div className="row">
					<div className="col">
						<QRCode
							className="col qr-info-cardL-class m-2"
							value={QRCodePerson.url}
							size="150"
							ecLevel="H"
							qrStyle="square"
							fgColor="#003E7E"
							bgColor="#C4F1FE"
							enableCORS="true"
						/>
					</div>
					<div className="col qr-info-cardR-class">
						<p className="mt-3">{personQRGenerate.full_name}</p>
						{QRCodePerson.length === 0 ? "" : <h5>ESCANEA EL</h5>}
						{QRCodePerson.length === 0 ? "" : <h5>CÓDIGO QR</h5>}
					</div>
				</div>
			</div>
		);
	}
}

class CodeQRPrint extends React.Component {
	render() {
		return (
			<div>
				<ComponentToPrint ref={el => (this.componentRef = el)} />
				<ReactToPrint
					trigger={() => (
						<div className="container d-flex justify-content-center">
							<div className="row">
								<div className="col">
									<IconButton aria-label="Print QRCode">
										<PrintIcon />
									</IconButton>
								</div>
							</div>
						</div>
					)}
					content={() => this.componentRef}
				/>
			</div>
		);
	}
}

function PersonQRGenerate() {
	const { store, actions } = useContext(Context);

	QRCodePerson = store.QRCodePerson;
	personQRGenerate = store.personQRGenerate;

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return <CodeQRPrint />;
}

export default PersonQRGenerate;
