const url = "https://assets.breatheco.de/apis/fake/contact/";
const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contacts: [],
			show_modal :false

		},
		actions: {
			loadContact() {
				fetch(url + "agenda/agenda_Jan")
					.then(response => response.json())
					.then(result => {
						setStore({
							contacts: result
						});
					})
					.catch(e => console.error(e));
			},
			addContact(name, phone, email, address) {
				fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "agenda_Jan"
					})
				}).then(() => {
					fetch(url + "agenda/agenda_Jan")
						.then(response => response.json())
						.then(result => {
							setStore({
								contacts: result
							});
						})
						.catch(e => console.error(e));
				})
			},
			editContact(id, name, phone, email, address) {
				fetch(url + id,{
					method: "PUT",
					headers: { "Content-type": "application/json"},
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "agenda_Jan"
					})
				}).then(()=>{
					fetch(url + "agenda/agenda_Jan")
						.then(response => response.json())
						.then(result => {
							/* console.log("result", result), */
								setStore({
									contacts:result
								});
						})
						.catch(e=> console.log(e));	
					}) 	
				},
				deleteContact(id) {
					fetch(url + id, {
						method: "DELETE"
					}).then(() => {
						fetch(url + "agenda/agenda_Jan")
							.then(response => response.json())
							.then(result => {
								/* console.log("result", result), */
									setStore({
										contacts: result
									});
							})
							.catch(e => console.error(e));
					});
				}
				
		}
	};
};

export default getState;
