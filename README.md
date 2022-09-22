# Introducción

Este repositorio es una actividad de la asignatura IPO (Interacción Personal Ordenador). La asignatura IPO se imparte en las titulaciones de informática de la Universidad de Sevilla.

La actividad tiene como cometido completar el proyecto web inacabado del repositorio atendiendo a unos objetivos que se detallan en este documento.

El cometido de la aplicación es poder realizar reservas de asientos para asistir a un determinado espectaculo

Se muestra un plano de la sala con todos los asientos ofertados para el espectáculo

Hay dos paneles interactivos para:

- pulsar en los asientos (para seleccionar o cancelar la seleecion)
- proceder (o cancelar la compra)

Hay otros paneles informativos para:

- información general del espectáculo
- mostrar el precio total de la compra y número de asientos seleccionados
- leyendas icónicas para identificar si un asiento está libre, ocupado o seleccionado

Se incluyen dos botones: Cancelar y Pagar

- Cancelar: Libera todos los asientos reservados. El panel
  informativo se reinicia.
- Pagar: Es una simulación (no conduce a ninguna pasarela de pago). El efecto de esta acción es que los asientos seleccionados pasa a estar ocupados y el panel informativo se reincia como si se hubiera realizado efectivamente el pago.

Los asientos seleccionados en la reserva son almacenados localmente para permitir
que la interacción puede ser reanudada en distitas sesiones. El almacen local se gestiona mediante
[MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

El almacen local almacena la variable:

- asientos (un array de enteros que codifica si el asiento i-esimo
  está LIBRE, OCUPADO o SELECCIONADO)

# Contenido

La carperta _www_ incluye los ficheros de partida: _index.html_, _script.js_ y _style.css_.

Los cambios se harán fundamentalmente en _style.css_ y _script.js_. En general, consistirán en:

- añadir declaraciones en las reglas CSS preexistentes
- completar funciones vacías en JS. Para su fácil identificación, los nombres de las funciones a completar comenzarán con tres subrayados. Ej.: \_\_\_funcionVacia()

Se admitirán cambios puntuales en la hoja CSS:

- que obedezcan a alguna observación realizada explícitamente en la actividad
- para fomentar la comprensión de la interacción o realzar la estética (márgenes, sombras, redondeado de esquinas, etc.)
- para dotar de un diseño cromático y tipográfico personal al proyecto.

Los cambios en _index.html_ serán admitidos sólo en el caso de que la solución aportada suponga una modificación significativa de la composición del proyecto que requiera dicha intervención.

# Identificación del trabajo:

- script.js: Se actualizará el nombre del equipo de laboratorio en la variable

            const nombreDelEquipoDeLaboratorio = "XXXXXX";

- style.css: Se actualizará el nombre del equipo de laboratorio en la cabecera

             /* EQUIPO <<XXXXXXX>> */

# Objetivos:

El objetivo de la actividad es el aprendizaje de las dos siguientes técnicas:

- realizar composiciones apoyándose en Grid [MDN: Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grid).
- gestión de almacenes locales (en este caso particular localStorage)

Desde el punto de vista del diseño, esta actividad pretende:

- ampliar las estrategias de composición (en este caso, bidireccional)
- aprender a combinar de forma oportuna Grid, Flexbox y Flujo Normal

Como objetivos globales (ya tenido en cuenta en actividades anterirores):

- el uso apropiado de las unidades de medida espaciales en el diseño (em, rem, %, ...)
- la estilización de los elementos como apoyo a la comprensión de la interacción (ej.: ¿cómo hacer notar al usuario que sus acciones son correctas?)
- la flexibilidad en el diseño: _var()_, _calc()_, _clamp(min, preferente, max)_

# Indicaciones

El estilo de codificación en el proyecto se apoya en las siguientes características:

- Atributo id: reservar este atributo para el acceso en JS de elementos HTML
- Atributo class: reservar las clases fundamentalmente para estilizar con CSS los elementos HTML
- [Notación BEM](https://getbem.com/) para seleccionar en CSS los elementos HTML
- Notación hsl() para codificar los colores
- Elemento :root para aunar las variables del diseño cromático y tipográfico
- Variables: Generalizar los estilos CSS mediante el uso de variables var() y la función calc()
- Uso preferente de unidades de longitud flexibles (em, rem, vh, vw, %)
- Criterio homogéneo de organización y nomenclatura
  - En reglas y declaraciones en CSS
  - En variables/funciones en JS
  - Notación camello en los nombres en JS
- Comentarios
  - incluir las referencias utilizadas para el diseño o codificación (MDN, Youtube, Stackoverflow , Coolors, etc.)
  - comentar los aspectos que faciliten la lectura del código cuando sea necesario, evitando los comentarios triviales que se limitan a reescribir el código
