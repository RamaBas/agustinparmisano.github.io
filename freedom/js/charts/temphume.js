var ipVariable = "http://192.168.43.153";
var urlTemp = ipVariable + "/freedom/sensor/7/read?format=json";
var urlHume = ipVariable + "/freedom/sensor/8/read?format=json";
var urlElectric = "url electrica";
var urlLuzComedor = ipVariable + "/freedom/actuator/4/action";
var urlLuzCocina = ipVariable + "/freedom/actuator/7/action";
var urlBuzzer = ipVariable + "/freedom/actuator/6/action";
var humedad = 0;
var temperatura = 0;

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
            humedad = data[0].data;         }
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
            point.update(inc);
        }

        // RPM
        chart = $('#container-rpm').highcharts();
        if (chart) {
            point = chart.series[0].points[0];
            getHumedad();
            inc = humedad;
            point.update(inc);
        }
    }, 500);


});