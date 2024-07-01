import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaTrash, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";


import "../../styles/home.css";

export const Home = () => {

	const { store, actions } = useContext(Context);



	return (
		<div>
			<div className="button-container">
				<Link to="/demo">
					<button className="buttonAddContact" onClick={() => actions.handleEditContactOrNewContact(false)}><IoIosAddCircleOutline /> Add new contact</button>
				</Link>
			</div>


			<div>
				<div className="container">
					{
						store.contacts?.map(contact => (
							<div className="d-flex containerMain" key={contact.id}>
								<div>
									{/*<img src={store.pictureRandom[contact.id].picture.large} alt="Random User" />*/}
									<img className="imagen" src={store.pictureRandom} alt="Random User" />
								</div>
								<div className="containerInfo">
									<h4>{contact.name}</h4>
									<p><FaLocationDot />  {contact.address}</p>
									<p><FaPhoneAlt />  {contact.phone}</p>
									<p><MdEmail />  {contact.email}</p>
								</div>
								<div className="icons-container">
									<Link to="/demo">
										<MdEdit className="edit" onClick={() => actions.handleEditContactOrNewContact(true, contact.id)} />
									</Link>

									<FaTrash className="trash" onClick={() => actions.fetchDeleteContacts(contact.id)} />
								</div>
							</div>


						))
					}
				</div>
			</div>

		</div>

	)
}

