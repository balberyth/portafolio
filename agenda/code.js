let selectedPetType;

function openBookingForm(petType) {
    selectedPetType = petType;
    document.getElementById('petType').value = petType;
    document.getElementById('bookingForm').style.display = 'block';
}

function closeBookingForm() {
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('appointmentForm').reset();
}

function saveAppointment() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;

    if (name && date) {
        const appointmentCard = createAppointmentCard(name, date);
        document.getElementById('agendadasList').appendChild(appointmentCard);
        closeBookingForm();
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
}

function editAppointment(nameParagraph, dateParagraph) {
    const newName = prompt('Ingrese el nuevo nombre:', nameParagraph.textContent.split(': ')[1]);
    const newDate = prompt('Ingrese la nueva fecha:', dateParagraph.textContent.split(': ')[1]);

    if (newName !== null && newDate !== null) {
        nameParagraph.textContent = `Nombre: ${newName}`;
        dateParagraph.textContent = `Fecha: ${newDate}`;
    }
}

function cancelAppointment(appointmentCard) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar Cita';
    deleteButton.addEventListener('click', () => {
        appointmentCard.remove();
    });

    // Reemplaza el botón de editar con el botón de eliminar
    const buttons = appointmentCard.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('Editar')) {
            button.replaceWith(deleteButton);
        }
    });

    document.getElementById('canceladasList').appendChild(appointmentCard);
}

function createAppointmentCard(name, date) {
    const appointmentCard = document.createElement('div');
    appointmentCard.classList.add('appointment-card');

    const petImage = document.createElement('img');
    petImage.src = `./imagenes/${selectedPetType.toLowerCase()}.jpg`;
    petImage.alt = selectedPetType;

    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = `Nombre: ${name}`;

    const dateParagraph = document.createElement('p');
    dateParagraph.textContent = `Fecha: ${date}`;

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar Cita';
    cancelButton.addEventListener('click', () => {
        cancelAppointment(appointmentCard);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar Cita';
    editButton.addEventListener('click', () => {
        editAppointment(nameParagraph, dateParagraph);
    });

    appointmentCard.appendChild(petImage);
    appointmentCard.appendChild(nameParagraph);
    appointmentCard.appendChild(dateParagraph);
    appointmentCard.appendChild(cancelButton);
    appointmentCard.appendChild(editButton);

    return appointmentCard;
}

