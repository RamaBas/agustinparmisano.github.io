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
                var acuTotCo2Petro = toCo2(coefPetr, miDato.energia_total);
				var acuTotCo2Gas = toCo2(coefGas, miDato.energia_total);
				console.log("Gas " + acuTotCo2Gas + "  Petr " + acuTotCo2Petro);

				$('#acumuladaTotalKw').append(miDato.energia_total + " Kw");



				if($('#container').highcharts().series[0] > -1){
					$('#container').highcharts().series[0].remove;
	                $('#container').highcharts().addSeries({
		            	name: 'Gas',
		            	data: [acuTotCo2Gas],
					});
				}else{
                	$('#container').highcharts().addSeries({
		            	name: 'Gas',
		            	data: [acuTotCo2Gas],
					});
				}

				if($('#container').highcharts().series[1] > -1){
					$('#container').highcharts().series[1].remove;
			        $('#container').highcharts().addSeries({
			            name: 'Pretróleo',
			            data: [acuTotCo2Petro]
			        });
				}else{
			        $('#container').highcharts().addSeries({
			            name: 'Pretróleo',
			            data: [acuTotCo2Petro]
			        });
				}


            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    }


	//Obtener la potencia acumulada del día y la acumulada total
	//poner en varibales para pasar al html
	var acuTot = 500;
	var coefPetr = 0.9;
	var coefGas = 0.7;

	var acuTotCo2Petro = toCo2(coefPetr, acuTot);
	var acuTotCo2Gas = toCo2(coefGas, acuTot);

	function toCo2(coefkwh, consumo){
		return coefkwh * consumo;
	};

	console.log("Cantidad de Co2 ahorrado total si se quemase Pretroleo: " + acuTotCo2Petro);
	console.log("Cantidad de Co2 ahorrado total si se quemase Gas: " + acuTotCo2Gas);

	$(function () {
	    $('#container').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Comparación de Energía generada acumulada <br> total de los Paneles Solares con otros recursos'
	        },
	        subtitle: {
	            text: ' Equivalente en liberación de dióxido de carbono para su generación <br> Fuente: Smart in the Grid Redes inteligentes y sistemas de automatización <br> http://goo.gl/FwSy16'
	        },
	         credits: {
                enabled: false,
            },
	        xAxis: {
	            categories: [
	                'Acumulada Total',
	            ],
	            crosshair: true
	        },
	        yAxis: {
	            min: 0,
	            max: (1200 * 30 * 12) / 40,
                labels:{
        			formatter: function () {
                        return this.value + 'TCo2';
                    },
	            },
	            title: {
	                text: 'Toneladas de Co2',
	            },

	        },

	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y:.1f} TCo2</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        /*series: [{
	            name: 'Gas',
	            data: [acuTotCo2Gas],
	        }, {
	            name: 'Pretróleo',
	            data: [acuTotCo2Petro]
	        }]*/
	    });
	});

});