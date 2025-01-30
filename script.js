document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeButton = document.getElementById("toggleTheme");
    const assignButton = document.getElementById("assign-btn");
    const guestSearchButton = document.getElementById("guest-search-btn");
    const adminButton = document.getElementById("admin-btn");
    const guestButton = document.getElementById("guest-btn");
    const adminLoginModal = document.getElementById("admin-login-modal");
    const closeModal = document.getElementById("close-modal");
    const loginButton = document.getElementById("login-btn");
    const adminSection = document.getElementById("admin-section");
    const guestSection = document.getElementById("guest-section");
    const logoutButton = document.getElementById("logout-btn");
    const adminResult = document.getElementById("admin-result");
    const deleteButton = document.getElementById("delete-btn"); // Nuevo botón para borrar

    let isDarkMode = false;
    const assignments = {}; // Para almacenar las asignaciones de ministros
    const events = []; // Para almacenar los eventos

    // Cambiar entre modo diurno y nocturno
    toggleThemeButton.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle("dark-mode", isDarkMode);
        if (isDarkMode) {
            toggleThemeButton.innerHTML = '<span class="sun-icon">&#9728;</span>'; // Sol
        } else {
            toggleThemeButton.innerHTML = '<span class="moon-icon">&#9790;</span>'; // Luna
        }
    });

    // Mostrar modal de inicio de sesión para administrador
    adminButton.addEventListener("click", () => {
        adminLoginModal.classList.remove("hidden");
    });

    // Cerrar modal de inicio de sesión
    closeModal.addEventListener("click", () => {
        adminLoginModal.classList.add("hidden");
    });

    // Verificar credenciales del administrador
    loginButton.addEventListener("click", () => {
        const email = document.getElementById("admin-email").value;
        const password = document.getElementById("admin-password").value;

        if (email === "jsamregre@gmail.com" && password === "M@teo.1709") {
            alert("Inicio de sesión exitoso");
            adminLoginModal.classList.add("hidden");
            adminSection.classList.remove("hidden");
        } else {
            alert("Credenciales incorrectas");
        }
    });

    // Mostrar sección de invitados
    guestButton.addEventListener("click", () => {
        guestSection.classList.remove("hidden");
    });

    // Cerrar sesión del administrador
    logoutButton.addEventListener("click", () => {
        adminSection.classList.add("hidden");
        document.getElementById("admin-email").value = "";
        document.getElementById("admin-password").value = "";
    });

    // Asignar un día de servicio o evento
    assignButton.addEventListener("click", () => {
        const minister = document.getElementById("minister-name").value;
        const supports = document.getElementById("support-names").value.split(",");
        const musicians = document.getElementById("musician-names").value.split(",");
        const date = document.getElementById("service-date").value;
        const eventDescription = document.getElementById("event-description").value;

        if (eventDescription) {
            // Agregar el evento (opcional)
            events.push({ date, description: eventDescription });
            alert("Evento registrado correctamente");
        } else if (minister && date) {
            // Asignar ministro principal, apoyos y músicos
            assignments[date] = {
                minister,
                supports,
                musicians,
            };
            alert("Asignación guardada correctamente");
        } else {
            alert("Por favor completa los campos requeridos.");
        }

        // Limpiar los campos después de la asignación
        document.getElementById("minister-name").value = "";
        document.getElementById("support-names").value = "";
        document.getElementById("musician-names").value = "";
        document.getElementById("service-date").value = "";
        document.getElementById("event-description").value = "";

        // Mostrar la vista previa de asignaciones en la sección del administrador
        displayAdminPreview();
    });

    // Función para mostrar vista previa de asignaciones y eventos en la sección de administración
    function displayAdminPreview() {
        adminResult.innerHTML = ""; // Limpiar la vista previa
        Object.keys(assignments).forEach(date => {
            const assignment = assignments[date];
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>Fecha:</strong> ${date}</p>
                <p><strong>Ministro Principal:</strong> ${assignment.minister}</p>
                <p><strong>Apoyos:</strong> ${assignment.supports.join(", ")}</p>
                <p><strong>Músicos:</strong> ${assignment.musicians.join(", ")}</p>
                <button class="delete-assign-btn" data-date="${date}">Borrar Asignación</button>
            `;
            adminResult.appendChild(div);
        });

        // Mostrar los eventos registrados
        events.forEach(event => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>Evento - Fecha:</strong> ${event.date}</p>
                <p><strong>Descripción:</strong> ${event.description}</p>
                <button class="delete-event-btn" data-date="${event.date}">Borrar Evento</button>
            `;
            adminResult.appendChild(div);
        });

        // Agregar evento de borrado para asignaciones
        const deleteAssignButtons = document.querySelectorAll(".delete-assign-btn");
        deleteAssignButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const date = e.target.getAttribute("data-date");
                delete assignments[date];
                displayAdminPreview(); // Actualizar vista previa
            });
        });

        // Agregar evento de borrado para eventos
        const deleteEventButtons = document.querySelectorAll(".delete-event-btn");
        deleteEventButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const date = e.target.getAttribute("data-date");
                const index = events.findIndex(event => event.date === date);
                if (index !== -1) {
                    events.splice(index, 1);
                }
                displayAdminPreview(); // Actualizar vista previa
            });
        });
    }

    // Mostrar eventos generales y asignaciones para los invitados
    guestSearchButton.addEventListener("click", () => {
        const date = document.getElementById("guest-search-date").value;
        const result = assignments[date];
        const eventList = document.getElementById("event-list");
        const guestResult = document.getElementById("guest-result");

        // Mostrar eventos
        eventList.innerHTML = "";
        events.forEach(event => {
            const li = document.createElement("li");
            li.textContent = `${event.date}: ${event.description}`;
            eventList.appendChild(li);
        });

        // Mostrar asignaciones
        if (result) {
            guestResult.innerHTML = `
                <p><strong>Fecha:</strong> ${date}</p>
                <p><strong>Ministro Principal:</strong> ${result.minister}</p>
                <p><strong>Apoyos:</strong> ${result.supports.join(", ")}</p>
                <p><strong>Músicos:</strong> ${result.musicians.join(", ")}</p>
            `;
        } else {
            guestResult.textContent = "No hay asignaciones para esta fecha.";
        }
    });
});

