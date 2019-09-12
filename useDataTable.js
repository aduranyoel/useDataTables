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
            if (idRow !== ''){
                $(thas).DataTable()
                    .row(idRow)
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
            if (idRow === undefined || idRow === ''){
                var dataEleObj = $(thas).DataTable().rows().data();
                var arrRes = [];
                for (var i = 0, len = dataEleObj.length; i < len; i++) {
                    arrRes.push(dataEleObj[i]);
                }
                return arrRes;
            }else{
                if (typeof idRow === "string" || typeof idRow === "number"){
                    return $(thas).DataTable().row(idRow).data();
                }
            }
        }
        function columnTotal(idCol){
            if (idCol === undefined || idCol === ''){
                
            }else{
                var dataCol = $(thas).DataTable().columns(idCol).data();
                var arrDataCol = [];
                for (var i = 0, len = dataCol.length; i < len; i++) {
                    arrDataCol.push(dataCol[i]);
                }
                console.log(arrDataCol)
                var result = 0;
                for (var i = 0, len = arrDataCol[0].length; i < len; i++){
                    var current = 0;
                    current = Number.parseFloat(arrDataCol[0][i]);
                    if (isNaN(current)) current = 0;
                    result += current;  
                }
                result += '';
                return Number.parseFloat(result.slice(0, result.indexOf('.')+3));
            }
        }
        options.use = options.use || {};
        options.use.selection = options.use.selection || {};
        if (options.use.selection.enabled === true) {
            $(thas).on('click', 'tr', function () {
                var row = $(thas).DataTable().row(this);
                var data = row.data();
                var index = row.index();
                if (typeof options.use.selection.callback === "function") options.use.selection.callback(row, data, index);
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

        switch (action) {
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
            
            default:
                return draw(settings);
        }
    };
})(window.jQuery);