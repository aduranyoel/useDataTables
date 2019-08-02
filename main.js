'use strict';

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


        $('#tableContainer').DataTable({
            autoWidth: true,
            info: false,
            lengthChange: false,
            pageLength: 5,
            ordering: true,
            paging: true,
            searching: false,
            serverSide: false,
            stateSave: false,
            createdRow: function( row, data, dataIndex ) {
                if ( data[4] == "A" ) {
                  $(row).addClass( 'important' );
                }
              },
            initComplete: function( settings, json ) {
                $('div.loading').remove();
              },
            rowCallback: function( row, data ) {
                if ( data.grade == "A" ) {
                  $('td:eq(4)', row).html( '<b>A</b>' );
                }
              }
        });
    }
})