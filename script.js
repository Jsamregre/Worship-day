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

    let isDarkMode = false;
    const assignments = {};
    const events = [];

    // Cambiar entre modo diurno y nocturno
    toggleThemeButton.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle("dark-mode", isDarkMode);
        toggleThemeButton.textContent = isDarkMode ? "Modo Diurno" : "Modo Nocturno";
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
    });

    // Mostrar eventos generales y asignaciones
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
