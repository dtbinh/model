// {
// 	"id": 1-9,
// 	"status": 0/1,
// 	"type": 1/2
// 	"pd"/"pg": ,
// 	"qd"/"qg": ,
// 	"va": ,
// 	"vm": 
// }

// { 
// 	"type": "FeatureCollection",
//     "features": [
//       {
// 	       "type": "Feature",
// 	       "geometry": {
// 	       		"type": "Point",
// 	       		"coordinates": [102.0, 0.5]
// 	      	},
// 	       "properties": {
// 	       	"id": "1",
// 	       	"status": 0,//关闭
// 			"type": 1,,//发电厂
// 			"pg": ,
// 			"qg": ,
// 			"va": ,
// 			"vm": ,
// 			'marker-color': '#E74C3C',//表示红色
// 			'marker-size': 'medium',
// 			'marker-symbol': 'farm'//表示发电厂
// 	       }
//        },
//       {
// 	       "type": "Feature",
// 	       "geometry": {
// 	       		"type": "Point",
// 	       		"coordinates": [102.0, 0.5]
// 	      	},
// 	       "properties": {
// 	       	"id": "1",
// 	       	"status": 1,//开启
// 			"type": 2,,//负载
// 			"pd": ,
// 			"qd": ,
// 			"va": ,
// 			"vm": ,
// 			'marker-color': '#2ECC71',//表示红色
// 			'marker-size': 'medium',
// 			'marker-symbol': 'city'//表示负载
// 	       }
//        }
//     ]
// }

// {
// 	status:1,
// 	"pd"/"pg": ,
// 	"qd"/"qg": ,
// 	"va": ,
// 	"vm": 
// }

var bus = [
	{"id":"1", "status": -2,"type":"2","coordinate":{"x":39.32765342494051,"y":100.02471923828125}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"2", "status": -2,"type":"1","coordinate":{"x":39.225599451020116,"y":100.0707885742188}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"3", "status": -2,"type":"1","coordinate":{"x":39.32765342494053,"y":99.73233642578123}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"4", "status": -2,"type":"2","coordinate":{"x":39.711143422387345,"y":100.55568847656252}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"5", "status": -2,"type":"1","coordinate":{"x":39.67521515064718,"y":99.88764648437507}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"6", "status": 1,"type":"2","coordinate":{"x":39.50377079556831,"y":100.0325927734375}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"7", "status": 1,"type":"1","coordinate":{"x":39.312779813422324,"y":100.28190917968743}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"8", "status": 1,"type":"2","coordinate":{"x":39.58213751663488,"y":99.50675048828123}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"9", "status": 1,"type":"1","coordinate":{"x":39.348895954982844,"y":99.28365478515627}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"10", "status": 1,"type":"2","coordinate":{"x":39.246872953885315,"y":98.9891479492187}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"11", "status": 1,"type":"1","coordinate":{"x":39.27044047979276,"y":100.74432373046875}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"12", "status": 1,"type":"2","coordinate":{"x":38.95076827017614,"y":100.1971313476563}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"13", "status": 1,"type":"1","coordinate":{"x":39.40427010962248,"y":101.06717529296873}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"14", "status": 1,"type":"1","coordinate":{"x":38.8866599221602,"y":100.67928466796877}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"15", "status": -2,"type":"2","coordinate":{"x":39.75567249588591,"y":101.85145263671882}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"16", "status": -2,"type":"1","coordinate":{"x":38.83319206520371,"y":100.35943603515625}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"17", "status": -2,"type":"1","coordinate":{"x":38.61248073199102,"y":100.75432128906243}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"18", "status": -2,"type":"2","coordinate":{"x":38.60174924561107,"y":101.18765869140623}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"19", "status": -2,"type":"2","coordinate":{"x":38.67683593961459,"y":101.87093505859377}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"20", "status": -2,"type":"1","coordinate":{"x":37.92893554680467,"y":101.63959960937495}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"21", "status": 1,"type":"1","coordinate":{"x":37.47553830901025,"y":101.417236328125}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"22", "status": 1,"type":"1","coordinate":{"x":37.342456935618486,"y":100.80412597656255}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"23", "status": 1,"type":"1","coordinate":{"x":37.845171644450176,"y":100.02896728515623}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"24", "status": 1,"type":"2","coordinate":{"x":37.54307918937062,"y":99.81136474609377}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"25", "status": 1,"type":"2","coordinate":{"x":38.25610943298969,"y":98.98402099609382}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"26", "status": 1,"type":"2","coordinate":{"x":38.480065650335014,"y":99.5711669921875}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"27", "status": -2,"type":"2","coordinate":{"x":38.24532485258506,"y":99.86992187499993}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"28", "status": -2,"type":"1","coordinate":{"x":38.35740624195485,"y":100.19064941406248}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"29", "status": -2,"type":"1","coordinate":{"x":38.376787361363654,"y":100.52236328125002}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"30", "status": -2,"type":"1","coordinate":{"x":38.84037522343858,"y":99.95869140624995}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"31", "status": -2,"type":"2","coordinate":{"x":37.93324226720573,"y":100.89263916015625}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"32", "status": -2,"type":"2","coordinate":{"x":37.579287390935725,"y":100.79863281250005}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"33", "status": -2,"type":"1","coordinate":{"x":39.90540142828097,"y":99.83121337890623}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"34", "status": -2,"type":"2","coordinate":{"x":38.826747524720524,"y":99.28402099609377}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"35", "status": -2,"type":"1","coordinate":{"x":38.7303953885436,"y":98.80000000000007}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"36", "status": -2,"type":"2","coordinate":{"x":38.629622004432285,"y":98.9998779296875}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"37", "status": -2,"type":"1","coordinate":{"x":39.25765590154979,"y":98.09288330078118}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"38", "status": -2,"type":"1","coordinate":{"x":39.59286872816341,"y":97.65830078124998}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"39", "status": -2,"type":"1","coordinate":{"x":38.85455834611662,"y":98.38826904296877}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"40", "status": -2,"type":"2","coordinate":{"x":39.119284116701344,"y":97.8850219726562}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"41", "status": -2,"type":"1","coordinate":{"x":38.87786965201706,"y":97.95928955078125}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"42", "status": -2,"type":"2","coordinate":{"x":38.8179755462475,"y":97.19511718750005}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"43", "status": -2,"type":"1","coordinate":{"x":38.657296594012635,"y":99.16928710937498}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"44", "status": -2,"type":"1","coordinate":{"x":38.35639633273373,"y":98.75667724609377}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"45", "status": -2,"type":"1","coordinate":{"x":38.680885458176505,"y":97.14106445312507}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"46", "status": -2,"type":"2","coordinate":{"x":38.60365664039229,"y":96.81634521484375}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"47", "status": -2,"type":"1","coordinate":{"x":38.67874133713963,"y":96.48613281249993}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"48", "status": -2,"type":"1","coordinate":{"x":38.85006794549182,"y":96.27127685546873}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"49", "status": -2,"type":"2","coordinate":{"x":39.048717669123825,"y":95.73781738281252}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"50", "status": -2,"type":"1","coordinate":{"x":39.3020912264288,"y":96.09150390624995}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"51", "status": -2,"type":"1","coordinate":{"x":38.94234516359807,"y":97.1929931640625}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"52", "status": -2,"type":"1","coordinate":{"x":39.01920784817074,"y":96.82158203125005}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"53", "status": -2,"type":"1","coordinate":{"x":39.081064314217045,"y":96.61221923828123}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"54", "status": -2,"type":"2","coordinate":{"x":39.17907031367833,"y":96.55117187500002}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"55", "status": -2,"type":"2","coordinate":{"x":39.18119936402325,"y":97.03394775390632}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"56", "status": -2,"type":"2","coordinate":{"x":39.370426495298084,"y":97.12945556640625}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"57", "status": -2,"type":"1","coordinate":{"x":39.28331793632383,"y":96.55479736328118}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"58", "status": -2,"type":"1","coordinate":{"x":39.23865934741745,"y":97.31497802734373}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"59", "status": -2,"type":"2","coordinate":{"x":39.463788114296165,"y":97.06716308593752}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"60", "status": -2,"type":"1","coordinate":{"x":39.60571213454888,"y":96.06403808593745}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"61", "status": -2,"type":"2","coordinate":{"x":39.72080219363381,"y":95.902099609375}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"62", "status": -2,"type":"2","coordinate":{"x":39.46258585543599,"y":95.73393554687505}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"63", "status": -2,"type":"1","coordinate":{"x":39.403187357293305,"y":96.31833496093748}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"64", "status": -2,"type":"1","coordinate":{"x":39.640477364945625,"y":95.49373779296877}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"65", "status": -2,"type":"2","coordinate":{"x":39.84533185481201,"y":95.33106689453132}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"66", "status": -2,"type":"2","coordinate":{"x":39.14165880978383,"y":94.82781982421875}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"67", "status": -2,"type":"1","coordinate":{"x":39.15443894006176,"y":95.45616455078118}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"68", "status": -2,"type":"1","coordinate":{"x":39.62567049699819,"y":95.13693847656248}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"69", "status": -2,"type":"3","coordinate":{"x":38.72932798090631,"y":95.44393310546877}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"70", "status": -2,"type":"2","coordinate":{"x":38.394295399418475,"y":98.07453613281245}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"71", "status": -2,"type":"1","coordinate":{"x":37.63411351052498,"y":98.74755859375}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"72", "status": -2,"type":"2","coordinate":{"x":37.53181396595323,"y":99.20561523437505}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"73", "status": -2,"type":"2","coordinate":{"x":37.438097682766916,"y":98.68039550781248}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"74", "status": -2,"type":"2","coordinate":{"x":38.52053519432624,"y":97.64156494140627}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"75", "status": -2,"type":"1","coordinate":{"x":38.320411642758984,"y":97.64643554687507}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"76", "status": -2,"type":"2","coordinate":{"x":38.22985162844125,"y":97.29425048828125}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"77", "status": -2,"type":"2","coordinate":{"x":38.49044452378504,"y":96.60423583984368}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"78", "status": -2,"type":"1","coordinate":{"x":38.04406704827637,"y":97.29575195312498}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"79", "status": -2,"type":"1","coordinate":{"x":38.44313378645242,"y":96.13057861328127}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"80", "status": -2,"type":"2","coordinate":{"x":39.119704058557325,"y":94.65778808593745}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"81", "status": -2,"type":"1","coordinate":{"x":39.39183254316328,"y":94.61944580078125}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"82", "status": -2,"type":"1","coordinate":{"x":37.98770889567529,"y":97.71147460937505}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"83", "status": -2,"type":"1","coordinate":{"x":37.83602356484553,"y":98.06516113281248}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"84", "status": -2,"type":"1","coordinate":{"x":37.629665079791465,"y":97.78713378906252}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"85", "status": -2,"type":"2","coordinate":{"x":37.27207369511707,"y":98.61597900390632}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"86", "status": -2,"type":"1","coordinate":{"x":37.37254617347784,"y":99.14544677734375}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"87", "status": -2,"type":"2","coordinate":{"x":37.39873428836603,"y":99.81224365234368}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"88", "status": -2,"type":"1","coordinate":{"x":37.355082349139906,"y":98.13071289062498}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"89", "status": -2,"type":"2","coordinate":{"x":37.714450251683964,"y":97.33907470703127}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"90", "status": -2,"type":"2","coordinate":{"x":37.29174192252183,"y":97.3961303710937}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"91", "status": 1,"type":"2","coordinate":{"x":37.23537207452265,"y":97.000732421875}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"92", "status": -2,"type":"2","coordinate":{"x":37.72794597667034,"y":96.03056640625005}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"93", "status": -2,"type":"1","coordinate":{"x":37.81044891052047,"y":96.47763671874998}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"94", "status": -2,"type":"1","coordinate":{"x":38.23021161479828,"y":95.73269042968752}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"95", "status": -2,"type":"1","coordinate":{"x":37.797428251573066,"y":96.78950195312507}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"96", "status": -2,"type":"1","coordinate":{"x":37.957855871583654,"y":97.01959228515625}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"97", "status": -2,"type":"1","coordinate":{"x":38.686166753773435,"y":95.26665039062493}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"98", "status": -2,"type":"1","coordinate":{"x":38.57888994345292,"y":94.87052001953123}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"99", "status": -2,"type":"2","coordinate":{"x":38.88527436289344,"y":94.83693847656252}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"100", "status": -2,"type":"2","coordinate":{"x":37.92969794448355,"y":95.39387207031245}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"101", "status": -2,"type":"1","coordinate":{"x":37.325992679791554,"y":96.23992919921875}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"102", "status": -2,"type":"1","coordinate":{"x":37.38712196997509,"y":96.51945800781255}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"103", "status": -2,"type":"2","coordinate":{"x":37.963197055930515,"y":94.74729003906248}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"104", "status": -2,"type":"2","coordinate":{"x":37.01960025269706,"y":94.74117431640627}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"105", "status": -2,"type":"2","coordinate":{"x":37.16638592956335,"y":95.87214355468757}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"106", "status": -2,"type":"1","coordinate":{"x":37.591977338331766,"y":95.84130859375}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"107", "status": -2,"type":"2","coordinate":{"x":37.41112342471122,"y":96.03294677734368}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"108", "status": -2,"type":"1","coordinate":{"x":37.63331598881025,"y":95.06827392578123}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"109", "status": -2,"type":"1","coordinate":{"x":37.7311316229561,"y":95.04018554687502}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"110", "status": -2,"type":"2","coordinate":{"x":37.52012402944953,"y":94.8473022460937}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"111", "status": -2,"type":"2","coordinate":{"x":37.53366933027262,"y":95.04104614257812}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"112", "status": -2,"type":"2","coordinate":{"x":37.364681306717095,"y":94.88936157226567}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"113", "status": -2,"type":"2","coordinate":{"x":37.93443138295361,"y":101.22098388671873}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"114", "status": -2,"type":"1","coordinate":{"x":37.8585728443798,"y":100.48977050781252}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"115", "status": -2,"type":"1","coordinate":{"x":37.836884619718845,"y":100.20625000000007}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"116", "status": 1,"type":"2","coordinate":{"x":39.83277745177093,"y":94.82232666015625}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"117", "status": -2,"type":"1","coordinate":{"x":39.07355935307746,"y":100.63347167968743}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}},
	{"id":"118", "status": -2,"type":"1","coordinate":{"x":38.06213015223679,"y":97.91373291015623}, "sensor": {"status": -2, "ip": "192.168.4.164", "port": 9000}, "actuator": {"status": -2, "ip": "192.168.4.50", "port": 7000}}
];