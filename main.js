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
$.extend( true, $.fn.dataTable.defaults, opt );

var columns = ["ID", "NOMBRE", "USERNAME", "EMAIL", "WEBSITE", "PHONE", ""]
var rows = [
  [
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    '<button class="delBtn">DEL</button>'
  ],
  [
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    (Math.random()*9).toString().slice(0,5),
    '<button class="delBtn">DEL</button>'
  ],
  [
    (Math.random()*9).toString().slice(0,5),
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

        var table = $('#tableContainer').DataTable({
              columnDefs: [
                {"targets": [0,6], "orderable": false}
              ],
              searching: true,
              dom: "t"
        });
        var trH = document.createElement("tr");
        $('#tableContainer thead th').each( function (i, e) {
          if(i!==6){
            var tdH = document.createElement("td");
            var inputS = document.createElement("input");
            inputS.setAttribute("type", "text");
            inputS.setAttribute("id", "inputCol_"+i);
            inputS.onkeyup=function(){
              table
                  .columns( i )
                  .search( this.value )
                  .draw();
            }
            tdH.appendChild(inputS);
            tdH.style.borderBottom="none";
            trH.appendChild(tdH);

          }
          
        })
      

        $('#tableContainer thead').append(trH)
        
      //   $('#tableContainer thead th').each( function (i, e) {
      //     // console.log($(this).parents('thead')[0].childNodes)
      //     // $(this).parents('thead')[0].append("hola")
      //     // var title = $(this).text();
      //     // $(this).html( '<input type="text" id="inputCol_'+i+'" placeholder="'+title+'" />' );
      // } );

        $('#tableContainer tbody').on( 'click', 'button.delBtn', function () {
          table
              .row( $(this).parents('tr') )
              .remove()
              .draw();
        });
        //ADD
        var btn = document.getElementById('btn');
        btn.onclick=function(){
          table.row.add([
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            (Math.random()*9).toString().slice(0,5),
            '<button class="delBtn">DEL</button>'
          ]).draw();
          //DEL
          $('#tableContainer tbody').off();
          $('#tableContainer tbody').on( 'click', 'button.delBtn', function () {
            table
                .row( $(this).parents('tr') )
                .remove()
                .draw();
          });
        }

        //SEARCH COLUMN
      //   table.columns().every( function (i, e) {
      //     $('#inputCol_'+i).on( 'keyup', function () {
      //       table
      //           .columns( i )
      //           .search( this.value )
      //           .draw();
      //   } );
      // } );

