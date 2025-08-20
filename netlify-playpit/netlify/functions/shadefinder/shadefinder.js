const path = require("path");
const fs = require("fs");
let jp = require('jsonpath');

console.log(path.resolve(__dirname + "/rev-shadefinder.json"));
const pathToJSON = path.resolve(__dirname + "/rev-shadefinder.json");
console.log(fs.existsSync(pathToJSON));
const shadefinderJSON = JSON.parse(fs.readFileSync(pathToJSON));

// console.log(shadefinderJSON[0].shadeGroup);
console.log( jp.query(shadefinderJSON, "$..[?(@.shadeGroup=='fair to light')].undertone"));

exports.handler = async (event, context) => {
	const path1 = event.path;
	const parts = path1.split('/').filter(Boolean);
	const { queryStringParameters } = event;
	console.error("test");
	console.debug(event.headers.host);
	//console.debug(parts);
	console.debug(queryStringParameters);
	const selectedShadeGroup = queryStringParameters.path?.split('~')[1];
	const selectedTone = queryStringParameters.path?.split('~')[2];
	const selectedShade = queryStringParameters.path?.split('~')[3];
	
	
	
	const items = [];
	if(selectedShadeGroup && !selectedTone){
		const undertones = [...new Set(jp.query(shadefinderJSON, "$..[?(@.shadeGroup=='"+selectedShadeGroup+"')].undertone"))];
		console.debug( undertones );		
		for (i in undertones){
			items.push({
				title: undertones[i],
				link: "content/charles~"+selectedShadeGroup+"~"+undertones[i],
				//imageUrl: "https://poqmbuat.blob.core.windows.net/app292/45585842-1.png?v=133910178050860000"
				 imageUrl: "https://musical-truffle-5e8a45.netlify.app/public/undertones/"+undertones[i].toLowerCase()+".png"
				//imageUrl: (event.headers.host.indexOf("localhost")>-1?"https://localhost.charles:1234/public/undertones/":"https://musical-truffle-5e8a45.netlify.app/public/undertones/")+undertones[i].toLowerCase()+".png"
				}	
			)
		}
	}else if (selectedShadeGroup && selectedTone){
		const shades = [...new Set(jp.query(shadefinderJSON, "$..[?(@.shadeGroup=='"+selectedShadeGroup+"' && @.undertone=='"+selectedTone+"')]"))];
	
		console.debug( shades );		
		for (i in shades){
			items.push({
				title: shades[i].shade,
				link: "content/charles~"+selectedShadeGroup+"~"+selectedTone+"~"+shades[i].shade,
				imageUrl: "https://www.revolutionbeauty.com/on/demandware.static/-/Library-Sites-revbe-content-global/default/dw63ea9934/"+shades[i].img
				}	
			)
		}
	}
	

	const now = new Date();
	const timeString = now.toLocaleString(); // Get local time
	
	var response = {
		"time": timeString,
		"resourceManifest": null,
		"id": "d0b0c47a-dec3-4510-93ae-14f61dcc0efd",
		"component": {
			"type": "vertical-scroll",
			"content": {
				"components": [{
					"content": {
						"title": "Color",
						"items": items,
						"customData": {
							"carousel-type": "swatch"
						}
					},
					"modifiers": {
						"padding": {
							"top": 0,
							"bottom": 0,
							"left": 0,
							"right": 0
						}
					},
					"type": "image-carousel"
				}]
			},
			"modifiers": {},
			"customData": null
		},
		"customData": null
	};

	if (selectedShade){
		response.component.content.components.push(createCarousel("F", selectedShade));
		response.component.content.components.push(createCarousel("M", selectedShade));
		response.component.content.components.push(createCarousel("L",selectedShade));
	}
	return {
		statusCode: 200,
		headers: {
		      "Content-Type": "application/json"
		},
		
		body: JSON.stringify(response)
	};
};

function createCarousel (coverage, selectedShade){
	return {
							"content": {
								"title": coverage=="F"?"Full":(coverage=="L"?"Light": (coverage=="M"?"Medium":"None")) ,
								"url": "/products/charles~"+selectedShade+"~options"+coverage
							},
							"modifiers": {
								"padding": {
									"top": 0,
									"bottom": 0,
									"left": 0,
									"right": 0
								}
							},
							"type": "url-carousel"
						};
	
}
