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
                    text: 'Temperatura'
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
                data: [40, 30, 10, 20, 30, 40, 50, 60, 70, 60, 50, 40, 30, 40, 50, 60, 50, 40, 30, 20, 10, 00, 10, 20],
                pointInterval: 3600 * 1000, // one day]
                color: 'green'
            },
            {
                name: 'Humedad Hoy',
                data: [20, 20, 20, 30, 40, 50, 40, 40, 50, 60, 55, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                pointInterval: 3600 * 1000, // one day]
                type: 'column',
                color: '#d9534f'
            }]
        });
    });

    $('#example1').datepicker({
        format: "dd/mm/yyyy",
        keyboardNavigation: true
    }).on('changeDate', function(ev){

        var arr = [];
        while(arr.length < 24){
            var randomnumber=Math.ceil(Math.random()*100)
            var found=false;
            for(var i=0;i<arr.length;i++){
                if(arr[i]==randomnumber){found=true;break}
            }
            if(!found)arr[arr.length]=randomnumber;
        }

        $('#area1').highcharts().addSeries({
            name: (ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
            data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
            pointInterval: 3600 * 1000 // one day]
        });

    });


    $('#example2').datepicker({
        format: "dd/mm/yyyy",
        keyboardNavigation: true
    }).on('changeDate', function(ev){

        var arr = [];
        while(arr.length < 24){
            var randomnumber=Math.ceil(Math.random()*100)
            var found=false;
            for(var i=0;i<arr.length;i++){
                if(arr[i]==randomnumber){found=true;break}
            }
            if(!found)arr[arr.length]=randomnumber;
        }

        $('#area1').highcharts().addSeries({
            name: (ev.date.getDate() + '/' + (ev.date.getMonth() + 1)  + '/' +  ev.date.getFullYear()),
            data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
            pointInterval: 3600 * 1000, // one day]
            type: "column"
        });

    });

});