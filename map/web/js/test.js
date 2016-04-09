//访问地图
L.mapbox.accessToken = 'pk.eyJ1IjoieGp0dW1qIiwiYSI6IlRLUllkbHMifQ.jpyHMzmOp4v_vxheQHC5lg';
var map = L.mapbox.map('map', 'xjtumj.dea27667', {
	minZoom:8
}).setView([39.3, 100.92859599999997], 10);

//绘制点
var myLayer = L.mapbox.featureLayer().addTo(map);

var featuresArr = [];
//生成点
for (var i = 0;i < bus.length;i++){
	var obj = {
		type: 'Feature',
		properties: {
			title:'bus message',
			'marker-color': '#2ECC71',
			'marker-size': 'medium',
			'marker-symbol': 'city'
		},
		geometry: {
			type: 'Point',
			coordinates: []
		}
	}
	obj.properties.id = bus[i].id;
	if (bus[i].type == 1){
		obj.properties['marker-symbol'] = 'farm';
		obj.properties.title = 'generator ' + bus[i].id;
		obj.properties.type = 1;
	}
	else{
		obj.properties.title = 'bus ' + bus[i].id;
		obj.properties.type = 2;
	}
	if (bus[i].status == 1){
		obj.properties['marker-color'] = '#E74C3C';
		obj.properties.status = 1;
	}
	else{
		obj.properties.status = -2;
	}
	obj.geometry.coordinates = new Array(bus[i].coordinate.y, bus[i].coordinate.x);
	featuresArr.push(obj);
}

//生成线
for (var i = 0;i < branch.length;i++){
	var obj = {
		type: 'Feature',
		properties: {
			title:'bus message'
		},
		geometry: {
			type: 'LineString',
			coordinates: []
		}
	}
	if (branch[i].status == -2){
		obj.properties.stroke = '#2ECC71'
		obj.properties.status = -2
	}
	else{
		obj.properties.stroke = '#E74C3C'
		obj.properties.status = 1;
	}
	obj.geometry.coordinates.push(new Array(bus[branch[i].from - 1].coordinate.y, bus[branch[i].from - 1].coordinate.x));
	obj.geometry.coordinates.push(new Array(bus[branch[i].to - 1].coordinate.y, bus[branch[i].to - 1].coordinate.x));
	featuresArr.push(obj);
}
 //alert(featuresArr[1].geometry.type)


//生成geoJson
var geoJson = {
    type: 'FeatureCollection',
    features: featuresArr
};
//
//console.log(geoJson);
// //为弹框增加元素
// myLayer.on('layeradd', function(e){
// 	var 
// });
// 
// myLayer.on('layeradd', function(e) {
// 	var marker = e.layer;
// 	var feature = marker.feature;
//  	var popupContent =  '<div class="row title"><div class="col-md-12 title">'+
//  						 'detail in ' + feature.properties.title +'</div></div>'+
//  						 '<div class="row"><div class="col-md-2">'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-success">'+
//  						 'pd: </span></div></div>'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-success">'+
//  						 'qd: </span></div></div>'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-success">'+
//  						 'va: </span></div></div>'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-success">'+
//  						 'vm: </span></div></div>'+
//  						 '</div><div class="col-md-6">'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-default">'+
//  						 '64.24979400634766 </span></div></div>'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-default">'+
//  						 '15.000146865844727 </span></div></div>'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-default">'+
//  						 '-0.0006401428254321218 </span></div></div>'+
//  						 '<div class="row"><div class="col-md-12"><span class="label label-default">'+
//  						 '-0.00083734601503232418 </span></div></div>'+
//  						 '</div><div class="col-md-4">'+
//  						 '<div class="row btn-row"><div class="col-md-12">'+
//  						 '<button class="button button-3d button-action button-pill disabled">Start</button></div></div>'+
//  						 '<div class="row btn-row"><div class="col-md-12">'+
//  						 '<button class="button button-3d button-caution button-pill">Stop</button></div></div>'+
//  						 '<div class="row btn-row"><div class="col-md-12">'+
//  						 '<button class="button button-3d button-highlight button-pill">Restart</button></div></div>'+
//  						 '</div></div>'+
//  						 '<div class="row"><div class="col-md-12"><canvas class="chart"></canvas></div></div>';
//  	var test = marker.bindPopup(popupContent,{
//         closeButton: true,
//         minWidth:340
//     });

 
 //    //Get context with jQuery - using jQuery's .get() method.
	// var ctx = $(".chart").getContext("2d");
	// //This will get the first returned node in the jQuery collection.
	// var myNewChart = new Chart(ctx).Line(lineChartData, {
	// 		responsive: true
	// 	});
// });
myLayer.setGeoJSON(geoJson);

// myLayer.eachLayer(function(marker){
// 	console.log(marker);
// });

// map.featureLayer.on('ready', function(e) {
//     this.eachLayer(function(e){
//     	alert(e);
//     });
// });
// map.featureLayer.eachLayer(function(marker) {
// // You can replace this test for anything else, to choose the right
// // marker on which to open a popup. by default, popups are exclusive
// // so opening a new one will close all of the others.
// alert(marker);
// });


// myLayer.eachLayer(function(e){
// 	if (e.feature.geometry.type == 'LineString'){
// 		e._path.onclick = function(){
// 			//alert(1);
// 			//e.unBindPopup();
// 		}
// 		console.log(e);
// 	}
// });
myLayer.eachLayer(function(e){
	if (e._icon){
		//console.log(e._icon.src);
		var i = 1;
		setInterval(function(){
			if (i > 4){
				i = 1;
			}
			e._icon.src = 'images/attack' + i + '.png';
			i++;
		}, 100)
		
		e._icon.style.width = 50 + 'px';
		e._icon.style.height = 50 + 'px';
		//console.log(e._icon.clientWidth);
		console.log(e);
	}
});
myLayer.on('click', function(e) {
	var sensorArr = [64.24979400634766, 15.000146865844727,-0.0006401428254321218,-0.00083734601503232418];
	var properties = e.layer.feature.properties;
	//alert(properties.status);
	var popupContent = getPoputText(properties.title, properties.type, properties.status, sensorArr);
 	e.layer.bindPopup(popupContent,{
        closeButton: true,
        minWidth:340
    }).openPopup();
    //console.log(e.layer);

       var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
		var lineChartData = {
			labels : ["04:16","04:16","04:16","04:16","04:16","04:16","04:16"],
			datasets : [
				{
					label: "pd",
					fillColor : "rgba(39,174,97,0.2)",
					strokeColor : "rgba(39,174,97,1)",
					pointColor : "rgba(39,174,97,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(39,174,97,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				},
				{
					label: "qd",
					fillColor : "rgba(143,68,173,0.2)",
					strokeColor : "rgba(143,68,173,1)",
					pointColor : "rgba(143,68,173,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(143,68,173,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				},
				{
					label: "va",
					fillColor : "rgba(213,84,1,0.2)",
					strokeColor : "rgba(213,84,1,1)",
					pointColor : "rgba(213,84,1,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(213,84,1,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				},
				{
					label: "vm",
					fillColor : "rgba(236,230,241,0.2)",
					strokeColor : "rgba(236,230,241,1)",
					pointColor : "rgba(236,230,241,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(236,230,241,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				}
			]

		}

	
    var ctx = $('.chart').get(0).getContext("2d");
    var myNewChart = new Chart(ctx).Line(lineChartData, {
		responsive: false,
		scaleFontColor : "#fff"	
	});

  //   setInterval(function(){
  //   	var lineChartData = {
		// 	labels : ["January","February","March","April","May","June","July"],
		// 	datasets : [
		// 		{
		// 			label: "pd",
		// 			fillColor : "rgba(39,174,97,0.2)",
		// 			strokeColor : "rgba(39,174,97,1)",
		// 			pointColor : "rgba(39,174,97,1)",
		// 			pointStrokeColor : "#fff",
		// 			pointHighlightFill : "#fff",
		// 			pointHighlightStroke : "rgba(39,174,97,1)",
		// 			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		// 		}
		// 	]

		// }
		// myNewChart = new Chart(ctx).Line(lineChartData, {
		// 	responsive: false,
		// 	scaleFontColor : "#fff"	
		// });
  //   }, 3000)
	// for (var attr in this){
	// 	console.log(attr);
	// }
   // e.layer.openPopup();
});
// myLayer.on('mouseout', function(e) {
//     e.layer.closePopup();
// });

// myLayer.on('ready', function(e) {
//     // The clusterGroup gets each marker in the group added to it
//     // once loaded, and then is added to the map
//     var clusterGroup = new L.MarkerClusterGroup();
//     e.target.eachLayer(function(layer) {
//         clusterGroup.addLayer(layer);
//     });
//     map.addLayer(clusterGroup);
// });

$('#map').on('click', '.Start', function(){
	// myLayer.eachLayer(function(e){
	// 	console.log(e);
	// 	});
	$(this).addClass('disabled').parents('.btn-group').find('.Stop').removeClass('disabled');
	$(this).parents('.data').find('.label-danger').removeClass('label-danger').addClass('label-success');
});
$('#map').on('click', '.Stop', function(){
	$(this).addClass('disabled').parents('.btn-group').find('.Start').removeClass('disabled');
	$(this).parents('.data').find('.label-success').removeClass('label-success').addClass('label-danger');
});

function refreshData(){
	//等线路做完了一起写
}

//线路上的数据
var giftList = [];
for (var i = 0;i < branch.length;i++){
	if (branch[i].status == -2){
		var marker = L.marker([bus[branch[i].from - 1].coordinate.x, bus[branch[i].from - 1].coordinate.y], {
		  icon: L.icon({
		    iconUrl: 'images/arrow2.png',
		    iconSize: [24, 24]
		  })
		})
	}
	else{
		var marker = L.marker([bus[branch[i].from - 1].coordinate.x, bus[branch[i].from - 1].coordinate.y], {
		  icon: L.icon({
		    iconUrl: 'images/arrow3.png',
		    iconSize: [24, 24]
		  })
		})
	}
	marker.addTo(map);
	giftList.push(marker);
}
// alert(giftList[0].addEventListener);
function markerMove(i){
	return function(){
		if ((giftList[i].step > 0 && giftList[i].x < giftList[i].toX) || (giftList[i].step < 0 && giftList[i].x > giftList[i].toX)){
			giftList[i].x += giftList[i].step;
			giftList[i].y = giftList[i].k * giftList[i].x + giftList[i].b;
		}
		else{
			giftList[i].x = giftList[i].fromX;
			giftList[i].y = giftList[i].fromY;
		}
		giftList[i].setLatLng(L.latLng(giftList[i].x,giftList[i].y));
	}
}
for (var i = 0;i < giftList.length;i++){
	giftList[i].fromX = bus[branch[i].from - 1].coordinate.x;
	giftList[i].fromY = bus[branch[i].from - 1].coordinate.y;
	giftList[i].toX = bus[branch[i].to - 1].coordinate.x;
	giftList[i].toY = bus[branch[i].to - 1].coordinate.y;
	giftList[i].k = (giftList[i].toY - giftList[i].fromY) / (giftList[i].toX - giftList[i].fromX);
	giftList[i].b = giftList[i].fromY - giftList[i].k * giftList[i].fromX;
	giftList[i].step = (giftList[i].toX - giftList[i].fromX) / 50;
	giftList[i].x = giftList[i].fromX;
	giftList[i].y = giftList[i].fromY;
	giftList[i].bindPopup();
	giftList[i].addEventListener('click', function(e){
		var sensorArr = [64.24979400634766, 15.000146865844727,-0.0006401428254321218,-0.00083734601503232418];
		var popupContent = getPoputText('dynamic dot', 3, 1, sensorArr);
	 	this.bindPopup(popupContent,{
	        closeButton: true,
	        minWidth:340
	    }).openPopup();
	    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
		var lineChartData = {
			labels : ["04:16","04:16","04:16","04:16","04:16","04:16","04:16"],
			datasets : [
				{
					label: "pd",
					fillColor : "rgba(39,174,97,0.2)",
					strokeColor : "rgba(39,174,97,1)",
					pointColor : "rgba(39,174,97,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(39,174,97,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				},
				{
					label: "qd",
					fillColor : "rgba(143,68,173,0.2)",
					strokeColor : "rgba(143,68,173,1)",
					pointColor : "rgba(143,68,173,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(143,68,173,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				},
				{
					label: "va",
					fillColor : "rgba(213,84,1,0.2)",
					strokeColor : "rgba(213,84,1,1)",
					pointColor : "rgba(213,84,1,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(213,84,1,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				},
				{
					label: "vm",
					fillColor : "rgba(236,230,241,0.2)",
					strokeColor : "rgba(236,230,241,1)",
					pointColor : "rgba(236,230,241,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(236,230,241,1)",
					data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
				}
			]

		}

	
	    var ctx = $('.chart').get(0).getContext("2d");
	    var myNewChart = new Chart(ctx).Line(lineChartData, {
			responsive: false,
			scaleFontColor : "#fff"	
		});
	});
	giftList[i].addEventListener('mouseover', function(){
		clearInterval(this.timer);
	});
	giftList[i].addEventListener('mouseout', function(i){
		return function(){
			if (!giftList[i].getPopup()._isOpen){
				//console.log(giftList[i].getPopup());
				// console.log(giftList[i].getPopup()._isOpen);
				this.timer = setInterval(markerMove(i), 100);
			}
			else {
				setTimeout(function(){
					this.timer = setInterval(markerMove(i), 100);
				}, 60000);
			}
		}
	}(i));
	giftList[i].timer = setInterval(markerMove(i), 100);
}


//线路
// var s_branches = [];
// var d_branches = [];
// for (var i = 0;i < branches.length;i++){
// 	if (branches[i].status == -2){
// 		s_branches.push(new Array(bus[branches[i].from - 1].coordinates, bus[branches[i].to - 1]));
// 	}
// }

function getPoputText(title, type, status, sensorArr){
	var sensorName = [];
	var color = '';
	var btnStat = [];
	var btnName = ['Start', 'Stop', 'Restart'];
	var btnColor = ['button-action', 'button-caution', 'button-highlight'];
	if (type == 1){
		sensorName = ['pg', 'qg', 'va', 'vm'];
	}
	else if(type == 2){
		sensorName = ['pd', 'qd', 'va', 'vm'];
	}
	else {
		sensorName = ['pf', 'qf', 'pt', 'qt'];
	}
	
	if (status == -2){
		color = 'label-success';
		btnStat.push('disabled');
		btnStat.push('');
		btnStat.push('');
	}
	else{
		color = 'label-danger';
		btnStat.push('');
		btnStat.push('disabled');
		btnStat.push('');
	}
	var res = '<div class="row title"><div class="col-md-12 title">'+
			 'detail in ' + title +'</div></div>'+
			 '<div class="row data"><div class="col-md-2 col-xs-2">';
	for (var i = 0;i < sensorName.length;i++){
		res += '<div class="row"><div class="col-md-12"><span class="label ' +
				color + '">' + sensorName[i] + ': </span></div></div>';
	}
	res += '</div><div class="col-md-6 col-xs-6">';
	for (var i = 0;i < sensorArr.length;i++){
		res += '<div class="row"><div class="col-md-12"><span class="label label-default">' + 
				sensorArr[i] + ' </span></div></div>';
	}
	res += '</div><div class="col-md-4 col-xs-4 btn-group">';
	for (var i = 0;i < btnName.length;i++){
		res += '<div class="row btn-row"><div class="col-md-12">'+
			 '<button class="button button-3d '+ btnColor[i] +
			 ' button-pill ' + btnStat[i] + ' ' + btnName[i] + 
			 '">' + btnName[i] + 
			 '</button></div></div>';
	}
	res += 	 '</div></div>'+
			 '<div class="row"><div class="col-md-12"><canvas class="chart"></canvas></div></div>';
	return res;
}

function loadStatusData(type)
{
	var liString = ''; 
	if(type == 0)
	{
		liString = '<li class="item-title"><span>Id</span><span>Status</span><span>Attacked</span></li>';
	}
	else
	{
		liString = '<li class="item-title"><span>From</span><span>To</span><span>Status</span></li>';
	}
	var status;
	var attacked = 'NO';
	for(var i=0; i<bus.length; i++)
	{
		
		if(type == 0)
		{		
			if(bus[i].status == 1)
				status = 'stop';
			else
				status = 'running';

			bus[i].attacked = Math.round(Math.random());
			console.log(bus[i].attacked);
			if(bus[i].attacked == 1)
				attacked = 'YES';
			else
				attacked = 'NO';

			if(attacked == 'NO')
			{		
				if(status == 'running')
					liString = liString+'<li><span>'+bus[i].id+'</span><span>'+status+'</span><span>'+attacked+'</span></li>';
				else
					liString = liString+'<li class="stop"><span>'+bus[i].id+'</span><span>'+status+'</span><span>'+attacked+'</span></li>';
			}
			else
			{			
				if(status == 'running')
					liString = liString+'<li class="attacked"><span>'+bus[i].id+'</span><span>'+status+'</span><span>'+attacked+'</span></li>';
				else
					liString = liString+'<li class="attacked stop"><span>'+bus[i].id+'</span><span>'+status+'</span><span>'+attacked+'</span></li>';

			}
		}
		else
		{	
			if(branch[i].status == 1)
				status = 'stop';
			else
				status = 'running';	
			if(status == 'running')
				liString = liString+'<li><span>'+branch[i].from+'</span><span>'+branch[i].to+'</span><span>'+status+'</span></li>';
			else
				liString = liString+'<li class="stop"><span>'+branch[i].from+'</span><span>'+branch[i].to+'</span><span>'+status+'</span></li>';
		}

	}
	return liString;
}

$("#profile ul").html(loadStatusData(0));
$("#messages ul").html(loadStatusData(1));


