var ipVariable = "http://192.168.43.153:8081";
var urlTemp = ipVariable + "/freedom/sensor/7/read?format=json";
var urlHume = ipVariable + "/freedom/sensor/8/read?format=json";
var urlElectric = ipVariable + "/freedom/sensor/10/read?format=json";
var urlLuzComedor = ipVariable + "/freedom/actuator/7/action";
var urlLuzCocina = ipVariable + "/freedom/actuator/4/action";
var urlBuzzer = ipVariable + "/freedom/actuator/6/action";
var urlLuzComedorState = ipVariable + "/freedom/actuator/7/state";
var urlLuzCocinaState = ipVariable + "/freedom/actuator/4/state";
var urlBuzzerState = ipVariable + "/freedom/actuator/6/state";
var humedad = 0;
var temperatura = 0;
var electricity = 0;
var luzCocinaState = false;
var luzComedorState = false;
var activarAlarmaState = false;
//$('#luzComedor') = $.get(urlLuzComedorState);

$.ajax({
    //Cambiar a type: POST si necesario
    type: "GET",
    // Formato de datos que se espera en la respuesta
    dataType: "json",
    // URL a la que se enviará la solicitud Ajax
    url: urlLuzComedorState,
})
 .done(function( data, textStatus, jqXHR ) {
     if ( console && console.log ) {
        var luzComedorState = data[0].state;
        $("#luzComedorDerecha").prop("checked", luzComedorState); 
        $("#luzComedorCentro").prop("checked", luzComedorState); 
        $("#luzComedorIzquierda").prop("checked", luzComedorState); 
    }
 })
 .fail(function( jqXHR, textStatus, errorThrown ) {
     if ( console && console.log ) {
         console.log( "La solicitud a fallado: " +  textStatus);
     }
});

$.ajax({
    //Cambiar a type: POST si necesario
    type: "GET",
    // Formato de datos que se espera en la respuesta
    dataType: "json",
    // URL a la que se enviará la solicitud Ajax
    url: urlBuzzerState,
})
 .done(function( data, textStatus, jqXHR ) {
     if ( console && console.log ) {
        var luzCocinaState = data[0].state;
        $("#activarAlarmaDerecha").prop("checked", activarAlarmaState); 
        $("#activarAlarmaCentro").prop("checked", activarAlarmaState); 
        $("#activarAlarmaIzquierda").prop("checked", activarAlarmaState); 
    }
 })
 .fail(function( jqXHR, textStatus, errorThrown ) {
     if ( console && console.log ) {
         console.log( "La solicitud a fallado: " +  textStatus);
     }
});

$.ajax({
    //Cambiar a type: POST si necesario
    type: "GET",
    // Formato de datos que se espera en la respuesta
    dataType: "json",
    // URL a la que se enviará la solicitud Ajax
    url: urlLuzCocinaState,
})
 .done(function( data, textStatus, jqXHR ) {
     if ( console && console.log ) {
        var luzCocinaState = data[0].state;
        $("#luzCocinaDerecha").prop("checked", luzCocinaState); 
        $("#luzCocinaCentro").prop("checked", luzCocinaState); 
        $("#luzCocinaIzquierda").prop("checked", luzCocinaState); 
    }
 })
 .fail(function( jqXHR, textStatus, errorThrown ) {
     if ( console && console.log ) {
         console.log( "La solicitud a fallado: " +  textStatus);
     }
});


    /*function getHumedad(){
        var xmlhttp = new XMLHttpRequest();
        var url = urlTemp;
        console.log(urlTemp);

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                misDatos = JSON.parse(xmlhttp.responseText);
                console.log(misDatos);
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }*/
function getHumedad() {
    $.ajax({
        //Cambiar a type: POST si necesario
        type: "GET",
        // Formato de datos que se espera en la respuesta
        dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: urlHume,
    })
     .done(function( data, textStatus, jqXHR ) {
         if ( console && console.log ) {
            humedad = data[0].data;        }
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
}

function getTemperatura() {
    $.ajax({
        //Cambiar a type: POST si necesario
        type: "GET",
        // Formato de datos que se espera en la respuesta
        dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: urlTemp,
    })
     .done(function( data, textStatus, jqXHR ) {
         if ( console && console.log ) {
            temperatura = data[0].data;         }
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
}

function getElectricity() {
    $.ajax({
        //Cambiar a type: POST si necesario
        type: "GET",
        // Formato de datos que se espera en la respuesta
        dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: urlElectric,
    })
     .done(function( data, textStatus, jqXHR ) {
         if ( console && console.log ) {
            electricity = parseFloat(data[0].data);
        }
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
}
function luzCocina(){

    $.get(urlLuzCocina);
};

function luzComedor(){

    $.get(urlLuzComedor);

};

function activarAlarma() {
    $.get(urlBuzzer);
}

$(function () {

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#container-speed').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Temperatura'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Temperatura',
            data: [80],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">°C</span></div>'
            },
            tooltip: {
                valueSuffix: ' km/h'
            }
        }]

    }));

    // The RPM gauge
    $('#container-rpm').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Humedad'
            }
        },
        credits: {
            enabled: false
        },

        series: [{
            name: 'Humedad',
            data: [1],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver"> %</span></div>'
            },
            tooltip: {
                valueSuffix: ' Humedad%'
            }
        }]

    }));

    // Bring life to the dials
    setInterval(function () {
        // Speed
        var chart = $('#container-speed').highcharts(),
            point,
            newVal,
            inc;
        if (chart) {
            point = chart.series[0].points[0];
            getTemperatura();
            inc = temperatura;//Math.round((Math.random() - 0.5) * 100);
            point.update(parseInt(inc));
        }

        // RPM
        chart = $('#container-rpm').highcharts();
        if (chart) {
            point = chart.series[0].points[0];
            getHumedad();
            inc = humedad;
            point.update(parseInt(inc));
        }
    }, 500);


});

$(function () {
    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            getElectricity();
                            var x = (new Date()).getTime(), // current time
                                y = electricity;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Electricidad consumida actual'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Watt'
                },
                min: 0,
                max: 100,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]

            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Watts',
                color: '#4caf50',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: electricity
                        });
                    }
                    return data;
                }())
            }]
        });
    });
});