var miDato;

$(document).ready(function(){
    getValores();

    function getValores(){
        var xmlhttp = new XMLHttpRequest();
        var url = "http://192.168.1.100:8003/actual";
        var miJson;

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                miDato = JSON.parse(xmlhttp.responseText);
                clock1.setValue(miDato.energia_hoy);
                clock2.setValue(miDato.energia_total);
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function funcionConJson(dato){
        var datoAnterior = 0;

        if (dato) {
            datoAnterior = dato;
            return dato;
        }else{
            return datoAnterior;
        }
    }

    $(function () {
        $('#area1').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Energía consumida y generada'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                title: {
                    text: 'Hora del Día'
                },
                type: 'datetime',
            },
                dateTimeLabelFormats : {
                    day: '%H:%M',
                },

            yAxis: {
                title: {
                    text: 'Energía'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
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
            series: [{
                name: 'Consumida',
                color: '#b30000',
                data: [20, 20, 20, 30, 40, 50, 40, 40, 50, 60, 55, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                pointInterval: 3600 * 1000 // one day]
            }, {
                name: 'Generada',
                color: '#00e600',
                data: [0,0,0,0,0,5,10,15,25,35,50,70,90,110,130,120,105,85,70,40,15,0,0,0],
                pointInterval: 3600 * 1000 // one day]
            }]
        });
    });

    $(function () {

        $('#gauge1').highcharts({

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            exporting: { enabled: false },

            title: {
                text: ''
            },

           credits: { enabled: false },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 4500,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'Watts'
                },
                plotBands: [{
                    from: 0,
                    to: 1200,
                    color: '#55BF3B' // green
                }, {
                    from: 1200,
                    to: 2600,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 2600,
                    to: 4500,
                    color: '#DF5353' // red
                }]
            },

            series: [{
                name: 'Potencia',
                data: [0],
                tooltip: {
                    valueSuffix: 'Watts'
                }
            }]

        },
            // Add some life
            function (chart) {

                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0],
                            newVal,
                            inc = miDato.potencia//Math.round((Math.random() - 0.5) * 200);

                        getValores();
                        newVal = inc;

                        point.update(newVal);

                    }, 3000);
                }
            });
    });

    $(function () {

        $('#gauge2').highcharts({

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            exporting: { enabled: false },

            title: {
                text: ''
            },

            credits: { enabled: false },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 10,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'Amper'
                },
                plotBands: [{
                    from: 0,
                    to: 5,
                    color: '#55BF3B' // green
                }, {
                    from: 5,
                    to: 8,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 8,
                    to: 10,
                    color: '#DF5353' // red
                }]
            },

            series: [{
                name: 'Corriente',
                data: [0],
                tooltip: {
                    valueSuffix: 'Amper'
                }
            }]

        },
            // Add some life
            function (chart) {
                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0],
                            newVal,
                            inc = miDato.corriente;
                        newVal = inc / 10;

                        point.update(newVal);

                    }, 3000);
                }
            });
    });

    clock1 = new FlipClock($('.clock1'), 000000, {
                clockFace: 'Counter',
                minimumDigits: '6',
                autoStart: 'false'
            });


    // Attach a click event to a button a increment the clock
    //$('.increment').click(function() {
       // clock.setValue(miDato.energia_hoy);

        // Or you could decrease the clock
        // clock.decrement();

        //clock.increment();

        // Or set it to a specific value
        // clock.setValue(x);
    //});

    /* Attach a click event to a button a decrement the clock
    $('.decrement').click(function() {
        clock.decrement();
    });*/

    /*$('.reset').click(function() {
        clock.reset();
    });*/

    clock2 = new FlipClock($('.clock2'), 000000, {
                clockFace: 'Counter',
                minimumDigits: '6',
                autoStart: 'false'
            });

    // Attach a click event to a button a increment the clock
    /*$('.increment').click(function() {
        //clock.setValue(10);

        // Or you could decrease the clock
        // clock.decrement();

        clock.increment();

        // Or set it to a specific value
        // clock.setValue(x);
    });

    // Attach a click event to a button a decrement the clock
    $('.decrement').click(function() {
        clock.decrement();
    });

    $('.reset').click(function() {
        clock.reset();
    });*/

    //$.ajax({ url: 'http://clima.info.unlp.edu.ar/', success: function(data) { document.getElementById("myDiv").innerHTML=data; } });


});

