import contactsController from "./contacts.js";

//Crear las insteracciones con el usuario. document.queryselector
const nameInput = document.querySelector('#name-input');
const phoneInput = document.querySelector('#phone-input');
const formBtn = document.querySelector('#main-form-btn');
const form = document.querySelector('#main-form');
const contactList = document.querySelector('#contacts-list');
const nameEditInput = document.querySelector('.contacts-list-item-name-input');
const phoneEditInput = document.querySelector('.contacts-list-item-phone-input');

//regex
const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{1,}[ ]?$/;
const PHONE_REGEX = /^[0](412|416|414|424|426|212)[0-9]{7}$/;

//Validation
let nameValidation = false;
let phoneValidation = false;

//functions
const validateInput = (validation, input) => {
    
            //Parent element= acceder al elemento padre
            // Children hijo
            const helperText = input.parentElement.children[2];
        
            if (input.value === ''){
                //classlist se usa para agregar o eliminar clases
                input.classList.remove('invalid');
                input.classList.remove('valid');
                helperText.classList.remove('show-helper-text');
            }else if (validation){
                input.classList.add('valid');
                input.classList.remove('invalid');
                helperText.classList.remove('show-helper-text');
            } else {
                input.classList.add('invalid');
                input.classList.remove('valid');
                helperText.classList.add('show-helper-text');
            }       

}

const validateBtn = () => {
    if (nameValidation && phoneValidation) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }
}

const  validateEditInput = (validation, input) => {
    if (input.value === ''){
        //classlist se usa para agregar o eliminar clases
        input.classList.remove('invalid');
        input.classList.remove('valid');
        
    } if (validation){
        input.classList.add('valid');
        input.classList.remove('invalid');
        
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');           
          
}
}



nameInput.addEventListener('input', e =>{
//El metodo test se usa para evaluar un valor con la expresion regular definida
// Se guarda el resultado (verdade o falso)dentro de la variable nameValidation, si es verdadero paso la validacion, si es FALSO negativo procedimiento.
    nameValidation = NAME_REGEX.test(nameInput.value);
    validateInput(nameValidation, nameInput);
    validateBtn();
    
});

phoneInput.addEventListener('input', e =>{
        phoneValidation = PHONE_REGEX.test(phoneInput.value);
        validateInput(phoneValidation, phoneInput);
        validateBtn();

    });

form.addEventListener('submit', e =>{
    e.preventDefault();
    // 1. Crea el obejto del contacto
    const newContact = {
        id: crypto.randomUUID(),
        name: nameInput.value,
        phone: phoneInput.value,
    }
    // 2. Agregar el contacto a la lista
    contactsController.addContact(newContact);
    // 3. guardar en el navegador
    contactsController.saveInBrowser();
    // 4. renderizar los contactos
    contactsController.renderContacts(contactList); 
});

contactList.addEventListener('click', e=>{
   const deleteBtn = e.target.closest('.delete-btn');
   const editBtn = e.target.closest('.edit-btn');
   if(deleteBtn){
    const li = deleteBtn.parentElement.parentElement;
    contactsController.deleteContact(li.id);
    contactsController.saveInBrowser();
    contactsController.renderContacts(contactList);
   }

   if(editBtn){
    const inputContainer = editBtn.parentElement.parentElement.children[0];
    const nameEditInput = inputContainer.children[0];
    const phoneEditInput = inputContainer.children[1];
    const li = editBtn.parentElement.parentElement; 
    if(editBtn.classList.contains('editando')){
        let phoneEditValidation = true;
        let nameEditValidation = true;
        nameEditValidation = NAME_REGEX.test(nameEditInput.value);
        validateEditInput(nameEditValidation, nameEditInput);
        
        phoneEditValidation = PHONE_REGEX.test(phoneEditInput.value);
        validateEditInput(phoneEditValidation, phoneEditInput);
        
        if (!nameEditValidation || !phoneEditValidation) {
            return;
        }
        console.log('pasa a no editar');
        editBtn.classList.remove('editando');
        nameEditInput.setAttribute('readonly', true);
        phoneEditInput.setAttribute('readonly', true);

        const updatePayload = {
            id: li.id,
            name: nameEditInput.value,
            phone: phoneEditInput.value
        }
        contactsController.editContact(updatePayload);
        contactsController.saveInBrowser();
        contactsController.renderContacts(contactList);
        
    }else {
        console.log('pasa a editar');
        editBtn.classList.add('editando');
        nameEditInput.removeAttribute('readonly');
        phoneEditInput.removeAttribute('readonly');
        editBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

        `;
    
    }
    
   }
   
});

window.onload = () => {
    contactsController.getContactsFromBrowser();
    contactsController.renderContacts(contactList);
}
