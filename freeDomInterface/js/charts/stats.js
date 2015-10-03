$(document).ready(function(){

    $(function () {
        $('#temp-container').highcharts({
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
                tickInterval: 3600 * 1000,
            labels: {
                    formatter: function() {
                        var d = new Date(this.value);
                        d.setHours(d.getHours()-21);
                        var hora = Highcharts.dateFormat('%H:%M',d);
                        return hora;
                     }
            },

            },

            yAxis: {
                title: {
                    text: 'Temperatura'
                },
                labels: {
                    formatter: function () {
                        return this.value / 5 + 'C°';
                    }
                }
            },
            credits: {
                enabled: false
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
                name: 'Temperatura Hoy',
                data: [20, 20, 20, 30, 40, 50, 40, 40, 50, 60, 55, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                pointInterval: 3600 * 1000, // one day]
                color: "#d32f2f",
                type: 'line',
            }           
            ]
        });
    });


    $(function () {
        $('#hume-container').highcharts({
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
                tickInterval: 3600 * 1000,
            labels: {
                    formatter: function() {
                        var d = new Date(this.value);
                        d.setHours(d.getHours()-21);
                        var hora = Highcharts.dateFormat('%H:%M',d);
                        return hora;
                     }
            },

            },

            yAxis: {
                title: {
                    text: 'Humedad'
                },
                labels: {
                    formatter: function () {
                        return this.value / 2 + '%';
                    }
                }
            },
            credits: {
                enabled: false
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
            series: [
            {
                name: 'Humedad Hoy',
                data: [40, 30, 10, 20, 30, 40, 50, 60, 70, 60, 50, 40, 30, 40, 50, 60, 50, 40, 30, 20, 10, 00, 10, 20],
                pointInterval: 3600 * 1000, // one day]
                type: 'line',
                color: "#1976d2"
            }            
            ]
        });
    });



    $(function () {
        $('#electric-container').highcharts({
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
                tickInterval: 3600 * 1000,
            labels: {
                    formatter: function() {
                        var d = new Date(this.value);
                        d.setHours(d.getHours()-21);
                        var hora = Highcharts.dateFormat('%H:%M',d);
                        return hora;
                     }
            },

            },

            yAxis: {
                title: {
                    text: 'Valtio Hora'
                },
                labels: {
                    formatter: function () {
                        return this.value * 10 + 'Wh';
                    }
                }
            },
            credits: {
                enabled: false
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
            series: [
            {
                name: 'Electricidad Consumida Hoy',
                data: [40, 30, 10, 20, 30, 40, 50, 60, 70, 60, 50, 40, 30, 40, 50, 60, 50, 40, 30, 20, 10, 00, 10, 20],
                pointInterval: 3600 * 1000, // one day]
                color: "#388e3c",
            }            
            ]
        });
    });


    window.onload = function(){
        
        
        g_globalObjectTemp = new JsDatePick({
            useMode:1,
            isStripped:true,
            target:"temp"
            /*selectedDate:{                This is an example of what the full configuration offers.
                day:5,                      For full documentation about these settings please see the full version of the code.
                month:9,
                year:2006
            },
            yearsRange:[1978,2020],
            limitToToday:false,
            cellColorScheme:"beige",
            dateFormat:"%m-%d-%Y",
            imgPath:"img/",
            weekStartDay:1*/
        });     
        
        g_globalObjectTemp.setOnSelectedDelegate(function(){
            var arr = [];
            while(arr.length < 24){
                var randomnumber=Math.ceil(Math.random()*100)
                var found=false;
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==randomnumber){found=true;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }
            var objTemp = g_globalObjectTemp.getSelectedDay();
            $('#temp-container').highcharts().addSeries({
                name: "Temperatura en " + (objTemp.day + '/' + objTemp.month  + '/' +  objTemp.year),
                data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                pointInterval: 3600 * 1000, // one day]
                color: "#d32f2f"
            });

        });

        g_globalObjectHume = new JsDatePick({
            useMode:1,
            isStripped:true,
            target:"hume"
            /*selectedDate:{                This is an example of what the full configuration offers.
                day:5,                      For full documentation about these settings please see the full version of the code.
                month:9,
                year:2006
            },
            yearsRange:[1978,2020],
            limitToToday:false,
            cellColorScheme:"beige",
            dateFormat:"%m-%d-%Y",
            imgPath:"img/",
            weekStartDay:1*/
        });     
        
        g_globalObjectHume.setOnSelectedDelegate(function(){
            var objHume = g_globalObjectHume.getSelectedDay();
            var arr = [];
            while(arr.length < 24){
                var randomnumber=Math.ceil(Math.random()*100)
                var found=false;
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==randomnumber){found=true;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }

            $('#hume-container').highcharts().addSeries({
                name: "Humedad en " + (objHume.day + '/' + objHume.month  + '/' +  objHume.year),
                data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                pointInterval: 3600 * 1000, // one day]
                color: "#1976d2"
            });
        });

        g_globalObjectElect = new JsDatePick({
            useMode:1,
            isStripped:true,
            target:"elect"
            /*selectedDate:{                This is an example of what the full configuration offers.
                day:5,                      For full documentation about these settings please see the full version of the code.
                month:9,
                year:2006
            },
            yearsRange:[1978,2020],
            limitToToday:false,
            cellColorScheme:"beige",
            dateFormat:"%m-%d-%Y",
            imgPath:"img/",
            weekStartDay:1*/
        });     
        
        g_globalObjectElect.setOnSelectedDelegate(function(){
            var objElect = g_globalObjectElect.getSelectedDay();
            var arr = [];
            while(arr.length < 24){
                var randomnumber=Math.ceil(Math.random()*100)
                var found=false;
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==randomnumber){found=true;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }

            $('#electric-container').highcharts().addSeries({
                name: "Electricidad consumida el " + (objElect.day + '/' + objElect.month  + '/' +  objElect.year),
                data: arr,//[10, 10, 50, 70, 30, 20, 10, 70, 90, 60, 35, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
                pointInterval: 3600 * 1000, // one day]
                color: "#388e3c",
            });            
        });
    };
});

