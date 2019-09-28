```js
$.fn.useDataTable('help');

Acciones:

help     (): Muestra esta ayuda
draw     (settings?: object): Dibuja el DataTable (default)
redraw   (): Redibuja el DataTable
data     (idRow?: string || number): Retorna datos de la(s) fila(s)
addRow   (row: array || object): Agrega un fila
addData  (data: array): Agrega fila(s)
delRow   (idRow: string || number): Elimina la fila seleccionada
empty    (): Elimina todas las filas
totalCol (idCol?: string || number): Retorna sumatoria de columna(s)
totalRow (idRow?: string || number): Retorna sumatoria de fila(s)

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
 className: "table-responsive wrap etc"     // Clases? (default: "display")

 Estructura de "<div>": 

 div.usedatatable-top
 div.usedatatable-header
  -------
 | TABLE |
  -------
 div.usedatatable-footer
 div.usedatatable-bottom
```