const formData=[];

function pintar(){
const tablebody=document.querySelector("#tabla tbody");
tablebody.innerHTML=""

formData.forEach((item, index) => {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");
  let td7 = document.createElement("td");
  let td8 = document.createElement("td");
  let td9 = document.createElement("td");
  let editar = document.createElement("button");
  let eliminar = document.createElement("button");
  editar.textContent = "📝";
  eliminar.textContent = "❌";
  td1.textContent = item.firstName;
  td2.textContent = item.lastName;
  td3.textContent = item.docType;
  td4.textContent = item.docNumber;
  td5.textContent = item.gender;
  td6.textContent = item.phone  ;
  td7.textContent = item.email; 
  td8.textContent = item.birthdate; 
  td9.appendChild(editar);
  td9.appendChild(eliminar);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);
  tr.appendChild(td8);
  tr.appendChild(td9);
  tablebody.appendChild(tr);

  editar.addEventListener("click", () => {

    // Llenar el formulario con los datos de la fila seleccionada
    const form = document.getElementById('myForm');
    form.elements.firstName.value = item.firstName;
    form.elements.lastName.value = item.lastName;
    form.elements.docType.value = item.docType;
    form.elements.docNumber.value = item.docNumber;
    form.elements.gender.value = item.gender;
    form.elements.phone.value = item.phone;
    form.elements.email.value = item.email;
    form.elements.birthdate.value = item.birthdate;

    // Eliminar la fila antigua
    formData.splice(index, 1);
    pintar();
  });

  eliminar.addEventListener("click", () => {
    // Eliminar la fila correspondiente del array y volver a pintar la tabla
    formData.splice(index, 1);
    pintar();
  });

  

});
}




function submitForm() {
  const form = document.getElementById('myForm');

  const firstName = form.elements.firstName.value.trim();
  const lastName = form.elements.lastName.value.trim();
  const docType = form.elements.docType.value;
  const docNumber = form.elements.docNumber.value.trim();
  const gender = form.elements.gender.value;
  const phone = form.elements.phone.value.trim();
  const email = form.elements.email.value.trim();
  const birthdate = form.elements.birthdate.value.trim();

  // Validación de campos obligatorios
  if (!firstName || !lastName || !docType || !docNumber || !gender || !phone || !email || !birthdate) {
    alert('Por favor, complete todos los campos del formulario.');
    return;
  }

  // Validación de dirección de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, ingrese una dirección de correo electrónico válida.');
    return;
  }

  // Validación de edad
  const birthdateDate = new Date(birthdate);
  const age = new Date().getFullYear() - birthdateDate.getFullYear();

  if (age < 18) {
    alert('Lo siento, debes ser mayor de 18 años para registrarte.');
    return;
  }
  
  const data = {
    firstName,
    lastName,
    docType,
    docNumber,
    gender,
    phone,
    email,
    birthdate,
  };

  formData.push(data);
  console.log('Datos registrados:', formData)
  pintar();

  form.reset();
  
}