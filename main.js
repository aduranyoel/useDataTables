var opt = {
  "autoWidth": true,
  "info": false,
  "lengthChange": false,
  "lengthMenu": [ 10, 25, 50, 75, 100 ],
  "paging": false,
  "pageLength": 5,
  "pagingType": "numbers",
  "ordering": true,
  "searching": false,
  "serverSide": false,
  //"stateSave": false,
  "scrollY": "",
  "scrollX": "",
  "scrollCollapse": true,
  "responsive": true,
  "colReorder": false,
  "fixedHeader": false,
  "dom": "lfrtip"
  //"rowId": "id",
  // "columnDefs": [
  //   { "orderable": false, "targets": 0 },
  //   { "orderSequence": [ "desc" ], "targets": [ 1 ] },
  //   { "orderData": [ 0, 1 ],    "targets": 0 },
  //   { "searchable": false, "targets": 0 }
  // ]
  // createdRow: function( row, data, dataIndex ) {
  //     if ( data[4] == "A" ) {
  //       $(row).addClass( 'important' );
  //     }
  //   },
  // initComplete: function( settings, json ) {
  //     $('div.loading').remove();
  //   },
  //   fixedColumns: {
  //     leftColumns: 2
  //   },
  //   rowGroup: {
  //     dataSrc: 'group'
  //   },
  //   "order": [[ 0, 'asc' ], [ 1, 'desc' ]]
  //   "orderFixed": {
  //     "pre": [[ 0, 'desc' ], [ 1, 'desc' ]]
  //   }
}
//$.extend( true, $.fn.dataTable.defaults, opt );

var columns = ["ID", "NOMBRE", "USERNAME", "EMAIL", "WEBSITE", "PHONE", ""]
var rows = [
  [
    parseInt((Math.random()*9)),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    '<button class="delBtn">DEL</button>'
  ],
  [
    parseInt((Math.random()*9)),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    '<button class="delBtn">DEL</button>'
  ],
  [
    parseInt((Math.random()*9)),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    '<button class="delBtn">DEL</button>'
  ]
];

        SoloCreaTabla("tableContainer", {
            col: columns,
            rows: rows
        })

 $.fn.useDataTable = function(action, param, options){
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
            "lengthMenu": [ 10, 25, 50, 75, 100 ],
            "paging": false,
            "pageLength": 5,
            "pagingType": "numbers",
            "ordering": true,
            "searching": true,
            "serverSide": false,
            //"stateSave": false,
            "scrollY": "",
            "scrollX": "",
            "scrollCollapse": true,
            "responsive": true,
            "colReorder": false,
            "fixedHeader": false,
            "destroy": true
          }
          var settings = $.extend({}, defaults, options);

          if (action === "draw"){
          $(thas).DataTable(settings)
          }
          if (action === "data"){
            return $(thas).DataTable().data()
          }
          if (action === "delRow"){
            $(thas).DataTable()
              .row(param)
              .remove()
              .draw();
          }
          if (action === "addRow"){
            $(thas).DataTable().row.add(param).draw();
          }
          


          
          
        }

        $('#tableContainer').useDataTable('draw', {
          info: true
        })

      function getData(selector){
        var dataEleObj = $(selector).DataTable().rows().data();
        var arrRes = [];
        for (var i = 0, len = dataEleObj.length; i<len ; i++){
        arrRes.push(dataEleObj[i]);
        }
        return arrRes;
        }
        
