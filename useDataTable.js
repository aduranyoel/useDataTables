(function ($) {
    'use strict';
    if ($ === undefined) throw new Error('NO SE ENCUENTRA "window.jQuery" PUEDE DESCARGARLO EN "https://jquery.com/"')
    $.fn.useDataTable = function (action, param, options) {
        if ($.fn.DataTable === undefined) throw new Error('NO SE ENCUENTRA "$.fn.DataTable". PUEDE DESCARGARLO EN "https://datatables.net/"')
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
            "dom": "lfr<'usedatatable-header'>t<'usedatatable-footer'>ip",
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
        var optionsResult = $.extend({}, options,{
            "createdRow": function( row, data, dataIndex ) {
                $(row).attr('data-idrow', dataIndex);
                options.createdRow = options.createdRow || new Function;
                if (typeof options.createdRow === "function") options.createdRow.call(this, row, data, dataIndex);
              },
            "initComplete": function(settings, json){

            options.initComplete = options.initComplete || new Function;
            if (typeof options.initComplete === "function") options.initComplete.call(this, settings, json);
            }
        })
        var settings = $.extend({}, defaults, optionsResult);
        function draw(settings) {
            $(thas).DataTable(settings);
        }
        function redraw() {
            $(thas).DataTable().draw();
        }
        function delRow(idRow) {
            var row = Number.parseInt(idRow);
            if (!isNaN(row)){
                $(thas).DataTable().row(row).remove().draw();
            }
        }
        function addRow(arrRow) {
            if (Array.isArray(arrRow)){
                $(thas).DataTable().row.add(arrRow).draw();
            }
        }
        function getData(idRow) {
            var row = Number.parseInt(idRow);
            if (isNaN(row)){
                var dataEleObj = $(thas).DataTable().rows().data();
                var arrRes = [];
                for (var i = 0, len = dataEleObj.length; i < len; i++) {
                    arrRes.push(dataEleObj[i]);
                }
                return arrRes;
            }else{
                return $(thas).DataTable().row(row).data();
            }
        }
        function suma(data){
            return data.reduce(function(a, b){
                var acumulador = Number.parseFloat(a) || 0;
                var actual = Number.parseFloat(b) || 0;
                return acumulador + actual;
            })
        }
        function columnTotal(idCol){
            var col = Number.parseInt(idCol);
            var lenCols = $(thas).DataTable().columns()[0].length;
            if (!Number.isNaN(col) && col < lenCols){
                var dataCol = $(thas).DataTable().columns(col).data()[0];
                return Number.parseFloat(suma(dataCol)).toFixed(3);
            }else{
                var arrSum = new Array;
                for (var i = 0; i < lenCols; i++ ){
                    var dataCol = $(thas).DataTable().columns(i).data()[0];
                    arrSum.push(Number.parseFloat(suma(dataCol)).toFixed(3));
                }
                return arrSum;
            }
        }
        function rowTotal(idRow){
            var row = Number.parseInt(idRow);
            var lenRows = $(thas).DataTable().rows()[0].length;
            if (!Number.isNaN(row) && row < lenRows){
                var dataRow = $(thas).DataTable().rows(row).data()[0];
                return Number.parseFloat(suma(dataRow)).toFixed(3);
            }else{
                var arrSum = new Array;
                for (var i = 0; i < lenRows; i++ ){
                    var dataRow = $(thas).DataTable().rows(i).data()[0];
                    arrSum.push(Number.parseFloat(suma(dataRow)).toFixed(3));
                }
                return arrSum;
            }
        }
        function clear(){
            $(thas).DataTable().clear().draw();
        }
        var useOptions = $.extend({}, {
            selection: {
                enabled: false,
                type: 'click',
                callback: new Function
            }
        }, options.use ? options.use : {})
        if (useOptions.selection.enabled === true) {
            useOptions.selection.type = useOptions.selection.type || 'click';
            $(thas).on(useOptions.selection.type, 'tr', function () {
                var row = $(thas).DataTable().row(this);
                var data = row.data();
                var index = row.index();
                if (typeof useOptions.selection.callback === "function") useOptions.selection.callback.call(this, row, data, index);
            });
            $(thas).on('mouseenter', 'tr', function () {
                this.style.backgroundColor = 'rgb(246, 246, 246)';
                //this.style.cursor = 'pointer';
            });
            $(thas).on('mouseleave', 'tr', function () {
                this.style.backgroundColor = '#fff';
                //this.style.cursor = 'default';
            });
        }

        function help(){
            return '\n'+
            'Metodos:\n\n'+
            'help     (): Muestra esta ayuda\n'+
            'draw     (settings?: object): Dibuja el DataTable (default)\n'+
            'data     (idRow?: string || number): Retorna datos de la(s) fila(s)\n'+
            'empty    (): Elimina todas las filas\n'+
            'redraw   (): Redibuja el DataTable\n'+
            'addRow   (arrRow: array): Agrega un fila\n'+
            'delRow   (idRow: string || number): Elimina la fila seleccionada\n'+
            'totalCol (idCol?: string || number): Retorna sumatoria de columna(s)\n'+
            'totalRow (idRow?: string || number): Retorna sumatoria de fila(s)\n\n'+
            'Settings:\n'+
            '...\n'+
            'use: {\n'+
            '    ...                                     // Oppciones de useDataTable\n'+
            '}\n'+
            '...\n\n'+
            'selection: {\n'+
            '    enabled: true,                          // On/Off selection\n'+
            '    type: "click",                          // Evento? (default: "click")\n'+
            '    callback: function(row, data, index){   // Accion del evento\n'+
            '\n'+
            '    }\n'+
            '}\n'
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
            case "delRow":
                return delRow(param);
            case "addRow":
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