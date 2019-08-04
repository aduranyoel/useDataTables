//'use strict';

var columns = ["ID", "NOMBRE", "USERNAME", "EMAIL", "WEBSITE", "PHONE"]
var rows = [];
AjaxUtil({
    url: "https://jsonplaceholder.typicode.com/users",
    type: "GET",
    success: function(data){
        data.forEach(function(e, index){
            rows.push([
                e.id,
                e.name,
                e.username,
                e.email,
                e.website,
                e.phone
            ])
        })

        SoloCreaTabla("tableContainer", {
            col: columns,
            rows: rows
        })
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
          "stateSave": false,
          "scrollY": "",
          "scrollX": "",
          "scrollCollapse": true,
          "responsive": true,
          "colReorder": false,
          "fixedHeader": false,
          "columnDefs": [
            //{ "orderable": false, "targets": 0 },
            //{ "orderSequence": [ "desc" ], "targets": [ 1 ] },
            //{ "orderData": [ 0, 1 ],    "targets": 0 }
          ],
          createdRow: function( row, data, dataIndex ) {
              if ( data[4] == "A" ) {
                $(row).addClass( 'important' );
              }
            },
          initComplete: function( settings, json ) {
              $('div.loading').remove();
            },
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
        $('#tableContainer').DataTable(opt);

    }
})
