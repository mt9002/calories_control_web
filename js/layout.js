// ===============================
// Cargar fragmentos (header/footer)
// ===============================
async function loadFragment(id, url) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error cargando ${url}`, error);
    }
}

// ===============================
// Cargar vistas dinámicas
// ===============================
async function loadView(view) {
    try {
        const res = await fetch(`views/${view}.html`);
        const html = await res.text();
        document.getElementById("app").innerHTML = html;

        // hook opcional por vista
        if (typeof window[`init_${view.replace('_')}`] === "function") {
            window[`init_${view}`]();
        }

    } catch (error) {
        document.getElementById("app").innerHTML =
            "<p class='text-danger'>Error cargando la vista</p>";
        console.error(error);
    }
}

// ===============================
// Router SPA (sin recargar)
// ===============================
document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();

    const view = link.dataset.link;
    loadView(view);
    history.pushState({ view }, "", `#${view}`);
});

// ===============================
// Manejo del botón atrás
// ===============================
window.addEventListener("popstate", (e) => {
    const view = e.state?.view || "home";
    loadView(view);
});

// ===============================
// Inicialización
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadFragment("header", "fragments/header.html");
    loadFragment("footer", "fragments/footer.html");

    const initialView = location.hash.replace("#", "") || "home";
    loadView(initialView);
});
