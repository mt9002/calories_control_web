// calculator.js

function init_home() {
    // Sliders
    const alturaSlider = document.getElementById("alturaSlider");
    const alturaValor = document.getElementById("altura-valor");
    const pesoSlider = document.getElementById("pesoSlider");
    const pesoValor = document.getElementById("peso-valor");
    const calcularBtn = document.getElementById("calcular-btn");
    const resultadoDiv = document.getElementById("resultado");
    const resultadoTexto = document.getElementById("resultado-texto");
    const resultadoCategoria = document.getElementById("resultado-categoria");

    if (!alturaSlider || !pesoSlider) return; // seguridad por si la vista no es home

    // Actualizar badges al mover sliders
    alturaSlider.addEventListener("input", () => {
        alturaValor.textContent = alturaSlider.value;
    });

    pesoSlider.addEventListener("input", () => {
        pesoValor.textContent = pesoSlider.value;
    });

    // Calcular IMC
    calcularBtn.addEventListener("click", () => {
        const altura = parseFloat(alturaSlider.value) / 100;
        const peso = parseFloat(pesoSlider.value);
        const imc = peso / (altura * altura);

        resultadoDiv.classList.remove("d-none");
        resultadoTexto.textContent = `Tu IMC es ${imc.toFixed(1)}`;

        let categoria = "";
        if (imc < 18.5) categoria = "Bajo peso";
        else if (imc < 25) categoria = "Normal";
        else if (imc < 30) categoria = "Sobrepeso";
        else if (imc < 35) categoria = "Obesidad tipo 1";
        else if (imc < 40) categoria = "Obesidad tipo 2";
        else categoria = "Obesidad tipo 3";

        resultadoCategoria.textContent = `Categoría: ${categoria}`;
    });
}
