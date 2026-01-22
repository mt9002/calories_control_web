function init_imcregister() {
    const alturaSlider = document.getElementById("alturaSlider");
    const pesoSlider = document.getElementById("pesoSlider");
    const alturaValor = document.getElementById("altura-valor");
    const pesoValor = document.getElementById("peso-valor");
    const form = document.getElementById("imc-form");
    const tableBody = document.getElementById("tabla-imc")?.querySelector("tbody");
    const pageSizeSelect = document.getElementById("pageSize");
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pagina-info");
    const resultadoDiv = document.getElementById("resultado");
    const errorDiv = document.getElementById("error");

    if (!alturaSlider || !pesoSlider) return;

    // Sincronizar valores iniciales
    alturaValor.textContent = alturaSlider.value;
    pesoValor.textContent = pesoSlider.value;

    alturaSlider.addEventListener("input", () => {
        alturaValor.textContent = alturaSlider.value;
    });
    pesoSlider.addEventListener("input", () => {
        pesoValor.textContent = pesoSlider.value;
    });

    if (!alturaSlider || !pesoSlider || !form || !tableBody) {
        console.warn("init_imc: elementos no encontrados, ¿la vista está cargada?");
        return;
    }

    const API_URL = "http://localhost:8080/imc/create";
    let registros = [];
    let currentPage = 0;
    let pageSize = parseInt(pageSizeSelect.value);


    // =======================
    // Formulario
    // =======================
    document.getElementById("imcForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const altura = parseFloat(alturaSlider.value);
        const peso = parseFloat(pesoSlider.value);

        resultadoDiv.classList.add("d-none");
        errorDiv.classList.add("d-none");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ altura, peso })
            });

            if (!response.ok) throw new Error("Error al calcular IMC");
            const data = await response.json();

            resultadoDiv.textContent = `Tu IMC es ${data.imc} (${data.categoria})`;
            resultadoDiv.classList.remove("d-none");

            addRow({
                userName: data.userName || "Usuario",
                peso: data.peso,
                altura: data.altura,
                resultado: data.imc,
                clasificacion: data.categoria,
                fechaRegistro: data.fechaRegistro
            });

        } catch (err) {
            console.error(err);
            errorDiv.textContent = "No se pudo calcular el IMC. Intenta de nuevo.";
            errorDiv.classList.remove("d-none");
        }
    });

    // =======================
    // Tabla
    // =======================
    function addRow(registro) {
        registros.push(registro);
        renderTable();
    }

    function renderTable() {
        tableBody.innerHTML = "";
        const start = currentPage * pageSize;
        const end = start + pageSize;
        const pageRegs = registros.slice(start, end);

        for (const r of pageRegs) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${r.userName}</td>
                <td>${r.peso}</td>
                <td>${r.altura.toFixed(2)}</td>
                <td>${r.resultado}</td>
                <td>${r.clasificacion}</td>
                <td>${new Date(r.fechaRegistro).toLocaleDateString()}</td>
            `;
            tableBody.appendChild(tr);
        }

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = end >= registros.length;
        pageInfo.textContent = `Página ${currentPage + 1} de ${Math.ceil(registros.length / pageSize)}`;
    }

    // =======================
    // Paginación
    // =======================
    pageSizeSelect.addEventListener("change", () => {
        pageSize = parseInt(pageSizeSelect.value);
        currentPage = 0;
        renderTable();
    });

    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) { currentPage--; renderTable(); }
    });

    nextBtn.addEventListener("click", () => {
        if ((currentPage + 1) * pageSize < registros.length) { currentPage++; renderTable(); }
    });
};
