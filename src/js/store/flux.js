import { resetWarningCache } from "prop-types";
import { useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			//pictureRandom: "",
			pictureRandom: [],
			editContactOrNewContact: false,
			selectedContact: {}
		},
		actions: {

			// mostrar agenda y crear agenda 
			fetchGetContacts: () => {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				};

				fetch("https://playground.4geeks.com/contact/agendas/LauraPG/contacts", requestOptions)
					.then((response) => {
						if (!response.ok) { // Detecta cualquier error de respuesta
							if (response.status === 404) { // Si el error es 404 crea un error que diga agenda no existe
								throw new Error("Agenda no existe");
							} else {
								throw new Error("Error al obtener los contactos");
							}
						}
						return response.json();
					})
					.then((result) => {
						setStore({ contacts: result.contacts });
						console.log(result)
					})

					.catch((error) => {
						console.error(error.message);

						if (error.message === "Agenda no existe") {
							// Crear nueva agenda si no existe
							fetch("https://playground.4geeks.com/contact/agendas/LauraPG", {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({ agenda_name: 'Laura Pacheco' })
							})
								.then(response => {
									if (!response.ok) {
										throw new Error("Error al crear la nueva agenda");
									}
									return response.json();
								})
								.then((result) => {
									console.log("Nueva agenda creada:", result);
								})
								.catch((error) => {
									console.error("Error al crear la nueva agenda:", error);
								});
						}
					});
			},

			//obtener una imagen random cada vez que se actualiza la pagina
			fetchGetPictureRandom: async () => {
				try {
					const response = await fetch("https://randomuser.me/api/?results=100");
					//const response = await fetch("https://randomuser.me/api/");
					const data = await response.json();

					const userRandom = data.results;
					//const userRandom = data.results[0].picture.large;


					setStore({ pictureRandom: userRandom });

				} catch (error) {
					console.error("Error fetching random picture:", error);
				}
			},

			//Crear contacto
			fetchCreateContact: (contact) => {

				fetch("https://playground.4geeks.com/contact/agendas/LauraPG/contacts", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contact),
					redirect: "follow"
				})
					.then((response) => response.json())
					.then((result) => {
						const store = getStore();
						const updatedContacts = [...store.contacts, result];
						setStore({ contacts: updatedContacts })

					})
					.catch((error) => console.error(error));

			},


			//Actualizar contacto
			fetchUpdateContact: (contact) => {

				fetch(`https://playground.4geeks.com/contact/agendas/LauraPG/contacts/${getStore().contactId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contact),
					redirect: "follow"
				})
					.then((response) => response.json())
					.then((result) => {
						getActions().fetchGetContacts()
					})
					.catch((error) => console.error(error));

			},

			//Borrar contacto
			fetchDeleteContacts: (id) => {

				fetch(`https://playground.4geeks.com/contact/agendas/LauraPG/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error("Error al eliminar el contacto");
						}
						// IMPORTANTE AQUÍ No necesito parsear el cuerpo de la respuesta DELETE, así que no se necesita response.json()
						// Devuelvo el response directamente
						return response;
					})
					.then(() => {
						// Actualizo el estado usando setStore
						
						const updatedContacts = getStore().contacts.filter(contact => contact.id !== id);
						setStore({ contacts: updatedContacts });
					})
					.catch((error) => {
						console.error(error);
					});

			},

			handleEditContactOrNewContact: (value, id, contact) => {
				setStore({ editContactOrNewContact: value, contactId: id })

				setStore({selectedContact: contact})

			}



		}
	};
};

export default getState;



