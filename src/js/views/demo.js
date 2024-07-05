import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaArrowLeft } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
	const navigate = useNavigate();

	const handleChange = (e) => {
		// Desestructurar el objeto 'e.target' para obtener los valores de 'name' y 'value'
		const { name, value } = e.target;

		// Actualizar el estado 'contact' usando 'setContact'
		// ...contact: Copia todos los valores actuales del objeto 'contact'
		// [name]: value: Actualiza el valor de la propiedad 'name' con el nuevo 'value'
		//la key será el name que le hemos dado al input y el valor será el que recoge del introducido por el usuario
		//si ponemos esto name: value, siempre estemos dandole una key llamada name, por lo tanto es importante añadir corchetes en este caso
		setContact({ ...contact, [name]: value });
	};

	useEffect (()=> {
		if(store.selectedContact){
			setContact({
				name: store.selectedContact.name || "",
				email: store.selectedContact.email || "",
				phone: store.selectedContact.phone || "",
				address: store.selectedContact.address || "",

			})
		}
	},[store.selectedContact])
	

	const handleSubmit = (e) => {
		e.preventDefault(); // Evitar que la página se recargue cuando se envía el formulario.
		if (store.editContactOrNewContact === false) {

			actions.fetchCreateContact(contact)
			navigate("/");

		}
		else {

			actions.fetchUpdateContact(contact)
			navigate("/");
		}

	};

	return (
		<div className="container">
			<h2>{store.editContactOrNewContact ? "Edit Contact" : "Add new contact"}</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">Full Name</label>
					<input type="text" className="form-control" id="name" name="name" placeholder="Full Name" onChange={handleChange} value={contact.name} required />
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={handleChange} value={contact.email} required />
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">Phone</label>
					<input type="text" className="form-control" id="phone" name="phone" placeholder="Enter phone" onChange={handleChange} value={contact.phone} required />
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">Address</label>
					<input type="text" className="form-control" id="address" name="address" placeholder="Enter address" onChange={handleChange} value={contact.address} required />
				</div>
				<div className="containerButtons d-flex">
					<input type="submit" value={store.editContactOrNewContact ? "Save changes" : "Add Contact"} className="btn buttonSave"/>

					<Link to="/">
						<button type="button" className="btn buttonBack"> <FaArrowLeft /> Back to contacts</button>
					</Link>
				</div>
			</form>
		</div>
	);
};
