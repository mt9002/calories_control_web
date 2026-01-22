const API_URL = "http://localhost:8080/api/auth/login";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { email, password };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include" // permite enviar cookies si tu login lo usa
        });

        const result = await response.json();
        console.log(result);
        console.log(result.message);

        if (response.ok) {
            mostrarMensaje(result.message);
            window.location.href = "index.html";
        } else {
            mostrarError(result.message || "Error al iniciar sesión");
        }

    } catch (error) {
        mostrarError("No se pudo conectar con el servidor");
    }
});

function mostrarMensaje(texto) {
    const msg = document.getElementById("mensaje");
    msg.textContent = texto;
    msg.classList.remove("d-none");
}

function mostrarError(texto) {
    const err = document.getElementById("error");
    err.textContent = texto;
    err.classList.remove("d-none");
}

