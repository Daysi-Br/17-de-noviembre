document.getElementById("convertBtn").addEventListener("click", async () => {
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Ingresa un monto válido");
        return;
    }

    const API_KEY = "532a0ab86780bc913a5321fc";
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result !== "success") {
            document.getElementById("results").innerHTML = "<p>Error en la API</p>";
            return;
        }

        const guaranies = (amount * data.conversion_rates.PYG).toLocaleString("es-PY");
        const pesoArg = (amount * data.conversion_rates.ARS).toLocaleString("es-AR");
        const real = (amount * data.conversion_rates.BRL).toLocaleString("pt-BR");

        document.getElementById("results").innerHTML = `
            <p><strong>Guaraníes (PYG):</strong> ${guaranies}</p>
            <p><strong>Peso Argentino (ARS):</strong> ${pesoArg}</p>
            <p><strong>Real Brasileño (BRL):</strong> ${real}</p>
        `;
    } catch (error) {
        document.getElementById("results").innerHTML = "<p>Error al obtener datos</p>";
    }
});
