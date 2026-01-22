function init_imc() {
    const alturaSlider = document.getElementById("alturaSlider");
    const pesoSlider = document.getElementById("pesoSlider");
    const alturaValor = document.getElementById("altura-valor");
    const pesoValor = document.getElementById("peso-valor");

    alturaSlider.addEventListener("input", () => alturaValor.textContent = alturaSlider.value);
    pesoSlider.addEventListener("input", () => pesoValor.textContent = pesoSlider.value);

    const form = document.getElementById("imc-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const altura = parseFloat(alturaSlider.value);
        const peso = parseFloat(pesoSlider.value);

        // Lógica de cálculo del IMC
        const imc = (peso / ((altura / 100) ** 2)).toFixed(2);
        let categoria = "";
        if (imc < 18.5) categoria = "Bajo peso";
        else if (imc < 25) categoria = "Normal";
        else if (imc < 30) categoria = "Sobrepeso";
        else categoria = "Obesidad";

        // Mostrar resultado
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.textContent = `Tu IMC es ${imc} (${categoria})`;
        resultadoDiv.classList.remove("d-none");

        // Aquí podrías enviar los datos al backend
        // fetch("/imc/create", { method: "POST", body: JSON.stringify({altura, peso, imc, categoria}) })

        // Actualizar tabla (simulación)
        addRow({ userName: "Juan Perez", peso, altura: altura / 100, resultado: imc, clasificacion: categoria, fechaRegistro: new Date().toLocaleDateString() });
    });

    // Tabla e historial
    const tableBody = document.getElementById("tabla-imc").querySelector("tbody");
    let registros = [];

    function addRow(registro) {
        registros.push(registro);
        renderTable();
    }

    // Paginación
    const pageSizeSelect = document.getElementById("pageSize");
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pagina-info");
    let currentPage = 0;
    let pageSize = parseInt(pageSizeSelect.value);

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
        <td>${r.fechaRegistro}</td>
      `;
            tableBody.appendChild(tr);
        }

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = end >= registros.length;
        pageInfo.textContent = `Página ${currentPage + 1} de ${Math.ceil(registros.length / pageSize)}`;
    }

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
}
