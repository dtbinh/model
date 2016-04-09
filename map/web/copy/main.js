//访问地图
L.mapbox.accessToken = 'pk.eyJ1IjoieGp0dW1qIiwiYSI6IlRLUllkbHMifQ.jpyHMzmOp4v_vxheQHC5lg';
var map = L.mapbox.map('map', 'xjtumj.dea27667', {"minZoom":8
}).setView([39.21751555999993,109.06017016000008], 12);

var geoJson = {};//保存每一次接到的geoJson
var giftList = [];//存储动点marker的集合

//绘制点
var markers = [];
createMarkers();

//绘制线
var lines = [];
$.ajax({
	url: 'cps/get_all_branch',
	type: 'POST',
	dataType: 'json',
	success: function(data){
		for (var i = 0;i < data.features.length;i++){
			var property = data.features[i].properties;
			var geometry = data.features[i].geometry;
			if (property.status == 1){
				if (property.powerLevel == 1){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#2fcc71',
                        weight: 2,
                            smoothFactor:2
					}).addTo(map);
				}
			    else if (property.powerLevel == 2){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#7eef46',
                            weight: 2,
                            smoothFactor:2
					}).addTo(map);
				}
				else if (property.powerLevel == 3){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#efed46',
                            weight: 2,
                            smoothFactor:2
					}).addTo(map);
				}
				else if (property.powerLevel == 4){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#efc046',
                            weight: 2,
                            smoothFactor:2
					}).addTo(map);
				}
				else if (property.powerLevel == 5) {
                        var polyline = L.polyline(geometry.coordinates, {
                            color: '#ef9346',
                            weight: 2,
                            smoothFactor:2
                        }).addTo(map);
                    }
				else if (property.powerLevel == 6){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#ef6046',
                            weight: 2,
                            smoothFactor:2
					}).addTo(map);
				}
				else {
					var polyline = L.polyline(geometry.coordinates, {
						color: '#ecf0f1',
                        weight: 2,
                            smoothFactor:2
					}).addTo(map);
				}
			}
			else{
				var polyline = L.polyline(geometry.coordinates, {
					color: '#e84c3d',
                        weight: 2,
                            smoothFactor:2
				}).addTo(map);
			}
			polyline.features = data.features[i];
			//console.log(polyline);
			lines.push(polyline);
		}
	}
}).done(function(){
	createMoveMarker();
	addMoveEvents();
	freshList();
});

//每隔5秒刷新点
setInterval(function(){
	$.ajax({
		url: 'cps/get_all_bus',
		type: 'POST',
		dataType: 'json',
		success: function(data){
			for (var i = 0;i < data.features.length;i++){
				// console.log(markers[i]);
				var property = data.features[i].properties;
				if (property.Status == 1){
					if (property.Type == 1)
						markers[i]._icon.src = 'images/power_30.png';
					else{
						markers[i]._icon.src = 'images/load_30.png';
					}
				}
                else if (property.Status == 2){
					if (property.Type == 1)
						markers[i]._icon.src = 'images/power_50.png';
					else{
						markers[i]._icon.src = 'images/load_50.png';
					}
				}
                else if (property.Status == 3){
					if (property.Type == 1)
						markers[i]._icon.src = 'images/power_80.png';
					else{
						markers[i]._icon.src = 'images/load_80.png';
					}
				}
                else if (property.Status == 4){
					if (property.Type == 1)
						markers[i]._icon.src = 'images/power_100.png';
					else{
						markers[i]._icon.src = 'images/load_100.png';
					}
				}

				else if(property.Status == 0)
                {
                    console.log("here");
					if (property.Type == 1)
						markers[i]._icon.src = 'images/power_down.png';
					else{
						markers[i]._icon.src = 'images/load_down.png';
					}
				}
				if (property.attacked == 1){
					if (property.Type == 1){
						var color = 'images/power_att.png';
					}
					else{
						var color = 'images/load_att.png';
					}
					markers[i]._icon.src = color;
				}
				markers[i].features = data.features[i];
			}
		}
	}).done(function(){		
		addMarkerEvent();
		freshData();
		freshOhter();
	});
}, 5000);


//每隔5秒刷新一次线路
setInterval(function(){
	createLines();
}, 5000);

//绘制点
function createMarkers(){
	$.ajax({
		url: 'cps/get_all_bus',
		type: 'POST',
		dataType: 'json',
		success: function(data){
            console.log("here");
			for (var i = 0;i < data.features.length;i++){
				var property = data.features[i].properties;
				var geometry = data.features[i].geometry;
				if(property.Status==0)
                {
                    console.log(property);
                }
                console.log(property)
                //console.log(property.Status);
				if (property.Status == 1){
					if (property.Type == 1)
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/power_30.png',
						    iconSize: [30, 30]
						  })
						});
					else{
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/load_30.png',
						    iconSize: [30, 30]
						  })
						});
					}
				}
                else if (property.Status == 2){
					if (property.Type == 1)
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/power_50.png',
						    iconSize: [30, 30]
						  })
						});
					else{
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/load_50.png',
						    iconSize: [30, 30]
						  })
						});
					}
				}
                else if (property.Status == 3){
					if (property.Type == 1)
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/power_80.png',
						    iconSize: [30, 30]
						  })
						});
					else{
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/load_80.png',
						    iconSize: [30, 30]
						  })
						});
					}
				}
               else  if (property.Status == 4){
					if (property.Type == 1)
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/power_100.png',
						    iconSize: [30, 30]
						  })
						});
					else{
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/load_100.png',
						    iconSize: [30, 30]
						  })
						});
					}
				}
				else if(property.Status==0)
                {
					if (property.Type == 1)
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/power_down.png',
						    iconSize: [30, 30]
						  })
						});
					else{
						var marker = L.marker(geometry.coordinates, {
						  icon: L.icon({
						    iconUrl: 'images/load_down.png',
						    iconSize: [30, 30]
						  })
						});
					}
				}
				marker.features = data.features[i];
				//console.log(marker);
				marker.addTo(map);
				markers.push(marker);
			}
		}
	}).done(function(){		
		addMarkerEvent();
		freshData();
		freshOhter();
	});
}

//绘制线
function createLines(){
	lines = [];
	$.ajax({
		url: 'cps/get_all_branch',
		type: 'POST',
		dataType: 'json',
		success: function(data){
			for (var i = 0;i < data.features.length;i++){
				var property = data.features[i].properties;
				var geometry = data.features[i].geometry;
				if (property.status == 1){
					if (property.powerLevel == 1){
						var polyline = L.polyline(geometry.coordinates, {
							color: '#2fcc71',
                            weight: 2
						}).addTo(map);
					}
			    else if (property.powerLevel == 2){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#7eef46',
                            weight: 2
					}).addTo(map);
				}
				else if (property.powerLevel == 3){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#efed46',
                            weight: 2
					}).addTo(map);
				}
				else if (property.powerLevel == 4){
					var polyline = L.polyline(geometry.coordinates, {
						color: '#efc046',
                            weight: 2
					}).addTo(map);
				}
				else if (property.powerLevel == 5) {
                        var polyline = L.polyline(geometry.coordinates, {
                            color: '#ef9346',
                            weight: 2
                        }).addTo(map);
                    }
				else //if (property.powerLevel == 6)
				{
					var polyline = L.polyline(geometry.coordinates, {
						color: '#ef6046',
                            weight: 2
					}).addTo(map);
				}
				}
				else{
					var polyline = L.polyline(geometry.coordinates, {
						color: '#e84c3d',
                            weight: 2
					}).addTo(map);
				}
				polyline.features = data.features[i];
				//console.log(polyline);
				lines.push(polyline);
			}
		}
	}).done(function(){
		freshList();
	});
}
//当点击节点时
function addMarkerEvent(){
	// console.log(markers);
	for (var i = 0;i < markers.length;i++){
	// console.log(markers[i]);
	markers[i].addEventListener('click', (function(i){
		//alert(1);
		return function(){
			var timestamp = new Date().getTime();
			if (timestamp - markers[i].timestamp < 2000){				
				return;
			}
			markers[i].timestamp = timestamp;
			var id = markers[i].features.properties.No;
			var type = markers[i].features.properties.Type;
			$.ajax({
				url: 'cps/get_bus',
				type: 'POST',
				dataType: 'json',
				data: {'id': id, 'type': type},
				success: function(data){
					// console.log(data.title);
					var popupContent = getPoputText(data.title, data.type, data.status, data.sensorArr);
					// alert(data.status);
					// alert(popupContent);
					var chartData = data.chartData;
					// console.log(e.layer);
					markers[i].bindPopup(popupContent,{
				        closeButton: true,
				        minWidth:340
				    }).openPopup();
				    //console.log(markers[i].getPopup());
					var ctx = $('.chart').get(0).getContext("2d");
				    var myNewChart = new Chart(ctx).Line(chartData, {
						responsive: false,
						scaleFontColor : "#fff"	
					});
				}
			}).done(function(){
//				markers[i].clock = setInterval(function(){
//				if (new Date().getTime() - markers[i].timestamp < 2000){
//					return;
//				}
//				for (var j = 0;j < markers.length;j++){
//					// console.log(j+'->'+markers[j].clock);
//				}
//					if (!markers[i].getPopup()._isOpen){
//						clearInterval(markers[i].clock);
//						markers[i].clock = 'undefined';
//						return;
//					}
//					$.ajax({
//						url: 'cps/get_bus',
//						type: 'POST',
//						dataType: 'json',
//						data: {'id': id, 'type': type},
//						success: function(data){
//							if (data.status == 1){
//								if ($('.label-danger')){
//									$('.label-danger').removeClass('label-danger').addClass('label-success');
//								}
//								if (!$('.Start').hasClass('disabled')){
//									$('.Start').addClass('disabled').parents('.btn-group').find('.Stop').removeClass('disabled');
//								}
//							}
//							else{
//								if ($('.label-success')){
//									$('.label-success').removeClass('label-success').addClass('label-danger');
//								}
//								if (!$('.Stop').hasClass('disabled')){
//									$('.Stop').addClass('disabled').parents('.btn-group').find('.Start').removeClass('disabled');
//								}
//							}
//							for (var i = 0;i < data.sensorArr.length;i++){
//								$('.sensorData'+i).text(data.sensorArr[i])
//							}
//							var chartData = data.chartData;
//							var ctx = $('.chart').get(0).getContext("2d");
//							var myNewChart = new Chart(ctx).Line(chartData, {
//								responsive: false,
//								scaleFontColor : "#fff"
//							});
//						}
//					});
//					markers[i].timestamp = new Date().getTime();
//				}, 3000);
			});
		}			
	})(i));
}
}


//刷新列表数据
function freshData(){
	$("#profile ul").html('<li class="item-title"><span>Id</span><span>Status</span><span>Attacked</span></li>');
	for (var i = 0;i < markers.length;i++){
		var aLi;
		var property = markers[i].features.properties;
		var status = '';
		var attacked = '';
		var liClass = '';
		// console.log(property.Status);
		if (property.Status == 1){
			status = 'running';
		}			
		else{
			status = 'stop';
			liClass += ' stop';
		}
		if (property.attacked == 1){
			attacked = 'YES';
			liClass += ' attacked';
		}
		else{
			attacked = 'NO';
		}	
		aLi = $('<li class="'+ liClass +'"><span>'+property.No+'</span><span>'+status+'</span><span>'+attacked+'</span></li>');
		$("#profile ul").append(aLi);
		aLi.bind('click', function(i){
			return function(){
				map.setView(markers[i].features.geometry.coordinates, 14);
             	var id = markers[i].features.properties.No;
             	var type = markers[i].features.properties.Type;
				$.ajax({
					url: 'cps/get_bus',
					type: 'POST',
					dataType: 'json',
					data: {'id': id, 'type': type},
					success: function(data){
						// console.log(data.title);
						var popupContent = getPoputText(data.title, data.type, data.status, data.sensorArr);
						// alert(popupContent);
						var chartData = data.chartData;
						// console.log(e.layer);
						markers[i].bindPopup(popupContent,{
					        closeButton: true,
					        minWidth:340
					    }).openPopup();
					    //console.log(markers[i].getPopup());
						var ctx = $('.chart').get(0).getContext("2d");
					    var myNewChart = new Chart(ctx).Line(chartData, {
							responsive: false,
							scaleFontColor : "#fff"	
						});
					}
				}).done(function(){
//					markers[i].clock = setInterval(function(){
//						if (new Date().getTime() - markers[i].timestamp < 2000){
//							return;
//						}
//						if (!markers[i].getPopup()._isOpen){
//							clearInterval(markers[i].clock);
//							return;
//						}
//						$.ajax({
//							url: 'cps/get_bus',
//							type: 'POST',
//							dataType: 'json',
//							data: {'id': id, 'type': type},
//							success: function(data){
//								if (data.status == 1){
//									if ($('.label-danger')){
//										$('.label-danger').removeClass('label-danger').addClass('label-success');
//									}
//									if (!$('.Start').hasClass('disabled')){
//										$('.Start').addClass('disabled').parents('.btn-group').find('.Stop').removeClass('disabled');
//									}
//								}
//								else{
//									if ($('.label-success')){
//										$('.label-success').removeClass('label-success').addClass('label-danger');
//									}
//									if (!$('.Stop').hasClass('disabled')){
//										$('.Stop').addClass('disabled').parents('.btn-group').find('.Start').removeClass('disabled');
//									}
//								}
//								for (var i = 0;i < data.sensorArr.length;i++){
//									$('.sensorData'+i).text(data.sensorArr[i])
//								}
//								var chartData = data.chartData;
//								var ctx = $('.chart').get(0).getContext("2d");
//								var myNewChart = new Chart(ctx).Line(chartData, {
//									responsive: false,
//									scaleFontColor : "#fff"
//								});
//							}
//						});
//						markers[i].timestamp = new Date().getTime();
//					}, 3000);
				});
				}			
			}(i));
	}
}

function freshList(){
	$("#messages ul").html('<li class="item-title"><span>From</span><span>To</span><span>Status</span></li>');
	for (var i = 0;i < lines.length;i++){
		var aLi;
		var property = lines[i].features.properties;
		var status = '';
		var liClass = '';
		// console.log(property.Status);
		if (property.status == 1){
			status = 'running';
		}			
		else{
			status = 'stop';
			liClass += ' stop';
		}	
		//console.log(giftList);
		aLi = $('<li class="'+ liClass +'"><span>'+property.fbus+'</span><span>'+property.tbus+'</span><span>'+status+'</span></li>');
		$("#messages ul").append(aLi);
		aLi.bind('click', function(i){
			return function(){
				map.setView([giftList[i].x,giftList[i].y], 14);
             	var id = giftList[i].features.properties.id;
             	var type = giftList[i].features.properties.type;
             	// alert(id);
				$.ajax({
					url: 'cps/get_bus',
					type: 'POST',
					dataType: 'json',
					data: {'id': id, 'type': type},
					success: function(data){
						// console.log(data.title);
						var popupContent = getPoputText(data.title, data.type, data.status, data.sensorArr);
						// alert(popupContent);
						var chartData = data.chartData;
						// console.log(e.layer);
						giftList[i].bindPopup(popupContent,{
					        closeButton: true,
					        minWidth:340
					    }).openPopup();
					    clearInterval(giftList[i].timer);
					    setTimeout(function(){
							giftList[i].timer = setInterval(markerMove(i), 100);
						}, 60000);	
					    //console.log(markers[i].getPopup());
						var ctx = $('.chart').get(0).getContext("2d");
					    var myNewChart = new Chart(ctx).Line(chartData, {
							responsive: false,
							scaleFontColor : "#fff"	
						});
					}
				}).done(function(){
					giftList[i].clock = setInterval(function(){
						if (new Date().getTime() - giftList[i].timestamp < 2000){
							return;
						}
						// alert(giftList[i].getPopup()._isOpen);
						if (!giftList[i].getPopup()._isOpen){
							clearInterval(giftList[i].clock);
							return;
						}
						$.ajax({
							url: 'cps/get_bus',
							type: 'POST',
							dataType: 'json',
							data: {'id': id, 'type': type},
							success: function(data){
								if (data.status == 1){
									if ($('.label-danger')){
										$('.label-danger').removeClass('label-danger').addClass('label-success');
									}
									if (!$('.Start').hasClass('disabled')){
										$('.Start').addClass('disabled').parents('.btn-group').find('.Stop').removeClass('disabled');
									}		
								}
								else{
									if ($('.label-success')){
										$('.label-success').removeClass('label-success').addClass('label-danger');
									}
									if (!$('.Stop').hasClass('disabled')){
										$('.Stop').addClass('disabled').parents('.btn-group').find('.Start').removeClass('disabled');
									}	
								}
								for (var i = 0;i < data.sensorArr.length;i++){
									$('.sensorData'+i).text(data.sensorArr[i])
								}
								var chartData = data.chartData;
								var ctx = $('.chart').get(0).getContext("2d");
								var myNewChart = new Chart(ctx).Line(chartData, {
									responsive: false,
									scaleFontColor : "#fff"	
								});	
							}
						});
						giftList[i].timestamp = new Date().getTime();
					}, 3000);
				});
				}			
			}(i));
	}
}

function freshOhter(){
	$("#settings ul").eq(0).html('<li class="item-title"><span>Pg</span><span>Pgmax</span><span>IsOverLoad</span></li>');
	$("#settings ul").eq(1).html('<li class="item-title"><span>Pd</span><span>RealGet</span><span>IsDeficit</span></li>');
	for (var i = 0;i < markers.length;i++){
		var aLi;
		var property = markers[i].features.properties;
		var overLoad = '';
		var liClass = '';
		// console.log(property.Status);
		if (property.Type == 1){
			if (property.overLoad == 1){
				overLoad = 'YES';
				liClass += ' stop';
			}			
			else{
				overLoad = 'NO';			
			}
			aLi = $('<li class="'+ liClass +'"><span>'+property.Pg.toFixed(2)+'</span><span>'+property.pgmax+'</span><span>'+overLoad+'</span></li>');
			$("#settings ul").eq(0).append(aLi);
		}
		else{
			if (property.powerDeficit == 1){
				overLoad = 'YES';
				liClass += ' stop';
			}			
			else{
				overLoad = 'NO';			
			}
			aLi = $('<li class="'+ liClass +'"><span>'+property.Pd.toFixed(2)+'</span><span>'+property.realGet.toFixed(2)+'</span><span>'+overLoad+'</span></li>');
			$("#settings ul").eq(1).append(aLi);
		}
	}	
}

//绘制线上的动点
function createMoveMarker(){	
	giftList = [];
	for (var i = 0;i < lines.length;i++){
		// console.log(lines);
		var property = lines[i].features.properties;
		var geometry = lines[i].features.geometry;
		if (property.status == 1){
			var marker = L.marker(geometry.coordinates[0], {
			  icon: L.icon({
			    iconUrl: 'images/bolt.png',
			    iconSize: [18, 18]
			  })
			})
		}
		else{
			var marker = L.marker(geometry.coordinates[0], {
			  icon: L.icon({
			    iconUrl: 'images/move2.png',
			    iconSize: [1, 1]
			  })
			})
		}
		marker.features = lines[i].features;
		//console.log(marker);
		marker.addTo(map);
		giftList.push(marker);
	}	
}


//为动点添加定时器和点击移入移出事件
function addMoveEvents(){
	for (var i = 0;i < giftList.length;i++){
		var property = giftList[i].features.properties;
		var geometry = giftList[i].features.geometry;
		giftList[i].fromX = geometry.coordinates[0][0];
		giftList[i].fromY = geometry.coordinates[0][1];
		giftList[i].toX = geometry.coordinates[1][0];
		giftList[i].toY = geometry.coordinates[1][1];
		giftList[i].k = (giftList[i].toY - giftList[i].fromY) / (giftList[i].toX - giftList[i].fromX);
		giftList[i].b = giftList[i].fromY - giftList[i].k * giftList[i].fromX;
		giftList[i].step = (giftList[i].toX - giftList[i].fromX) / 50;
		giftList[i].x = giftList[i].fromX;
		giftList[i].y = giftList[i].fromY;
		giftList[i].bindPopup();
		giftList[i].addEventListener('click', function(e){
			var timestamp = new Date().getTime();
			if (timestamp - this.timestamp < 2000){				
				return;
			}
			this.timestamp = timestamp;
			var id = property.id;
			var type = property.type;
			var _this = this;
			$.ajax({
				url: 'cps/get_bus',
				type: 'POST',
				dataType: 'json',
				data: {'id': id, 'type': type},
				success: function(data){
					// console.log(data.title);
					var popupContent = getPoputText(data.title, data.type, data.status, data.sensorArr);
					// alert(popupContent);
					var chartData = data.chartData;
					// console.log(e.layer);
					_this.bindPopup(popupContent,{
				        closeButton: true,
				        minWidth:340
				    }).openPopup();
				    // console.log(_this.getPopup());
					var ctx = $('.chart').get(0).getContext("2d");
				    var myNewChart = new Chart(ctx).Line(chartData, {
						responsive: false,
						scaleFontColor : "#fff"	
					});
				}
			}).done(function(){
				_this.clock = setInterval(function(){
					if (new Date().getTime() - _this.timestamp < 2000){
						return;
					}
					if (!_this.getPopup()._isOpen){
						clearInterval(_this.clock);
						return;
					}
					$.ajax({
						url: 'cps/get_bus',
						type: 'POST',
						dataType: 'json',
						data: {'id': id, 'type': type},
						success: function(data){
							if (data.status == 1){
								if ($('.label-danger')){
									$('.label-danger').removeClass('.label-danger').addClass('label-success');
								}
								if (!$('.Start').hasClass('disabled')){
									$('.Start').addClass('disabled').parents('.btn-group').find('.Stop').removeClass('disabled');
								}		
							}
							else{
								if ($('.label-success')){
									$('.label-success').removeClass('.label-success').addClass('label-danger');
								}
								if (!$('.Stop').hasClass('disabled')){
									$('.Stop').addClass('disabled').parents('.btn-group').find('.Start').removeClass('disabled');
								}	
							}
							for (var i = 0;i < data.sensorArr.length;i++){
								$('.sensorData'+i).text(data.sensorArr[i])
							}
							var chartData = data.chartData;
							var ctx = $('.chart').get(0).getContext("2d");
							var myNewChart = new Chart(ctx).Line(chartData, {
								responsive: false,
								scaleFontColor : "#fff"	
							});	
						}
					});
					_this.timestamp = new Date().getTime();
				}, 3000);
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
}



//当点击Start时
$('#map').on('click', '.Start', control(1));

//当点击Stop时
$('#map').on('click', '.Stop', control(2));

//当点击Refresh时
$('#map').on('click', '.Restart', control(3));

//点击控制按钮时的扫描与刷新
function control(type){
	return function(){
		for (var i = 0;i < markers.length;i++){
			//console.log(markers[i]);
			if (markers[i].getPopup()){
				if (markers[i].getPopup()._isOpen){
					var id = markers[i].features.properties.No;
					var isMarker = 1;
				}
			}
		}
		for (var i = 0;i < giftList.length;i++){
			if (giftList[i].getPopup()){
				if (giftList[i].getPopup()._isOpen){
					var id = giftList[i].features.properties.id;
					var isMarker = 0;
				}
			}
		}
		if (type == 3){
			if ($('.label-success')){
				$('.label-success').removeClass('.label-success').addClass('label-danger');
			}
			if (!$('.Stop').hasClass('disabled')){
				$('.Stop').addClass('disabled').parents('.btn-group').find('.Start').removeClass('disabled');
			}
		}

		$.ajax({
			url: 'cps/command',
			type: 'POST',
			dataType: 'json',
			data: {'id': id, 'type': type, 'isMarker': isMarker},
		});		
	}
}

//动点移动计算
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

//获得弹框的数据
function getPoputText(title, type, status, sensorArr){
	// alert(sensorArr);
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
	
	if (status == 1){
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
		res += '<div class="row"><div class="col-md-12"><span class="label label-default sensorData' + i + '">' + 
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



