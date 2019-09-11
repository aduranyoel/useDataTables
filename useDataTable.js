(function ($) {
    'use strict';
    $.fn.useDataTable = function (action, param, options) {
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
        var settings = $.extend({}, defaults, options);
        function draw(settings) {
            $(thas).DataTable(settings);
        }
        function delRow(idRow) {
            $(thas).DataTable()
                .row(idRow)
                .remove()
                .draw();
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
                return $(thas).DataTable().row(idRow).data();
            }
        }
        options.selection = options.selection || {};
        if (options.selection.enabled === true) {
            $(thas).on('click', 'tr', function () {
                var row = $(thas).DataTable().row(this);
                var data = row.data();
                var index = row.index();
                if (typeof options.selection.callback === "function") options.selection.callback(row, data, index);
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
            default:
                return draw(settings);
        }
    };
})(jQuery);