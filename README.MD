```js
$.fn.useDataTable('help');

Acciones:

help        (): Muestra esta ayuda
draw        (settings?: object): Dibuja el DataTable (default)
redraw      (): Redibuja el DataTable
data        (idRow?: string || number): Retorna datos de la(s) fila(s)
dataCol     (idCol?: string || number): Retorna datos de la(s) columna(s)
cell        (obj?: object): Retorna o Asigna el data de la celda
add         (row(s): array || object): Agrega fila(s)
del         (idRow(s): array || string || number): Elimina la(s) fila(s)
clear       (): Elimina todas las filas
destroy     (): Destruye el DataTable
settings    (): Retorna la configuracion del DataTable
adjust      (): Ajusta la(s) columna(s)
adjustEvent (): Agrega al (window.onresize) el ajuste de columnas
totalCol    (idCol?: string || number): Retorna sumatoria de columna(s)
totalRow    (idRow?: string || number): Retorna sumatoria de fila(s)

Configuraciones Extra:
...
use: {
    ...                                     // Oppciones de useDataTable
}
...

selection: {
    enabled: true,                          // On/Off (default: "false")
    type: "click",                          // Evento? (default: "click")
    cursor: "default",                      // Cursor? (default: "default")
    color: "white",                         // Color? (default: "none")
    background: "black",                    // Background? (default: "none")
    callback: function(row, data, index){   // Accion del evento

    },
 className: "table-responsive wrap etc",    // Clases? (default: "table nowrap")
 footer: true                               // Generar "tfoot"? (default: "false")

 Estructura de "<div>": 

 div.usedatatable-top
 div.usedatatable-header
  -------
 | TABLE |
  -------
 div.usedatatable-footer
 div.usedatatable-bottom
 ```