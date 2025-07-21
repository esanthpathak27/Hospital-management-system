document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('confirmationMessage').classList.remove('hidden');
});

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const appointmentTime = document.getElementById('appointmentTime').value;
    const doctor = document.getElementById('doctor').value;
    const contactInfo = document.getElementById('contactInfo').value;

    const appointmentData = {
        id: Date.now(), // unique ID for each appointment
        appointmentTime: appointmentTime,
        doctor: doctor,
        contactInfo: contactInfo
    };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointmentData);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    document.getElementById('confirmationMessage').classList.remove('hidden');

    displayAppointments();
});

function displayAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    appointments.forEach(appointment => {
        const appointmentDiv = document.createElement('div');
        appointmentDiv.className = 'appointment';
        appointmentDiv.innerHTML = `
            <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
            <p><strong>Doctor:</strong> ${appointment.doctor}</p>
            <p><strong>Contact Info:</strong> ${appointment.contactInfo}</p>
            <button onclick="deleteAppointment(${appointment.id})">Delete</button>
        `;
        appointmentsList.appendChild(appointmentDiv);
    });
}

function deleteAppointment(id) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments = appointments.filter(appointment => appointment.id !== id);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments();
}

// Call displayAppointments when the page loads
document.addEventListener('DOMContentLoaded', displayAppointments);
