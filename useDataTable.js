(function ($, $w) {
    'use strict';
    if ($ === undefined) throw new Error('NO SE ENCUENTRA "window.jQuery" PUEDE DESCARGARLO EN "https://jquery.com/"')
    $.fn.useDataTable = function (action, param, options) {
        if ($.fn.DataTable === undefined) throw new Error('NO SE ENCUENTRA "$.fn.DataTable". PUEDE DESCARGARLO EN "https://datatables.net/"')
        var thas = this[0];
        $w.useDT_sourceMapping = new Object;
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
        var useOptions = $.extend({}, {
            selection: {
                enabled: false,
                type: 'click',
                cursor: 'default',
                callback: new Function
            },
            filter: {
                enabled: false,
                targets: new Array
            }
        }, options.use ? options.use : {})
        options.columnDefs = options.columnDefs || [];
        var firstColumnDefs = [];
        
        
        if (useOptions.filter.enabled === true){
            $w.useDT_sourceMapping[thas.id] = $w.useDT_sourceMapping[thas.id] || new Object;
            // tablaId: {
            //     filtroLinea: {
            //         name: 'Linea',
            //         targetSelect: '',
            //         values: [],
            //         totalValues: [],
            //         selectedValues: [],
            //     }
            // }
            if (Array.isArray(useOptions.filter.targets)){useOptions.filter.targets = useOptions.filter.targets;}else{useOptions.filter.targets =  new Array;}
            if (useOptions.filter.targets.length > 0){
                var lenCols = options.columns.length;
                var validTargets = new Array;
                useOptions.filter.targets.forEach(function(target){
                    if (target < lenCols){
                        validTargets.push(target);
                        options.columns[target].title += '<button data-idcol="'+target+'" data-source="'+options.columns[target].title+'" style="float: right;" class="btn btn-default btn-usedatatable-filter"><i class="fa fa-filter"></i></button>';

                    }
                })
                firstColumnDefs.push({"targets": validTargets, "orderable": false})
            }
        }
        var customColumnDefs = firstColumnDefs.concat(options.columnDefs);
        var optionsResult = $.extend({}, options,{
            "createdRow": function( row, data, dataIndex ) {
                $(row).attr('data-idrow', dataIndex);
                options.createdRow = options.createdRow || new Function;
                if (typeof options.createdRow === "function") options.createdRow.call(this, row, data, dataIndex);
              },
            "initComplete": function(settings, json){
                if (useOptions.filter.enabled === true){
                    if (Array.isArray(useOptions.filter.targets)){useOptions.filter.targets = useOptions.filter.targets;}else{useOptions.filter.targets =  new Array;}
                    if (useOptions.filter.targets.length > 0){
                        var lenCols = $(thas).DataTable().columns()[0].length;
                        useOptions.filter.targets.forEach(function(target){
                            if (target < lenCols){
                                $w.useDT_sourceMapping[thas.id][source] = $w.useDT_sourceMapping[thas.id][options.columns[idCol].title] || new Object;
                                $w.useDT_sourceMapping[thas.id][source].name = options.columns[idCol].title;
                                $w.useDT_sourceMapping[thas.id][source].targetSelect = '';
                                $w.useDT_sourceMapping[thas.id][source].values = $(thas).DataTable().columns(idCol).data()[0];
                                $w.useDT_sourceMapping[thas.id][source].totalValues = $(thas).DataTable().columns(idCol).data()[0];
                                $w.useDT_sourceMapping[thas.id][source].selectedValues = [];
                            }
                        })
                    }
                }

                $('.btn-usedatatable-filter').on('click', function(e){
                    e.preventDefault();
                    var title = $(this).data('source') || "";
                    var source = $(this).data('source') || "";
                    var idCol = $(this).data('idcol') || "";

                    
                    
                    if (source) {
                        showModal(title, source);
                    }
                })
                

            options.initComplete = options.initComplete || new Function;
            if (typeof options.initComplete === "function") options.initComplete.call(this, settings, json);
            },
            columnDefs: customColumnDefs
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
                a = Number.parseFloat(a) || 0;
                b = Number.parseFloat(b) || 0;
                return a + b;
            })
        }
        function columnTotal(idCol){
            var col = Number.parseInt(idCol);
            var lenCols = $(thas).DataTable().columns()[0].length;
            if (!Number.isNaN(col) && col < lenCols){
                return Number.parseFloat(suma($(thas).DataTable().columns(col).data()[0])).toFixed(3);
            }else{
                var arrSum = new Array;
                for (var i = 0; i < lenCols; i++ ){
                    arrSum.push(Number.parseFloat(suma($(thas).DataTable().columns(i).data()[0])).toFixed(3));
                }
                return arrSum;
            }
        }
        function rowTotal(idRow){
            var row = Number.parseInt(idRow);
            var lenRows = $(thas).DataTable().rows()[0].length;
            if (!Number.isNaN(row) && row < lenRows){
                return Number.parseFloat(suma($(thas).DataTable().rows(row).data()[0])).toFixed(3);
            }else{
                var arrSum = new Array;
                for (var i = 0; i < lenRows; i++ ){
                    arrSum.push(Number.parseFloat(suma($(thas).DataTable().rows(i).data()[0])).toFixed(3));
                }
                return arrSum;
            }
        }
        function clear(){
            $(thas).DataTable().clear().draw();
        }
        
        if (useOptions.selection.enabled === true) {
            useOptions.selection.type = useOptions.selection.type || 'click';
            useOptions.selection.cursor = useOptions.selection.cursor || 'default';
            $(thas).on(useOptions.selection.type, 'tr', function () {
                var row = $(thas).DataTable().row(this);
                var data = row.data();
                var index = row.index();
                if (typeof useOptions.selection.callback === "function") useOptions.selection.callback.call(this, row, data, index);
            });
            $(thas).on('mouseenter', 'tr', function () {
                this.style.backgroundColor = 'rgb(246, 246, 246)';
                this.style.cursor = useOptions.selection.cursor;
            });
            $(thas).on('mouseleave', 'tr', function () {
                this.style.backgroundColor = '#fff';
                this.style.cursor = 'default';
            });
        }

        // Modal
        var divModal = $w.document.createElement('div');
        var divModalDialog = $w.document.createElement('div');
        var divModalContent = $w.document.createElement('div');
        var divModalHeader = $w.document.createElement('div');
        var btnDismiss = $w.document.createElement('button');
        var titleHeader = $w.document.createElement('h1');
        var divModalBody = $w.document.createElement('div');
        var divPanelBody = $w.document.createElement('div');
        var divModalFilterContainer = $w.document.createElement('div');
        var divModalFooter = $w.document.createElement('div');
        var btnAceptar = $w.document.createElement('button');
        btnAceptar.type = 'button';
        btnAceptar.classList = 'btn btn-primary';
        btnAceptar.setAttribute('data-dismiss', 'modal');
        btnAceptar.innerHTML = '<span>ACEPTAR</span>';
        divModalFooter.classList = 'modal-footer';
        divModalFooter.appendChild(btnAceptar);
        divModalFilterContainer.setAttribute('id', 'modal-filter-container');
        divPanelBody.classList = 'panel-body';
        divPanelBody.appendChild(divModalFilterContainer);
        divModalBody.classList = 'modal-body';
        divModalBody.appendChild(divPanelBody);
        titleHeader.classList = 'modal-title';
        btnDismiss.type = 'button';
        btnDismiss.classList = 'close';
        btnDismiss.setAttribute('data-dismiss', 'modal');
        btnDismiss.setAttribute('aria-label', 'Close');
        btnDismiss.innerHTML = '<span aria-hidden="true">X</span>';
        divModalHeader.classList = 'modal-header';
        divModalHeader.appendChild(titleHeader);
        divModalHeader.appendChild(btnDismiss);
        divModalContent.classList = 'modal-content';
        divModalContent.appendChild(divModalHeader);
        divModalContent.appendChild(divModalBody);
        divModalContent.appendChild(divModalFooter);
        divModalDialog.classList = 'modal-dialog';
        divModalDialog.role = 'document';
        divModalDialog.appendChild(divModalContent);
        divModal.setAttribute('id', 'modal-filter');
        divModal.classList = 'modal fade modal-md';
        divModal.tabIndex = '-1';
        divModal.role = 'dialog';
        divModal.setAttribute('data-backdrop', 'static');
        divModal.setAttribute('data-keyboard', 'false');
        divModal.setAttribute('data-source', '');
        divModal.setAttribute('data-title', '');
        divModal.appendChild(divModalDialog);
        
        

        function showModal(title,origen) {
            var modal = $(divModal);
            $(titleHeader).text(title);
            modal.data('source', origen);
            modal.data('title', title);

            // var data = [];
            // data.push({
            //     codigo: 'todos',
            //     descripcion: 'TODOS',
            //     children: $w.useDT_sourceMapping[thas.id][origen].values
            // });
            // var selecedCodes = $w.useDT_sourceMapping[thas.id][origen].selectedValues.map(function (v) { return v.codigo; });
            // applyMenuFilter(modal.find('#modal-filter-container'), { data: data, isSearch: true }, selecedCodes);
            modal.modal('show');
            //AdministrarDefectos.botonAceptarListener();
        }
        function applyMenuFilter(selector,model,selectedValues) {
            $(selector).menuFilter(model);
            $(selector).menuFilter("check", selectedValues || []);
        }
        function botonAceptarListener() {
            UtilJs.addCommonListener({
                selector: '.btnAceptarModalFilter',
                event: "click",
                callback: function (evt) {
    
                    var modal = $(this).parents().find('#modal-filter');
                    var source = modal.data('source');
                    var title = modal.data('title');
    
                    var manualImput = AdministrarDefectos.sourceMapping[source].selectedValues.filter(function (item) {
                        return item.manualInput !== undefined && item.manualInput;
                    });
                    AdministrarDefectos.sourceMapping[source].selectedValues = manualImput.concat(modal.find('#modal-filter-container').menuFilter('selectedValues'));
    
                    AdministrarDefectos.setCantidadValoresSeleccionados(source);
                    // Extra
                    //filtro para Linea
                    if (source === "filtroPlanta") {
                        if (AdministrarDefectos.sourceMapping.filtroProceso.selectedValues.length === 0 && AdministrarDefectos.sourceMapping.filtroTipoLinea.selectedValues.length === 0) {
                            if (AdministrarDefectos.sourceMapping.filtroPlanta.selectedValues.length > 0) {
                                AdministrarDefectos.sourceMapping.filtroLinea.values = AdministrarDefectos.sourceMapping.filtroLinea.totalValues.filter(function (e, i) {
                                    if (AdministrarDefectos.sourceMapping.filtroPlanta.selectedValues.some(function (planta) {
                                        return planta.codigo === e.planta;
                                    })) { return true; }
                                });
                            }
                        } else {
                            if (AdministrarDefectos.sourceMapping.filtroPlanta.selectedValues.length > 0) {
                                AdministrarDefectos.sourceMapping.filtroLinea.values = AdministrarDefectos.sourceMapping.filtroLinea.values.filter(function (e, i) {
                                    if (AdministrarDefectos.sourceMapping.filtroPlanta.selectedValues.some(function (planta) {
                                        return planta.codigo === e.planta;
                                    })) { return true; }
                                });
                            }
                        }
                    }
                    if (source === "filtroProceso") {
                        if (AdministrarDefectos.sourceMapping.filtroPlanta.selectedValues.length === 0 && AdministrarDefectos.sourceMapping.filtroTipoLinea.selectedValues.length === 0) {
                            if (AdministrarDefectos.sourceMapping.filtroProceso.selectedValues.length > 0) {
                                AdministrarDefectos.sourceMapping.filtroLinea.values = AdministrarDefectos.sourceMapping.filtroLinea.totalValues.filter(function (e, i) {
                                    if (AdministrarDefectos.sourceMapping.filtroProceso.selectedValues.some(function (proceso) {
                                        return proceso.codigo === e.proceso;
                                    })) { return true; }
                                });
                            }
                        } else {
                            if (AdministrarDefectos.sourceMapping.filtroProceso.selectedValues.length > 0) {
                                AdministrarDefectos.sourceMapping.filtroLinea.values = AdministrarDefectos.sourceMapping.filtroLinea.values.filter(function (e, i) {
                                    if (AdministrarDefectos.sourceMapping.filtroProceso.selectedValues.some(function (proceso) {
                                        return proceso.codigo === e.proceso;
                                    })) { return true; }
                                });
                            }
                        }
                    }
                    if (source === "filtroTipoLinea") {
                        if (AdministrarDefectos.sourceMapping.filtroPlanta.selectedValues.length === 0 && AdministrarDefectos.sourceMapping.filtroProceso.selectedValues.length === 0) {
                            if (AdministrarDefectos.sourceMapping.filtroTipoLinea.selectedValues.length > 0) {
                                AdministrarDefectos.sourceMapping.filtroLinea.values = AdministrarDefectos.sourceMapping.filtroLinea.totalValues.filter(function (e, i) {
                                    if (AdministrarDefectos.sourceMapping.filtroTipoLinea.selectedValues.some(function (tipoLinea) {
                                        return tipoLinea.codigo === e.tipoLinea;
                                    })) { return true; }
                                });
                            }
                        } else {
                            if (AdministrarDefectos.sourceMapping.filtroTipoLinea.selectedValues.length > 0) {
                                AdministrarDefectos.sourceMapping.filtroLinea.values = AdministrarDefectos.sourceMapping.filtroLinea.values.filter(function (e, i) {
                                    if (AdministrarDefectos.sourceMapping.filtroTipoLinea.selectedValues.some(function (tipoLinea) {
                                        return tipoLinea.codigo === e.tipoLinea;
                                    })) { return true; }
                                });
                            }
                        }
                    }
    
                }
            });
        }
        function setCantidadValoresSeleccionados(source) {
            $("#" + source.replace("filtro", "cantidad")).text(AdministrarDefectos.sourceMapping[source].selectedValues.length ? "(" + AdministrarDefectos.sourceMapping[source].selectedValues.length + ")" : "");
        }
        // <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

        // <ul id="myUL">
        // <li><a href="#">Adele</a></li>
        // <li><a href="#">Agnes</a></li>

        // <li><a href="#">Billy</a></li>
        // <li><a href="#">Bob</a></li>

        // <li><a href="#">Calvin</a></li>
        // <li><a href="#">Christina</a></li>
        // <li><a href="#">Cindy</a></li>
        // </ul>
        function search() {
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
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
            '    cursor: "default",                      // Cursor? (default: "default")\n'+
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
})(window.jQuery, window);