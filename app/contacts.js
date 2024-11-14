
    let contacts = [];

          /** 
         * @typedef Contact
         * @type {object}
         * @property {string} newContact.id 
         * @property {string} newContact.name
         * @property {string} newContact.phone
         * @returns {Array<contacts>}
        */
    const  getContacts = () => {
            return contacts;
         }

  
         /**
          * Agrega un nuevo contacto
          * @param {Object} newContact - el contacto a agregar
          * @param {string} newContact.id
          * @param {string} newContact.name
          * @param {string} newContact.phone
          * @returns void.
          */
    const addContact = (newContact) => {
            //la funcion concat crea una copia del array y agrega un elemento nuevo.
            contacts = contacts.concat(newContact);
            
         } 

      
        
         

    const renderContacts = (contactList) => {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
            const contactElement = document.createElement('li');
            contactElement.classList.add('contacts-list-item');
            contactElement.id = contact.id;
            contactElement.innerHTML = `
        <div class="inputs-container">
          <input class="contacts-list-item-name-input" type="text" value="${contact.name}" readonly>
          <input class="contacts-list-item-phone-input" type="text" value="${contact.phone}" readonly>
        </div>
        <div class="btns-container">
          <button class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>            
          </button>
          <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
            `;
            contactList.append(contactElement);
            
        });

         } 
         
     const saveInBrowser = () => {
        localStorage.setItem('contactsList', JSON.stringify(contacts));
        }
        
     const getContactsFromBrowser = () => {
         const contactsFromBrowser = JSON.parse(localStorage.getItem('contactsList')) || [];
        }   
        
     const deleteContact = (id) => {
        contacts = contacts.filter(contact => {
            if (contact.id !== id) {
                return contact;
            }
        });
     }

     const editContact = (editedContact) => {
        contacts = contacts.map(contact => {
            if (editedContact.id === contact.id){
                return {
                    ...contact,
                    name: editedContact.name,
                    phone: editedContact.phone
                }
                    
                } else {
                    return contact
                   
                }

      
                
            })
    }

    const contactsController = {
        addContact,
        getContacts,
        renderContacts,
        saveInBrowser,
        getContactsFromBrowser, 
        deleteContact,
        editContact,
        

    }

    export default contactsController;
        
