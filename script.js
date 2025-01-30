document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeButton = document.getElementById("toggleTheme");
    const assignButton = document.getElementById("assign-btn");
    const searchButton = document.getElementById("search-btn");
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
    const searchResult = document.getElementById("search-result");
    const eventDetails = document.getElementById("event-details");

    let isDarkMode = false;
    const assignments = {}; // Para almacenar las asignaciones de ministros
    const events = []; // Para almacenar los eventos

    // Cambiar entre modo diurno y nocturno
    toggleThemeButton.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle("dark-mode", isDarkMode);
        toggleThemeButton.innerHTML = isDarkMode
            ? '<span class="sun-icon">&#9728;</span>'
            : '<span class="moon-icon">&#9790;</span>';
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
            events.push({ date, description: eventDescription });
            alert("Evento registrado correctamente");
        } else if (minister && date) {
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

        // Actualizar vista previa
        displayAdminPreview();
    });

    // Función para mostrar vista previa de asignaciones y eventos
    function displayAdminPreview() {
        adminResult.innerHTML = "";
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

        events.forEach(event => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>Evento - Fecha:</strong> ${event.date}</p>
                <p><strong>Descripción:</strong> ${event.description}</p>
                <button class="delete-event-btn" data-date="${event.date}">Borrar Evento</button>
            `;
            adminResult.appendChild(div);
        });

        addDeleteEventListeners();
    }

    // Función para agregar listeners a los botones de borrado
    function addDeleteEventListeners() {
        document.querySelectorAll(".delete-assign-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const date = e.target.getAttribute("data-date");
                delete assignments[date];
                displayAdminPreview();
            });
        });

        document.querySelectorAll(".delete-event-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const date = e.target.getAttribute("data-date");
                const index = events.findIndex(event => event.date === date);
                if (index !== -1) {
                    events.splice(index, 1);
                }
                displayAdminPreview();
            });
        });
    }

    // Buscar servicios o eventos por fecha
    searchButton.addEventListener("click", () => {
        const searchDate = document.getElementById("search-service-date").value;
        const assignment = assignments[searchDate];
        const event = events.find(event => event.date === searchDate);

        if (assignment || event) {
            searchResult.style.display = "block";
            eventDetails.innerHTML = "";

            if (assignment) {
                eventDetails.innerHTML += `
                    <p><strong>Fecha:</strong> ${searchDate}</p>
                    <p><strong>Ministro Principal:</strong> ${assignment.minister}</p>
                    <p><strong>Apoyos:</strong> ${assignment.supports.join(", ")}</p>
                    <p><strong>Músicos:</strong> ${assignment.musicians.join(", ")}</p>
                `;
            }

            if (event) {
                eventDetails.innerHTML += `
                    <p><strong>Evento - Fecha:</strong> ${searchDate}</p>
                    <p><strong>Descripción:</strong> ${event.description}</p>
                `;
            }
        } else {
            searchResult.style.display = "block";
            eventDetails.innerHTML = "<p>No se encontraron resultados.</p>";
        }
    });
});
