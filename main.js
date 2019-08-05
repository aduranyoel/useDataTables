'use strict';

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
  //"rowId": "id",
  // "columnDefs": [
  //   { "orderable": false, "targets": 0 },
  //   { "orderSequence": [ "desc" ], "targets": [ 1 ] },
  //   { "orderData": [ 0, 1 ],    "targets": 0 }
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
$.extend( true, $.fn.dataTable.defaults, opt );

var columns = ["ID", "NOMBRE", "USERNAME", "EMAIL", "WEBSITE", "PHONE", ""]
var rows = [];

        SoloCreaTabla("tableContainer", {
            col: columns,
            rows: rows
        })

        $('#tableContainer tfoot th').each( function () {
          var title = $(this).text();
          $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
      } );


        var table = $('#tableContainer').DataTable({
              columnDefs: [
                {"targets": [0,6], "orderable": false}
              ],
              searching: true
        });
        //ADD
        var btn = document.getElementById('btn');
        btn.onclick=function(){
          // var bod = "'"+$("#tableContainer tbody").html()+"'"
          // if(bod.indexOf("No data")>-1){
          //   $("#tableContainer tbody").html("");
          // }
          // $('#tableContainer tbody').append('<tr>'+
          //   '<td>'+(Math.random()*9).toString().slice(0,5)+'</td>'+
          //   '<td>'+(Math.random()*9).toString().slice(0,5)+'</td>'+
          //   '<td>'+(Math.random()*9).toString().slice(0,5)+'</td>'+
          //   '<td>'+(Math.random()*9).toString().slice(0,5)+'</td>'+
          //   '<td>'+(Math.random()*9).toString().slice(0,5)+'</td>'+
          //   '<td>'+(Math.random()*9).toString().slice(0,5)+'</td>'+
          //   '<td><button class="delBtn">DEL</button></td>'
          // )
          table.row.add([
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            '<button class="delBtn">DEL</button>'
          ]).draw();
          //remove
          $('.delBtn').off();
          $('.delBtn').on('click',function () {
            var este = this;
            este.parentNode.parentNode.parentNode.removeChild(este.parentNode.parentNode)
          });
        }

        //SEARCH COLUMN
        table.columns().every( function () {
          var that = this;

          $( 'input', this.footer() ).on( 'keyup', function () {
            console.log("OK")
              if ( that.search() !== this.value ) {
                  that
                      .search( this.value )
                      .draw();
              }
          } );
      } );

