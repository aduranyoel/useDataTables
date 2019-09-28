(function ($) {
    'use strict';
    if ($ === undefined) throw new Error('NO SE ENCUENTRA "window.jQuery" PUEDE DESCARGARLO EN "https://jquery.com/"');
    $.fn.useDataTable = function (action, param, options) {
        if ($.fn.DataTable === undefined) throw new Error('NO SE ENCUENTRA "jQuery.fn.DataTable". PUEDE DESCARGARLO EN "https://datatables.net/"');
        var thas = this[0];
        action = action || '';
        param = param || '';
        options = options || {};
        if (typeof action === "object") options = action;
        if (typeof param === "object") options = param;
        var defaults = {
            "autoWidth": true,
            "info": false,
            "lengthChange": false,
            "lengthMenu": [10, 25, 50, 75, 100],
            "pageLength": 5,
            "pagingType": "numbers",
            "ordering": true,
            "searching": true,
            "serverSide": false,
            "scrollCollapse": true,
            "responsive": true,
            "colReorder": false,
            "fixedHeader": false,
            "dom": "<'usedatatable-top'>lfr<'usedatatable-header'>t<'usedatatable-footer'>ip<'usedatatable-bottom'>",
            "selection": false,
            "bPaginate": false,
            "paging": false,
            "bLengthChange": false,
            "destroy": true,
            "scrollY": true,
            "scrollX": true,
            "bAutoWidth": false,
            "order": [],
            "language": {
                "zeroRecords": "No se encontraron registros",
                "infoEmpty": "No se encontraron registros",
                "search": "BUSCAR",
                "paginate": {
                    "sFirst": "Primera",
                    "sPrevious": "Anterior",
                    "sNext": "Siguiente",
                    "sLast": "Última"
                }
            }
        };
        var useOptions = $.extend({}, {
            selection: {
                enabled: false,
                type: 'click',
                cursor: 'default',
                color: 'none',
                background: 'none',
                callback: new Function
            },
            className: ' display'
        }, options.use ? options.use : {});
        var optionsResult = $.extend({}, options, {
            "createdRow": function (row, data, dataIndex) {
                $(row).attr('data-idrow', dataIndex);
                options.createdRow = options.createdRow || new Function;
                if (typeof options.createdRow === "function") options.createdRow.call(this, row, data, dataIndex);
            }
        });
        var settings = $.extend({}, defaults, optionsResult);
        function draw(settings) {
            if (useOptions.className && typeof useOptions.className === "string") thas.className += useOptions.className;
            $(thas).DataTable(settings);
        }
        function redraw() {
            $(thas).DataTable().draw();
        }
        function delRow(idRow) {
            var row = Number.parseInt(idRow) || 0;
            if (!isNaN(row)) $(thas).DataTable().row(row).remove().draw();
        }
        function addRow(row) {
            if (Array.isArray(row) || $.isPlainObject(row)){
                Array.isArray(row) && ( Array.isArray(row[0]) || $.isPlainObject(row[0]) ) ?
                $(thas).DataTable().rows.add(row).draw() :
                $(thas).DataTable().row.add(row).draw();
            }
        }
        function getData(idRow) {
            var row = Number.parseInt(idRow);
            if (isNaN(row)) {
                var dataEleObj = $(thas).DataTable().rows().data();
                var arrRes = [];
                for (var i = 0, len = dataEleObj.length; i < len; i++) {
                    arrRes.push(dataEleObj[i]);
                }
                return arrRes;
            } else {
                return $(thas).DataTable().row(row).data();
            }
        }
        function suma(data) {
            return data.reduce(function (a, b) {
                a = Number.parseFloat(a) || 0;
                b = Number.parseFloat(b) || 0;
                return a + b;
            });
        }
        function columnTotal(idCol) {
            var col = Number.parseInt(idCol);
            var lenCols = $(thas).DataTable().columns()[0].length;
            if (!Number.isNaN(col) && col < lenCols) {
                return Number.parseFloat(suma($(thas).DataTable().columns(col).data()[0])).toFixed(3);
            } else {
                var arrSum = new Array;
                for (var i = 0; i < lenCols; i++) {
                    arrSum.push(Number.parseFloat(suma($(thas).DataTable().columns(i).data()[0])).toFixed(3));
                }
                return arrSum;
            }
        }
        function rowTotal(idRow) {
            var row = Number.parseInt(idRow);
            var lenRows = $(thas).DataTable().rows()[0].length;
            if (!Number.isNaN(row) && row < lenRows) {
                return Number.parseFloat(suma($(thas).DataTable().rows(row).data()[0])).toFixed(3);
            } else {
                var arrSum = new Array;
                for (var i = 0; i < lenRows; i++) {
                    arrSum.push(Number.parseFloat(suma($(thas).DataTable().rows(i).data()[0])).toFixed(3));
                }
                return arrSum;
            }
        }
        function clear() {
            $(thas).DataTable().clear().draw();
        }
        if (useOptions.selection.enabled === true) {
            useOptions.selection.type = useOptions.selection.type || 'click';
            useOptions.selection.cursor = useOptions.selection.cursor || 'default';
            useOptions.selection.background = useOptions.selection.background || 'none';
            useOptions.selection.color = useOptions.selection.color || 'none';
            $(thas).on(useOptions.selection.type, 'tr', function () {
                var row = $(thas).DataTable().row(this);
                var data = row.data();
                var index = row.index();
                if (typeof useOptions.selection.callback === "function") useOptions.selection.callback.call(this, row, data, index);
            });
            $(thas).on('mouseenter', 'tr', function () {
                this.style.cursor = useOptions.selection.cursor;
                this.style.backgroundColor = useOptions.selection.background;
                this.style.color = useOptions.selection.color;
            });
            $(thas).on('mouseleave', 'tr', function () {
                this.style.cursor = 'default';
                this.style.backgroundColor = '';
                this.style.color = '';
            });
        }

        function help() {
            return '\n' +
                'Acciones:\n\n' +
                'help     (): Muestra esta ayuda\n' +
                'draw     (settings?: object): Dibuja el DataTable (default)\n' +
                'redraw   (): Redibuja el DataTable\n' +
                'data     (idRow?: string || number): Retorna datos de la(s) fila(s)\n' +
                'add      (row(s): array || object): Agrega fila(s)\n' +
                'del      (idRow: string || number): Elimina la fila seleccionada\n' +
                'empty    (): Elimina todas las filas\n' +
                'totalCol (idCol?: string || number): Retorna sumatoria de columna(s)\n' +
                'totalRow (idRow?: string || number): Retorna sumatoria de fila(s)\n\n' +
                'Configuraciones Extra:\n' +
                '...\n' +
                'use: {\n' +
                '    ...                                     // Oppciones de useDataTable\n' +
                '}\n' +
                '...\n\n' +
                'selection: {\n' +
                '    enabled: true,                          // On/Off (default: "false")\n' +
                '    type: "click",                          // Evento? (default: "click")\n' +
                '    cursor: "default",                      // Cursor? (default: "default")\n' +
                '    color: "white",                         // Color? (default: "none")\n' +
                '    background: "black",                    // Background? (default: "none")\n' +
                '    callback: function(row, data, index){   // Accion del evento\n' +
                '\n' +
                '    },\n' +
                ' className: "table-responsive wrap etc"     // Clases? (default: "display")\n\n' +
                ' Estructura de "<div>": \n\n' +
                ' div.usedatatable-top\n' +
                ' div.usedatatable-header\n' +
                '  -------\n' +
                ' \| TABLE \|\n' +
                '  -------\n' +
                ' div.usedatatable-footer\n' +
                ' div.usedatatable-bottom\n';
        }

        switch (action) {
            case "help":
                return help();
            case "draw":
                return draw(settings);
            case "redraw":
                return redraw();
            case "data":
                return getData(param);
            case "del":
                return delRow(param);
            case "add":
                return addRow(param);
            case "totalCol":
                return columnTotal(param);
            case "totalRow":
                return rowTotal(param);
            case "empty":
                return clear();
            default:
                return draw(settings);
        }
    };
})(window.jQuery);