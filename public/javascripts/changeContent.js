function AlcoholFree() {
	$.ajax({
		url: "/alcoholfree",
		dataType: "html", /* JSON, HTML, SJONP... */
		type: "GET", /* POST or GET; Default = GET */
		cache: false,
		async: false,
		success: function (response) {
			console.log(document.getElementById("alcfree"));
			var b = document.getElementById("alcfree");

			if (b.firstElementChild != null)
				b.removeChild(b.firstElementChild);

			var div = document.createElement("div");
			div.setAttribute("class", "drink")

			console.log(response);

			var body = createBody(response);

			console.log(body);
			div.innerHTML = body;

			b.appendChild(div);
		}
	});
}
function NewContent(drink){
	if(drink){
		var size = document.getElementById("drinkSize").value;
		console.log("size: " + size);

		if(size === "")
			size = 4;
		else if(size < 4)
			size = 4;
		else if(size > 12)
			size = 12;

		$.ajax({
			url         :   "/drink/" + size,
			dataType    :   "html",/* JSON, HTML, SJONP... */
			type        :   "GET", /* POST or GET; Default = GET */
			cache		: 	false,
			async		: 	false,
			success     :
				function(response) {
					console.log(document.getElementById("Drink"));
					var b = document.getElementById("Drink");

					if(b.firstElementChild != null)
						b.removeChild(b.firstElementChild);

					var div = document.createElement("div");
					div.setAttribute("class", "drink")

					console.log(response);

					var body = createBody(response);

					console.log(body);
					div.innerHTML = body;

					b.appendChild(div);
				}
		});

	}
	else{
		var size = document.getElementById("cocktailSize").value;
		console.log("size: " + size);

		if(size === "")
			size = 4;
		else if(size < 4)
			size = 4;
		else if(size > 12)
			size = 12;

		$.ajax({
			url         :   "/cocktail/" + size,
			dataType    :   "html",/* JSON, HTML, SJONP... */
			type        :   "GET", /* POST or GET; Default = GET */
			cache		: 	false,
			async		: 	false,
			success     :
				function(response) {
					console.log(document.getElementById("Cocktail"));
					var b = document.getElementById("Cocktail");

					if(b.firstElementChild != null)
						b.removeChild(b.firstElementChild);

					var div = document.createElement("div");
					div.setAttribute("class", "drink")

					console.log(response);

					var body = createBody(response);
					div.innerHTML = body;

					b.appendChild(div);
				}
		});
	}
}

function createBody(drink){
	drink = JSON.parse(drink);
	var str = "";
	if(drink.alcohol)
		str += "\<div\>" +  "Liquor: " + drink.alcohol + " cl" + "\</div\>";
	else
		str += "\<div\>" +  "Alcohol Free" + "\</div\>";

	if(drink.spirits) {
		drink.spirits.forEach(function (spirit) {
			str += "\<div\>" + spirit.amount + "cl" + " " + spirit.name + "\</div\>";
		});
	}

	if(drink.mixers) {
		str += "\<div\>" + "_" + "\</div\>";
		str += "\<div\>" + "Mixers:" + "\</div\>";

		drink.mixers.forEach(function (mixer) {
			str += "\<div\>" + mixer + "\</div\>";
		});
	}

	if(drink.extra && drink.extra.length > 0) {
		str +=  "\<div\>" + "_" + "\</div\>";
		str += "\<div\>" + "Extra:" + "\</div\>";

		drink.extra.forEach(function(extra){
			str += "\<div\>" + extra + "\</div\>";
		});

	}
	return str;
}

function CheckKey(e, drink) //receives event object as parameter
{
	var code = e.keyCode ? e.keyCode : e.which;
	if(code === 13)
	{
		NewContent(drink);
		//alert("You press Enter key.");
	}
}