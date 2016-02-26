
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
					console.log(response);
					var b = document.getElementById("Drink");

					if(b.firstElementChild != null)
						b.removeChild(b.firstElementChild);

					var div = document.createElement("div");
					div.setAttribute("class", "drink")
					div.innerHTML = response;


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
					div.innerHTML = response;


					b.appendChild(div);
				}
		});
	}
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