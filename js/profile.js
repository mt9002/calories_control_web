function init_profile() {
    // Simulación de datos del usuario
    const user = {
        avatarUrl: "https://randomuser.me/api/portraits/lego/5.jpg",
        userName: "Juan Perez",
        userEmail: "juan@example.com",
        fechaRegistro: "2025-01-15",
        userRole: "ADMIN"
    };

    document.getElementById("avatarImg").src = user.avatarUrl;
    document.getElementById("userName").textContent = user.userName;
    document.getElementById("userEmail").textContent = user.userEmail;
    document.getElementById("fechaRegistro").textContent = user.fechaRegistro;
    document.getElementById("userRole").textContent = user.userRole;

    // Manejo del form para subir avatar
    document.getElementById("avatarForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fileInput = e.target.file.files[0];
        if (!fileInput) return;

        const formData = new FormData();
        formData.append("file", fileInput);

        try {
            const res = await fetch("http://localhost:8080/users/avatar", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                document.getElementById("avatarImg").src = data.avatarUrl;
                showSuccess("Avatar actualizado!");
            } else {
                showError(data.error || "Error al subir avatar");
            }
        } catch (err) {
            showError("No se pudo conectar con el servidor");
            console.error(err);
        }
    });
}

// Funciones de mensaje
function showSuccess(msg) {
    const el = document.getElementById("successMsg");
    el.textContent = msg;
    el.classList.remove("d-none");
    setTimeout(() => el.classList.add("d-none"), 3000);
}

function showError(msg) {
    const el = document.getElementById("errorMsg");
    el.textContent = msg;
    el.classList.remove("d-none");
    setTimeout(() => el.classList.add("d-none"), 5000);
}
