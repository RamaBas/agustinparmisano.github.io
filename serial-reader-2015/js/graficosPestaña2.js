$(document).ready(function(){

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
            xAxis: {
                title: {
                    text: 'Hora del Día'
                },
                categories: ['00:00', '01:00', '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
            },

            yAxis: [{
                title: {
                    text: 'Temperatura del Día',
                    style: {
                     color: Highcharts.getOptions().colors[0],
                    },
                },
                min: -15,
                max: 50,
                labels: {
                    formatter: function () {
                        return this.value + 'C°';
                    },
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
            },
             {
                title: {
                    text: 'Corriente Generada',
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
                min: 0,
                max: 1200,
                labels: {
                    formatter: function () {
                        return this.value + 'Wh';
                    },
                },
                opposite: true,
            }],
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
                name: 'Temperatura Hoy',
                data: [15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 17, 19, 18, 18, 17, 16, 16, 15, 15, 15, 15],
            },
            {
                name: 'Corriente Generada Hoy',
                data: [400, 300, 100, 200, 300, 400, 500, 600, 700, 600, 500, 400, 300, 400, 500, 600, 500, 400, 300, 200, 100, 100, 100, 200],
                type: 'column',
                yAxis: 1,
            }]
        });
    });

    $('#example1').datepicker({
        format: "dd/mm/yyyy",
        keyboardNavigation: true
    }).on('changeDate', function(ev){

        var arr = [];
        while(arr.length < 24){
            var randomnumber=Math.ceil(Math.random()*25);
            arr[arr.length]=randomnumber;
        }

        $('#area1').highcharts().addSeries({
            name: ("Temperatura por hora del día " + ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
            data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
        });

    });


    $('#example2').datepicker({
        format: "dd/mm/yyyy",
        keyboardNavigation: true
    }).on('changeDate', function(ev){

        var arr = [];
        while(arr.length < 24){
            var randomnumber=Math.ceil(Math.random()*500);
            arr[arr.length]=randomnumber;
        }

        $('#area1').highcharts().addSeries({
            name: ("Corriente generada por hora del día " + ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
            data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
            type: "column",
            yAxis: 1
        });

    });

});