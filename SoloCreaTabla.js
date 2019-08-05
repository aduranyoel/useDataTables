'use strict';
function SoloCreaTabla(idTabla, options)
{
    options         = options || {};
    options.col     = options.col || [];
    options.rows    = options.rows || [];
    options.class   = options.class || [];
    options.foot    = options.foot || false;
    var tableElement = document.getElementById(idTabla);
    tableElement.innerHTML = "";
    if(options.class.length>0){
        tableElement.className = options.class.join(" ");
    }
    var theadElement = document.createElement("thead");
    var trHeaderElement = document.createElement("tr");
    options.col.forEach(function (e) {
        var thElement = document.createElement("th");
        thElement.innerHTML = e;
        trHeaderElement.appendChild(thElement);
    });
    theadElement.appendChild(trHeaderElement);
    tableElement.appendChild(theadElement);
    var tbodyElement = document.createElement("tbody");
    options.rows.forEach(function (e) {
        var trElement = document.createElement("tr");
        e.forEach(function (x) {
            var tdElement = document.createElement("td");
            tdElement.innerHTML = x;
            trElement.appendChild(tdElement);
        });
        tbodyElement.appendChild(trElement);
    });
    tableElement.appendChild(tbodyElement);
    if(options.foot){
    var tfootElement = document.createElement("tfoot");
    var trFootElement = document.createElement("tr");
    options.col.forEach(function (e) {
        var thElement = document.createElement("th");
        thElement.innerHTML = e;
        trFootElement.appendChild(thElement);
    });
    tfootElement.appendChild(trFootElement);
    tableElement.appendChild(tfootElement);
    }
};