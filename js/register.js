const API_URL = "http://localhost:8080/auth/registe";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // evita que el form se envíe de forma normal

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validación de contraseñas antes de enviar
    if (password !== confirmPassword) {
        mostrarError("Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, confirmPassword }) // enviar todos los campos
        });

        const data = await response.text();
        console.log(data)
        console.log(response)

        if (response.ok) {
            alert("Cuenta creada exitosamente!");
            window.location.href = "login.html";
        } else {
            mostrarError(data.error || "Error al registrarse");
        }

    } catch (error) {
        mostrarError("No se pudo conectar con el servidor");
        console.error(error);
    }
});

function mostrarError(texto) {
    const err = document.getElementById("error");
    err.textContent = texto;
    err.classList.remove("d-none");
}

