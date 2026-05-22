document.addEventListener("DOMContentLoaded", () => {
    
    // ASIGNACIÓN DE EVENTOS
    document.getElementById("btn-calcular-calor").addEventListener("click", calcularTransferenciaCalor);
    document.getElementById("btn-calcular-combinaciones").addEventListener("click", calcularCombinacionesSorteo);

    /**
     * EJERCICIO 1: SIMULADOR DE TRANSFERENCIA DE CALOR
     * Uso estricto de Math.exp() y Math.round()
     */
    function calcularTransferenciaCalor() {
        // Captura de datos mediante .value
        const t0 = parseFloat(document.getElementById("t0").value);
        const ts = parseFloat(document.getElementById("ts").value);
        const k = parseFloat(document.getElementById("k").value);
        const t = parseFloat(document.getElementById("t").value);
        
        const contenedorResultado = document.getElementById("resultado-calor");

        if (isNaN(t0) || isNaN(ts) || isNaN(k) || isNaN(t)) {
            mostrarResultado(contenedorResultado, "Por favor, complete todos los campos.", false);
            return;
        }

        // PROCESAMIENTO REQUERIDO AL PIE DE LA LETRA:
        // Implementación con Math.exp()
        const exponencial = Math.exp(-k * t);
        const temperaturaFinal = ts + (t0 - ts) * exponencial;
        
        // Redondeo obligatorio al entero más cercano con Math.round()
        const resultadoRedondeado = Math.round(temperaturaFinal);

        // SALIDA: Desplegar el resultado numérico
        mostrarResultado(contenedorResultado, `Temperatura Final: ${resultadoRedondeado}°F`, true);
    }

    /**
     * EJERCICIO 2: CALCULADOR DE COMBINACIONES COMPLEJAS
     */
    function calcularCombinacionesSorteo() {
        const n1 = parseInt(document.getElementById("n1").value);
        const r1 = parseInt(document.getElementById("r1").value);
        const n2 = parseInt(document.getElementById("n2").value);
        const r2 = parseInt(document.getElementById("r2").value);

        const contenedorResultado = document.getElementById("resultado-combinaciones");

        if (isNaN(n1) || isNaN(r1) || isNaN(n2) || isNaN(r2) || n1 < 0 || r1 < 0 || n2 < 0 || r2 < 0) {
            mostrarResultado(contenedorResultado, "Los valores deben ser enteros no negativos.", false);
            return;
        }

        // Validación nativa para evitar desbordamientos o valores incompatibles (r > n)
        if (r1 > n1 || r2 > n2) {
            mostrarResultado(contenedorResultado, "Validación: El valor de la muestra (r) no puede ser mayor que el total de elementos (n).", false);
            return;
        }

        // Control de desbordamiento de memoria para números excesivamente grandes
        if (n1 > 170 || n2 > 170) {
            mostrarResultado(contenedorResultado, "Por seguridad del sistema, use valores de 'n' máximos de 170.", false);
            return;
        }

        // Cálculo utilizando la función de factorial propia
        const combinacionesGrupo1 = calcularCombinacion(n1, r1);
        const combinacionesGrupo2 = calcularCombinacion(n2, r2);
        const resultadoTotal = combinacionesGrupo1 * combinacionesGrupo2;

        // SALIDA: Mostrar el total formateado de manera dinámica
        mostrarResultado(
            contenedorResultado, 
            `Combinaciones Totales: ${resultadoTotal.toLocaleString("es-ES")}`, 
            true
        );
    }

    /**
     * FUNCIÓN PROPIA PARA EL CÁLCULO DE FACTORIAL (!)
     * Estructura iterativa limpia, obligatoria sin librerías externas.
     */
    function calcularFactorial(numero) {
        if (numero === 0 || numero === 1) return 1;
        let resultado = 1;
        for (let i = 2; i <= numero; i++) {
            resultado *= i;
        }
        return resultado;
    }

    function calcularCombinacion(n, r) {
        return calcularFactorial(n) / (calcularFactorial(r) * calcularFactorial(n - r));
    }

    function mostrarResultado(elemento, mensaje, esExitoso) {
        elemento.innerHTML = mensaje;
        if (esExitoso) {
            elemento.className = "result-container result-success";
        } else {
            elemento.className = "result-container result-error";
        }
    }
});