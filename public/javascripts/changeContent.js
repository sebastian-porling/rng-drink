
function NewContent(drink){
	if(drink){
		var size = document.getElementById("drinkSize").value;
		console.log("size: " + size);

		if(size === "")
			size = 4;

		$.ajax({
			url         :   "/drink/" + size,
			dataType    :   "html",/* JSON, HTML, SJONP... */
			type        :   "GET", /* POST or GET; Default = GET */
			async		: 	false,
			success     :
				function(response) {
					console.log(document.getElementById("Drink"));
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

		$.ajax({
			url         :   "/cocktail/" + size,
			dataType    :   "html",/* JSON, HTML, SJONP... */
			type        :   "GET", /* POST or GET; Default = GET */
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

var AddGuestBook = function(){
	console.log("before");
	console.log(document.getElementById("Msg").value);
	var msg1 = document.getElementById("Msg").value;
	var msg2 =  " - " + capitalizeFirstLetter(document.getElementById("Writer").value);
	msg2 += " " + new Date().toDateString();

	AddGM(capitalizeFirstLetter(document.getElementById("Title").value), msg1, msg2);
}

var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var AddMsgToGuestBook = function(gm){
	var div = document.createElement("div");
	div.setAttribute("class","guestMessage");
	
	var header = document.createElement("h2");
	header.innerHTML = gm.title;
	
	var child = document.createElement("div");
	child.setAttribute("class","gmtext");
	child.innerHTML = gm.msg;
	
	var sign = document.createElement("div");
	sign.setAttribute("class","signature");
	sign.innerHTML = gm.sign;

	div.appendChild(header);
	div.appendChild(child);
	div.appendChild(sign);

	var b = document.getElementById("Book");
	b.appendChild(div);
}

var List = [];
var AddGM = function(title, msg, sign){
	var tmp = {title: title, msg:msg, sign: sign};
	console.log(tmp);
	List.push(tmp);
	AddMsgToGuestBook(tmp);
}