const path = require("path");
const fs = require("fs");
let jp = require('./jsonpath');

console.log(path.resolve(__dirname + "/../shadefinder/rev-shadefinder.json"));
const pathToJSON = path.resolve(__dirname + "/../shadefinder/rev-shadefinder.json");
console.log(fs.existsSync(pathToJSON));
const shadefinderJSON = JSON.parse(fs.readFileSync(pathToJSON));


export default (request, context) => {
  try {
    const url = new URL(request.url)
	console.log(url.searchParams);
    const selectedShade = url.searchParams.get('path').split("~")[1];	
	const selectedCoverage = url.searchParams.get('path').split("~")[2];	
	
	console.debug("$..[?(@.shade=='"+selectedShade+"')]."+selectedCoverage);
	
	const products = [...new Set(jp.query(shadefinderJSON, "$..[?(@.shade=='"+selectedShade+"')]."+selectedCoverage))]
	
	console.debug(products);
	
	var response=  { "listings": []};

	if(products){
		response.pagination= {"numberOfItems":products[0].length};
		response.pagination.first = "";
		response.pagination.next = "";
		for (var i in products[0]){
			response.listings.push(createProduct( products[0][i]));
		}
	}

    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}

function createProduct(option){
return {
		"id": option.n,
		"productId": option.sku,
		"name": option.title,
		"forms": [{
			"id": "colour",
			"name": "colour",
			"variations": [{
				"id": option.shade,
				"name": option.shade,
				"value": option.shade
			}]
		}],
		"variantGroups": [{

		//"images": ["https://www.revolutionbeauty.com/on/demandware.static/-/Library-Sites-revbe-content-global/en_GB/v1746573316634/images/shadefinders/EW/"+option.n+"/"+option.imgsrc]+".webp",
			"images": ["https://www.revolutionbeauty.com/dw/image/v2/BCZJ_PRD/on/demandware.static/-/Sites-revbe-master-catalog/default/dw67338747/images/hi-res/1855341--Revolution-Skin-Silk-erum-Foundation-F0.2N--1.jpg?sw=660&sh=660&sm=fit&strip=false"],
			"stock": {
				"available": true
			},
			"formVariationIds": [option.shade],
			"priceRange": {
				"now": {
					"min": 7.99,
					"max": 7.99
				}
			},
			"name": option.title,
			"storeStock": {
				"available": false,
				"lowOnStock": false,
				"maxOrderableQuantity": 0,
				"quantity": 0
			}
		}],
		"priceRange": {
			"now": {
				"min": 7.99,
				"max": 7.99
			}
		},
		"promotions": {},
		"reviews": {
			"rating": 5.0,
			"count": 803
		}
	}
}

