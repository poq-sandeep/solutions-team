// exports.handler = async (event, context) => {
//   const now = new Date();
//   const timeString = now.toLocaleString(); // Get local time
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       time: timeString,
//     }),
//   };
// };

const path = require("path");
const fs = require("fs");

exports.handler = async (event, context) => {
	const path1 = event.path;
	const parts = path1.split('/').filter(Boolean);
	const { queryStringParameters } = event;
	console.error("test");
	console.debug(parts);
	console.debug(queryStringParameters);
	
	console.log(path.resolve(__dirname + "functions/rev-shadefinder.json"));
	const pathToJSON = path.resolve(__dirname + "functions/rev-shadefinder.json");
	console.log(fs.existsSync(pathToJSON));
	const shadefinderJSON = JSON.parse(fs.readFileSync(pathToJSON));

	const now = new Date();
	const timeString = now.toLocaleString(); // Get local time

	return {
		statusCode: 200,
		body: JSON.stringify({
			"time": timeString,
			"resourceManifest": null,
			"id": "d0b0c47a-dec3-4510-93ae-14f61dcc0efd",
			"component": {
				"type": "vertical-scroll",
				"content": {
					"components": [{
						"content": {
							"title": "Color",
							"items": [{
								"title": "Yellow",
								"link": "content/ef5ba68c-fcda-44a2-b2ee-c061587bf405",
								"imageUrl": "https://poqmbuat.blob.core.windows.net/app292/45585842-1.png?v=133910178050860000"
							}, {
								"title": "Beige",
								"link": "content/d0b0c47a-dec3-4510-93ae-14f61dcc0efd",
								"imageUrl": "https://poqmbuat.blob.core.windows.net/app292/45585843-1.png?v=133910178295760000"
							}, {
								"title": "Golden",
								"link": "content/d0b0c47a-dec3-4510-93ae-14f61dcc0efd",
								"imageUrl": "https://poqmbuat.blob.core.windows.net/app292/45585844-1.png?v=133910178550590000"
							}],
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
		}
	)
	};
};
