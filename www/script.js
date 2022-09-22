// -------------------------------------------------------
// PREAMBULO

// El premabulo tiene como cometido la identificación de la autoría del trabajo
// El nombre será mostrada en el elemento HTML #equipo de la página web
// Cada equipo debe actualizar la constante con el nombre del equipo
const nombreDelEquipoDeLaboratorio = "XXXXX";
document.getElementById("equipo").innerHTML = nombreDelEquipoDeLaboratorio;

// -------------------------------------------------------
// PROYECTO RESERVAS

// El cometido de la aplicación es poder realizar reservas de asientos para asistir a
// un determinado espectaculo

// Se muestra un plano de la sala con todos los asientos ofertados para el espectáculo
// Hay dos paneles interactivos para:
//   - pulsar en los asientos (para seleccionar o cancelar la seleecion)
//   - proceder (o cancelar la compra)
// Hay otros paneles informativos para:
//   - información general del espectáculo
//   - mostrar el precio total de la compra  y número de asientos seleccionados
//   - leyendas icónicas para identificar si un asiento está libre, ocupado o seleccionado

// - Cancelar: Libera todos los asientos reservados. El panel
//   informativo se reinicia.
// - Pagar: Es una simulación (no conduce a ninguna pasarela de pago)
//   El efecto de esta acción es que los asientos seleccionados pasan
//   a estar ocupados y el panel informativo se reincia como si se
//   hubiera realizado efectivamente el pago.

// Los asientos seleccionados en la reserva son almacenados localmente para permitir
// que la interacción puede ser reanudada en distitas sesiones.
//    https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// El almacen local almacena la variable:
// - asientos (un array de enteros que codifica si el asiento i-esimo
//   está LIBRE, OCUPADO o SELECCIONADO)

// -------------------------------------------------------
// VARIABLES

// Las variables asientos y espectaculo son las que determinan la reserva
//    a) El array asientos es un array de numeros que codifican su disponibilidad
//       (0= LIBRE, 1= OCUPADO o 2=SELLECCIONADO)
//    b) La cadena espectaculo almacena el nombre del espectaculo seleccionado
//  Ambas variables estan relacionadas con elementos en el DOM:
//     a) El elemento i-esmio del array asientos está relacionado con el elemento
//        .asiento en el DOM cuya atributo data-index es i.
//                 asiento[i]  <--->   <div class="asiento" data-index="i">
//    b) Los elementos DOM que representan espectaculos incluyen dos atributos data-*:
//         data-espectaculo (con el mombre del espectaculo)
//         data-precio (con el precio del especatáculo).
//                espectaculo="A"  <---> <input type="radio" name="espectaculos"
//                                        data-espectaculo="A" data-precio="10">
//

// Establece el tamaño del aforo (número de asientos en la sala)
const numeroTotalDeAsientos = 30;

// Constantes para identificar la disponibilidad de los asientos
const LIBRE = 0;
const OCUPADO = 1;
const SELECCIONADO = 2;

// Valores para el atributo class de los elementos (.asientos)
// Identifica los elementos en el DOM que representan un asiento.
// Adicionalmente, permite caracterizar la disponibilidad del asiento

const valorClassDeAsientoLIBRE = "asiento";
const valorClassDeAsientoOCUPADO = "asiento asiento--ocupado";
const valorClassDeAsientoSELECCIONADO = "asiento asiento--seleccionado";

// Variables de acceso a elementos HTML interactivos
const aforo = document.getElementById("aforo");
aforo.addEventListener("click", (e) => ___actualizaTipoDeAsiento(e.target));

const cancelar = document.getElementById("cancelar");
cancelar.addEventListener("click", cancelarReservas);
const pagar = document.getElementById("pagar");
pagar.addEventListener("click", pagarReservas);

// Variables de acceso a elementos HTML informativos
const precio = document.getElementById("precio");
const contador = document.getElementById("contador");
const precioTotal = document.getElementById("total");

// -------------------------------------------------------
// Funcion principal

function comienzo() {
  estableceConfiguracionDeAsientosDisponibles();

  generaAforoHTML();
  actualizaPanelDeInformacion();
}

//

// -------------------------------------------------------
// FUNCIONES AUXILIARES

// Funciones auxiliares a la función de comienzo:

function estableceConfiguracionDeAsientosDisponibles() {
  // Accedemos al almacen local para comprobar si hay registrado un item
  // con una configuración de asientos disponibles u ocupados

  const asientos = ___recuperaAsientosDelAlmacenLocal();

  if (asientos == null || asientos.length == 0) {
    // Si no hay ningún item en LocalStoriage se genera y almacena localmente una disposición de asientos
    // Esta configuración es un array de numeroTotalDeAsientos con valores entre 0 y 1 (i.e. LIBRE y OCUPAD0)
    const asientosAleatorios = generaArrayDeNumerosAleatorio(
      numeroTotalDeAsientos,
      0,
      1
    );
    ___actualizaAsientosEnAlmacenLocal(asientosAleatorios);
  }
}

function generaAforoHTML() {
  const asientos = ___recuperaAsientosDelAlmacenLocal();

  const aforoHTML = asientos
    .map((asiento, indice) => {
      let clase = "";
      switch (asiento) {
        case LIBRE:
          clase = valorClassDeAsientoLIBRE;
          break;
        case OCUPADO:
          clase = valorClassDeAsientoOCUPADO;
          break;
        case SELECCIONADO:
          clase = valorClassDeAsientoSELECCIONADO;
          break;
      }
      return `<button class="${clase}" data-index="${indice}"></div>`;
    })
    .join("");

  aforo.innerHTML = aforoHTML;
}

function generaArrayDeNumerosAleatorio(num, min, max) {
  // Devuelve un array con num numeros enteros con valores aleatorios entre min y max

  // Dado un array auxiliar [0, 1, 2, ...., num]
  //    construido mediante el operador de propagación (spread)
  //    https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Sintaxis_Spread
  const arrayAuxilar = [...Array(num).keys()];

  // y dada una función anónima que genera un número entero aleatorio entre 0 y max-1
  // const numeroAleatorio = (e) => Math.floor(Math.random() * maximo);
  const numeroAleatorio = (e) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  // Obtiene un array de números aleatorios aplicando la función anonima cada elemento del arrar auxiliar
  const arrayAleatorio = arrayAuxilar.map((e) => {
    return numeroAleatorio(e);
  });

  return arrayAleatorio;
}

function actualizaPanelDeInformacion() {
  // El panel muestra el número de asientos seleccionados y el precio total de la reserva
  const asientos = ___recuperaAsientosDelAlmacenLocal();

  const numeroDeAsientosSeleccionados = asientos.filter(
    (a) => a == SELECCIONADO
  ).length;
  const precioAsiento = precio.innerHTML;

  contador.innerHTML = numeroDeAsientosSeleccionados;
  precioTotal.innerHTML = (
    numeroDeAsientosSeleccionados * precioAsiento
  ).toString();
}

// -------------------------------------------------------------------------
// FUNCIONES GESTORAS DE LA INTERACCIÓN

//  Funciones para la cancelación y pago de reservas
function cancelarReservas() {
  const asientos = ___recuperaAsientosDelAlmacenLocal();
  asientos.forEach((elemento, indice) => {
    if (elemento == SELECCIONADO) {
      asientos[indice] = LIBRE;

      const selector = `[data-index="${indice}"]`;
      const asientoDOM = aforo.querySelector(selector);
      asientoDOM.classList = valorClassDeAsientoLIBRE;
    }
  });

  contador.innerText = "0";
  precioTotal.innerHTML = "0";
  ___actualizaAsientosEnAlmacenLocal(asientos);
}

function pagarReservas() {
  const asientos = ___recuperaAsientosDelAlmacenLocal();

  asientos.forEach((elemento, indice) => {
    if (elemento == SELECCIONADO) {
      asientos[indice] = OCUPADO;
      const selector = `[data-index="${indice}"]`;
      const asientoDOM = aforo.querySelector(selector);
      asientoDOM.classList = valorClassDeAsientoOCUPADO;
    }
  });

  contador.innerText = "0";
  precioTotal.innerHTML = "0";
  ___actualizaAsientosEnAlmacenLocal(asientos);
}

//  Funciones para efectuar la reserva (seleccion de asientos y espectaculo)
function ___actualizaTipoDeAsiento(asientoHTML) {
  // Para efectuar la actualizacion debemos:
  //  recuperar del almacen local el item asientos
  //  identificar (data-index) el asiento al que está vinculado el parametro asientoHTML
  // Las actualizaciones factibles son aquellas que se efectúan sobre asientos
  //   a) libres (que pasan a estar seleccionados)
  //   b) seleccionados (que pasan a estar libres)
  // La acción implica los siguientes cambios:
  //   - modicamos el estilo del asiento seleccionado para que ilustre su tipo
  //   - se actualiza el almacen local (LocalStorage) para reflejar el cambio en el asiento seleccionado
  //   - se actualiza el panel informativo a partir de la información actualizada en el almacen local
}

// -------------------------------------------------------------------------
// FUNCIONES AUXILIARES PARA GESTIONAR EL ALMACEN LOCAL (localStorage)

function ___recuperaAsientosDelAlmacenLocal() {
  // Devuelve el contendio del ítem  asientos de localStorage
}

function ___actualizaAsientosEnAlmacenLocal(asientos) {
  // Actualiza el ítem asientos de localStorage con el parametro asientos
}

// -------------------------------------------------------------------------
//  COMIENZO DE LA APLICACIÓN

comienzo();
