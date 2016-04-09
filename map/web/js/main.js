L.mapbox.accessToken = 'pk.eyJ1IjoieGp0dW1qIiwiYSI6IlRLUllkbHMifQ.jpyHMzmOp4v_vxheQHC5lg';
var map = L.mapbox.map('map', 'xjtumj.dea27667', {"minZoom":8
}).setView([39.21751555999993,109.06017016000008], 9);
var move_points = [];
var markers = [];
var att_marker=[];
var branch_markers=[];
var branch_markers_cor=[];
var lines = [];
var move_dirt=[];// 1 pf >0 -1 pf <0
var bolt_img=[];
bolt_img[0]='images/bolt_0.png';
bolt_img[1]='images/bolt_1.png';
bolt_img[2]='images/bolt_2.png';
bolt_img[3]='images/bolt_3.png';
bolt_img[4]='images/bolt_4.png';
bolt_img[5]='images/bolt_5.png';
bolt_img[6]='images/bolt_6.png';
bolt_img[7]='images/bolt_7.png';
var clr_lv=[];
clr_lv[1]="#2fcc71";
clr_lv[2]="#4c8933";
clr_lv[3]="#608933";
clr_lv[4]="#708933";
clr_lv[5]="#96461a";
clr_lv[6]="#9d381a";
clr_lv[7]="#94241a";
clr_dn="#b3b1b1";
var power_img=[];
var load_img=[];
var marker;
var popup_op=[0,0]; //0 for bus 1 for bran
power_img[1]='images/power_30.png';
power_img[2]='images/power_50.png';
power_img[3]='images/power_80.png';
power_img[4]='images/power_100.png';
power_img[0]='images/power_down.png';
load_img[1]='images/load_30.png';
load_img[2]='images/load_50.png';
load_img[3]='images/load_80.png';
load_img[4]='images/load_100.png';
load_img[0]='images/load_down.png';
var bran_1='images/bran_1.png';
var bran_2='images/bran_2.png';
var bran_0='images/bran_down.png';
var power_att='images/power_att.png';
var load_att='images/load_att.png';
var lineCharData={
    'labels':['20','21','22','23','24'],
    'datasets':[
                {
                'label':0,
                'fillColor':'rgba(39,174,97,0.2)',
                'strokeColor':'rgba(39,174,97,1)',
                'pointColor':'rgba(39,174,97,1)',
                'pointStrokeColor':'#fff',
                'pointHighlightFill':'#fff',
                'pointHighlightStroke':"rgba(39,174,97,1)",
                'data':[ 142,123,133,121,132]
                },
                {
                'label':0,
                'fillColor':'rgba(143,68,173,0.2)',
                'strokeColor':'rgba(143,68,173,1)',
                'pointColor':'rgba(143,68,173,1)',
                'pointStrokeColor':'#fff',
                'pointHighlightFill':'#fff',
                'pointHighlightStroke':"rgba(143,68,173,1)",
                'data':[ 123,145,163,136,142]
                },
                {
                'label':0,
                'fillColor':'rgba(213,84,1,0.2)',
                'strokeColor':'rgba(213,84,1,1)',
                'pointColor':'rgba(213,84,1,1)',
                'pointStrokeColor':'#fff',
                'pointHighlightFill':'#fff',
                'pointHighlightStroke':"rgba(213,84,1,1)",
                'data':[ 176,154,147,167,138]
                },
                {
                'label':0,
                'fillColor':'rgba(236,230,241,0.2)',
                'strokeColor':'rgba(236,230,241,1)',
                'pointColor':'rgba(236,230,241,1)',
                'pointStrokeColor':'#fff',
                'pointHighlightFill':'#fff',
                'pointHighlightStroke':"rgba(236,230,241,1)",
                'data':[ 136,155,105,109,112]
                },
                ]

}

var polyline_path=[];//move point path
var move_state=[];
for (var i = 0; i < 46; i++) 
{
	polyline_path[i]=[];
	move_dirt.push(1);
	move_state[i]=0;
};

var step=50;
createMarkers();
function timer()
{

	setInterval(
			function()
			{
				$.ajax
				({
					url:'cps/get_all_bus',
					type: 'POST',
					dataType:'json',
					success:function(data)
							{
								for(var i=0;i<data.features.length;i++)
								{
									var property=data.features[i].properties;
									if(property.Type==1)
									{
										markers[i]._icon.src=power_img[property.Status];
									}
									else if(property.Type==2)
									{
										markers[i]._icon.src=load_img[property.Status];						
									}
									if(property.attacked==1)
									{
										att_marker[i].setIcon(L.icon({
														iconUrl: 'images/att.png',
														iconSize: [20, 20],
														iconAnchor:[-5,-5]
														}));
									}
									else
									{	att_marker[i].setIcon(L.icon({
														iconUrl: 'images/att.png',
														iconSize: [0, 0],
														iconAnchor:[-5,-5]
														}));
									}
									markers[i].features=data.features[i];
								}
							}
				}).done(function()
						{
						});
				$.ajax
				({
					url: 'cps/get_all_branch',
					type: 'POST',
					dataType: 'json',
					success: function(data) 
							{
								for (var i = 0; i <data.features.length; i++) 
								{
									var property=data.features[i].properties;
									var geometry=data.features[i].geometry;
									if(property.status==1)
									{
									    lines[i].setStyle({color:clr_lv[property.powerLevel]});
									   	switch(property.powerLevel)
										{
											case 1:
											case 2:
											case 4:
											case 5:
											case 3:	branch_markers[i]._icon.src=bran_1;
													
													break;
						
											case 6:
											case 7: branch_markers[i]._icon.src=bran_2;
													break;
										}
									}
									else if(property.status==0)
									{

										branch_markers[i]._icon.src=bran_0;
									    lines[i].setStyle({color:clr_dn});
									}
									lines[i].features=data.features[i];
								};
							}
				}).done(
						function()
						{
						});
				freshBranchList();
				freshPowerList();
				freshPopup();
				freshBusList();
				freshMovepoint();
				//createBranchList();
				//createBusList();
				//createPowerList();
				
			},1557);
			
}
mapzoom();
function mapzoom()
{
	map.addEventListener('zoomend', function(e)
									{
										var zoom=map.getZoom();
										var size=6+zoom*2;
										for(i=0;i<markers.length;i++)
										{
											var property = markers[i].features.properties;
											var geometry = markers[i].geometry;
											if(property.Type==1)
											{
												markers[i].setIcon(L.icon({
											    	iconUrl: power_img[property.Status],
											    	iconSize: [size, size]
											  		}));
											}
											else if(property.Type==2)
											{
												markers[i].setIcon(L.icon({
											    	iconUrl: load_img[property.Status],
											    	iconSize: [size, size]
											  		}));							
											}
											if(property.attacked==1)
											{
												att_marker[i].setIcon(L.icon({
														iconUrl: 'images/att.png',
														iconSize: [size-5, size-5],
														iconAnchor:[-5,-5]
														}));
											}

										}
									});
}
function createMarkers()
		{
			$.ajax
			({
				url: 'cps/get_all_bus',
				type: 'POST',
				dataType: 'json',
				success: function(data)
				{
					for (var i = 0;i < data.features.length;i++)
					{
						var property = data.features[i].properties;
						var geometry = data.features[i].geometry;
						if(property.Type==1)
						{
							marker = L.marker(geometry.coordinates, {
						  		icon: L.icon({
						    	iconUrl: power_img[property.Status],
						    	iconSize: [30, 30]
						  		})
						  		});	
						}
						else if(property.Type==2)
						{
							marker = L.marker(geometry.coordinates, {
						  		icon: L.icon({
						    	iconUrl: load_img[property.Status],
						    	iconSize: [30, 30]
						  		})
						  		});								
						}
						//marker.bindPopup('<button class="trigger">Say hi'+i+'</button>').addTo(map);						
						marker.addTo(map);
						markers.push(marker);
						markers[i].features=data.features[i];
						marker = L.marker([geometry.coordinates[0],geometry.coordinates[1]], {
							icon: L.icon({
						   	iconUrl: 'images/att.png',
						    iconSize: [20, 20],
						    iconAnchor:[-5,-5]
						  	})
						  	});	
						if(property.attacked==1)
						{
							marker.setIcon(L.icon({
											iconUrl: 'images/att.png',
											iconSize: [20, 20],
											iconAnchor:[-5,-5]
											}));
							marker.addTo(map);
							att_marker.push(marker);
							att_marker[i].index=i;
						}
						else
						{	marker.setIcon(L.icon({
											iconUrl: 'images/att.png',
											iconSize: [0, 0],
											iconAnchor:[-5,-5]
											}));
							marker.addTo(map);
							att_marker.push(marker);
							att_marker[i].index=i;
						}
					}
				}
			}).done(
					function()
					{
						addMarkerEvent();
						createBusList();
						createPowerList();
						createLines();

					});
		}

function createLines()
		{
			lines=[];
			$.ajax
			({	
				url:'cps/get_all_branch',
				type:'POST',
				dataType:'json',
				success:function(data)
						{
							
							for (var i = 0;i < data.features.length;i++)
							{
								var property = data.features[i].properties;
								var geometry = data.features[i].geometry;

								if(property.status==1)
								{

						    		var polyline = L.polyline(geometry.coordinates, 
						    							{
            	            	    						color:clr_lv[property.powerLevel],
            	            	    						weight: 2,
            	            	    						smoothFactor:2
            	            							}).addTo(map);
								}
								else if(property.status==0)
								{
						    		var polyline = L.polyline(geometry.coordinates, 
						    							{
            	            	    						color: clr_dn,
            	            	    						weight: 2,
            	            	    						smoothFactor:2
            	            							}).addTo(map);
								}
								else
								{}
								polyline.features = data.features[i];
								lines.push(polyline);
							}
						}
			}).done(
					function()
					{

						getPolylinepath();
						createMoveMarkers();
						tick();
						createBranchList();
						createPolylineMarkers();
						freshMovepoint();
						timer();
					});
		}
function getPolylinepath()
		{
			var cor_srt=0;
			var cor_stp;
			var slice=[];
			var inter=[0,0];
			for(var i=0;i< lines.length;i++)
			{
				var poly=lines[i];
				cor_srt=poly.features.geometry.coordinates[0];
				cor_stp=poly.features.geometry.coordinates[1];
				inter[0]=(cor_stp[0]-cor_srt[0])/step;
				inter[1]=(cor_stp[1]-cor_srt[1])/step;
				polyline_path[i].push(cor_srt);

				for(var k=1;k<step;k++)
				{
					polyline_path[i].push([cor_srt[0]+inter[0]*k,cor_srt[1]+inter[1]*k])
				}
			}
		}

function addMarkerEvent()
		{
			for(var i=0;i<markers.length;i++)
			{
				(function()
				{
        			var index = i;
        			markers[i].addEventListener('click', function(e)
        												{
        													popup_op=[0,index];
        													var text=getPopuptext(popup_op[1]+1,popup_op[0]);//'<button class="trigger">Say hi'+index+'</button>';
    														var popup = L.popup({minWidth:310})
    														    .setLatLng(e.latlng)
    														    .setContent(text)
    														    .openOn(map);        													
    														freshPopup();
    														var ctx = $('.chart').get(0).getContext("2d");
				    										var myNewChart = new Chart(ctx).Line(lineCharData, {
															responsive: false,
															scaleFontColor : "#fff"	
															});
        												});    
   				 })();
			}
		}

function createPolylineMarkers()
		{

			for (var i=0; i < lines.length;i++) 
			{
				var property = lines[i].features.properties;
				var geometry = lines[i].features.geometry;
				branch_markers_cor.push([(geometry.coordinates[0][0]+geometry.coordinates[1][0])/2,(geometry.coordinates[0][1]+geometry.coordinates[1][1])/2]);
				
				switch(property.powerLevel)
				{
					case 1:
					case 2:
					case 4:
					case 5:
					case 3:	var marker = L.marker(branch_markers_cor[i], {
						  		icon: L.icon({
						    	iconUrl: bran_1,
						    	iconSize: [7,7]
						  		})
						  		});
							break;

					case 6:
					case 7:var marker = L.marker(branch_markers_cor[i], {
						  		icon: L.icon({
						    	iconUrl: bran_2,
						    	iconSize: [7, 7]
						  		})
						  		});
							break;
				}
				if(property.status==0)
				{ 
					var marker = L.marker(branch_markers_cor[i], {
				  		icon: L.icon({
				    	iconUrl: bran_0,
				    	iconSize: [5, 5]
				  		})
				  		});
				}
				(function()
				{
        			var index = i;
        			marker.addEventListener('click', function(e)
        												{
        													popup_op=[1,index];
        													var text=getPopuptext(popup_op[1]+1,popup_op[0]);//'<button class="trigger">Say hi'+index+'</button>';
    														var popup = L.popup({minWidth:310})
    														    .setLatLng(e.latlng)
    														    .setContent(text)
    														    .openOn(map);

    														freshPopup();
    														var ctx = $('.chart').get(0).getContext("2d");
				    										var myNewChart = new Chart(ctx).Line(lineCharData, {
															responsive: false,
															scaleFontColor : "#fff"	
															});   													
        												});    
   				 })();

				marker.addTo(map);
				branch_markers.push(marker);
			}
		}
function getPopuptext(id,type)
{
	var title;
	var ty;
	if(type==0)
	{
		ty=markers[id-1].features.properties.Type;
	}
	else {ty=0;}
	var status=1;
	var color='';
	var button_status=[];
	var button_name=['start','stop','restart'];
	var button_color=['button-inverse','button-inverse','button-inverse'];
	if(ty==1)
	{
		title='gen '+id;
		att_name=['pg','qg','va','vm'];
	}
	else if(ty==2)
	{
		title='load '+id;
		att_name=['pd','qd','va','vm'];
	}
	else
	{
		title='branch '+id;
		att_name=['pf','qf','pt','qt'];
	}
	if(status==1)
	{
		color = 'label-success';
		button_status.push('disabled');
		button_status.push('');
		button_status.push('');
	}	
	else
	{
		color = 'label-danger';
		button_status.push('');
		button_status.push('disabled');
		button_status.push('');
	}
	var res = '<div class="row title"><div class="col-md-12 title">'+
			 'detail in ' + title +'</div></div>'+
			 '<div class="row data"><div class="col-md-2 col-xs-2">';
	for (var i = 0;i < att_name.length;i++){
		res += '<div class="row"><div class="col-md-12"><span class="label ' +
				color + '">' + att_name[i] + ': </span></div></div>';
	}
	res += '</div><div class="col-md-6 col-xs-6">';
	for (var i = 0;i < 4;i++){
		res += '<div class="row"><div class="col-md-12"><span class="data' + i + '"></span></div></div>';
	}
	res += '</div><div class="col-md-4 col-xs-4 btn-group">';
	for (var i = 0;i < button_name.length;i++){
		res += '<div class="row btn-row"><div class="col-md-12">'+
			 '<button class="button button-2d '+ button_color[i] +
			 ' button-pill ' + button_status[i] + ' ' + button_name[i] + 
			 '">' + button_name[i] + 
			 '</button></div></div>';
	}
	res += 	 '</div></div>'+
			 '<div class="row"><div class="col-md-12"><canvas class="chart"></canvas></div></div>';
	return res;

}

function createMoveMarkers()
		{
			for (var i = 0;i < lines.length;i++)
			{
				var property = lines[i].features.properties;
				var geometry = lines[i].features.geometry;
				if (property.status == 1){
					var marker = L.marker(geometry.coordinates[0], {
					  icon: L.icon({
					    iconUrl: bolt_img[property.powerLevel],
					    iconSize: [10, 10]
					  })
					})
				}
				else{
					var marker = L.marker(geometry.coordinates[0], {
					  icon: L.icon({
					    iconUrl: 'images/move2.png',
					    iconSize: [10, 10]
					  })
					})
				}
				marker.addTo(map);
				move_points.push(marker);
			}
		}
var j=0;

function tick()
		{
			for (var i = 0;i < lines.length;i++)
			{
				var geometry = lines[i].features.geometry;
				move_points[i].setLatLng(L.latLng(
        		polyline_path[i][move_state[i]][0],
        		polyline_path[i][move_state[i]][1]));
        		move_state[i]=move_state[i]+move_dirt[i];
        		if(move_state[i]<=-1){move_state[i]=step-1;}
        		else if(move_state[i]>=step){move_state[i]=0;}
			}
			setTimeout(tick, 80);
		}
function createBranchList()
		{
			$("#messages ul").html('<li class="item-title"><span>From</span><span>To</span><span>Status</span></li>');	
			for (var i = 0;i < lines.length;i++)
			{
				var aLi;
				var property = lines[i].features.properties;
				var status = '';
				var liClass = '';

				if (property.status == 1)
				{
					status = 'running';
				}			
				else
				{
					status = 'stop';
					liClass += ' stop';
				}				
				aLi = $('<li id="bran_li'+i+'" class="'+ liClass +'"><span id= "fbus'+i+'">'+property.fbus+'</span><span id="tbus'+i+'">'+property.tbus+'</span><span id="bran_stus'+i+'">'+status+'</span></li>');
				$("#messages ul").append(aLi);
				(function()
				{
					var index=i;
					aLi.bind('click', function(e)
								{   
									map.setView(branch_markers_cor[index], 10);	
									popup_op=[1,index];
									var text=getPopuptext(popup_op[1]+1,popup_op[0]);
    								var popup = L.popup({minWidth:310})
    											.setLatLng(branch_markers_cor[index])
    											.setContent(text)
    											.openOn(map);   
    								freshPopup();
       								var ctx = $('.chart').get(0).getContext("2d");
				    				var myNewChart = new Chart(ctx).Line(lineCharData, {
									responsive: false,
									scaleFontColor : "#fff"	
									});
								});
				})();
			}
		}
function freshBranchList()
		{
			for (var i = 0;i < lines.length;i++)
			{
				var property = lines[i].features.properties;

				if(property.status != 0)
				{
					$("#bran_stus"+i).text("running");
					$("#bran_li"+i).addClass("").removeClass("stop");
				}
				else
				{
					$("#bran_stus"+i).text("stop");
					$("#bran_li"+i).addClass("stop").removeClass("");
				}	
			}
		}
function createBusList()
		{
			$("#profile ul").html('<li class="item-title"><span>Id</span><span>Status</span><span>Broken</span></li>');
			for (var i = 0;i < markers.length;i++)
			{
				var aLi;
				var property = markers[i].features.properties;
				var status = '';
				var attacked = '';
				var liClass = '';

				if (property.Status != 0){
					status = 'running';
				}			
				else{
					status = 'stop';
					liClass += ' stop';
				}
				if (property.attacked == 1)
				{
					attacked = 'YES';
					liClass += ' attacked';
				}
				else
				{
					attacked = 'NO';
				}	
				aLi = $('<li id="bus_li'+i+'" class="'+ liClass +'"><span id="bus_no'+i+'">'+property.No+'</span><span id="bus_stus'+i+'">'+status+'</span><span id="bus_att'+i+'">'+attacked+'</span></li>');
				$("#profile ul").append(aLi);
				(function()
				{
					var index=i;
					aLi.bind('click', function(e)
								{   
									map.setView(markers[index].features.geometry.coordinates, 10);	
									popup_op=[0,index];
									var text=getPopuptext(popup_op[1]+1,popup_op[0]);
    								var popup = L.popup({minWidth:310})
    											.setLatLng(markers[index].features.geometry.coordinates)
    											.setContent(text)
    											.openOn(map);   
    								freshPopup();
       								var ctx = $('.chart').get(0).getContext("2d");
				    				var myNewChart = new Chart(ctx).Line(lineCharData, {
									responsive: false,
									scaleFontColor : "#fff"	
									});
								});
				})();
			}	
		}
function freshBusList()
		{
			for (var i = 0;i < markers.length;i++)
			{
				var property = markers[i].features.properties;

				if (property.Status != 0)
				{
					$("#bus_stus"+i).text("running");
					$("#bus_li"+i).addClass("").removeClass("stop").removeClass("attacked");
				}			
				else
				{
					$("#bus_stus"+i).text("stop");
					$("#bus_li"+i).addClass("stop").removeClass("").removeClass("attacked");
				}
				if (property.attacked == 1)
				{
					$("#bus_att"+i).text("YES");
					$("#bus_li"+i).addClass("attacked").removeClass("").removeClass("stop");
				}
			}
		}
function createPowerList()
		{
			$("#settings ul").eq(0).html('<li class="item-title"><span>Pg</span><span>Pgmax</span><span>IsOverLoad</span></li>');
			$("#settings ul").eq(1).html('<li class="item-title"><span>Pd</span><span>RealGet</span><span>IsDeficit</span></li>');
			for (var i = 0;i < markers.length;i++)
			{

				var aLi;
				var property = markers[i].features.properties;
				var overLoad = '';
				var liClass = '';

				if (property.Type == 1)
				{
					if (property.overLoad == 1){
						overLoad = 'YES';
						liClass += ' stop';
					}			
					else
					{
						overLoad = 'NO';			
					}
					aLi = $('<li id="power_li'+i+'" class="'+ liClass +'"><span id="power_pg'+i+'">'+property.Pg.toFixed(2)+'</span><span id="power_pgmax'+i+'">'+property.pgmax+'</span><span id="power_ov'+i+'">'+overLoad+'</span></li>');
					$("#settings ul").eq(0).append(aLi);
				}
				else
				{
					if (property.powerDeficit == 1){
						overLoad = 'YES';
						liClass += ' stop';
					}			
					else{
						overLoad = 'NO';			
					}
					aLi = $('<li id="load_li'+i+'" class="'+ liClass +'"><span id="load_pd'+i+'">'+property.Pd.toFixed(2)+'</span><span id="load_rg'+i+'">'+property.realGet.toFixed(2)+'</span><span id="load_ov'+i+'">'+overLoad+'</span></li>');
					$("#settings ul").eq(1).append(aLi);
				}
				(function()
				{
					var index=i;
					aLi.bind('click', function(e)
								{   
									map.setView(markers[index].features.geometry.coordinates, 10);	
									popup_op=[0,index];
									var text=getPopuptext(popup_op[1]+1,popup_op[0]);		
    								var popup = L.popup({minWidth:310})
    											.setLatLng(markers[index].features.geometry.coordinates)
    											.setContent(text)
    											.openOn(map);   
    								freshPopup();
    								var ctx = $('.chart').get(0).getContext("2d");
				    				var myNewChart = new Chart(ctx).Line(lineCharData, {
									responsive: false,
									scaleFontColor : "#fff"	
									});
								});
				})();
			}				
		}
function freshPowerList()
		{
			for (var i = 0;i < markers.length;i++)
			{
				var property = markers[i].features.properties;

				if (property.Type == 1)
				{
					$("#power_pg"+i).text(property.Pg.toFixed(2));
					$("#power_pgmax"+i).text(property.pgmax);
					if (property.overLoad == 1)
					{
						$("#power_ov"+i).text('YES');
						$("#power_li"+i).addClass("stop").removeClass("");
					}			
					else
					{
						$("#power_li"+i).addClass("").removeClass("stop");			
						$("#power_ov"+i).text('NO')
					}
				}
				else
				{
					$("#load_pd"+i).text(property.Pd.toFixed(2));
					$("#load_rg"+i).text(property.realGet.toFixed(2));
					if (property.powerDeficit == 1)
					{

						$("#load_ov"+i).text('YES');
						$("#load_li"+i).addClass("stop").removeClass("");
					}			
					else
					{
						$("#load_li"+i).addClass("").removeClass("stop");
						$("#load_ov"+i).text('NO');			
					}
				}
			}	
		}
//当点击Start时
$('#map').on('click', '.start', control(1));

//当点击Stop时
$('#map').on('click', '.stop', control(2));

//当点击Refresh时
$('#map').on('click', '.restart', control(3));

//点击控制按钮时的扫描与刷新
function control(type)
{
	return function()
	{
		$.ajax({
			url: 'cps/command',
			type: 'POST',
			dataType: 'json',
			data: {'id': popup_op[1]+1-popup_op[0], 'type': type+popup_op[0]*2, 'isMarker': (1-popup_op[0])},
		});		
	}
}
function freshPopup()
		{
			if(popup_op[0]==0)
			{
				var property=markers[popup_op[1]].features.properties;
				if(property.Type==1)
				{
					$('.data0').text(property.Pg);
					$('.data1').text(property.Qg);
					$('.data2').text(property.Vm);
					$('.data3').text(property.Va);
				}
				else
				{
					$('.data0').text(property.Pd);
					$('.data1').text(property.Qd);
					$('.data2').text(property.Vm);
					$('.data3').text(property.Va);
				}
				if(property.Status==0)
				{
					$('.stop').addClass('disabled').removeClass('');
					$('.start').addClass('').removeClass('disabled');
				}
				else
				{
					$('.start').addClass('disabled').removeClass('');
					$('.stop').addClass('').removeClass('disabled');
				}
			}
			else
			{
				var property=lines[popup_op[1]].features.properties;
				$('.data0').text(property.pf);
				$('.data1').text(property.qf);
				$('.data2').text(property.pt);
				$('.data3').text(property.qt);
				if(property.status==0)
				{
					$('.stop').addClass('disabled').removeClass('');
					$('.start').addClass('').removeClass('disabled');
				}
				else
				{
					$('.start').addClass('disabled').removeClass('');
					$('.stop').addClass('').removeClass('disabled');
				}
			}
		}
function freshMovepoint()
		{
			for (var i = 0;i < lines.length;i++)
			{
				var property = lines[i].features.properties;
				var geometry = lines[i].features.geometry;

				if (property.status == 1)
				{
					move_points[i]._icon.src=bolt_img[property.powerLevel];
				}
				else
				{

					move_dirt[i]=0;
					move_points[i]._icon.src=bolt_img[0];
					continue;
				}
				if(property.pf>=0){move_dirt[i]=1;}
				else {move_dirt[i]=-1;}
			}
		}
