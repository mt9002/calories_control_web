// ===============================
// Función para mostrar alertas con desvanecimiento
// ===============================
function showAlert(id, message, timeout = 4000) {
    const alertEl = document.getElementById(id);
    if (!alertEl) return;

    alertEl.textContent = message;   // Poner el mensaje
    alertEl.classList.remove("d-none"); // Mostrar
    alertEl.style.opacity = 1;       // Reset opacidad

    // Desvanecer después de timeout
    setTimeout(() => {
        let fadeEffect = setInterval(() => {
            if (!alertEl.style.opacity) alertEl.style.opacity = 1;
            if (alertEl.style.opacity > 0) {
                alertEl.style.opacity -= 0.05;
            } else {
                clearInterval(fadeEffect);
                alertEl.classList.add("d-none");
                alertEl.style.opacity = 1; // Reset para la próxima vez
            }
        }, 30);
    }, timeout);
}
