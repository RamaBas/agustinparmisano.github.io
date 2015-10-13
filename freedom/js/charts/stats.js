
$(document).ready(function(){

    function jsonConverter(day, month, year) {

        var jsonDeUnDia = [ 
                    {
                        
                        "name":"temperatura",

                        "values":[
                                {
                                    "created_hour":"17:35:45.201",
                                    "value":"19"
                                },
                                {   
                                    "created_hour":"17:35:55.862",
                                    "value":"19"
                                },
                                {   
                                    "created_hour":"17:36:06.445",
                                    "value":"19"
                                },
                                {   
                                    "created_hour":"17:36:16.928",
                                    "value":"19"
                                },
                                {   
                                    "created_hour":"17:36:27.391",
                                    "value":"19"
                                },
                                {   
                                    "created_hour":"17:36:37.845",
                                    "value":"19"
                                },
                                {   
                                    "created_hour":"17:36:48.340",  
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:36:58.898",
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:37:09.602",
                                    "value":"19"
                                },
                                {   
                                    "created_hour":"17:37:20.162",
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:37:30.987",
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:37:41.465",
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:37:52.022",
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:38:02.567",
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:38:13.142",
                                    "value":"19"
                                },
                                {
                                    "created_hour":"17:38:23.670",
                                    "value":"19"
                                }
                        ]
                    
                        
                        }
                ];
        var diaValorJSON = jsonDeUnDia;
        var tiempos = [];
        var valores = [];

        for(t=0; t<diaValorJSON[0].values.length; t++){
            tiempos.push(diaValorJSON[0].values[t].created_hour);
            valores.push(parseInt(diaValorJSON[0].values[t].value));
        }

        var diaValores = [ tiempos, valores ];

        return diaValores;
    }; 

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
            categories: ['11:00', '11:05', '11:10','11:15','11:20','11:25','11:30','11:35','11:40','11:45',]

            },

            yAxis: {
                title: {
                    text: 'Temperatura'
                },
                min: 0,
                max: 50,
                labels: {
                    formatter: function () {
                        return this.value  + 'C°';
                    }
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                formatter:function(){
                    return 'Temperatura ' + this.y + 'C° a las ' + this.key;
                }
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
                data: [12,13,13,14,16,17,18,15,13,13],
                color: "#d32f2f",
                type: 'line',
            }           
            ]
        });
    });


    $(function () {
        $('#hume-container').highcharts({
            chart: {
                type: 'column'
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
            categories: ['11:00', '11:05', '11:10','11:15','11:20','11:25','11:30','11:35','11:40','11:45',]

            },

            yAxis: {
                title: {
                    text: 'Humedad'
                },
                min: 0,
                max: 100,
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                formatter:function(){
                    return 'Humedad ' + this.y + '% a las ' + this.key;
                }
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
                data: [40,30,10,20,30,40,50,60,70,60,50,40,30,40,50,70,50,40,30,20,10,70,50,20],
                type: 'column',
                color: "#1976d2"
            }            
            ]
        });
    });



    $(function () {
        $('#electric-container').highcharts({
            chart: {
                type: 'area'
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
            categories: ['11:00', '11:05', '11:10','11:15','11:20','11:25','11:30','11:35','11:40','11:45',]
            },
        
            yAxis: {
                title: {
                    text: 'Valtio Hora'
                },
                min: 0,
                max: 1200,
                labels: {
                    formatter: function () {
                        return this.value + 'Wh';
                    }
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                 formatter:function(){
                    return 'Consumo Eléctrico ' + this.y + 'Wh a las ' + this.key;
                }
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
                color: "#388e3c",
                type: "area"
            }            
            ]
        });
    });


    window.onload = function(){
        
        g_globalObjectTemp = new JsDatePick({
            useMode:1,
            isStripped:true,
            target:"temp"
        });     
        
        g_globalObjectTemp.setOnSelectedDelegate(function(){

            /*HARDCODEANDO VALORES RANDOM
            var arr = [];
            while(arr.length < 24){
                var randomnumber=Math.ceil(Math.random()*100)
                var found=false;
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==randomnumber){found=true;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }*/

            var objTemp = g_globalObjectTemp.getSelectedDay();
            var diaTempHora = jsonConverter(1,2,3);
            var tempChart = $('#temp-container').highcharts();
            var tempValues =  diaTempHora[1];
            
            tempChart.xAxis[0].setCategories(diaTempHora[0]);
            
            tempChart.addSeries({
                name: "Temperatura en " + (objTemp.day + '/' + objTemp.month  + '/' +  objTemp.year),
                data: tempValues,
                color: "#d32f2f"
            });

        });

        g_globalObjectHume = new JsDatePick({
            useMode:1,
            isStripped:true,
            target:"hume"
        });     
        
        g_globalObjectHume.setOnSelectedDelegate(function(){
            var objHume = g_globalObjectHume.getSelectedDay();
            
            /*HARDCODEANDO VALORES RANDOM
            var arr = [];
            while(arr.length < 24){
                var randomnumber=Math.ceil(Math.random()*100)
                var found=false;
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==randomnumber){found=true;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }*/

            var objHume = g_globalObjectHume.getSelectedDay();
            var diaHumeHora = jsonConverter(1,2,3);
            var humeChart = $('#hume-container').highcharts();
            var humeValues =  diaHumeHora[1];

            humeChart.xAxis[0].setCategories(diaHumeHora[0]);
            
            humeChart.addSeries({
                name: "Humedad en " + (objHume.day + '/' + objHume.month  + '/' +  objHume.year),
                data: humeValues,
                color: "#1976d2",
            });

        });

        g_globalObjectElect = new JsDatePick({
            useMode:1,
            isStripped:true,
            target:"elect"
        });     
        
        g_globalObjectElect.setOnSelectedDelegate(function(){
            var objElect = g_globalObjectElect.getSelectedDay();


            /*HARDCODEANDO VALORES RANDOM
            var arr = [];
            while(arr.length < 24){
                var randomnumber=Math.ceil(Math.random()*100)
                var found=false;
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==randomnumber){found=true;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }*/

            var objElect = g_globalObjectElect.getSelectedDay();
            var diaElectHora = jsonConverter(1,2,3);
            var electChart = $('#electric-container').highcharts();
            var electValues =  diaElectHora[1];

            electChart.xAxis[0].setCategories(diaElectHora[0]);          
            electChart.addSeries({
                name: "Electricidad consumida el " + (objElect.day + '/' + objElect.month  + '/' +  objElect.year),
                data: electValues,
                color: "#388e3c",
            });
        });
    };
}); 