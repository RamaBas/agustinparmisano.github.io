var arregloDeTempsValues = [];
var arregloDeTempsHoras = [];
var ipVariable = "http://192.168.43.153:8081";
var urlTempStats = ipVariable + "/freedom/sensor/7/values_date/"; 
var urlHumeStats = ipVariable + "/freedom/sensor/8/values_date/"; 
var urlElectStats = ipVariable + "/freedom/sensor/10/values_date/"; 
var hoyTempStats = 0;


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

function getTempsValuesHoras(tempStats){
    for (var i in tempStats) {
        arregloDeTempsValues.push(parseInt(tempStats[i].value));
        arregloDeTempsHoras.push(tempStats[i].created_hour);
    }
}



$(document).ready(function(){

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
getTempByDay(yyyy,mm,dd);


var arregloTemps = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];

function getTempByDay(year, month, day){
    $.ajax({
    //Cambiar a type: POST si necesario
    type: "GET",
    // Formato de datos que se espera en la respuesta
    dataType: "json",
    // URL a la que se enviará la solicitud Ajax
    url: urlTempStats + year + "-" + month + "-" + day,
    })
     .done(function( data, textStatus, jqXHR ) {
         if ( console && console.log ) {
            var fechaTempStats = data[0].values;
            getTempsValuesHoras(fechaTempStats);
            var tempChart = $('#temp-container').highcharts();
            var tempValues = arregloDeTempsValues;

            tempChart.xAxis[0].setCategories(arregloDeTempsHoras);

            tempChart.yAxis[0].setCategories(arregloTemps);


            tempChart.addSeries({
                name: "Temperatura en " + (year + '/' + month  + '/' +  year),
                data: tempValues,
                color: "#d32f2f"
            });
        }
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
}
    

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
            var diaTempHora = getTempByDay(objTemp.year, objTemp.month, objTemp.day);
            //var tempValues =  arregloDeTempsValues.slice(1, 900);
            


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