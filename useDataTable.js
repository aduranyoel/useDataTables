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
            "dom": "lfrtip",
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
                if (typeof options.createdRow === "function") options.createdRow(row, data, dataIndex);
              }
        })
        var settings = $.extend({}, defaults, optionsResult);
        function draw(settings) {
            $(thas).DataTable(settings);
        }
        function delRow(idRow) {
            var row = Number.parseInt(idRow);
            if (!isNaN(row)){
                $(thas).DataTable()
                    .row(row)
                    .remove()
                    .draw();
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
        function columnTotal(idCol){
            var col = Number.parseInt(idCol);
            var lenCols = $(thas).DataTable().columns()[0].length;
            function suma(currentId){
                var dataCol = $(thas).DataTable().columns(currentId).data();
                var arrDataCol = new Array;
                for (var i = 0, len = dataCol.length; i < len; i++) {
                    arrDataCol.push(dataCol[i]);
                }
                var result = 0;
                for (var i = 0, len = arrDataCol[0].length; i < len; i++){
                    var current = 0;
                    current = Number.parseFloat(arrDataCol[0][i]);
                    if (isNaN(current)) current = 0;
                    result += current;  
                }
                return result;
            }
            if (!Number.isNaN(col) && col < lenCols){
                var sum = suma(col);
                sum = Number.parseFloat(sum).toFixed(3);
                if (sum < 10) sum = '0' + sum;
                return sum;
            }else{
                var arrSum = new Array;
                for (var i = 0; i < lenCols; i++ ){
                    var sum = suma(i);
                    sum = Number.parseFloat(sum).toFixed(3);
                    if (sum < 10) sum = '0' + sum;
                    arrSum.push(sum);
                }
                return arrSum;
            }
        }
        function rowTotal(idRow){
            var row = Number.parseInt(idRow);
            var lenRows = $(thas).DataTable().rows()[0].length;
            function suma(currentId){
                var dataRow = $(thas).DataTable().rows(currentId).data();
                var arrDataRow = new Array;
                for (var i = 0, len = dataRow.length; i < len; i++) {
                    arrDataRow.push(dataRow[i]);
                }
                var result = 0;
                for (var i = 0, len = arrDataRow[0].length; i < len; i++){
                    var current = 0;
                    current = Number.parseFloat(arrDataRow[0][i]);
                    if (isNaN(current)) current = 0;
                    result += current;  
                }
                return result;
            }
            if (!Number.isNaN(row) && row < lenRows){
                var sum = suma(row);
                sum = Number.parseFloat(sum).toFixed(3);
                if (sum < 10) sum = '0' + sum;
                return sum;
            }else{
                var arrSum = new Array;
                for (var i = 0; i < lenRows; i++ ){
                    var sum = suma(i);
                    sum = Number.parseFloat(sum).toFixed(3);
                    if (sum < 10) sum = '0' + sum;
                    arrSum.push(sum);
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
                callback: new Function
            }
        }, options.use ? options.use : {})
        if (useOptions.selection.enabled === true) {
            $(thas).on('click', 'tr', function () {
                var row = $(thas).DataTable().row(this);
                var data = row.data();
                var index = row.index();
                if (typeof useOptions.selection.callback === "function") useOptions.selection.callback(row, data, index);
            });
            $(thas).on('mouseenter', 'tr', function () {
                this.style.backgroundColor = 'rgb(246, 246, 246)';
                this.style.cursor = 'pointer';

            });
            $(thas).on('mouseleave', 'tr', function () {
                this.style.backgroundColor = '#fff';
                this.style.cursor = 'default';
            });
        }

        function help(){
            var content = '\n'+
            'help     (): Muestra esta ayuda\n'+
            'draw     (settings?: object): Dibuja el DataTable\n'+
            'data     (idRow?: string || number): Retorna datos de la(s) fila(s)\n'+
            'empty    (): Elimina todas las filas\n'+
            'addRow   (arrRow: array): Agrega un fila\n'+
            'delRow   (idRow: string || number): Elimina la fila seleccionada\n'+
            'totalCol (idCol?: string || number): Retorna sumatoria de columna(s)\n'+
            'totalRow (idRow?: string || number): Retorna sumatoria de fila(s)\n'
            return content;
        }

        switch (action) {
            case "help":
                return help();
            case "draw":
                return draw(settings);    
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