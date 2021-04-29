import Swal from "sweetalert2";

export function ShowAlert(aTitle, aText, aTimer) {
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: aTitle,
		text: aText,
		showConfirmButton: false,
		timerProgressBar: true,
		timer: aTimer
	});
}
