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
									<img className="imagen" src={store.pictureRandom[contact.id]?.picture.large} alt="Random User" />
									{/*<img className="imagen" src={store.pictureRandom} alt="Random User" />*/}
								</div>
								<div className="containerInfo">
									<h4>{contact.name}</h4>
									<p><FaLocationDot />  {contact.address}</p>
									<p><FaPhoneAlt />  {contact.phone}</p>
									<p><MdEmail />  {contact.email}</p>
								</div>
								<div className="icons-container">
									<Link to="/demo">
										<MdEdit className="edit" onClick={() => actions.handleEditContactOrNewContact(true, contact.id, contact)} />
									</Link>
									
									 <FaTrash className="trash" onClick={() => actions.fetchDeleteContacts(contact.id)} /> 
								
									{/* <FaTrash data-bs-target="#exampleModal" data-bs-toggle="modal" className="trash" />  */}


								</div>

								{/* Modal en proceso de construcción
								<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title" id="exampleModalLabel">Are your sure?</h5>
												<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div class="modal-body">
												If you delete this thing the entire universe will go down!
											</div>
											<div class="modal-footer">
												<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
												<button type="button" onClick={() =>console.log(contact.id) && actions.fetchDeleteContacts(contact.id)} data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
											</div>
										</div>
									</div>
								</div> */}
							</div>


						))
					}
				</div>
			</div>

		</div>

	)
}

