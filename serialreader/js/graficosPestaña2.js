var misDatos;
var arregloPot = [];
var arregloCor = [];

$(document).ready(function(){

    function getValoresSegunFecha(fechaIni, fechaFin){
        var xmlhttp = new XMLHttpRequest();
        var url = "http://192.168.1.75:8003/historico/" + fechaIni + "/" + fechaFin;

        console.log(url);

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                misDatos = JSON.parse(xmlhttp.responseText);
                console.log(" misgatos33 " + misDatos.elementos[3].potencia);

                for(var i=0; i<misDatos.elementos.length; i++ ){
                    if (misDatos.elementos[i].potencia) {
                        arregloPot[i] = (misDatos.elementos[i].potencia);
                        console.log(arregloPot[i]);
                    }else{
                        arregloPot[i] = 0;
                    };

                    if (misDatos.elementos[i].corriente) {
                        arregloCor[i] = (misDatos.elementos[i].corriente) / 10;
                        console.log(arregloCor[i]);
                    }else{
                        arregloCor[i] = 0;
                    };
                }

                $('#area1').highcharts().addSeries({
                    name: ("Corriente"), // generada por hora del día " + ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
                    data: arregloCor,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                    type: "column",
                    yAxis: 1,
                    color: "#337ab7"
                });

                $('#area1').highcharts().addSeries({
                    name: ("Potencia"),// por hora del día " + ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
                    data: arregloPot,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                    color: "#6ec06e",
                });


            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    $(function () {
        $('#area1').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
           credits: {
                enabled: false,
            },
            ignoreHiddenSeries : false,
            xAxis: {
                title: {
                    text: 'Hora del Día'
                },
                categories: ['00:00', '01:00', '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
            },

            yAxis: [{
                title: {
                    text: 'Potencia generada en el Día',
                    style: {
                     color: "#5cb85c",
                    },
                },
                min: 0,
                max: 4500,
                labels: {
                    formatter: function () {
                        return this.value + 'Watts';
                    },
                    style: {
                        color: "#5cb85c",
                    },
                },
            },
             {
                title: {
                    text: 'Corriente Generada',
                    style: {
                        color: "#337ab7"
                    },
                },
                min: 0,
                max: 10,
                labels: {
                    formatter: function () {
                        return this.value + 'Ampers';
                    },
                    style: {
                        color: "#337ab7"
                    },
                },
                opposite: true,
            }],
            tooltip: {
                pointFormat: '{series.name} generada <b>{point.y:,.0f}</b><br/> a la hora {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 0,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            /*series: [{
                name: 'Potencia Generada Hoy',
                data: [15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 17, 19, 18, 18, 17, 16, 16, 15, 15, 15, 15],
                visible: true,

            },
            {
                name: 'Corriente Generada Hoy',
                data: [400, 300, 100, 200, 300, 400, 500, 600, 700, 600, 500, 400, 300, 400, 500, 600, 500, 400, 300, 200, 100, 100, 100, 200],
                type: 'column',
                yAxis: 1,
                hidden: true
            }]*/
        });
    });


    $('#example1').datepicker({
        format: "dd/mm/yyyy",
        keyboardNavigation: true
    }).on('changeDate', function(ev){
        console.log(misDatos);
        //var arr = [];
        /*while(arr.length < 24){
            var randomnumber=Math.ceil(Math.random()*25);
            arr[arr.length]=randomnumber;
        }*/  
        getValoresSegunFecha(ev.date.getTime() / 1000, (ev.date.getTime() + 86400000) / 1000);
        /*arr = misDatos;
        console.log(misDatos);
        $('#area1').highcharts().addSeries({
            name: ("Temperatura por hora del día " + ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
            data: arr[3].energia_total,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
        });*/

    });


    /*$('#example2').datepicker({
        format: "dd/mm/yyyy",
        keyboardNavigation: true
    }).on('changeDate', function(ev){

        /*var arr = [];
        while(arr.length < 24){
            var randomnumber=Math.ceil(Math.random()*500);
            arr[arr.length]=randomnumber;
        }
        getValoresSegunFecha(ev.date.getTime() / 1000, (ev.date.getTime() + 86400000) / 1000);
        
        $('#area1').highcharts().addSeries({
            name: ("Corriente generada por hora del día " + ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
            data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
            type: "column",
            yAxis: 1
        });

    });*/

});